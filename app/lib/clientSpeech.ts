export async function createSpeechBlob(text: string, voice: string, rate = 1): Promise<Blob> {
  const response = await fetch('/api/generate-audio', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice, rate }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Audio request failed (${response.status}).`);
  }
  return response.blob();
}
