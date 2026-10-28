import { NextRequest, NextResponse } from 'next/server';
import { apiError, generateText, readInput, required } from '@/app/lib/ai';
import prompts from '@/app/lib/prompts.json';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const data = body;
    required(data, 'verse');
    required(data, 'reference');
    const prompt = prompts.coach;
    const text = await generateText(prompt.system,
      prompt.prompt + '\n\nSUPPLIED DATA:\n' + JSON.stringify(body), 700);
    return NextResponse.json({ coachResponse: text, audioUrl: null });
  } catch (error) { return apiError(error); }
}
