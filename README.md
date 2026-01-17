# Divine Pilgrim 🙏
**Virtual Sacred Journeys**

Experience divine encounters through AI-guided virtual pilgrimages to Eucharistic miracles, Marian apparitions, and sacred sites worldwide.

## 🌟 Features

- **6 Sacred Pilgrimage Tours** - Eucharistic Miracles, Marian Apparitions, Stations of the Cross, Saint Shrines, Sacred Architecture, Biblical Sites
- **AI-Powered Narration** - Groq LLM generates engaging 3-5 minute audio stories
- **Netflix-Style UI** - Beautiful, modern card-based interface
- **Progressive Web App** - Installable, works offline
- **Mobile-First** - Optimized for all devices
- **Zero Cost Maps** - External Google Maps links (no API fees)

## 🚀 Tech Stack

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS
- **PWA:** next-pwa
- **Backend:** n8n (workflow automation)
- **AI:** Groq (LLaMA models)
- **TTS:** Microsoft Azure Speech Services (Andrew Natural voice)
- **Hosting:** Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/djcastelino/viasancta.git
cd viasancta

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Project Structure

```
viasancta/
├── app/
│   ├── page.tsx              # Home page (tour selection)
│   ├── tours/
│   │   └── [tourId]/
│   │       └── page.tsx      # Tour landing page
│   └── miracles/
│       └── [id]/
│           └── page.tsx      # Miracle detail page
├── src/
│   └── data/
│       └── eucharistic-miracles.json  # Miracle data
├── public/
│   ├── manifest.json         # PWA manifest
│   └── images/               # Curated photos
├── n8n-workflow-universal-narration.json  # n8n workflow
└── VIA-SANCTA-MASTER-PLAN.md  # Complete project plan
```

## 🎧 How It Works

1. **User selects a tour** (e.g., Eucharistic Miracles)
2. **Clicks a specific stop** (e.g., Buenos Aires, 1996)
3. **Presses "Play Narration"**
4. **Frontend calls n8n webhook** with tour/stop data
5. **n8n sends data to Groq AI** (generates script)
6. **Frontend receives narration text**
7. **Frontend calls Google TTS** (text → audio)
8. **Audio plays** while photos display

## 🗺️ Tours

### ⚪ Eucharistic Miracles (Available Now - COMPLETE!)
136 documented miracles based on St. Carlo Acutis's research - 100% complete!

### Coming Soon:
- ⭐ Marian Apparitions (25 stops)
- ✝️ Stations of the Cross (14 stops)
- 😇 Shrines of Saints (40 stops)
- ⛪ Sacred Architecture (30 stops)
- 📖 Biblical Sites (50 stops)

## 🔧 Configuration

### n8n Webhook
Update the webhook URL in your frontend API calls:
```
https://workflowly.online/webhook/via-sancta-narration
```

### Google TTS
Set up Google Cloud credentials for Text-to-Speech API.

## 📱 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo in Vercel dashboard
# https://vercel.com/new
```

## 📚 Documentation

- [Master Plan](./VIA-SANCTA-MASTER-PLAN.md) - Complete project vision and architecture
- [n8n Setup](./n8n-setup-instructions.md) - Workflow configuration
- [Data Curation](./data-curation-guide.md) - How to add new miracles
- [Complete Workflow Guide](./COMPLETE-WORKFLOW-GUIDE.md) - Detailed workflow explanation

## 🙏 Mission

> **Divine Pilgrim exists to make the sacred accessible to all.**
> 
> By combining cutting-edge AI technology with deep respect for Catholic tradition, we bring the world's most profound spiritual sites into the homes, classrooms, and hearts of people everywhere.
> 
> In honor of St. Carlo Acutis, whose work documented Eucharistic miracles for the digital age, we continue his mission: to show the world the beauty and truth of the Real Presence through modern technology.

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the contribution guidelines before submitting PRs.

## 📧 Contact

- Website: [divinepilgrim.com](https://divinepilgrim.com)
- GitHub: [@djcastelino](https://github.com/djcastelino)

---

**Built with ❤️ and 🙏 for the greater glory of God**
