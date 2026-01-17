# Microsoft Azure Text-to-Speech Setup

## ✅ Implementation Complete!

The app has been successfully migrated from Google TTS to **Microsoft Azure Speech Services** with the **Andrew (Natural)** voice.

---

## 🎙️ Voice Details

- **Voice Name**: `en-US-AndrewMultilingualNeural`
- **Voice Type**: Natural, Neural TTS
- **Language**: English (US)
- **Character**: Male, professional, warm tone
- **Quality**: High-quality neural voice

---

## 🔧 What Was Changed

### 1. **Installed Azure Speech SDK**
```bash
npm install microsoft-cognitiveservices-speech-sdk
```

### 2. **Updated Environment Variables**
Created `.env.local` with:
```env
NEXT_PUBLIC_AZURE_SPEECH_KEY=your-azure-speech-key-here
NEXT_PUBLIC_AZURE_SPEECH_REGION=eastus
```

### 3. **Updated Miracle Page** (`app/miracles/[id]/page.tsx`)
- Imported Azure Speech SDK
- Replaced Google TTS API calls with Azure Speech SDK
- Configured Andrew (Natural) voice
- Set speaking rate to 0.95 (slightly slower for clarity)
- Removed old base64ToBlob function (no longer needed)

### 4. **Audio Configuration**
- **Format**: MP3 (16kHz, 32kbps, Mono)
- **Speaking Rate**: 0.95 (5% slower than normal)
- **SSML Support**: Yes, for advanced voice control

---

## 🚀 Deployment to Vercel

To deploy with Azure TTS, add these environment variables in Vercel:

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add these variables:
   - **Key**: `NEXT_PUBLIC_AZURE_SPEECH_KEY`
   - **Value**: `[Your Azure Speech API Key from Azure Portal]`
   - **Environment**: Production, Preview, Development

   - **Key**: `NEXT_PUBLIC_AZURE_SPEECH_REGION`
   - **Value**: `eastus`
   - **Environment**: Production, Preview, Development

3. **Redeploy** your application

---

## 🧪 Testing Locally

1. Make sure `.env.local` exists with the Azure credentials
2. Start the dev server:
   ```bash
   npm run dev
   ```
3. Visit a miracle page (e.g., `http://localhost:3000/miracles/lanciano-750`)
4. Click **"▶️ Play Narration"**
5. You should hear the Andrew (Natural) voice!

---

## 📊 Azure TTS Advantages

### vs Google TTS:
✅ **Better voice quality** - More natural, expressive neural voices
✅ **More voice options** - 400+ voices across 140 languages
✅ **SSML support** - Advanced control over pronunciation, pauses, emotions
✅ **Custom voices** - Can create custom branded voices
✅ **Better pricing** - First 500K characters free per month

### Andrew Voice Benefits:
✅ **Professional tone** - Perfect for educational/religious content
✅ **Clear pronunciation** - Great for complex religious terms
✅ **Natural cadence** - Sounds more human and engaging
✅ **Multilingual** - Can handle Latin phrases and foreign terms

---

## 🎚️ Advanced Voice Customization

The implementation uses SSML (Speech Synthesis Markup Language) which allows you to:

### Adjust Speaking Rate:
```xml
<prosody rate="0.95">Text here</prosody>
<!-- 0.5 = 50% slower, 1.0 = normal, 2.0 = 200% faster -->
```

### Add Pauses:
```xml
<break time="500ms"/>
<!-- Pause for 500 milliseconds -->
```

### Emphasize Words:
```xml
<emphasis level="strong">important word</emphasis>
```

### Change Pitch:
```xml
<prosody pitch="+10%">Higher pitch text</prosody>
```

### Example (in code at line 108-116):
```typescript
const ssml = `
  <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="en-US-AndrewMultilingualNeural">
      <prosody rate="0.95">
        ${cleanNarration}
      </prosody>
    </voice>
  </speak>
`;
```

---

## 🔄 Trying Different Voices

To change the voice, edit line 102 in `app/miracles/[id]/page.tsx`:

```typescript
// Current: Andrew (Male, Natural)
speechConfig.speechSynthesisVoiceName = 'en-US-AndrewMultilingualNeural';

// Other recommended voices:
// speechConfig.speechSynthesisVoiceName = 'en-US-AriaNeural'; // Female, friendly
// speechConfig.speechSynthesisVoiceName = 'en-US-DavisNeural'; // Male, professional
// speechConfig.speechSynthesisVoiceName = 'en-US-JennyNeural'; // Female, warm
// speechConfig.speechSynthesisVoiceName = 'en-US-GuyNeural'; // Male, news anchor
```

[Full voice list](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts)

---

## 📈 Pricing & Limits

**Azure Speech Services (Pay-as-you-go):**
- **Free Tier**: 500,000 characters/month (5 million characters/year)
- **Standard**: $15 per 1 million characters after free tier
- **Neural voices**: Included in pricing

**Estimate for your app:**
- Average narration: ~1,000 characters
- 136 miracles × 1,000 chars = 136,000 characters total
- **Well within free tier!** ✓

---

## 🔒 Security Note

**Important**: Never commit `.env.local` to git!
- It's already in `.gitignore`
- Store credentials in Vercel environment variables for production
- Keep API keys secure and rotate them periodically

---

## 🐛 Troubleshooting

### "Azure Speech API credentials not configured"
- Check that `.env.local` exists
- Verify the environment variables are spelled correctly
- Restart the dev server after creating `.env.local`

### "Speech synthesis failed"
- Verify your Azure subscription key is active
- Check that the region is correct (`eastus`)
- Ensure you haven't exceeded your quota

### No audio plays
- Check browser console for errors
- Verify the miracle narration was generated successfully
- Test your audio output settings

---

## ✅ Testing Checklist

- [x] Azure Speech SDK installed
- [x] Environment variables configured
- [x] Code updated to use Azure TTS
- [x] Andrew (Natural) voice selected
- [x] Build succeeds without errors
- [x] Ready for local testing
- [ ] Test audio playback on local server
- [ ] Deploy to Vercel with environment variables
- [ ] Test on production

---

## 📞 Support

If you encounter issues:
1. Check the [Azure Speech Services documentation](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/)
2. Verify your API key in [Azure Portal](https://portal.azure.com)
3. Test the API key using Azure's [Speech Studio](https://speech.microsoft.com/portal)

---

**Status**: ✅ **COMPLETE - Ready to test!**

Start your dev server and try clicking "Play Narration" on any miracle page!
