# Google TTS Node Issue - Fixed!

## Problem
The Google Cloud Text-to-Speech node showed as "?" in n8n and had no connection.

## Solution
Use HTTP Request node to call Google TTS API directly instead of the specialized node.

---

## New Workflow File
**File:** `n8n-workflow-http-method.json`

This version uses the **HTTP Request** node which is always available in n8n.

---

## Setup Instructions

### 1. Import the New Workflow
1. Delete the old workflow with the "?" node
2. Import `n8n-workflow-http-method.json`
3. This should work without missing nodes!

### 2. Set Up Google Cloud Credentials

#### Option A: Using Google OAuth2 (Easier)
1. In n8n, go to **Credentials** → **Add Credential**
2. Search for "Google"
3. Select **"Google OAuth2 API"** or **"Google API"**
4. Click "Connect my account"
5. Follow OAuth flow to authorize
6. Save credential

#### Option B: Using Service Account (More Control)
1. Go to: https://console.cloud.google.com/
2. Enable **"Cloud Text-to-Speech API"**
3. Create Service Account:
   - IAM & Admin → Service Accounts → Create
   - Grant role: "Cloud Text-to-Speech Client"
   - Create JSON key
4. In n8n:
   - Add credential: "Google Service Account"
   - Paste JSON key content

### 3. Configure the HTTP Request Node

In the workflow, find the **"Google TTS via HTTP"** node:

1. Click on it
2. Under **Authentication**, select your Google credential
3. That's it!

---

## How It Works

The HTTP Request node calls Google's REST API directly:

```
POST https://texttospeech.googleapis.com/v1/text:synthesize

Body:
{
  "input": { "text": "Your narration script" },
  "voice": {
    "languageCode": "en-US",
    "name": "en-US-Neural2-J"
  },
  "audioConfig": {
    "audioEncoding": "MP3",
    "speakingRate": 0.95
  }
}

Response:
{
  "audioContent": "base64_encoded_mp3_data"
}
```

The workflow then:
1. Decodes the base64 audio
2. Writes it as MP3 file
3. Returns the file path

---

## Test the Workflow

### 1. Activate Workflow
Click the "Active" toggle in n8n

### 2. Test with curl

```bash
curl -X POST http://localhost:5678/webhook/via-sancta-narration \
  -H "Content-Type: application/json" \
  -d '{
    "tourType": "Eucharistic Miracles",
    "tourId": "eucharistic-miracles",
    "stopId": "test-miracle",
    "stopData": {
      "name": "Test Miracle",
      "location": "Test Location",
      "date": "2024",
      "narrative": "This is a test narration to verify the workflow works correctly.",
      "significance": "Testing the Google TTS integration via HTTP request."
    }
  }'
```

### 3. Check Output
- Should return JSON with `success: true`
- Audio file should be at: `public/audio/eucharistic-miracles/test-miracle.mp3`
- Play it to verify quality!

---

## Troubleshooting

### Error: "Authentication failed"
- Make sure you've added Google credentials in n8n
- Verify "Cloud Text-to-Speech API" is enabled in Google Cloud Console
- Check the HTTP Request node has the credential selected

### Error: "Quota exceeded"
- You've hit the free tier limit (1M chars/month)
- Wait for monthly reset or upgrade Google Cloud plan

### Error: "Could not write file"
- Check directory exists: `public/audio/eucharistic-miracles/`
- Verify n8n has write permissions to that path
- Update file path in "Prepare Audio Binary" node if needed

### No audio in response
- Check the "Prepare Audio Binary" node
- The `audioContent` field should have base64 data
- Verify base64 is being decoded correctly

---

## Advantages of HTTP Method

✅ **Always works** - HTTP Request node is core n8n  
✅ **More control** - Direct API access  
✅ **Same functionality** - Identical output  
✅ **Free tier** - 1M characters/month  
✅ **Easy to debug** - See exact API calls  

---

## Next Steps

1. ✅ Import new workflow
2. ✅ Add Google credentials
3. ✅ Test with sample miracle
4. ✅ Once working, proceed with data curation

---

**This should work! Let me know if you hit any issues.** 🚀

