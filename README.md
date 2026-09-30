# Telth Care Manager — Online Recruitment Assessment

Next.js + Supabase app. Questions live in Supabase and are served dynamically — every
time a candidate opens the test, the question order and each question's option order
are reshuffled server-side, so no two attempts see the same sequence. Scoring, the
pass/fail decision, and the result email all happen server-side, so answers and scores
never touch the browser's network tab.

## How it works
1. `app/page.tsx` — candidate fills in info + consent, saved to `candidates`.
2. `app/test/page.tsx` — calls `GET /api/questions`, which pulls active questions from
   Supabase and shuffles them fresh on every call, then strips the correct answer before
   sending them to the browser. Candidate answers; on submit or timeout, `POST /api/submit`
   is called with the raw answers.
3. `app/api/submit/route.ts` — re-fetches the answer key from Supabase (never trusts the
   client), scores it, compares the percentage to the pass mark in `settings`, saves the
   attempt to `test_attempts`, and emails the result via Resend.
4. `app/submitted/page.tsx` — shows the score, percentage, pass/fail and a per-section
   breakdown returned by `/api/submit`.

## Step 1 — Create the Supabase project (free plan)
1. Go to supabase.com → New project. Wait for it to finish provisioning.
2. Open **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
3. Still in SQL Editor → paste the contents of `supabase/seed.sql` → Run.
   This loads all 50 MCQs, the 6 written prompts, and sets the pass mark to **60%**.
   Re-running `seed.sql` later is safe — it clears and reloads the question tables.
4. To change the pass mark later, run:
   ```sql
   update settings set value = '65' where key = 'pass_percentage';
   ```
5. Go to **Project Settings → API**. Copy three values for the next step:
   - Project URL
   - `anon` `public` key
   - `service_role` key (click "Reveal" — keep this one secret, never put it in
     `NEXT_PUBLIC_...`)

## Step 2 — Create a Resend account (for the result email)
1. Sign up at resend.com → **API Keys** → create a key, copy it.
2. **Sending domain:** Resend's sandbox address `onboarding@resend.dev` only delivers
   to the email you signed up with — fine for your own testing, but it will silently
   fail to reach real candidates. For real use: **Domains** → add your domain → add the
   shown DNS records at your registrar → wait for verification (usually minutes) → then
   set `RESEND_FROM_EMAIL` to an address on that domain, e.g. `results@yourdomain.com`.
3. Free plan covers 100 emails/day, 3,000/month — plenty for a recruitment test.

## Step 3 — Configure environment variables
```bash
cp .env.example .env.local
```
Fill in all five values from Steps 1–2:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
```

## Step 4 — Run it locally
```bash
npm install
npm run dev
```
Open http://localhost:3000, fill the candidate form with your own email, take the test,
submit, and confirm the result email arrives.

## Step 5 — Deploy to Vercel
1. Push this project to a GitHub repo.
2. In Vercel: **Add New → Project** → import the repo.
3. In **Environment Variables**, add all five keys from Step 3 (same values as
   `.env.local`). Mark `SUPABASE_SERVICE_ROLE_KEY` and `RESEND_API_KEY` as server-only —
   they don't have the `NEXT_PUBLIC_` prefix so Next.js already keeps them off the
   client bundle, but double-check they're entered correctly.
4. Deploy. Both Vercel's Hobby tier and Supabase's/Resend's free tiers are sufficient
   for this app's traffic.

## Managing questions later
Add, edit, or deactivate questions directly in Supabase's **Table Editor**:
- `mcq_questions` — edit `question_text` or the `options` jsonb (keep the `id`s as
  `opt1`–`opt4` and exactly one `is_correct: true`), or set `is_active = false` to
  retire a question without deleting it.
- `written_questions` — same idea, ordered by `display_order`.
- Scoring is always "out of however many `mcq_questions` are active right now" — no
  code change needed when you add or remove questions.

## Reviewing results
No recruiter login is built — by design, the anon (public) key can only insert a
candidate row, nothing else. Recruiters review everything in Supabase's free
**Table Editor**:
- `test_attempts` — score, percentage, pass/fail, section breakdown, tab-switch count,
  `flagged` (true if the candidate exceeded 3 tab switches — review these manually),
  and the written answers.
- Join `candidates` on `candidate_id` for contact details.
- The PDF's own scoring note still applies: objective (100) + written (30, scored
  manually) + practical (25, done in person) = 155 total — don't decide on the
  objective score alone.

## Anti-cheat behaviour (and its real limits)
Right-click, copy/cut/paste/select, and common shortcuts (Ctrl+C/V/X/U/S/P, F12,
Ctrl+Shift+I/J/C, PrintScreen) are blocked; tab-switch/blur is detected, logged, and
auto-submits + flags the attempt after 3 switches; a tiled watermark with the
candidate's name makes any screenshot traceable; the page can't be iframed elsewhere.

**No browser can block OS-level screenshots or a phone camera pointed at the screen** —
there's no web API for that. This deters and logs misuse; it does not physically
prevent screen capture.

## One attempt per candidate
Enforced at the database level: `test_attempts.candidate_id` is `unique`, and
`/api/submit` checks for an existing attempt before scoring, so a second submission for
the same candidate is rejected outright.
