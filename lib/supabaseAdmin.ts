import { createClient, SupabaseClient } from '@supabase/supabase-js';

// True once both server-side Supabase values are set — flips the app from mock mode to real DB
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Lazily built so importing this file never throws when running in mock mode
let client: SupabaseClient | null = null;
export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured — this should only be called when isSupabaseConfigured is true.');
  }
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false } }
    );
  }
  return client;
}
