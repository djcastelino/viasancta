import { NextRequest, NextResponse } from 'next/server';
import { apiError, generateText, object, readInput, required, ServiceError } from '@/app/lib/ai';
import prompts from '@/app/lib/prompts.json';
import apparitions from '@/public/marian-apparitions.json';

export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await readInput(request);
    const data = object(body.apparition);
    const name = required(data, 'name');
    // Use current editorial data even when a visitor has an older page open.
    const apparition = apparitions.find(entry =>
      data.id !== undefined ? entry.id === data.id : entry.name === name);
    if (!apparition) throw new ServiceError('This entry is no longer available. Please refresh the Marian journeys page.', 404);
    const prompt = prompts.marian;
    const text = await generateText(prompt.system,
      prompt.prompt + '\nState the supplied Church status explicitly. Permission for devotion is not recognition of supernatural origin. Describe unrecognized apparitions as reported or alleged; do not present them as established events.\n\nSUPPLIED DATA:\n' + JSON.stringify({ apparition }), 1200);
    return NextResponse.json({ narrationText: text, audioUrl: null });
  } catch (error) { return apiError(error); }
}
