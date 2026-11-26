import { NextRequest, NextResponse } from 'next/server';
import { apiError, ServiceError } from '@/app/lib/ai';

const DOCTORS_API_BASE =
  process.env.DOCTORS_LIBRARY_API_URL ||
  'https://reels.192-227-172-231.sslip.io/doctors-api';

export async function GET(request: NextRequest) {
  try {
    const q = (request.nextUrl.searchParams.get('q') || '').trim().slice(0, 400);
    if (!q) {
      throw new ServiceError('Please enter a question.', 400);
    }
    const doctorRaw = (request.nextUrl.searchParams.get('doctor') || 'all').trim().toLowerCase();
    const doctor = /^[a-z0-9-]+$/.test(doctorRaw) ? doctorRaw : 'all';

    const retUrl = `${DOCTORS_API_BASE}/retrieve?q=${encodeURIComponent(q)}&doctor=${encodeURIComponent(doctor)}&limit=8`;
    const res = await fetch(retUrl, {
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      throw new ServiceError('Unable to search the Doctors of the Church PDF archive.', 502);
    }

    const data = await res.json();
    const passages = Array.isArray(data.passages) ? data.passages : [];
    return NextResponse.json(
      { query: q, doctor, count: passages.length, passages },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    return apiError(error);
  }
}
