# n8n Workflow Setup Instructions - Via Sancta

## Overview

This workflow generates AI-powered audio narrations for Via Sancta virtual pilgrimage tours. It combines:
- **Groq LLM** for intelligent script generation
- **Google Cloud TTS** for high-quality audio synthesis
- **Tour-specific voice selection** based on content type

## Step 1: Import Workflow

1. Open your n8n instance
2. Click "+ Add workflow" → "Import from File"
3. Select `n8n-workflow-universal-narration.json`
4. Click "Import"

## Step 2: Configure Credentials

### A. Groq API Credentials

1. Get API key from: https://console.groq.com/keys
2. In the workflow, click on "Groq Chat Model" node
3. Click "Select Credential" → "Create New"
4. Enter your Groq API key
5. Save

**Free Tier:** 14,400 requests/day

### B. Google Cloud TTS Credentials

**Option 1: Service Account (Recommended)**

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Enable "Cloud Text-to-Speech API"
3. Create a Service Account:
   - IAM & Admin → Service Accounts → Create Service Account
   - Grant role: "Cloud Text-to-Speech Client"
   - Create and download JSON key
4. In n8n, click on "Google Cloud TTS" node
5. Click "Select Credential" → "Create New"
6. Select authentication: "Service Account"
7. Paste the JSON key content
8. Save

**Option 2: OAuth2 (If you prefer)**

1. Set up OAuth2 credentials in Google Cloud Console
2. In n8n, select OAuth2 authentication
3. Follow the OAuth flow

**Free Tier:** 1 million characters/month (WaveNet/Neural2 voices)

## Step 3: Test the Workflow

### Activate Workflow

1. Click the "Inactive" toggle at top right → "Active"
2. Note the webhook URL (e.g., `http://localhost:5678/webhook/via-sancta-narration`)

### Test with Sample Request

**Eucharistic Miracle Example:**

```bash
curl -X POST http://localhost:5678/webhook/via-sancta-narration \
  -H "Content-Type: application/json" \
  -d '{
    "tourType": "Eucharistic Miracles",
    "tourId": "eucharistic-miracles",
    "stopId": "lanciano-750",
    "stopData": {
      "name": "Miracle of Lanciano",
      "location": "Lanciano, Italy",
      "date": "750 AD",
      "narrative": "In the 8th century, a Basilian monk who doubted the Real Presence of Christ in the Eucharist witnessed the host turn into flesh and the wine into blood during Mass.",
      "scientificEvidence": "In 1971, Professor Odoardo Linoli tested the samples. Results: human cardiac tissue, AB blood type, living cells preserved for over 1200 years.",
      "significance": "One of the oldest and most scientifically documented Eucharistic miracles."
    }
  }'
```

**Marian Apparition Example:**

```bash
curl -X POST http://localhost:5678/webhook/via-sancta-narration \
  -H "Content-Type: application/json" \
  -d '{
    "tourType": "Marian Apparitions",
    "tourId": "marian-apparitions",
    "stopId": "lourdes-1858",
    "stopData": {
      "name": "Our Lady of Lourdes",
      "location": "Lourdes, France",
      "date": "1858",
      "visionary": "Bernadette Soubirous",
      "message": "I am the Immaculate Conception",
      "narrative": "Between February 11 and July 16, 1858, the Virgin Mary appeared 18 times to 14-year-old Bernadette Soubirous in a grotto near Lourdes.",
      "significance": "Site of countless documented healing miracles. Over 70 miracles officially recognized by the Catholic Church."
    }
  }'
```

**Stations of the Cross Example:**

```bash
curl -X POST http://localhost:5678/webhook/via-sancta-narration \
  -H "Content-Type: application/json" \
  -d '{
    "tourType": "Stations of the Cross",
    "tourId": "stations-of-cross",
    "stopId": "station-01",
    "stopData": {
      "name": "First Station: Jesus is Condemned to Death",
      "location": "Praetorium, Jerusalem",
      "date": "~30 AD",
      "narrative": "Pontius Pilate, pressured by the crowd, condemns the innocent Jesus to death by crucifixion. Despite finding no guilt in Him, Pilate yields to political expediency.",
      "significance": "Reflection on unjust judgment and standing for truth even when it costs us."
    }
  }'
```

### Expected Response

```json
{
  "success": true,
  "audioUrl": "/audio/eucharistic-miracles/lanciano-750.mp3",
  "script": "In the heart of medieval Italy, in the year 750...(full generated narration)",
  "tourId": "eucharistic-miracles",
  "stopId": "lanciano-750",
  "timestamp": "2025-01-08T12:00:00.000Z"
}
```

