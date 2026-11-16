# RackNerd 4GB Cloud VPS + Jetson Orin Nano Master Blueprint
**For DivinePilgrim.com (`viasancta`) & Geonauts**

---

## 1. Hardware & Cloud Architecture Overview

| System | Specs | Primary Role | Key Services |
| :--- | :--- | :--- | :--- |
| **RackNerd KVM VPS** | 3 vCPU, 4 GB RAM, 1 Dedicated Public IPv4 (`$29.98/yr`) | **24/7 Public Web, Analytics, Email & Social Automation Hub** | • **Umami Analytics** (`stats.divinepilgrim.com` for both sites)<br>• **Listmonk** (Self-hosted email newsletter for both sites)<br>• **n8n + ffmpeg** (Auto-generating & publishing 9:16 Reels/Shorts to YouTube, Instagram & Facebook)<br>• **Uptime Kuma** (24/7 site & SSL monitoring) |
| **NVIDIA Jetson Orin Nano** | 1,024 Ampere CUDA Cores, 32 Tensor Cores, 8 GB Unified Memory (24/7 Home Desk) | **Private Local GPU Brain & CUDA Learning Lab (`$0 API Fees`)** | • **Catechism (CCC JSON) + Fr. Mike Schmitz Timestamped Audio RAG** (`faster-whisper` CUDA + `ChromaDB` + `Ollama`)<br>• **Real-Time Spoken Language Tutor** (`Open WebUI` + `Whisper CUDA` + `Kokoro-82M / Piper TTS`)<br>• **Local AI Worker for RackNerd `n8n`** (connected privately via free **Tailscale**) |

---

## 2. Step-by-Step: Setting Up Free Private Analytics (`Umami`) on RackNerd VPS

### Step A: Point DNS Subdomain to Your RackNerd IPv4
In your DNS settings for `divinepilgrim.com`:
- **Type:** `A`
- **Name:** `stats` (`stats.divinepilgrim.com`)
- **IPv4 Address:** `<YOUR_RACKNERD_IPV4>`

### Step B: Deploy Umami + PostgreSQL via Docker Compose
SSH into your RackNerd VPS and run:

```bash
mkdir -p /opt/umami && cd /opt/umami

cat << 'EOF' > docker-compose.yml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami
    ports:
      - "127.0.0.1:3005:3000"
    environment:
      DATABASE_URL: postgresql://umami:umami_secret_db_pass@umami-db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: divinepilgrim_geonauts_umami_secret_2026_key
    depends_on:
      umami-db:
        condition: service_healthy
    restart: always

  umami-db:
    image: postgres:15-alpine
    container_name: umami-db
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami_secret_db_pass
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami -d umami"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  umami-db-data:
EOF

docker compose up -d
```

### Step C: Live Dashboard & Configured Website IDs (Deployed on `192.227.172.231:3005`)
1. **Live Dashboard URL:** `http://192.227.172.231:3005`
   - **Public Share View (Divine Pilgrim):** `http://192.227.172.231:3005/share/divinepilgrim`
   - **Public Share View (Geonauts Guide):** `http://192.227.172.231:3005/share/geonautsguide`
2. **Login Credentials:**
   - **Username:** `admin`
   - **Password:** `umami` *(Change anytime under Profile -> Password)*
3. **Registered Website IDs:**
   - **Divine Pilgrim (`divinepilgrim.com`):** `722f5bca-d797-4466-8481-393aa336273b` *(Already wired & pushed to `djcastelino/viasancta` via first-party HTTPS proxy `/api/umami`!)*
   - **Geonauts Guide (`geonautsguide.com`):** `ba735871-038d-4bd1-9e74-af1da4dfc727`

---

## 3. Automated Daily Reels / YouTube Shorts Pipeline (`n8n` + `ffmpeg` on RackNerd)

Because `viasancta` already includes **42 high-res 16:9 stop images**, **126 clues**, and **84 Andrew Neural MP3 narrations**:
1. **Daily Schedule Trigger (`n8n`):** Runs every morning at 8:00 AM on the RackNerd VPS.
2. **Video Synthesis (`ffmpeg` on RackNerd):**
   - Takes the stop image (`/public/images/trails/...jpg`) + slow zoom effect,
   - Mixes the Andrew Neural MP3 (`/public/audio/narration/...mp3`) + ducked Gregorian Chant (`gregorian_chant.mp3`),
   - Burns the mystery title & call-to-action (*"Play the 3D Globe Mystery at DivinePilgrim.com"*) onto a `1080x1920` (9:16) vertical `.mp4`.
3. **Multi-Platform Auto-Publish:**
   - **YouTube Shorts:** Uses `n8n`'s native YouTube Upload Video node (`#Shorts`).
   - **Instagram Reels:** Uses Meta Graph API (`media_type=REELS`, pulling the `.mp4` from your RackNerd public URL).
   - **Facebook Reels:** Publishes simultaneously to your Facebook Page via the same Meta Graph API token.

---

## 4. Self-Hosted Email Newsletter (`Listmonk`) on RackNerd VPS

- **What it replaces:** Mailchimp / ConvertKit / Beehiiv ($0/month on your RackNerd VM).
- **RAM Usage:** ~50 MB RAM.
- **How to use it:**
  - Create two subscriber lists: **Divine Pilgrim Weekly Trail** and **Geonauts Weekly Challenge**.
  - Connect Listmonk SMTP to **Amazon SES** or **Resend / Brevo Free Tier**.
  - Have `n8n` automatically trigger the Sunday morning digest email highlighting the new week's Saint Trail or Geonauts challenge.

---

## 5. Jetson Orin Nano (24/7 Local CUDA GPU) Projects

1. **Catechism of the Catholic Church (JSON) + Fr. Mike Schmitz Timestamped Audio RAG:**
   - Transcribe all 365 *Bible in a Year* & *Catechism in a Year* MP3s on the Jetson GPU using `faster-whisper` (`CUDA`) with exact `[mm:ss]` timestamps.
   - Index both the CCC JSON paragraphs and Fr. Mike's timestamped segments in `ChromaDB` / `Qdrant`.
   - Query locally via `Ollama` (`Llama-3.2-3B-Instruct` or `Qwen-2.5-3B-Instruct`) so every answer cites the exact Catechism paragraph **and** plays Fr. Mike's audio explanation starting at the exact second.
2. **Real-Time Spoken Language Tutor (`Open WebUI` + `Whisper CUDA` + `Kokoro-82M / Piper TTS`):**
   - Practice speaking Spanish, Italian, French, or Latin out loud in real-time voice mode from any browser on your home Wi-Fi for $0.
3. **Tailscale Bridge (`RackNerd VPS <---> Jetson Orin Nano`):**
   - Install free `tailscale` on both machines so `n8n` on your RackNerd Cloud VM can send LLM / TTS / Whisper GPU tasks directly to your Jetson Orin Nano at home!
