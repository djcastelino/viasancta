# 🚀 Setting Up Groq for Free AI Trivia

Groq provides **FREE** access to powerful LLMs like Llama 3.3 and GPTOSS. The trivia feature will work without it (using fallback text), but with Groq you get much better trivia!

## Why Groq?

- ✅ **Completely FREE** - No credit card required
- ⚡ **Super FAST** - 10x faster than other APIs
- 🧠 **Smart** - Llama 3.3 70B model is excellent
- 🎯 **High rate limits** - Generous free tier

## Setup Steps

### 1. Get Your Free Groq API Key

1. Go to https://console.groq.com
2. Sign up for a free account (no credit card needed)
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy your key

### 2. Add to Your Project

Add to `.env.local` file:

```bash
GROQ_API_KEY=gsk_your_key_here
```

### 3. Restart Your Dev Server

```bash
npm run dev
```

That's it! The trivia feature will now use Groq.

## Available Models

The app currently uses `llama-3.3-70b-versatile` (recommended), but you can change to:

- `llama-3.3-70b-versatile` - Best overall (default)
- `llama-3.1-70b-versatile` - Slightly faster
- `mixtral-8x7b-32768` - Good for longer context

Edit `/app/api/challenge-trivia/route.ts` line 31 to change model.

## How It Works

1. User completes a challenge
2. Clicks "📚 Learn More" button
3. API calls Groq with the biblical character/event
4. Llama 3.3 generates fascinating 2-sentence trivia
5. User can listen to it with text-to-speech

## Example Output

**Without Groq:**
> "Moses is mentioned in Exodus, Numbers, Deuteronomy. Led the Exodus from Egypt and received the Ten Commandments"

**With Groq (Llama 3.3):**
> "Did you know that Moses lived to be 120 years old yet his eyes never grew dim and his strength never waned? He was the only person in the Bible to speak with God face to face, and his face shone so brightly after these encounters that he had to wear a veil!"

Much better! 🎉

## Troubleshooting

**Trivia shows fallback text:**
- Check that `GROQ_API_KEY` is in `.env.local`
- Restart your dev server (`npm run dev`)
- Check browser console for errors

**Rate limit errors:**
- Groq free tier is very generous
- If you hit limits, wait a minute or upgrade (still free for personal use)

## Cost

**$0.00** - Completely free! 🎉

No credit card needed. Groq wants developers to use their platform and offers generous free tiers.
