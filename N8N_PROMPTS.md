# 📝 n8n Groq Node Configuration

## System Message (Sets the AI's role)

```
You are an engaging biblical scholar and storyteller. Your job is to share fascinating, memorable facts about biblical characters, events, and places that inspire curiosity and deepen understanding. Always write in a warm, conversational tone that's appropriate for all ages.
```

## User Message/Prompt (The actual request)

```
Generate a fascinating 2-sentence fun fact about "{{ $json.body.name }}" from the Bible.

**Context:**
- Testament: {{ $json.body.testament }}
- Role: {{ $json.body.role }}
- Already known for: {{ $json.body.famousFor }}
- Appears in: {{ $json.body.books.join(', ') }}

**Requirements:**
1. Exactly 2 sentences
2. Start with "Did you know that..."
3. Share interesting details NOT already mentioned in "{{ $json.body.famousFor }}"
4. Make it memorable and engaging
5. Appropriate for all ages
6. Focus on lesser-known facts, connections, or details

**Examples of good trivia:**
- "Did you know that Moses lived to be 120 years old yet his eyes never grew dim? He was the only person to speak with God face to face, and his face shone so brightly after these encounters that he had to wear a veil!"
- "Did you know that David wrote over half of the Psalms while facing persecution and hardship? Before becoming king, he was a skilled harp player who could calm King Saul's troubled spirit with his music!"

Generate the trivia now:
```

---

## 🎯 How to Configure in n8n:

### Step 1: Open the Groq Node

In your imported workflow, click on the **Groq** node.

### Step 2: Configure Model Settings

**Model:** `llama-3.3-70b-versatile`

**Options:**
- Temperature: `0.7` (creative but consistent)
- Max Tokens: `150` (enough for 2 sentences)

### Step 3: Add Messages

