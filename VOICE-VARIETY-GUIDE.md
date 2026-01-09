# Voice Variety Implementation - Via Sancta

## What We're Doing

Like Pathfinder, Via Sancta will randomly select from a pool of 4 voices (2 male, 2 female) for each tour type to add variety and engagement.

## Voice Pools by Tour Type

### Eucharistic Miracles
- **Male:** en-US-Wavenet-D (scholarly), en-US-Wavenet-J (warm)
- **Female:** en-US-Wavenet-F (clear), en-US-Wavenet-H (gentle)

### Marian Apparitions  
- **Male:** en-US-Wavenet-D (reverent)
- **Female:** en-US-Wavenet-F (maternal), en-US-Wavenet-H (gentle), en-US-Wavenet-C (warm)

### Stations of the Cross
- **Male:** en-US-Wavenet-A (deep), en-US-Wavenet-D (solemn)
- **Female:** en-US-Wavenet-H (meditative), en-US-Wavenet-F (contemplative)

### Saint Shrines
- **Male:** en-US-Wavenet-D (inspiring), en-US-Wavenet-J (enthusiastic)
- **Female:** en-US-Wavenet-F (uplifting), en-US-Wavenet-G (energetic)

### Holy Relics
- **Male:** en-GB-Wavenet-B (British scholarly), en-US-Wavenet-D (American scholarly)
- **Female:** en-GB-Wavenet-A (British elegant), en-US-Wavenet-F (professional)

### Biblical Sites
- **Male:** en-US-Wavenet-J (narrative), en-US-Wavenet-D (storytelling)
- **Female:** en-US-Wavenet-F (clear), en-US-Wavenet-H (warm)

## Implementation

### Backend (n8n)
The "Select Voice & Prepare" node now:
1. Defines voice pools for each tour type
2. Randomly selects one voice on each request
3. Returns the selected voice in the response

### Frontend (React)
When user clicks play:
1. Use the suggested `voice` from API response
2. Or pick randomly from `availableVoices` array
3. Call Google TTS with that voice
4. Cache the audio for replay (same voice on replay)

## Benefits

✅ **Variety** - Different experience each time  
✅ **Engagement** - Keeps content fresh  
✅ **Representation** - Mix of male/female voices  
✅ **Tour-appropriate** - Voices match content tone  

## Update Instructions

Replace the code in your "Select Voice & Prepare" node with the content from `updated-select-voice-random.js`

## Testing

Test that voices are random:

```bash
# Call multiple times, should get different voices
curl -X POST https://workflowly.online/webhook/via-sancta-narration \
  -H "Content-Type: application/json" \
  -d '{"tourType":"Eucharistic Miracles","tourId":"test","stopId":"test1","stopData":{"name":"Test","narrative":"Test text"}}'
  
# Check the "voice" field in response - should vary between calls
```

## Cost Impact

**None!** All Wavenet voices are in the same pricing tier (FREE tier: 4M chars/month)

## Why Wavenet vs Neural2?

Wavenet voices work immediately without billing setup, same quality as Neural2 for speech.

