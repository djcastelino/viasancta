# Via Sancta Project

**The Holy Way - Virtual Sacred Pilgrimage Tours**

## 🎯 Project Overview

Via Sancta is a Progressive Web App (PWA) offering immersive virtual pilgrimage tours of sacred sites worldwide, featuring AI-generated narrations, Google Street View integration, and curated historical content.

**Domain:** viasancta.vercel.app  
**Tech Stack:** React + TypeScript + Vite + PWA + Groq AI + Google Cloud TTS  
**First Tour:** Eucharistic Miracles (30-40 stops)

---

## 📁 Project Structure

```
viasancta/
├── n8n-workflow-universal-narration.json  # n8n workflow for audio generation
├── n8n-setup-instructions.md              # How to set up n8n workflow
├── data-curation-guide.md                 # Guide for curating miracle data
├── COMPLETE-WORKFLOW-GUIDE.md             # Full workflow documentation
├── generate-all-audio.sh                  # Batch audio generation script
├── starter-miracles.json                  # 3 sample miracles (template)
│
├── public/
│   └── audio/
│       ├── eucharistic-miracles/          # Generated audio files
│       ├── marian-apparitions/
│       └── stations-of-cross/
│
└── src/
    └── data/
        └── eucharistic-miracles.json      # Full miracle dataset (you create this)
```

---

## 🚀 Getting Started

### Step 1: Set Up n8n Workflow

1. Follow `n8n-setup-instructions.md`
2. Import workflow into your n8n instance
3. Configure Groq and Google Cloud TTS credentials
4. Activate the workflow

### Step 2: Curate Miracle Data

1. Follow `data-curation-guide.md`
2. Start with `starter-miracles.json` as template
3. Curate 30-40 Eucharistic miracles
4. Save to `src/data/eucharistic-miracles.json`

**Recommended approach:**
- Start with Top 10 Tier 1 miracles
- Test audio generation with those 10
- Once satisfied, complete remaining 20-30

### Step 3: Generate Audio Files

```bash
# Edit script to set your n8n webhook URL
nano generate-all-audio.sh

# Run batch generation (takes ~12-15 minutes for 30 miracles)
./generate-all-audio.sh
```

**Result:** Audio files saved to `public/audio/eucharistic-miracles/`

### Step 4: Build Frontend

```bash
# Initialize React project
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install
npm install -D vite-plugin-pwa workbox-window
npm install react-router-dom

# Start development server
npm run dev
```

### Step 5: Deploy

```bash
npm run build
vercel --prod
```

---

## 📖 Key Documentation

| File | Purpose |
|------|---------|
| `COMPLETE-WORKFLOW-GUIDE.md` | **START HERE** - Full workflow explanation |
| `n8n-setup-instructions.md` | Set up the n8n backend workflow |
| `data-curation-guide.md` | How to curate miracle data |
| `starter-miracles.json` | Template with 3 complete examples |

---

## 🎯 Implementation Status

### ✅ Phase 1: n8n Backend (COMPLETE)
- [x] Universal narration workflow created
- [x] Groq LLM integration
- [x] Google Cloud TTS integration
- [x] Tour-specific voice selection
- [x] Binary file writing
- [x] Documentation complete

### ⏭️ Phase 2: Data Curation (IN PROGRESS)
- [ ] Curate 30-40 Eucharistic miracles
- [ ] Verify all Street View locations
- [ ] Gather images for each miracle
- [ ] Complete all data fields

### ⏭️ Phase 3: Audio Generation (PENDING)
- [ ] Run batch generation script
- [ ] Validate all audio files
- [ ] Optimize file sizes if needed

### ⏭️ Phase 4: Frontend Development (PENDING)
- [ ] Initialize React project
- [ ] Create component library
- [ ] Implement tour-based UX
- [ ] Integrate audio playback
- [ ] Add Street View integration
- [ ] Implement PWA features

### ⏭️ Phase 5: Testing & Launch (PENDING)
- [ ] Cross-browser testing
- [ ] PWA installation testing
- [ ] Performance optimization
- [ ] Deploy to Vercel
- [ ] Soft launch

---

## 💡 Key Concepts

### Why Pre-generate Audio?

**Problem:** Real-time generation = 25 seconds wait ❌

**Solution:** Batch generate once, serve instantly ✅

```
Admin: Run batch job once (12 minutes for 30 miracles)
User: Instant playback of pre-generated MP3s
```

### Architecture

```
Data Curation → Batch Audio Generation → Frontend Development
     ↓                    ↓                        ↓
  JSON file       Pre-generated MP3s        Instant playback
```

---

## 🆓 Cost Breakdown

**100% FREE to build and operate:**

- **Groq LLM:** FREE (14,400 requests/day)
- **Google Cloud TTS:** FREE (1M characters/month)
- **Vercel Hosting:** FREE (100GB bandwidth)
- **Storage:** Vercel public folder (FREE)

**Total Operating Cost: $0/month**

---

## 📚 Resources

- **Carlo Acutis Sources:**
  - https://eucharisticmiracles.faith
  - http://www.miracolieucaristici.org

- **APIs:**
  - Groq: https://console.groq.com
  - Google Cloud TTS: https://cloud.google.com/text-to-speech

- **Tools:**
  - n8n: https://n8n.io
  - Vite: https://vitejs.dev
  - React: https://react.dev

---

## 🎯 Next Action

**Your immediate next step:**

1. Read `COMPLETE-WORKFLOW-GUIDE.md` for full understanding
2. Start curating miracle data using `data-curation-guide.md`
3. Use `starter-miracles.json` as your template
4. Aim for 10 miracles first, then test audio generation
5. Complete remaining 20-30 miracles

**The n8n backend is ready! Just need the data.**

---

## 📧 Questions?

Refer to the documentation files - they contain detailed explanations and troubleshooting guides.

---

**Let's build something sacred.** ✨

