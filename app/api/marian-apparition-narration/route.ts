import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apparition } = body;

    // Validate apparition data
    if (!apparition || !apparition.name) {
      return NextResponse.json(
        { error: 'Missing required apparition data' },
        { status: 400 }
      );
    }

    // Call n8n workflow webhook
    const n8nWebhookUrl = 'https://workflowly.online/webhook/marian-apparitions';

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: apparition.name,
        location: apparition.location,
        year: apparition.year,
        visionaries: apparition.visionaries,
        apparitionCount: apparition.apparitionCount,
        keyMessages: apparition.keyMessages,
        miracles: apparition.miracles,
        churchApproval: apparition.churchApproval,
        historicalContext: apparition.historicalContext,
        shrine: apparition.shrine,
        story: apparition.story
      }),
    });

    if (!response.ok) {
      console.error('n8n webhook failed:', response.status, response.statusText);

      // Fallback response
      return NextResponse.json({
        narrationText: `${apparition.name} is one of the Church-approved Marian apparitions. ${apparition.story}`,
        audioUrl: null
      });
    }

    const data = await response.json();

    return NextResponse.json({
      narrationText: data.reflectionText || data.text,
      audioUrl: data.audioUrl || null
    });

  } catch (error) {
    console.error('Error generating narration:', error);

    // Fallback response on error
    return NextResponse.json({
      narrationText: 'This Marian apparition holds a special place in Catholic devotion and the history of the Church.',
      audioUrl: null
    });
  }
}
