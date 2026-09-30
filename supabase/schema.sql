-- Run this once in Supabase SQL Editor (free plan works fine). Then run seed.sql.
-- If you already ran the old schema, this is safe to re-run (uses "if not exists" /
-- "create or replace" throughout), except it DROPS old open policies on test_attempts
-- that let the browser write scores directly — scoring now happens server-side only.

create extension if not exists "pgcrypto";

-- ── Candidates ────────────────────────────────────────────────────────────
create table if not exists candidates (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  mobile text not null,
  email text not null,              -- now required: results email is sent here
  district text,
  qualification text,
  healthcare_training text,
  experience text,
  languages text,
  current_employment text,
  joining_availability text,
  consent boolean not null default false,
  created_at timestamptz not null default now()
);

-- ── Question bank (served dynamically, shuffled fresh on every fetch) ─────
create table if not exists mcq_questions (
  id uuid primary key default gen_random_uuid(),
  source_no int,                     -- original question number from the PDF, for reference only
  section text not null,             -- A–F, matches the PDF's sections
  question_text text not null,
  options jsonb not null,            -- [{id:"opt1", text:"...", is_correct:true/false}, ...]
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists written_questions (
  id uuid primary key default gen_random_uuid(),
  display_order int not null,
  prompt text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ── Config (pass mark, editable without a redeploy) ────────────────────────
create table if not exists settings (
  key text primary key,
  value text not null
);

-- ── Attempts (written only by the server, via service-role key) ───────────
create table if not exists test_attempts (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null unique references candidates(id) on delete cascade, -- unique = one attempt per candidate, enforced in the DB
  started_at timestamptz not null,
  submitted_at timestamptz,
  auto_submitted boolean not null default false,
  objective_score int,               -- correct count
  objective_total int,               -- questions scored against
  percentage numeric(5,2),
  result text,                       -- 'pass' | 'fail'
  section_breakdown jsonb,           -- { "A": {correct: 8, total: 10}, ... }
  objective_answers jsonb,           -- { questionId: chosenOptionId }
  written_answers jsonb,             -- { questionId: freeText }
  tab_switch_count int not null default 0,
  flagged boolean not null default false,
  email_sent boolean not null default false,
  created_at timestamptz not null default now()
);

alter table candidates enable row level security;
alter table mcq_questions enable row level security;
alter table written_questions enable row level security;
alter table settings enable row level security;
alter table test_attempts enable row level security;

-- Drop the old, looser policies if they exist (from the first version of this schema)
drop policy if exists "anon can insert attempt" on test_attempts;
drop policy if exists "anon can update own attempt same session" on test_attempts;

-- Public (anon) candidates can INSERT their own info only — never read anyone's data
create policy "anon can insert candidate" on candidates
  for insert to anon with check (true);

-- mcq_questions / written_questions / settings / test_attempts: NO anon policies at all.
-- They're only reachable via the Next.js API routes using the service-role key
-- (app/api/questions, app/api/submit) — this is what keeps correct answers and
-- scores off the browser network tab.
