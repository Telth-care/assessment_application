// Dev-only in-memory store, used when Supabase env vars aren't set yet.
// Kept on `globalThis` so it survives Next.js dev-server hot reloads.

type MockCandidate = {
  id: string;
  full_name: string;
  email: string;
  [key: string]: unknown;
};

type MockAttempt = {
  candidate_id: string;
  [key: string]: unknown;
};

type Store = { candidates: MockCandidate[]; attempts: MockAttempt[] };

const g = globalThis as unknown as { __telthMockStore?: Store };
if (!g.__telthMockStore) g.__telthMockStore = { candidates: [], attempts: [] };

export const mockStore = g.__telthMockStore;
