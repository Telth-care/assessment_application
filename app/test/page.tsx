'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TEST_DURATION_SECONDS, MAX_TAB_SWITCHES } from '@/lib/config';
import AntiCheat from '@/components/AntiCheat';

type ApiOption = { id: string; text: string };
type ApiMcq = { id: string; section: string; text: string; options: ApiOption[] };
type ApiWritten = { id: string; text: string };

export default function TestPage() {
  const router = useRouter();
  const [candidateId, setCandidateId] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [mcqs, setMcqs] = useState<ApiMcq[]>([]);
  const [written, setWritten] = useState<ApiWritten[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> chosen optionId
  const [writtenAnswers, setWrittenAnswers] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState(TEST_DURATION_SECONDS);
  const [submitting, setSubmitting] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const tabSwitchCountRef = useRef(0);
  const startedAtRef = useRef<string>(new Date().toISOString());
  const submittedRef = useRef(false); // guards against double-submit

  // Guard: must come from the candidate-info page, then pull a freshly shuffled paper
  useEffect(() => {
    const id = sessionStorage.getItem('telth_candidate_id');
    const name = sessionStorage.getItem('telth_candidate_name');
    if (!id) {
      router.replace('/');
      return;
    }
    setCandidateId(id);
    setCandidateName(name || '');

    fetch('/api/questions', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setMcqs(data.mcqs);
        setWritten(data.written);
      })
      .catch(() => setLoadError('Could not load the assessment. Please refresh.'))
      .finally(() => setLoading(false));
  }, [router]);

  const submitTest = useCallback(
    async (autoSubmitted: boolean) => {
      if (submittedRef.current || !candidateId) return;
      submittedRef.current = true;
      setSubmitting(true);

      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          startedAt: startedAtRef.current,
          autoSubmitted,
          objectiveAnswers: answers,
          writtenAnswers,
          tabSwitchCount: tabSwitchCountRef.current,
          flagged,
        }),
      }).then((r) => r.json());

      sessionStorage.removeItem('telth_candidate_id');
      sessionStorage.removeItem('telth_candidate_name');
      if (!res.error) sessionStorage.setItem('telth_result', JSON.stringify(res));
      router.push('/submitted');
    },
    [answers, writtenAnswers, candidateId, flagged, router]
  );

  // Countdown timer — auto-submits at zero
  useEffect(() => {
    if (!candidateId || loading) return;
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          submitTest(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [candidateId, loading, submitTest]);

  const handleTabSwitchExceeded = useCallback(() => {
    tabSwitchCountRef.current = MAX_TAB_SWITCHES;
    setFlagged(true);
    submitTest(true); // too many tab switches — end the attempt and flag for review
  }, [submitTest]);

  const answeredCount = Object.keys(answers).length;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  const allWrittenFilled = useMemo(
    () => written.every((w) => (writtenAnswers[w.id] || '').trim().length > 0),
    [written, writtenAnswers]
  );
  const allMcqAnswered = mcqs.length > 0 && answeredCount === mcqs.length;

  if (!candidateId) return null; // redirecting
  if (loading) return <main className="p-8 text-center text-sm text-telth-ink/60">Loading your assessment…</main>;
  if (loadError) return <main className="p-8 text-center text-sm text-red-600">{loadError}</main>;

  return (
    <AntiCheat candidateName={candidateName} maxTabSwitches={MAX_TAB_SWITCHES} onTabSwitchExceeded={handleTabSwitchExceeded}>
      <div className="mx-auto max-w-3xl px-6 py-8 pb-28">
        <div className="sticky top-0 z-40 -mx-6 mb-6 border-b border-telth-purple/20 bg-telth-mist/95 px-6 py-3 backdrop-blur">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-telth-purpleDark">
              {answeredCount}/{mcqs.length} objective answered
            </span>
            <span className={`font-mono text-base font-semibold ${secondsLeft < 300 ? 'text-red-600' : 'text-telth-purple'}`}>
              {mm}:{ss}
            </span>
          </div>
        </div>

        <h1 className="mb-1 font-display text-2xl text-telth-purpleDark">Section A–F · Objective Questions</h1>
        <p className="mb-6 text-sm text-telth-ink/60">Choose the single best answer for each question. All questions are required.</p>

        <div className="space-y-6">
          {mcqs.map((q, idx) => (
            <div key={q.id} className="rounded-lg border border-telth-purple/15 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-telth-ink">
                {idx + 1}. {q.text}
              </p>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex cursor-pointer items-start gap-2 rounded-md border px-3 py-2 text-sm transition ${
                      answers[q.id] === opt.id ? 'border-telth-purple bg-telth-purple/5' : 'border-telth-purple/15 hover:bg-telth-mist'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      checked={answers[q.id] === opt.id}
                      onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.id }))}
                      className="mt-0.5"
                    />
                    <span>{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="mb-1 mt-10 font-display text-2xl text-telth-purpleDark">Section G · Written Follow-Up</h2>
        <p className="mb-6 text-sm text-telth-ink/60">Answer briefly in your own words.</p>

        <div className="space-y-6">
          {written.map((w, idx) => (
            <div key={w.id} className="rounded-lg border border-telth-purple/15 bg-white p-4 shadow-sm">
              <p className="mb-2 text-sm font-semibold text-telth-ink">
                {idx + 1}. {w.text}
              </p>
              <textarea
                value={writtenAnswers[w.id] || ''}
                onChange={(e) => setWrittenAnswers((wr) => ({ ...wr, [w.id]: e.target.value }))}
                rows={3}
                className="w-full rounded-md border border-telth-purple/20 px-3 py-2 text-sm outline-none focus:border-telth-purple focus:ring-2 focus:ring-telth-purple/20"
              />
            </div>
          ))}
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-telth-purple/20 bg-white/95 px-6 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <p className="text-xs text-telth-ink/60">
              {!allMcqAnswered || !allWrittenFilled ? 'Some questions are still unanswered.' : 'All questions answered.'}
            </p>
            <button
              onClick={() => submitTest(false)}
              disabled={submitting}
              className="rounded-md bg-telth-purple px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-telth-purpleDark disabled:opacity-60"
            >
              {submitting ? 'Submitting…' : 'Submit Assessment'}
            </button>
          </div>
        </div>
      </div>
    </AntiCheat>
  );
}
