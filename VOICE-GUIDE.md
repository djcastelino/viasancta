# 🎙️ Google TTS Voice Guide for Via Sancta

## 🔧 **Voice Update (FIXED Robotic Female Voice)**

### **What Changed:**
Upgraded female voices from **Neural2** to **WaveNet** for more natural sound.

---

## 🎭 **Current Voice Mapping**

| Tour Type | Voice Code | Gender | Accent | Quality |
|-----------|-----------|--------|--------|---------|
| **Eucharistic Miracles** | `en-US-Neural2-J` | Male | US | Deep, reverent ✅ |
| **Marian Apparitions** | `en-US-Wavenet-H` | Female | US | Warm, natural ✅ |
| **Stations of the Cross** | `en-US-Neural2-D` | Male | US | Contemplative ✅ |
| **Saint Shrines** | `en-US-Wavenet-D` | Male | US | Inspiring ✅ |
| **Holy Relics** | `en-GB-Wavenet-B` | Male | British | Educational ✅ |
| **Biblical Sites** | `en-US-Neural2-J` | Male | US | Deep, reverent ✅ |

---

## 🎤 **Google TTS Voice Types**

### **1. WaveNet Voices** (Best Quality)
- **Technology:** DeepMind WaveNet neural network
- **Quality:** Most natural, human-like
- **Cost:** Slightly higher than Neural2
- **Best for:** Important/prominent content
- **Examples:** `en-US-Wavenet-H`, `en-GB-Wavenet-B`

### **2. Neural2 Voices** (High Quality)
- **Technology:** Google's next-gen neural TTS
- **Quality:** Very good, natural
- **Cost:** Standard pricing
- **Best for:** General use
- **Examples:** `en-US-Neural2-J`, `en-US-Neural2-D`

### **3. Standard Voices** (Basic)
- **Technology:** Concatenative TTS
- **Quality:** Robotic, less natural ❌
- **Cost:** Cheapest
- **Not recommended** for Via Sancta

---

## 🔍 **Why Female Voices Sounded Robotic**

### **Before (Neural2-F):**
- ❌ `en-US-Neural2-F` - Less expressive
- ❌ Monotone, mechanical inflection
- ❌ Not ideal for storytelling

### **After (Wavenet-H):**
- ✅ `en-US-Wavenet-H` - Warm, expressive
- ✅ Natural pitch variation
- ✅ Perfect for Marian Apparitions (maternal tone)

---

## 🎯 **Best Voices for Each Tour**

### **Eucharistic Miracles** 🍞
**Current:** `en-US-Neural2-J` (Male, deep)
- ✅ Reverent, authoritative
- ✅ Good for theological content
- **Alternative:** `en-US-Wavenet-J` (even better)

### **Marian Apparitions** 🌹
**Current:** `en-US-Wavenet-H` (Female, warm) ✅ **NEW**
- ✅ Maternal, gentle tone
- ✅ Perfect for Mary's messages
- **Alternative:** `en-US-Wavenet-F` (softer)

### **Stations of the Cross** ✝️
**Current:** `en-US-Neural2-D` (Male, contemplative)
- ✅ Meditative, solemn
- **Alternative:** `en-US-Wavenet-D` (more expressive)

### **Saint Shrines** 🙏
**Current:** `en-US-Wavenet-D` (Male, inspiring)
- ✅ Biographical, uplifting
- **Alternative:** `en-GB-Wavenet-C` (British, scholarly)

### **Holy Relics** 📿
**Current:** `en-GB-Wavenet-B` (Male, British)
- ✅ Educational, historical
- ✅ British accent adds gravitas

### **Biblical Sites** 📖
**Current:** `en-US-Neural2-J` (Male, deep)
- ✅ Scriptural authority
- **Alternative:** `en-US-Wavenet-A` (different tone)

---

## 🎨 **All Available Voices**

### **US English - Male**
| Voice | Type | Tone | Best For |
|-------|------|------|----------|
| `en-US-Wavenet-A` | WaveNet | Deep, authoritative | Historical |
| `en-US-Wavenet-B` | WaveNet | Warm, friendly | Stories |
| `en-US-Wavenet-D` | WaveNet | Clear, expressive | Saints |
| `en-US-Wavenet-J` | WaveNet | Deep, reverent | Eucharist |
| `en-US-Neural2-A` | Neural2 | Professional | General |
| `en-US-Neural2-D` | Neural2 | Contemplative | Meditation |
| `en-US-Neural2-I` | Neural2 | Warm | Stories |
| `en-US-Neural2-J` | Neural2 | Deep | Authority |

