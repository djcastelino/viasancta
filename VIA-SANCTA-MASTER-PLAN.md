# Via Sancta - Master Plan
**The Netflix of Sacred Pilgrimages**

*Virtual Sacred Pilgrimage Tours with AI-Guided Narrations*

---

## 🎯 Vision & Mission

### Vision
Make the world's sacred pilgrimage sites accessible to everyone, anywhere, through beautiful AI-guided virtual tours.

### Mission
Provide immersive, educational, and spiritually enriching virtual pilgrimage experiences that honor the legacy of St. Carlo Acutis and bring the treasures of the Catholic faith to a global audience.

---

## 💡 Unique Value Proposition

### What Makes Via Sancta UNIQUE in the Market

**Via Sancta = Virtual Pilgrimage + AI Narration + Curated Sacred Content**

Nobody else is combining these three elements!

### The Gap We're Filling

| Feature | Via Sancta | Physical Pilgrim Apps | Virtual Tour Apps | Religious Apps |
|---------|------------|----------------------|-------------------|----------------|
| **Virtual Tours** | ✅ Yes | ❌ No (GPS-based) | ✅ Yes (museums) | ❌ No |
| **AI Narration** | ✅ Yes | ❌ Pre-recorded | ❌ Text only | ❌ Static |
| **Sacred Focus** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **Multiple Routes** | ✅ 6 tours | ❌ Usually 1 | ✅ Many sites | ❌ No tours |
| **Works Anywhere** | ✅ Yes | ❌ Must travel | ✅ Yes | ✅ Yes |
| **Scalable Content** | ✅ AI-powered | ❌ Human-limited | ❌ Custom 360° | ❌ Manual |
| **Modern UX** | ✅ Netflix-style | ❌ Basic | ✅ Good | ⚠️ Varies |

### Our Competitive Advantages

1. **First-Mover in AI-Powered Sacred Virtual Tours** - Nobody is doing this yet
2. **St. Carlo Acutis's Legacy** - Honoring his globally recognized Eucharistic miracle research
3. **Scalable AI Architecture** - Can add 100s of sites without exploding costs
4. **Multi-Pilgrimage Platform** - Not limited to one route; continuous value addition

---

## 🎨 Brand Identity

### Name & Meaning
**Via Sancta** - Latin for "The Holy Way"

