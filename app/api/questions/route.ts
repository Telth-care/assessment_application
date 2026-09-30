import { NextResponse } from 'next/server';
import { getQuestionBank } from '@/lib/db';
import { shuffle } from '@/lib/shuffle';

export const dynamic = 'force-dynamic'; // never cache — every open must reshuffle

export async function GET() {
  const { mcqs, written } = await getQuestionBank();

  // Shuffle question order, then shuffle each question's option order — new sequence every request
  const shuffledMcqs = shuffle(mcqs).map((q) => ({
    id: q.id,
    section: q.section,
    text: q.question_text,
    // strip is_correct before it ever reaches the browser
    options: shuffle(q.options).map((o) => ({ id: o.id, text: o.text })),
  }));

  return NextResponse.json({
    mcqs: shuffledMcqs,
    written: written.map((w) => ({ id: w.id, text: w.prompt })),
  });
}
