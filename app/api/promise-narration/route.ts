import { NextRequest, NextResponse } from 'next/server';
import { apiError, generateText, object, readInput, required } from '@/app/lib/ai';
import prompts from '@/app/lib/prompts.json';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const data = object(body.promise);
    required(data, 'verse');
    required(data, 'reference');
    const prompt = prompts.promise;
    const text = await generateText(prompt.system,
      prompt.prompt + '\n\nSUPPLIED DATA:\n' + JSON.stringify(body), 500);
    return NextResponse.json({ script: text });
  } catch (error) { return apiError(error); }
}
