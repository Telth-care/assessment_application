import { NextResponse } from 'next/server';
import { createCandidate } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const fields = await req.json();
  if (!fields.full_name || !fields.mobile || !fields.email) {
    return NextResponse.json({ error: 'Full name, mobile and email are required.' }, { status: 400 });
  }
  try {
    const candidate = await createCandidate(fields);
    return NextResponse.json({ id: candidate.id, full_name: candidate.full_name });
  } catch (err) {
    return NextResponse.json({ error: 'Could not save your details.' }, { status: 500 });
  }
}
