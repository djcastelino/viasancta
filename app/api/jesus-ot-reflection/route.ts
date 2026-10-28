import { NextRequest, NextResponse } from 'next/server';
import { apiError, generateText, object, readInput, required } from '@/app/lib/ai';
import prompts from '@/app/lib/prompts.json';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const data = object(body.entry);
    required(data, 'title');
    required(data, 'otReference');
    const prompt = prompts.reflection;
    const text = await generateText(prompt.system,
      prompt.prompt + '\n\nSUPPLIED DATA:\n' + JSON.stringify(body), 1200);
    return NextResponse.json({ reflectionText: text, audioUrl: null });
  } catch (error) { return apiError(error); }
}
