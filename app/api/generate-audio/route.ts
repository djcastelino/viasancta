import { NextRequest, NextResponse } from 'next/server';
import { apiError, readInput, required, ServiceError } from '@/app/lib/ai';
import { synthesize } from '@/app/lib/speech';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const text = required(body, 'text', 20000);
    const voice = required(body, 'voice', 100);
    const rate = body.rate === undefined ? 1 : body.rate;
    if (typeof rate !== 'number' || rate < 0.5 || rate > 2) throw new ServiceError('Invalid speaking rate.', 400);
    const audio = await synthesize(text, voice, rate);
    return new NextResponse(audio, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'no-store' } });
  } catch (error) { return apiError(error); }
}