### **US English - Female**
| Voice | Type | Tone | Best For |
|-------|------|------|----------|
| `en-US-Wavenet-C` | WaveNet | Warm, maternal | Marian |
| `en-US-Wavenet-E` | WaveNet | Young, bright | Inspiring |
| `en-US-Wavenet-F` | WaveNet | Soft, gentle | Peaceful |
| `en-US-Wavenet-G` | WaveNet | Professional | Educational |
| `en-US-Wavenet-H` | WaveNet | Natural, warm | **BEST** ✅ |
| `en-US-Neural2-C` | Neural2 | Clear | General |
| `en-US-Neural2-E` | Neural2 | Expressive | Stories |
| `en-US-Neural2-F` | Neural2 | Standard | Basic ❌ |
| `en-US-Neural2-G` | Neural2 | Professional | News |
| `en-US-Neural2-H` | Neural2 | Warm | Good |

### **British English - Male**
| Voice | Type | Tone | Best For |
|-------|------|------|----------|
| `en-GB-Wavenet-B` | WaveNet | Authoritative | History ✅ |
| `en-GB-Wavenet-D` | WaveNet | Clear | Education |
| `en-GB-Neural2-B` | Neural2 | Professional | Formal |
| `en-GB-Neural2-D` | Neural2 | Standard | General |

### **British English - Female**
| Voice | Type | Tone | Best For |
|-------|------|------|----------|
| `en-GB-Wavenet-A` | WaveNet | Professional | Scholarly |
| `en-GB-Wavenet-C` | WaveNet | Clear, warm | Stories |
| `en-GB-Wavenet-F` | WaveNet | Soft | Gentle |
| `en-GB-Neural2-A` | Neural2 | Standard | General |
| `en-GB-Neural2-C` | Neural2 | Clear | Professional |
| `en-GB-Neural2-F` | Neural2 | Warm | Good |

---

## 🔧 **How to Change Voices**

### **Option 1: Update n8n Workflow (SERVER-SIDE)**

1. **Open your n8n workflow:**
   - Go to: https://workflowly.online
   - Find: "Via Sancta - Universal Tour Narration"

2. **Edit the "Select Voice & Prepare" node:**
   ```javascript
   const voiceMap = {
     'Eucharistic Miracles': 'en-US-Neural2-J',
     'Marian Apparitions': 'en-US-Wavenet-H',  // ← UPDATED
     'Stations of the Cross': 'en-US-Neural2-D',
     'Saint Shrines': 'en-US-Wavenet-D',
     'Holy Relics': 'en-GB-Wavenet-B',
     'Biblical Sites': 'en-US-Neural2-J'
   };
   ```

3. **Save and activate** the workflow

---

### **Option 2: Update Locally (BACKUP)**

The workflow file is also stored in your project:
```
/Users/dcasteli/Documents/pda/viasancta/n8n-workflow-universal-narration.json
```

This has already been updated with the new voices!

---

## 🎧 **Testing Voices**

Want to hear how different voices sound? Use this test:

```bash
# Test WaveNet-H (new female voice)
curl -X POST \
  "https://texttospeech.googleapis.com/v1/text:synthesize?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {"text": "Welcome to this sacred site."},
    "voice": {"languageCode": "en-US", "name": "en-US-Wavenet-H"},
    "audioConfig": {"audioEncoding": "MP3"}
  }' \
  | jq -r '.audioContent' | base64 -d > test-voice.mp3
```

---

## 💰 **Cost Comparison**

| Voice Type | Cost per 1M characters |
|------------|------------------------|
| Standard | $4.00 |
| **Neural2** | $16.00 |
| **WaveNet** | $16.00 |

**Note:** Neural2 and WaveNet have the same pricing!
So using WaveNet is **no extra cost** but **better quality**! ✅

---

## ✅ **Summary of Changes**

| Tour Type | Old Voice | New Voice | Improvement |
|-----------|-----------|-----------|-------------|
| Eucharistic Miracles | Neural2-J | *(same)* | No change needed ✅ |
| **Marian Apparitions** | Neural2-F | **Wavenet-H** | **Much more natural** 🎯 |
| Stations of Cross | Neural2-H | Neural2-D | Better tone |
| Saint Shrines | Neural2-D | **Wavenet-D** | More expressive |
| Holy Relics | Neural2-B | **Wavenet-B** | More natural |
| Biblical Sites | Neural2-J | *(same)* | No change needed ✅ |

---

## 🚀 **Next Steps**

1. **Import updated workflow to n8n:**
   - Copy: `n8n-workflow-universal-narration.json`
   - Import in n8n
   - Activate

2. **Test the new voices:**
   - Trigger a narration
   - Listen for improvement

3. **Adjust if needed:**
   - Use the voice table above
   - Pick your favorites

🎙️ **Female voices should sound natural now!** 🙏

