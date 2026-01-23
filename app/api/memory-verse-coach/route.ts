import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Call n8n webhook for memory verse coaching
    const response = await fetch('https://workflowly.online/webhook/memory-verse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      coachResponse: data.reflectionText,
      audioUrl: data.audioUrl || null,
    });
  } catch (error) {
    console.error('Error calling memory verse coach:', error);
    return NextResponse.json(
      { error: 'Failed to get coaching response' },
      { status: 500 }
    );
  }
}
