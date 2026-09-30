import { randomUUID } from 'crypto';
import { isSupabaseConfigured, getSupabaseAdmin } from './supabaseAdmin';
import { mockStore } from './mockStore';
import { MOCK_MCQS, MOCK_WRITTEN, MOCK_PASS_PERCENTAGE } from './mockData';

export type DbOption = { id: string; text: string; is_correct: boolean };
export type DbQuestion = { id: string; section: string; question_text: string; options: DbOption[] };
export type DbWritten = { id: string; prompt: string };

export async function getQuestionBank(): Promise<{ mcqs: DbQuestion[]; written: DbWritten[] }> {
  if (!isSupabaseConfigured) {
    return { mcqs: [...MOCK_MCQS] as unknown as DbQuestion[], written: [...MOCK_WRITTEN] as unknown as DbWritten[] };
  }
  const supabaseAdmin = getSupabaseAdmin();
  const [{ data: mcqs }, { data: written }] = await Promise.all([
    supabaseAdmin.from('mcq_questions').select('id, section, question_text, options').eq('is_active', true),
    supabaseAdmin.from('written_questions').select('id, prompt').eq('is_active', true).order('display_order'),
  ]);
  return { mcqs: (mcqs || []) as DbQuestion[], written: (written || []) as DbWritten[] };
}

export async function createCandidate(fields: Record<string, string>): Promise<{ id: string; full_name: string; email: string }> {
  if (!isSupabaseConfigured) {
    const candidate = { id: randomUUID(), full_name: fields.full_name, email: fields.email, ...fields, consent: true };
    mockStore.candidates.push(candidate);
    return candidate;
  }
  const supabaseAdmin = getSupabaseAdmin();
  const { data, error } = await supabaseAdmin.from('candidates').insert({ ...fields, consent: true }).select().single();
  if (error || !data) throw new Error(error?.message || 'Could not create candidate.');
  return data;
}

export async function getCandidate(id: string): Promise<{ full_name: string; email: string } | null> {
  if (!isSupabaseConfigured) {
    return mockStore.candidates.find((c) => c.id === id) || null;
  }
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin.from('candidates').select('full_name, email').eq('id', id).single();
  return data || null;
}

export async function attemptExists(candidateId: string): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return mockStore.attempts.some((a) => a.candidate_id === candidateId);
  }
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin.from('test_attempts').select('id').eq('candidate_id', candidateId).maybeSingle();
  return Boolean(data);
}

export async function getPassPercentage(): Promise<number> {
  if (!isSupabaseConfigured) return MOCK_PASS_PERCENTAGE;
  const supabaseAdmin = getSupabaseAdmin();
  const { data } = await supabaseAdmin.from('settings').select('value').eq('key', 'pass_percentage').maybeSingle();
  return data ? parseFloat(data.value) : 60;
}

export async function saveAttempt(attempt: Record<string, unknown>): Promise<void> {
  if (!isSupabaseConfigured) {
    mockStore.attempts.push(attempt as { candidate_id: string });
    return;
  }
  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.from('test_attempts').insert(attempt);
  if (error) throw new Error(error.message);
}

export async function markEmailSent(candidateId: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const attempt = mockStore.attempts.find((a) => a.candidate_id === candidateId);
    if (attempt) attempt.email_sent = true;
    return;
  }
  const supabaseAdmin = getSupabaseAdmin();
  await supabaseAdmin.from('test_attempts').update({ email_sent: true }).eq('candidate_id', candidateId);
}
