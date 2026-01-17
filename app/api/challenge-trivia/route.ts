import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { challenge } = await request.json();

    // Call n8n workflow webhook with challenge data (same pattern as narration workflow)
    const response = await fetch('https://workflowly.online/webhook/scripture-trivia', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: challenge.name,
        testament: challenge.testament,
        role: challenge.role,
        famousFor: challenge.famousFor,
        books: challenge.books,
      }),
    });

    if (!response.ok) {
      throw new Error(`n8n webhook failed: ${response.statusText}`);
    }

    const data = await response.json();
    const trivia = data.trivia || data.output || data.result ||
      `${challenge.name} is mentioned in ${challenge.books.join(', ')}. ${challenge.famousFor}`;

    return NextResponse.json({ trivia });
  } catch (error) {
    console.error('Error calling n8n webhook:', error);
    try {
      const { challenge } = await request.json();
      // Return fallback message on error
      const trivia = `${challenge.name} is mentioned in ${challenge.books.join(', ')}. ${challenge.famousFor}`;
      return NextResponse.json({ trivia });
    } catch {
      return NextResponse.json({ trivia: 'Fun fact coming soon!' });
    }
  }
}