## Step 4: Audio File Storage

The workflow generates audio but **does NOT automatically save files** in the current version.

**To save audio files, you have two options:**

### Option A: Manual Save (For Testing)

1. After workflow executes, click on "Format Output" node
2. In the output panel, you'll see the binary audio data
3. Click "Download binary data" → "data" → Save as MP3
4. Manually place in your project: `/public/audio/{tourId}/{stopId}.mp3`

### Option B: Add Write Binary File Node (Recommended for Production)

Add this node between "Format Output" and "Respond to Webhook":

1. Add new node: "Write Binary File"
2. Configure:
   - **File Path:** `={{ '/Users/dcasteli/Documents/pda/viasancta/public/audio/' + $json.tourId + '/' + $json.stopId + '.mp3' }}`
   - **Binary Property:** `data`
3. Connect: Format Output → Write Binary File → Respond to Webhook
4. **Create directories first:**
   ```bash
   mkdir -p /Users/dcasteli/Documents/pda/viasancta/public/audio/eucharistic-miracles
   mkdir -p /Users/dcasteli/Documents/pda/viasancta/public/audio/marian-apparitions
   mkdir -p /Users/dcasteli/Documents/pda/viasancta/public/audio/stations-of-cross
   ```

## Step 5: Voice Selection

The workflow automatically selects voices based on tour type:

| Tour Type | Voice | Character | Purpose |
|-----------|-------|-----------|---------|
| Eucharistic Miracles | en-US-Neural2-J | Warm, scholarly male | Balances reverence with accessibility |
| Marian Apparitions | en-US-Neural2-F | Gentle, maternal female | Reflects Mary's nature |
| Stations of the Cross | en-US-Neural2-H | Meditative female | Prayer/contemplation experience |
| Saint Shrines | en-US-Neural2-D | Inspiring, authoritative male | Biographical storytelling |
| Holy Relics | en-GB-Neural2-B | British, scholarly | Historical gravitas |
| Biblical Sites | en-US-Neural2-J | Warm male | Scripture narrative |

**To change voices:** Edit the `voiceMap` object in the "Select Voice & Prepare" node.

## Troubleshooting

### Error: "Could not connect to Groq"
- Verify API key is correct
- Check you're within free tier (14,400 req/day)
- Test API key at: https://console.groq.com/playground

### Error: "Google TTS authentication failed"
- Verify service account JSON is valid
- Check "Cloud Text-to-Speech API" is enabled
- Verify service account has correct role

### Error: "Quota exceeded"
- **Groq:** Wait for daily reset or upgrade
- **Google TTS:** Wait for monthly reset (1M chars free)

### Audio sounds robotic
- Using Standard voices instead of Neural2
- Change voice in Google TTS node to Neural2 variant
- Adjust speaking rate (0.9 = slower, 1.1 = faster)

### Script is too long/short
- Edit the prompt in "AI Agent - Generate Script" node
- Adjust word count target (currently 300-450 words)
- Add constraints like "Keep under 400 words"

## Cost Tracking

**Current Setup (100% FREE):**
- Groq: FREE (14,400 requests/day)
- Google TTS Neural2: FREE (1M characters/month)
- Storage: Local file system (FREE)

**Capacity:**
- Generate ~400 narrations/month within free tier
- Each narration ~2,500 characters average
- Perfect for launching with 30-40 miracles per tour

## Workflow Execution Example

```
User Request
    ↓
[Webhook] Receives JSON
    ↓
[Extract Stop Data] Parses input
    ↓
[AI Agent] Generates narration script (via Groq)
    ↓
[Select Voice] Chooses appropriate voice
    ↓
[Google TTS] Converts script to audio
    ↓
[Format Output] Prepares response
    ↓
[Respond] Returns audio URL + script
```

## Next Steps

1. ✅ Import and configure workflow
2. ✅ Test with sample requests
3. ⏭️ Prepare complete Eucharistic miracles dataset
4. ⏭️ Batch generate all audio files
5. ⏭️ Integrate webhook URL into frontend app

## Integration with Frontend

In your React app, call the workflow:

```typescript
// services/narration.ts
export async function generateNarration(tourType: string, stopData: any) {
  const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tourType,
      tourId: tourType.toLowerCase().replace(/\s+/g, '-'),
      stopId: stopData.id,
      stopData: stopData
    })
  });
  
  return response.json();
}
```

---

**Ready to generate your first sacred narration!** 🎙️✨
