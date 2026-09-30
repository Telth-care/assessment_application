import { NextResponse } from 'next/server';
import { getQuestionBank, getCandidate, attemptExists, getPassPercentage, saveAttempt, markEmailSent } from '@/lib/db';
import { sendResultEmail } from '@/lib/resend';

export const dynamic = 'force-dynamic';

type SubmitBody = {
  candidateId: string;
  startedAt: string;
  autoSubmitted: boolean;
  objectiveAnswers: Record<string, string>; // questionId -> chosen optionId
  writtenAnswers: Record<string, string>;
  tabSwitchCount: number;
  flagged: boolean;
};

export async function POST(req: Request) {
  const body = (await req.json()) as SubmitBody;
  const { candidateId, startedAt, autoSubmitted, objectiveAnswers, writtenAnswers, tabSwitchCount, flagged } = body;

  if (!candidateId) {
    return NextResponse.json({ error: 'Missing candidateId.' }, { status: 400 });
  }

  // One attempt per candidate
  if (await attemptExists(candidateId)) {
    return NextResponse.json({ error: 'An attempt already exists for this candidate.' }, { status: 409 });
  }

  const candidate = await getCandidate(candidateId);
  if (!candidate) {
    return NextResponse.json({ error: 'Candidate not found.' }, { status: 404 });
  }

  // Re-fetch the current answer key server-side — never trust anything from the client for scoring
  const { mcqs: bank } = await getQuestionBank();

  let score = 0;
  const sectionBreakdown: Record<string, { correct: number; total: number }> = {};
  for (const q of bank) {
    sectionBreakdown[q.section] ||= { correct: 0, total: 0 };
    sectionBreakdown[q.section].total += 1;
    const correctOption = q.options.find((o) => o.is_correct);
    const chosenId = objectiveAnswers?.[q.id];
    if (chosenId && correctOption && chosenId === correctOption.id) {
      score += 1;
      sectionBreakdown[q.section].correct += 1;
    }
  }
  const total = bank.length;
  const percentage = total > 0 ? Math.round((score / total) * 10000) / 100 : 0;

  const passPercentage = await getPassPercentage();
  const result: 'pass' | 'fail' = percentage >= passPercentage ? 'pass' : 'fail';

  await saveAttempt({
    candidate_id: candidateId,
    started_at: startedAt,
    submitted_at: new Date().toISOString(),
    auto_submitted: autoSubmitted,
    objective_score: score,
    objective_total: total,
    percentage,
    result,
    section_breakdown: sectionBreakdown,
    objective_answers: objectiveAnswers,
    written_answers: writtenAnswers,
    tab_switch_count: tabSwitchCount,
    flagged: flagged || tabSwitchCount >= 3,
    email_sent: false,
  });

  let emailSent = false;
  if (candidate.email) {
    emailSent = await sendResultEmail({
      to: candidate.email,
      candidateName: candidate.full_name,
      score,
      total,
      percentage,
      result,
      passPercentage,
    });
    if (emailSent) await markEmailSent(candidateId);
  }

  return NextResponse.json({ score, total, percentage, result, passPercentage, sectionBreakdown, emailSent });
}
