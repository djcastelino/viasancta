import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entry } = body;

    // Validate entry data
    if (!entry || !entry.title || !entry.otReference) {
      return NextResponse.json(
        { error: 'Missing required entry data' },
        { status: 400 }
      );
    }

    // Call n8n workflow webhook (always generates audio)
    const n8nWebhookUrl = 'https://workflowly.online/webhook/jesus-in-ot-reflection';

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: entry.title,
        reference: entry.otReference,
        otText: entry.otText,
        historicalContext: entry.historicalContext,
        howItPointsToJesus: entry.howItPointsToJesus,
        sources: entry.sources || [],
        instruction: 'In your reflection, include ONE authoritative Catholic quote or reference from the provided sources (St. Augustine, St. Thomas Aquinas, or Catechism of the Catholic Church). Use phrasing like "As St. Augustine teaches..." or "The Catechism tells us..." or "St. Thomas Aquinas explains...". Choose the most relevant source that enhances the spiritual reflection.'
      }),
    });

    if (!response.ok) {
      console.error('n8n webhook failed:', response.status, response.statusText);

      // Fallback response
      return NextResponse.json({
        reflectionText: `This passage reveals Jesus Christ in a profound way. ${entry.howItPointsToJesus} As we contemplate this Old Testament text, we see how God was preparing His people for the coming of the Messiah. May this deepen your love for Sacred Scripture and for Jesus, the Word made flesh.`,
        audioUrl: null
      });
    }

    const data = await response.json();

    return NextResponse.json({
      reflectionText: data.reflectionText || data.text,
      audioUrl: data.audioUrl || null
    });

  } catch (error) {
    console.error('Error generating reflection:', error);

    // Fallback response on error
    return NextResponse.json({
      reflectionText: 'We encounter Jesus throughout the Old Testament as the promised Messiah, the fulfillment of prophecy, and the culmination of God\'s plan of salvation. May this Scripture passage draw you closer to Christ.',
      audioUrl: null
    });
  }
}