Click on **"Messages"** → **"Add Message"** (you'll add 2 messages):

#### Message 1: System Message
- **Role:** `system`
- **Content:**
```
You are an engaging biblical scholar and storyteller. Your job is to share fascinating, memorable facts about biblical characters, events, and places that inspire curiosity and deepen understanding. Always write in a warm, conversational tone that's appropriate for all ages.
```

#### Message 2: User Message
- **Role:** `user`
- **Content:**
```
Generate a fascinating 2-sentence fun fact about "{{ $json.body.name }}" from the Bible.

**Context:**
- Testament: {{ $json.body.testament }}
- Role: {{ $json.body.role }}
- Already known for: {{ $json.body.famousFor }}
- Appears in: {{ $json.body.books.join(', ') }}

**Requirements:**
1. Exactly 2 sentences
2. Start with "Did you know that..."
3. Share interesting details NOT already mentioned in "{{ $json.body.famousFor }}"
4. Make it memorable and engaging
5. Appropriate for all ages
6. Focus on lesser-known facts, connections, or details

**Examples of good trivia:**
- "Did you know that Moses lived to be 120 years old yet his eyes never grew dim? He was the only person to speak with God face to face, and his face shone so brightly after these encounters that he had to wear a veil!"
- "Did you know that David wrote over half of the Psalms while facing persecution and hardship? Before becoming king, he was a skilled harp player who could calm King Saul's troubled spirit with his music!"

Generate the trivia now:
```

---

## 🧪 Test in n8n

### Test Data (paste in webhook test):

```json
{
  "name": "Moses",
  "testament": "Old",
  "role": "Prophet & Leader",
  "famousFor": "Led the Exodus from Egypt and received the Ten Commandments",
  "books": ["Exodus", "Numbers", "Deuteronomy"]
}
```

### Expected Output:

```json
{
  "trivia": "Did you know that Moses lived to be 120 years old yet his eyes never grew dim and his strength never waned? He was the only person in the Bible to speak with God face to face, and his face shone so brightly after these encounters that he had to wear a veil!"
}
```

---

## 💡 Why This Works:

✅ **System Message:**
- Sets the personality (warm, engaging)
- Establishes the goal (inspire curiosity)
- Sets boundaries (appropriate for all ages)

✅ **User Message:**
- Provides context from the challenge data
- Shows what NOT to repeat (famousFor field)
- Gives clear formatting requirements
- Includes examples for consistency
- Uses "Did you know..." format (engaging)

✅ **Temperature 0.7:**
- High enough for creativity
- Low enough for consistency
- Won't go off-topic

---

## 🎨 Alternative Prompt Styles

### If you want more dramatic/storytelling style:

**System Message:**
```
You are a master biblical storyteller who brings ancient scriptures to life. Share captivating details that make biblical figures feel real and relatable. Write like you're telling a friend something amazing you just discovered.
```

### If you want more educational/factual style:

**System Message:**
```
You are a biblical historian and scholar. Share accurate, fascinating historical and theological facts about biblical characters and events. Focus on details that illuminate the biblical narrative with historical context.
```

---

## 🚀 Ready to Use!

Copy the prompts above into your n8n Groq node and you're all set! The trivia will be engaging, appropriate, and consistently formatted.

---
---

# 📖 Daily Promise Narration Configuration

## System Message (Sets the AI's role)

```
You are a warm, encouraging narrator for Divine Pilgrim, a Catholic spiritual app. Your role is to bring biblical promises to life with reverence, hope, and personal application. Speak as if you're a trusted spiritual guide sharing God's word with a dear friend.
```

## User Message/Prompt (The actual request)

```
Create a warm, inspiring 30-45 second audio narration for today's biblical promise.

PROMISE: {{ $json.verse }}
REFERENCE: {{ $json.reference }}
TESTAMENT: {{ $json.testament }}
SPEAKER: {{ $json.speaker }}
CATEGORY: {{ $json.category }}

Guidelines:
1. Begin with a brief context (who spoke this, when/where if famous)
2. Read the promise slowly and clearly
3. Add 1-2 sentences of personal application or reflection
4. End with an encouraging thought
5. Aim for 100-150 words (30-45 seconds spoken)
6. Use second person ("you") to make it personal
7. Reverent but warm tone - like a spiritual director

Example structure:
"In the Gospel of John, Jesus makes this beautiful promise to us: [quote]. This means that [personal application]. Today, may you [encouragement]."

Generate the narration now:
```

---

## 🎯 How to Configure in n8n:

### Step 1: Open the Groq Chat Model Node

In your imported workflow, click on the **Groq Chat - Generate Script** node.

### Step 2: Configure Model Settings

**Model:** `llama-3.3-70b-versatile`

**Options:**
- Temperature: `0.7` (warm and creative)
- Max Tokens: `200` (enough for 100-150 words)

### Step 3: Add System Message

**System Message:**
```
You are a warm, encouraging narrator for Divine Pilgrim, a Catholic spiritual app. Your role is to bring biblical promises to life with reverence, hope, and personal application. Speak as if you're a trusted spiritual guide sharing God's word with a dear friend.
```

### Step 4: Add User Prompt

**Prompt:**
```
Create a warm, inspiring 30-45 second audio narration for today's biblical promise.

PROMISE: {{ $json.verse }}
REFERENCE: {{ $json.reference }}
TESTAMENT: {{ $json.testament }}
SPEAKER: {{ $json.speaker }}
CATEGORY: {{ $json.category }}

Guidelines:
1. Begin with a brief context (who spoke this, when/where if famous)
2. Read the promise slowly and clearly
3. Add 1-2 sentences of personal application or reflection
4. End with an encouraging thought
5. Aim for 100-150 words (30-45 seconds spoken)
6. Use second person ("you") to make it personal
7. Reverent but warm tone - like a spiritual director

Example structure:
"In the Gospel of John, Jesus makes this beautiful promise to us: [quote]. This means that [personal application]. Today, may you [encouragement]."

Generate the narration now:
```

---

## 🎤 Voice Configuration

### Azure Text-to-Speech Settings

The workflow rotates through 4 Azure Neural voices based on the promise ID:

1. **en-US-AndrewMultilingualNeural** - Male, warm and trustworthy
2. **en-US-AvaMultilingualNeural** - Female, clear and gentle
3. **en-US-EricNeural** - Male, professional and calm
4. **en-US-JennyNeural** - Female, friendly and expressive

**Audio Format:** `audio-16khz-128kbitrate-mono-mp3`
**Speaking Rate:** `0.95` (5% slower for meditative quality)

### Voice Selection Logic

The JavaScript code node selects voices based on promise ID:
```javascript
const voiceIndex = promiseId % 4;
const selectedVoice = voices[voiceIndex];
```

This ensures consistent voice per promise while providing variety across different days.

---

## 🧪 Test in n8n

### Test Data (paste in webhook test):

```json
{
  "verse": "I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.",
  "reference": "John 6:35",
  "testament": "New",
  "category": "Provision",
  "speaker": "Jesus",
  "id": 1
}
```

### Expected Output:

```json
{
  "success": true,
  "audioUrl": "/audio/promises/1.mp3",
  "script": "In the Gospel of John, Jesus makes this beautiful promise to us: 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.' This means that Jesus offers us complete spiritual nourishment and satisfaction. When we feel empty or searching, He invites us to come to Him for fulfillment. Today, may you find your deepest hunger satisfied in Christ, knowing that He alone can fill the longings of your heart.",
  "reference": "John 6:35",
  "timestamp": "2026-01-17T12:00:00.000Z"
}
```

---

## 💡 Why This Works:

✅ **System Message:**
- Sets warm, personal tone
- Establishes reverent but friendly approach
- Positions narrator as spiritual guide

✅ **User Prompt:**
- Provides all promise context (verse, speaker, category)
- Clear length requirement (30-45 seconds)
- Structure guidance (context + quote + application + encouragement)
- Personal tone ("you") for direct engagement
- Example structure for consistency

✅ **Temperature 0.7:**
- Warm and encouraging language
- Creative but reverent
- Maintains spiritual appropriateness

✅ **Voice Rotation:**
- Variety prevents monotony
- Consistent voice per promise
- Professional, clear delivery
- Natural sounding (Neural voices)

---

## 🎨 Narration Style Examples

### Example 1 (Jesus' Promise):
**Input:** John 6:35 - "I am the bread of life..."
**Output:** "In the Gospel of John, Jesus makes this beautiful promise to us: 'I am the bread of life. Whoever comes to me will never go hungry, and whoever believes in me will never be thirsty.' This means that Jesus offers us complete spiritual nourishment. Today, may you find your deepest hunger satisfied in Christ."

### Example 2 (God's Promise):
**Input:** Jeremiah 29:11 - "I know the plans I have for you..."
**Output:** "Through the prophet Jeremiah, God speaks these comforting words to His people: 'I know the plans I have for you, plans to prosper you and not to harm you, plans to give you hope and a future.' Even when life feels uncertain, God holds your future in His loving hands. Today, may you trust that His plans for you are good."

### Example 3 (Apostle's Promise):
**Input:** Philippians 4:13 - "I can do all things through Christ..."
**Output:** "St. Paul, writing from prison, shares this powerful testimony: 'I can do all things through Christ who strengthens me.' Whatever challenges you face today, you don't face them alone. Christ's strength is available to you in every moment. Today, may you draw courage from His unfailing power."

---

## 🚀 Ready to Deploy!

1. Import the workflow JSON into your n8n instance
2. Configure Groq API credentials (Llama 3.3 70B)
3. Configure Azure Speech Services credentials
4. Test with the sample data above
5. Verify audio file is generated at `/audio/promises/1.mp3`
6. Deploy the webhook endpoint
7. Your promise narration feature is live!
