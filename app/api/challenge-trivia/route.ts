import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const { challenge } = await request.json();

    // Check if Groq API key is available
    if (!process.env.GROQ_API_KEY) {
      // Return a simple fallback message
      const trivia = `${challenge.name} is mentioned in ${challenge.books.join(', ')}. ${challenge.famousFor}`;
      return NextResponse.json({ trivia });
    }

    // Use Groq API with Llama 3.3 (FREE and FAST!)
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    });

    const prompt = `You are a biblical scholar sharing interesting trivia. Generate a fascinating, concise 2-sentence fun fact about "${challenge.name}" from the Bible.

Requirements:
- Exactly 2 sentences
- Engaging and memorable
- Appropriate for all ages
- Focus on interesting details not already mentioned in: "${challenge.famousFor}"
- Make it conversational and easy to understand

Example format: "Did you know that [interesting fact]? [Additional fascinating detail]."

Generate the trivia now:`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile', // Fast and smart!
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    const trivia = completion.choices[0]?.message?.content ||
      `${challenge.name} is mentioned in ${challenge.books.join(', ')}. ${challenge.famousFor}`;

    return NextResponse.json({ trivia });
  } catch (error) {
    console.error('Error generating trivia:', error);
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

