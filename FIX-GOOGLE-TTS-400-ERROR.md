# Fix Google TTS 400 Error - Step by Step

## Problem
Google TTS keeps returning "400 Bad Request" - the JSON format isn't correct.

## Solution: Use Code Node to Build Request Body

### Step 1: Add a New Code Node

1. In your workflow, **BEFORE** the "Google TTS via HTTP" node
2. Add a new **Code** node
3. Name it: "Build TTS Request Body"

### Step 2: Add This Code

```javascript
// Build the exact Google TTS API request body
const script = $json.script;
const voice = $json.voice;
const languageCode = $json.languageCode;

// Build the request body exactly as Google expects
const requestBody = {
  input: {
    text: script
  },
  voice: {
    languageCode: languageCode,
    name: voice
  },
  audioConfig: {
    audioEncoding: "MP3",
    speakingRate: 0.95
  }
};

return {
  json: {
    requestBody: requestBody,
    tourId: $json.tourId,
    stopId: $json.stopId,
    script: script
  }
};
```

### Step 3: Update HTTP Request Node

1. Open "Google TTS via HTTP" node
2. Change **Body** settings:
   - **Specify Body**: "Using JSON"
   - **JSON**: `={{ $json.requestBody }}`
3. That's it!

### Step 4: Reconnect Nodes

Make sure the flow is:
```
Select Voice & Prepare 
  → Build TTS Request Body (NEW)
  → Google TTS via HTTP
  → Prepare Audio Binary
```

### Step 5: Test with Hardcoded Values First

To test if the Google TTS API itself works, temporarily replace the "Build TTS Request Body" code with this hardcoded test:

```javascript
// TEMPORARY TEST - hardcoded values
const requestBody = {
  input: {
    text: "This is a test of the Google Text to Speech API. If you can hear this, the integration is working correctly."
  },
  voice: {
    languageCode: "en-US",
    name: "en-US-Neural2-J"
  },
  audioConfig: {
    audioEncoding: "MP3",
    speakingRate: 0.95
  }
};

return {
  json: {
    requestBody: requestBody,
    tourId: "test",
    stopId: "test",
    script: "test"
  }
};
```

Run the workflow. If this works, then switch back to the dynamic version.

---

## Alternative: Check Your HTTP Node Settings

If the above doesn't work, check these settings in the HTTP node:

**URL**: `https://texttospeech.googleapis.com/v1/text:synthesize`

**Method**: `POST`

**Authentication**: Google OAuth2 API (your credential)

**Headers**:
- Content-Type: `application/json`

**Body**: 
- Specify Body: "Using JSON"
- JSON: `={{ $json.requestBody }}`

---

## If Still Not Working

Share with me:
1. The exact output of "Select Voice & Prepare" node (what does $json contain?)
2. What does "Build TTS Request Body" output show?
3. Screenshot of your HTTP node configuration if possible

This will help me debug exactly what's going wrong!

