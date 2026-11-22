import { NextResponse } from 'next/server';

const DOCTORS_API_BASE =
  process.env.DOCTORS_LIBRARY_API_URL ||
  'https://reels.192-227-172-231.sslip.io/doctors-api';

export async function GET() {
  try {
    const res = await fetch(`${DOCTORS_API_BASE}/catalog`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Unable to load the Doctors of the Church archive right now.' },
        { status: 502 }
      );
    }
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' },
    });
  } catch {
    return NextResponse.json(
      { error: 'Unable to reach the Doctors of the Church archive.' },
      { status: 504 }
    );
  }
}
