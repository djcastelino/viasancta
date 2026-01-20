# Jesus in OT Reflection - n8n Workflow Setup

## Overview

This workflow generates thoughtful Catholic theological reflections on "Jesus in the Old Testament" passages, with optional text-to-speech audio narration.

## Workflow Details

**Webhook URL**: `https://workflowly.online/webhook/jesus-in-ot-reflection`

**Method**: POST

**Model**: Llama 3.3 70B Versatile (Groq)

**Voice**: Rotates through 4 Azure Neural Voices based on entry title hash

## System Message

```
You are a warm, reverent Catholic theologian and spiritual guide. Your role is to help the faithful encounter Jesus Christ in the Old Testament through thoughtful, accessible reflections that connect ancient Scripture to modern Catholic life. You speak with the wisdom of the Church Fathers, the clarity of the Catechism, and the heart of a pastor who loves souls. Your reflections illuminate how the Old Testament prepares for and reveals Christ, helping believers see the unity of God's plan of salvation across both Testaments.
```

## User Prompt Template

```
Create a thoughtful 2-3 minute reflection on how this Old Testament passage points to Jesus Christ.

PASSAGE TITLE: {{ $json.title }}
REFERENCE: {{ $json.reference }}
SCRIPTURE TEXT: {{ $json.otText }}
HISTORICAL CONTEXT: {{ $json.historicalContext }}
HOW IT POINTS TO JESUS: {{ $json.howItPointsToJesus }}

Guidelines:
1. Begin with wonder at God's providence in revealing Christ throughout Scripture
2. Explain the typology or prophecy in accessible, beautiful language
3. Connect to the Mass, sacraments, or Catholic devotional life where relevant
4. Show how this deepens our understanding of who Jesus is and what He accomplished
5. End with a practical invitation to encounter Jesus today through this truth
6. Aim for 250-350 words (2-3 minutes when spoken aloud)
7. Use "you" and "we" to make it personal and engaging
8. Reverent but warm tone - like a beloved priest giving a homily
9. Avoid academic jargon; write for everyday Catholics
10. Let the beauty and depth of Catholic theology shine through

Generate the reflection now:
```

## Groq Settings

- **Model**: `llama-3.3-70b-versatile`
- **Temperature**: 0.7 (creative but coherent)
- **Max Tokens**: 500 (allows for 250-350 word reflections)

## Voice Selection Logic

Rotates through 4 Azure Neural voices using a hash of the entry title:

```javascript
const hashCode = entryTitle.split('').reduce((acc, char) => {
  return ((acc << 5) - acc) + char.charCodeAt(0);
}, 0);

const voices = [
  'en-US-AndrewMultilingualNeural',  // Male, warm
  'en-US-AvaMultilingualNeural',     // Female, clear
  'en-US-EricNeural',                // Male, authoritative
  'en-US-JennyMultilingualNeural'    // Female, friendly
];

const voiceIndex = Math.abs(hashCode) % voices.length;
```

This ensures:
- Variety across different entries
- Consistency for the same entry
- Natural distribution across voices

## Azure TTS Settings

- **Voice**: Dynamically selected (see above)
- **Speaking Rate**: 0.95 (5% slower for meditation)
- **Format**: `audio-16khz-32kbitrate-mono-mp3`
- **Output**: Base64-encoded MP3 or data URL

## Request Format

```json
{
  "title": "The First Promise of a Savior",
  "reference": "Genesis 3:15",
  "otText": "I will put enmity between you and the woman...",
  "historicalContext": "Immediately after Adam and Eve's sin...",
  "howItPointsToJesus": "This is called the 'Protoevangelium'...",
  "includeAudio": true
}
```

**Parameters**:
- `title` (required): Title of the OT passage
- `reference` (required): Bible reference (e.g., "Genesis 3:15")
- `otText` (required): The Old Testament verse text
- `historicalContext` (required): Historical background
- `howItPointsToJesus` (required): Explanation of Christological connection
- `includeAudio` (optional, default: false): Whether to generate TTS audio

## Response Format

### Text Only (includeAudio: false)
```json
{
  "reflectionText": "How marvelous is God's providence..."
}
```

### Text + Audio (includeAudio: true)
```json
{
  "reflectionText": "How marvelous is God's providence...",
  "audioUrl": "data:audio/mpeg;base64,..."
}
```

## Workflow Nodes

