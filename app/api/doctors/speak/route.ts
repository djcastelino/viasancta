import { NextRequest, NextResponse } from 'next/server';
import { apiError, readInput, required, ServiceError } from '@/app/lib/ai';

const DOCTORS_API_BASE =
  process.env.DOCTORS_LIBRARY_API_URL ||
  'https://reels.192-227-172-231.sslip.io/doctors-api';

export async function POST(request: NextRequest) {
  try {
    const input = await readInput(request);
    const text = required(input, 'text', 3200);

    const res = await fetch(`${DOCTORS_API_BASE}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(45000),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new ServiceError('Andrew voice audio is temporarily unavailable.', 502);
    }

    const audioBuffer = await res.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    return apiError(error);
  }
}
