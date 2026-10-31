import { NextRequest, NextResponse } from 'next/server';
import { apiError, object, readInput, ServiceError } from '@/app/lib/ai';
import promises from '@/src/daily-promises.json';

// Compatibility for older clients: Scripture only, with no AI generation.
export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const data = object(body.promise);
    const promise = promises.find(entry => data.id !== undefined
      ? entry.id === data.id
      : entry.reference === data.reference && entry.verse === data.verse);
    if (!promise) throw new ServiceError('This Scripture entry is unavailable. Please refresh the page.', 404);
    return NextResponse.json({ script: `${promise.verse} ${promise.reference}.` });
  } catch (error) { return apiError(error); }
}