1. **Webhook** - Receives POST request
2. **Extract Entry Data** - Parses request body
3. **Groq - Generate Reflection** - Creates theological reflection
4. **Extract Reflection Text** - Gets text from Groq response
5. **Check if Audio Requested** - Branches based on `includeAudio`
6. **Select Voice** - Rotates through 4 voices (if audio requested)
7. **Azure Text-to-Speech** - Converts text to audio (if audio requested)
8. **Format Audio Response** - Creates base64 data URL (if audio requested)
9. **Combine Text + Audio** - Merges both outputs (if audio requested)
10. **Text Only Response** - Returns just text (if no audio requested)
11. **Respond to Webhook** - Returns final JSON

## Fallback Behavior

If the workflow fails, the API route provides a simple fallback:

```typescript
{
  reflectionText: `This passage reveals Jesus Christ in a profound way. ${entry.howItPointsToJesus} As we contemplate this Old Testament text, we see how God was preparing His people for the coming of the Messiah. May this deepen your love for Sacred Scripture and for Jesus, the Word made flesh.`,
  audioUrl: null
}
```

## Testing

### Test with cURL

```bash
curl -X POST https://workflowly.online/webhook/jesus-in-ot-reflection \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The First Promise of a Savior",
    "reference": "Genesis 3:15",
    "otText": "I will put enmity between you and the woman, and between your offspring and hers; They will strike at your head, while you strike at their heel.",
    "historicalContext": "Immediately after Adam and Eve'\''s sin, God spoke these words to the serpent.",
    "howItPointsToJesus": "This is called the '\''Protoevangelium'\'' - the first gospel. God promises that a descendant of '\''the woman'\'' (Mary) will crush Satan'\''s head.",
    "includeAudio": false
  }'
```

### Expected Output (Text Only)

```json
{
  "reflectionText": "How marvelous is God's providence that even in the moment of humanity's greatest tragedy—the Fall—He already spoke His first word of hope. This promise in Genesis 3:15, known as the Protoevangelium or 'first gospel,' is the seed from which the entire plan of redemption would grow...[continues for 250-350 words]"
}
```

## Frontend Integration

The Jesus in OT page (`/app/jesus-in-ot/page.tsx`) calls this workflow via the API route:

```typescript
const response = await fetch('/api/jesus-ot-reflection', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    entry: todaysEntry,
    includeAudio: true // or false
  })
});

const data = await response.json();
// Returns: { reflectionText, audioUrl }
```

## Example Reflections

### Genesis 3:15 (The First Promise)
"How marvelous is God's providence that even in the moment of humanity's greatest tragedy—the Fall—He already spoke His first word of hope. This promise, the Protoevangelium or 'first gospel,' reveals that God would not abandon us to sin and death. Notice the woman mentioned here: not just Eve, but prefiguring Mary, the New Eve. Where Eve's disobedience brought death, Mary's 'yes' to God would bring life. The offspring who crushes the serpent's head is Jesus Christ, who conquered Satan at the cross. Though the serpent struck His heel—He suffered and died—Jesus delivered the fatal blow to evil itself. At every Mass, we witness this victory made present again. The same Jesus who crushed Satan's power is truly present in the Eucharist, offering you His victory over sin and death. Today, as you face temptation or struggle, remember: the battle is already won. Christ has conquered, and in Him, you too can triumph."

### Isaiah 53:5 (The Suffering Servant)
"The prophet Isaiah gives us one of the most vivid portraits of Jesus in the entire Old Testament. Written 700 years before Christ, these words describe with stunning accuracy what would happen on Calvary. 'By His wounds we are healed'—think about that paradox. We, the sick, are healed by the one we wounded. Jesus, though sinless, took our place, bearing punishment we deserved. This is the heart of the Gospel: divine mercy meeting human sin at the cross. Every time you receive the Sacrament of Reconciliation, you're touching these healing wounds of Christ. Every Mass re-presents this one sacrifice that heals all wounds, forgives all sins. The Suffering Servant didn't just endure pain—He transformed it into redemption. When you suffer, you can unite it to His sacrifice, making it meaningful, even redemptive. Today, bring your wounds to the Wounded Healer. Let His stripes heal yours. The cross that seemed like defeat was actually God's greatest victory, and through it, eternal life is yours."

## Credentials Required

1. **Groq API** - For Llama 3.3 70B access
2. **Azure Speech Services** - For text-to-speech conversion

## Notes

- Reflections are dynamically generated, never cached
- Same entry may produce slightly different reflections each time (temperature: 0.7)
- Voice selection is deterministic based on title hash
- Audio generation adds ~6-8 seconds to response time
- Speaking rate of 0.95 provides a contemplative pace
- Background music is handled by frontend, not workflow
