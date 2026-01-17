import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { promise } = await request.json();

    console.log('📖 Generating promise narration for:', promise.reference);

    // Call n8n workflow webhook with promise data
    const response = await fetch('https://workflowly.online/webhook/daily-promise-narration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verse: promise.verse,
        reference: promise.reference,
        testament: promise.testament,
        category: promise.category,
        speaker: promise.speaker,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    const data = await response.json();
    const script = data.script;

    if (!script) {
      throw new Error('No script returned from n8n workflow');
    }

    console.log('✅ Promise narration script generated successfully');
    return NextResponse.json({ script });
  } catch (error) {
    console.error('❌ Error calling n8n webhook:', error);

    // Return fallback audio or error
    // For now, we'll return an error that the frontend can handle
    return NextResponse.json(
      {
        error: 'Failed to generate promise narration',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