### Visual Identity
- **Primary Color:** Royal Purple gradient (#6e3a6c → #8B4789) - Liturgical, regal
- **Secondary Color:** Gold (#D4AF37) - Sacred, royal
- **Background:** Light cream/white gradient - Clean, reverent
- **Card Design:** Dark hero sections (50% darkness) + white content sections - Netflix-style

### Design Philosophy
**"Reverent Simplicity"**
- Modern, clean interfaces
- Contemplative pacing
- Sacred iconography
- Accessibility-first
- Mobile-optimized

---

## 🗺️ Tour Categories (6 Pilgrimage Tours)

### 1. ⚪ Eucharistic Miracles
- **Icon:** ⚪ (White circle - the Host)
- **Theme Color:** Dark teal gradient
- **Stops:** 11 (launching), expandable to 100+
- **Source:** St. Carlo Acutis's research + official Church documentation
- **Status:** ✅ Available at launch

### 2. ⭐ Marian Apparitions
- **Icon:** ⭐ (Star - Stella Maris)
- **Theme Color:** Blue/purple gradient
- **Stops:** 25 (planned)
- **Source:** Church-approved apparitions + Wikipedia API
- **Status:** Coming Soon

### 3. ✝️ Stations of the Cross
- **Icon:** ✝️ (Cross)
- **Theme Color:** Deep purple/burgundy gradient
- **Stops:** 14 traditional stations
- **Two Experiences:**
  - Traditional Meditation (devotional prayers, anywhere)
  - Via Dolorosa Walk (actual Jerusalem locations with Google Maps links)
- **Status:** Coming Soon

### 4. 😇 Shrines of Saints
- **Icon:** 😇 (Halo/Saint face)
- **Theme Color:** Gold gradient
- **Stops:** 40 (planned)
- **Source:** Wikipedia API + Catholic Encyclopedia
- **Status:** Coming Soon

### 5. ⛪ Sacred Architecture
- **Icon:** ⛪ (Church building)
- **Theme Color:** Brown/bronze gradient
- **Stops:** 30 (planned)
- **Focus:** St. Peter's, Sagrada Família, Notre-Dame, major basilicas
- **Source:** Wikipedia API + architectural databases
- **Status:** Coming Soon

### 6. 📖 Biblical Sites
- **Icon:** 📖 (Open book)
- **Theme Color:** Blue/teal gradient
- **Stops:** 50 (planned)
- **Focus:** Holy Land, Jerusalem, Bethlehem, Nazareth, biblical locations
- **Source:** Wikipedia API + Biblical references + archaeological data
- **Status:** Coming Soon

---

## 🏗️ Technical Architecture

### Frontend Stack
- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Type:** Progressive Web App (PWA)
- **Hosting:** Vercel (viasancta.vercel.app)
- **Styling:** CSS-in-JS or Tailwind CSS

### Backend/Workflow
- **Automation:** n8n (workflowly.online)
- **AI Engine:** Groq (LLaMA models)
- **Text-to-Speech:** Google Cloud TTS (Neural2 voices)
- **Webhook:** `https://workflowly.online/webhook/via-sancta-narration`

### Data Strategy
- **Storage:** JSON files (lightweight, version-controlled)
- **Location:** `/src/data/[tour-name].json`
- **Future:** Consider Firebase/Supabase for dynamic updates

### APIs & Services
- **Google TTS:** Called directly from frontend (like Pathfinder app)
- **Google Maps:** External links (no API key needed, zero cost)
- **Wikipedia:** Optional enrichment (Wikipedia API for some tours)

---

## 🎧 Audio Narration System

### AI-Powered Workflow (n8n)

```
User clicks "Play Narration"
   ↓
Frontend → n8n webhook
   Request: { tourId, stopId, tourType }
   ↓
n8n Workflow:
   1. Extract stop data (from request or internal JSON)
   2. AI Agent (Groq) generates 3-5 min script
      - Universal master prompt
      - Voice variety (2 male, 2 female per tour type)
   3. Format response
   ↓
n8n returns: { narration: "text...", voice: "en-US-Neural2-J" }
   ↓
Frontend:
   1. Receives narration text
   2. Calls Google TTS directly (API call)
   3. Plays audio via <audio> element
   4. Photos auto-advance as slideshow (optional)
```

### Voice Strategy
- **Multiple voices per tour type** - Prevents monotony
- **Voice pool:** 2 male + 2 female Neural2 voices
- **Random selection** - Each stop gets random voice from pool
- **Consistent tone** - All voices are reverent, contemplative

### Master AI Prompt (Universal)
Single prompt system that adapts to all tour types:
- Identifies tour type from request
- Generates contextually appropriate narration
- 3-5 minute scripts (conversational, engaging, reverent)
- Includes pause points, emotional beats
- References visual elements ("As you see in this image...")

---

## 📱 User Experience Design

### User Journey

```
Home Page (Tour Selection)
   ↓
[Click "Start Tour" on Eucharistic Miracles]
   ↓
Tour Landing Page (List of 11 Miracles)
   ↓
[Click "Buenos Aires, 1996"]
   ↓
Miracle Detail Page
   ├─ 📸 Photo Gallery (2-3 curated images)
   ├─ 🎧 Play Narration Button (main CTA)
   ├─ 📝 Story/Description (collapsible)
   ├─ 🔬 Scientific Evidence (if available)
   ├─ 📍 Location (address display)
   ├─ 🗺️ "View on Google Maps" (external link)
   └─ 📖 "Read on Wikipedia" (external link)
   ↓
[User presses Play]
   ↓
Audio plays, photos auto-advance (optional slideshow)
   ↓
[User completes stop, navigates to next miracle]
```

### Key UX Decisions

#### ✅ What We INCLUDE:
- **Curated photos** (2-3 high-quality per stop)
- **AI narration** (3-5 min audio)
- **Story text** (from curated JSON)
- **Simple map pin** with address
- **External links** to Google Maps & Wikipedia
- **"Coming Soon" badges** for future tours

#### ❌ What We EXCLUDE:
- **NO embedded Street View** - Heavy, slow, costs money
- **NO interactive map exploration** - Distracting from story
- **NO custom 360° tours** - Expensive, not scalable
- **NO video** - Keep it audio-focused, contemplative

#### Why This Works:
- ⚡ **Fast** - Lightweight, quick loading
- 💰 **Free** - No API costs for maps
- 🎯 **Focused** - Audio is hero, photos support
- 🙏 **Contemplative** - Spiritual, not game-like
- 📱 **Mobile-friendly** - Low data usage

---

## 🗺️ Maps & Location Strategy

### Simple Map Pin Approach

**What Each Stop Shows:**
```
📍 Location Section:
   - Address text display
   - Latitude/Longitude (stored in JSON)
   - [🗺️ View on Google Maps] button
   - [📖 Read on Wikipedia] link (optional)
```

**"View on Google Maps" Link:**
```javascript
const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
```

**Opens:** Google Maps app/website at exact location

**User Can:**
- ✅ Enter Street View
- ✅ Get directions
- ✅ See reviews, photos, hours
- ✅ Save to "Want to Visit" list
- ✅ Explore surroundings

**Cost:** $0 (external link, no API)

### Special Case: Via Dolorosa (Stations of the Cross)

**This tour is UNIQUE** - the physical path matters!

**Why Google Maps Link is Perfect Here:**
- Jerusalem's Via Dolorosa has excellent Street View coverage
- Users can virtually "walk" from Station 1 → 14
- See the actual cobblestones Jesus walked
- Understand the geography (uphill to Calvary)
- Experience the narrow streets, crowds

**User Experience:**
```
Station 1: Jesus Condemned
   🎧 Play narration
   📸 See photo of actual chapel
   🗺️ Click "View on Google Maps"
      → Opens Street View at exact location
      → User explores, then returns to app
   
Station 2: Jesus Takes the Cross
   (Repeat...)

Station 14: Jesus is Laid in the Tomb
   → Church of the Holy Sepulchre
   → Full Street View available
```

---

## 📊 Content Strategy

### Data Sources by Tour Type

#### Fully Manual Curation (Small Lists):
- **✝️ Stations of Cross (14)** - Traditional prayers/meditations, fixed content
- **⚪ Eucharistic Miracles (11-100+)** - St. Carlo Acutis research + your book

#### Semi-Automated (Medium Lists):
- **⭐ Marian Apparitions (25)** - Wikipedia API + manual curation
- **⛪ Sacred Architecture (30)** - Wikipedia API + manual curation

#### Mostly Automated (Large Lists):
- **😇 Saint Shrines (40)** - Wikipedia API + review/approval
- **📖 Biblical Sites (50)** - Wikipedia API + Bible references

### JSON Data Structure (Example)

```json
{
  "id": "buenos-aires-1996",
  "tourId": "eucharistic-miracles",
  "tourType": "Eucharistic Miracles",
  "location": {
    "city": "Buenos Aires",
    "country": "Argentina",
    "countryCode": "AR",
    "address": "Church of Santa Maria, Buenos Aires",
    "lat": -34.6037,
    "lng": -58.3816
  },
  "date": "1996-08-18",
  "year": "1996",
  "title": "The Miracle of Buenos Aires",
  "subtitle": "Host Transforms into Flesh and Blood",
  "images": [
    "/images/eucharistic/buenos-aires-hero.jpg",
    "/images/eucharistic/buenos-aires-church.jpg",
    "/images/eucharistic/buenos-aires-evidence.jpg"
  ],
  "narrative": {
    "summary": "In August 1996, during Mass at Santa Maria Church...",
    "fullStory": "Detailed account of what happened...",
    "significance": "This miracle demonstrates..."
  },
  "scientificEvidence": {
    "hasEvidence": true,
    "summary": "Scientifically tested, found to be cardiac muscle...",
    "tests": ["Histological analysis", "Blood type O+"]
  },
  "externalLinks": {
    "wikipedia": "https://en.wikipedia.org/wiki/...",
    "officialSite": "https://...",
    "googleMaps": "https://www.google.com/maps/search/?api=1&query=-34.6037,-58.3816"
  },
  "metadata": {
    "source": "St. Carlo Acutis Research",
    "verified": true,
    "lastUpdated": "2025-01-09"
  }
}
```

---

## 🎯 Launch Strategy

### Phase 1: MVP Launch (Q1 2025)
**Goal:** Launch with 1 complete tour

**Scope:**
- ✅ Home page with 6 tour cards (1 available, 5 "Coming Soon")
- ✅ Eucharistic Miracles tour (11 stops)
- ✅ AI narration workflow (n8n + Groq + Google TTS)
- ✅ Basic PWA functionality
- ✅ Mobile-responsive design
- ✅ Deploy to Vercel (viasancta.vercel.app)

**Deliverables:**
- React frontend with Netflix-style UI
- 11 fully curated Eucharistic miracles
- Working audio narration system
- External links (Google Maps, Wikipedia)
- Photo galleries (2-3 images per miracle)

### Phase 2: Content Expansion (Q2 2025)
**Goal:** Add 2-3 more tours

**Priority Tours:**
1. **Stations of the Cross** (14 stops) - Small, fixed content
2. **Marian Apparitions** (25 stops) - High user interest
3. **Biblical Sites** (20-30 stops) - Leverage Wikipedia API

**Tasks:**
- Curate data for additional tours
- Enhance AI prompts for different tour types
- Add tour-specific features (e.g., Via Dolorosa walking experience)

### Phase 3: Feature Enhancement (Q3 2025)
**Goal:** Improve engagement & retention

**Features:**
- User accounts (save progress, favorites)
- Offline mode (download tours for offline listening)
- Social sharing (share favorite miracles)
- Prayer journal (reflections, notes)
- Progress tracking (tour completion badges)

### Phase 4: Scale & Monetization (Q4 2025)
**Goal:** Sustainable growth model

**Options:**
- **Freemium:** Basic tours free, premium tours paid
- **Donations:** "Support Via Sancta" CTA
- **Institutional:** Licensing to schools, parishes
- **Merchandise:** Physical pilgrimage guides, books
- **Sponsorships:** Catholic organizations

---

## 📈 Success Metrics

### Launch Metrics (First 3 Months)
- **1,000+ users** - Downloads/visits
- **500+ tours completed** - Full tour listens
- **10+ min avg session** - Engagement time
- **50%+ completion rate** - Users finishing tours
- **4.5+ rating** - User satisfaction

### Growth Metrics (6-12 Months)
- **10,000+ users**
- **5,000+ tours completed**
- **20+ min avg session**
- **100+ social shares**
- **5+ press mentions** (Catholic media)

### Engagement Indicators
- **Audio play rate** - % of users clicking play
- **Tour completion rate** - % finishing a full tour
- **Return visits** - Users coming back
- **Favorites/saves** - Bookmarked miracles
- **External link clicks** - Google Maps, Wikipedia usage

---

## 🎨 Design System (Summary)

### Color Palette
- **Primary:** Purple (#6e3a6c → #8B4789)
- **Secondary:** Gold (#D4AF37)
- **Background:** Cream/white gradient
- **Card backgrounds:** White with dark hero sections
- **Text:** Dark gray (#2d2d2d) on light, white on dark

### Typography
- **Headings:** Georgia (serif) - Traditional, sacred
- **Body:** System fonts (San Francisco, Segoe UI) - Modern, readable
- **Emphasis:** Italic for subtitles, bold for CTAs

### Icons
- ⚪ Eucharistic Miracles (Host)
- ⭐ Marian Apparitions (Star)
- ✝️ Stations of Cross (Cross)
- 😇 Shrines of Saints (Halo)
- ⛪ Sacred Architecture (Church)
- 📖 Biblical Sites (Book)

### Card Design
- **Netflix-style:** Large hero sections with gradients
- **Two-tone:** Dark top (icon + title) + white bottom (content)
- **Hover effects:** Lift on hover, shadow deepening
- **Responsive:** 3x2 grid on desktop, single column on mobile

---

## 🛠️ Development Roadmap

### ✅ Completed
- [x] n8n workflow (universal narration system)
- [x] Groq AI integration
- [x] Voice variety system (2M + 2F per tour type)
- [x] 11 Eucharistic miracles curated
- [x] Home page design (HTML prototype)
- [x] Design system defined
- [x] Architecture decisions

### 🚧 In Progress
- [ ] Data curation (add photos, coordinates, external links)
- [ ] Frontend setup (React + TypeScript + Vite)

### 📋 To Do
- [ ] Build UI components (tour cards, detail pages, audio player)
- [ ] Integrate n8n API for narration
- [ ] Implement Google TTS in frontend
- [ ] Add simple map pins + external links
- [ ] Configure PWA (manifest, service worker)
- [ ] Mobile responsive testing
- [ ] Deploy to Vercel
- [ ] Beta testing with small group
- [ ] Launch marketing (Catholic social media, forums)

---

## 🎯 Target Audience

### Primary Audiences
1. **Catholics Unable to Travel** (elderly, disabled, financial constraints)
2. **Students & Teachers** (religious education, CCD, RCIA)
3. **Pilgrims Planning Trips** (research before physical pilgrimage)
4. **Spiritual Seekers** (non-Catholics interested in sacred history)

### User Personas

**Maria, 78** - Retired, limited mobility
- Wants: Experience sacred sites she'll never visit
- Needs: Simple UI, large text, easy audio controls
- Value: Spiritual enrichment, connection to Church

**Fr. John, 45** - High school religion teacher
- Wants: Engaging educational tool for students
- Needs: Reliable content, easy classroom use, free/cheap
- Value: Student engagement, curriculum support

**Sarah, 32** - Young professional, planning Europe trip
- Wants: Research sites for upcoming pilgrimage
- Needs: Accurate info, maps, itinerary planning
- Value: Trip preparation, inspired travel

**David, 55** - Non-Catholic, interested in history
- Wants: Learn about religious history, mysteries
- Needs: Accessible explanations, not preachy
- Value: Education, fascinating stories

---

## 💰 Business Model (Future Considerations)

### Free Model (Launch)
- All content free
- No ads
- Optional donations
- Build audience first

### Potential Revenue Streams
1. **Freemium** - Basic tours free, premium tours paid ($2.99/tour or $9.99/month unlimited)
2. **Institutional Licensing** - Schools, parishes, dioceses ($99-499/year)
3. **Donations** - "Buy me a coffee" style support
4. **Merchandise** - Companion books, physical pilgrimage guides
5. **Sponsored Tours** - Partner with pilgrimage organizations
6. **API Access** - License narration system to other apps

---

## 🚀 Marketing Strategy

### Launch Channels
1. **Catholic Social Media** - Twitter/X, Instagram, Facebook (Catholic hashtags)
2. **Reddit** - r/Catholicism, r/Christian, r/Catholic
3. **Catholic Forums** - CatholicAnswers, Fish Eaters
4. **YouTube** - Demo video, testimonials
5. **Catholic Blogs/Podcasts** - Reach out for features
6. **Product Hunt** - Tech audience launch

### Content Marketing
- Blog posts about miracles
- Social media quotes from St. Carlo Acutis
- User testimonials
- Behind-the-scenes (how AI narration works)
- Educational content (Eucharistic theology)

### Partnerships
- **Catholic Schools** - Free access for education
- **Parishes** - Promote as Lent/Advent resource
- **Pilgrimage Organizations** - Pre-trip preparation tool
- **Catholic Media** - EWTN, Catholic Answers, Word on Fire

---

## 📚 References & Resources

### Data Sources
- St. Carlo Acutis's Eucharistic Miracles catalog
- Wikipedia API (for enrichment)
- Catholic Encyclopedia
- Official Church documentation
- User's miracle book collection

### Technical Resources
- n8n Documentation
- Groq API Documentation
- Google Cloud TTS Documentation
- React + Vite Documentation
- PWA Best Practices

### Inspiration
- Netflix UI/UX patterns
- VoiceMap (audio tour UX)
- Google Arts & Culture (virtual tours)
- Hallow app (Catholic prayer app UX)
- Rick Steves Audio Europe (audio tour model)

---

## ✝️ Mission Statement

> **Via Sancta exists to make the sacred accessible to all.**
> 
> By combining cutting-edge AI technology with deep respect for Catholic tradition, we bring the world's most profound spiritual sites into the homes, classrooms, and hearts of people everywhere.
> 
> In honor of St. Carlo Acutis, whose work documented Eucharistic miracles for the digital age, we continue his mission: to show the world the beauty and truth of the Real Presence through modern technology.

---

## 📞 Contact & Deployment

- **Domain:** viasancta.vercel.app
- **n8n Workflow:** workflowly.online/webhook/via-sancta-narration
- **Project Path:** /Users/dcasteli/Documents/pda/viasancta
- **Data Location:** /Users/dcasteli/Documents/pda/viasancta/src/data/

---

**Document Version:** 1.0  
**Last Updated:** January 9, 2025  
**Status:** Pre-Development (Planning Complete)

