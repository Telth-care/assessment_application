'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const FIELDS: { key: string; label: string; required?: boolean }[] = [
  { key: 'full_name', label: 'Full Name', required: true },
  { key: 'mobile', label: 'Mobile', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'district', label: 'District / Preferred Territory' },
  { key: 'qualification', label: 'Highest Qualification' },
  { key: 'healthcare_training', label: 'Healthcare / Skill India Training' },
  { key: 'experience', label: 'Years of Experience' },
  { key: 'languages', label: 'Languages' },
  { key: 'current_employment', label: 'Current Employment' },
  { key: 'joining_availability', label: 'Joining Availability' },
];

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleStart = async () => {
    setError('');
    if (!form.full_name || !form.mobile || !form.email) {
      setError('Full name, mobile and email are required.');
      return;
    }
    if (!consent) {
      setError('Please accept the data-processing consent to continue.');
      return;
    }
    setLoading(true);

    const res = await fetch('/api/candidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).then((r) => r.json());

    setLoading(false);
    if (res.error || !res.id) {
      setError('Could not save your details. Please check your connection and try again.');
      return;
    }

    sessionStorage.setItem('telth_candidate_id', res.id);
    sessionStorage.setItem('telth_candidate_name', res.full_name);
    router.push('/test');
  };

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <header className="mb-8 border-b border-telth-purple/20 pb-6">
        <p className="text-sm font-medium tracking-wide text-telth-amber">Telth Care Manager Recruitment</p>
        <h1 className="mt-1 font-display text-3xl text-telth-purpleDark">Online Recruitment Assessment</h1>
        <p className="mt-3 text-sm leading-relaxed text-telth-ink/70">
          This test covers Attitude, Patient Safety, Care Coordination, Sales, Technology and Growth. It takes
          about 45 minutes, has 50 scored questions and 6 short written questions, and can be attempted once.
          Copying, pasting and right-click are disabled during the test, and tab switches are logged.
        </p>
      </header>

      <div className="space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="mb-1 block text-sm font-medium text-telth-ink/80">
              {f.label}
              {f.required && <span className="text-telth-amber"> *</span>}
            </label>
            <input
              type="text"
              value={form[f.key] || ''}
              onChange={(e) => update(f.key, e.target.value)}
              className="w-full rounded-md border border-telth-purple/20 bg-white px-3 py-2 text-sm outline-none focus:border-telth-purple focus:ring-2 focus:ring-telth-purple/20"
            />
          </div>
        ))}
      </div>

      <label className="mt-6 flex items-start gap-2 text-sm text-telth-ink/80">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        <span>
          I consent to Telth processing the information above for recruitment purposes, and to lawful verification
          of my application.
        </span>
      </label>

      {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

      <button
        onClick={handleStart}
        disabled={loading}
        className="mt-6 w-full rounded-md bg-telth-purple py-3 text-sm font-semibold text-white transition hover:bg-telth-purpleDark disabled:opacity-60"
      >
        {loading ? 'Starting…' : 'Start Assessment'}
      </button>

      <p className="mt-4 text-center text-xs text-telth-ink/50">
        This assessment is a recruitment aid and is combined with a structured interview and reference checks.
      </p>
    </main>
  );
}
