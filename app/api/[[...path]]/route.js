import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, service: 'meet-portfolio', version: '1.0.0' });
}
