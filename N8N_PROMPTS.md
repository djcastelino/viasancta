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
