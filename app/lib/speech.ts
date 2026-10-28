import { ServiceError } from './ai';

export function escapeXml(text: string) {
  return text.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]!));
}

export async function synthesize(text: string, voice: string, rate = 1) {
  const key = process.env.AZURE_SPEECH_KEY || process.env.NEXT_PUBLIC_AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION || process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;
  if (!key || !region) throw new ServiceError('Audio is not configured. Set AZURE_SPEECH_KEY and AZURE_SPEECH_REGION on the server.', 503);
  if (!/^[a-z0-9-]+$/.test(region)) throw new ServiceError('The server speech region is invalid.', 503);
  if (!/^[a-z]{2}-[A-Z]{2}-[A-Za-z0-9]+Neural$/.test(voice)) throw new ServiceError('Invalid voice.', 400);
  let response: Response;
  try {
    response = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3' },
      body: `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="${voice}"><prosody rate="${rate}">${escapeXml(text)}</prosody></voice></speak>`,
      signal: AbortSignal.timeout(45000),
    });
  } catch { throw new ServiceError('The speech service could not be reached. Please try again.', 504); }
  if (!response.ok) {
    if (response.status === 429) throw new ServiceError('The speech service is busy. Please try again shortly.', 429);
    if ([401, 403].includes(response.status)) throw new ServiceError('The server speech credential or region needs attention.', 503);
    throw new ServiceError('The speech service could not create audio. Please try again.');
  }
  const audio = await response.arrayBuffer();
  if (!audio.byteLength) throw new ServiceError('The speech service returned empty audio.');
  return audio;
}
