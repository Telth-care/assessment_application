'use client';

import { useEffect, useState } from 'react';

type SectionRow = { correct: number; total: number };
type Result = {
  score: number;
  total: number;
  percentage: number;
  result: 'pass' | 'fail';
  passPercentage: number;
  sectionBreakdown: Record<string, SectionRow>;
  emailSent: boolean;
};

const SECTION_LABELS: Record<string, string> = {
  A: 'Attitude, Integrity & Growth Mindset',
  B: 'Patient Safety & Professional Scope',
  C: 'Care Coordination & Patient Management',
  D: 'Sales, Territory & Care Plan Capability',
  E: 'Digital, IoMT & Data Discipline',
  F: 'Initiative, Leadership & Learning',
};

export default function SubmittedPage() {
  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('telth_result');
    if (raw) setResult(JSON.parse(raw));
    sessionStorage.removeItem('telth_result');
  }, []);

  const passed = result?.result === 'pass';

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm font-medium tracking-wide text-telth-amber">Telth Care Manager Recruitment</p>
      <h1 className="mt-2 font-display text-3xl text-telth-purpleDark">Assessment Submitted</h1>

      {result ? (
        <div className="mt-6 w-full rounded-xl border border-telth-purple/15 bg-white p-6 text-left shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm text-telth-ink/60">Objective score</span>
            <span className="text-lg font-semibold text-telth-ink">
              {result.score}/{result.total}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-telth-ink/60">Percentage</span>
            <span className="text-lg font-semibold text-telth-ink">{result.percentage}%</span>
          </div>
          <div className="mt-4">
            <span
              className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${
                passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {passed ? 'PASSED' : 'NOT CLEARED'} · pass mark {result.passPercentage}%
            </span>
          </div>

          <div className="mt-6 border-t border-telth-purple/10 pt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-telth-ink/50">Section breakdown</p>
            <div className="space-y-1.5">
              {Object.entries(result.sectionBreakdown).map(([section, row]) => (
                <div key={section} className="flex items-center justify-between text-sm">
                  <span className="text-telth-ink/70">{SECTION_LABELS[section] || section}</span>
                  <span className="font-medium text-telth-ink">
                    {row.correct}/{row.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-5 text-xs text-telth-ink/50">
            {result.emailSent
              ? 'A copy of this result has been emailed to you.'
              : 'Your result is saved. We could not confirm the email was sent — check with the recruiter if needed.'}
          </p>
        </div>
      ) : (
        <p className="mt-6 text-sm text-telth-ink/60">Your responses have been recorded.</p>
      )}

      <p className="mt-6 text-xs leading-relaxed text-telth-ink/50">
        This objective score is one part of the assessment — written answers, the practical assessment and a
        structured interview are reviewed separately before a final decision is made.
      </p>
    </main>
  );
}
