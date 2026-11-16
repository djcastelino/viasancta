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

### Step C: Live HTTPS URLs & Configured Website IDs (Deployed on `automation-hub` / `192.227.172.231`)
1. **Free Forever HTTPS URLs (Powered by `sslip.io` + `caddy-https-gateway` Let's Encrypt):**
   - **n8n Automation Hub:** `https://n8n.192-227-172-231.sslip.io` *(Direct port fallback: `http://192.227.172.231:5678`)*
   - **Umami Analytics Dashboard:** `https://stats.192-227-172-231.sslip.io` *(Direct port fallback: `http://192.227.172.231:3005`)*
     - **Public Share View (Divine Pilgrim):** `https://stats.192-227-172-231.sslip.io/share/divinepilgrim`
     - **Public Share View (Geonauts Guide):** `https://stats.192-227-172-231.sslip.io/share/geonautsguide`
   - **Reels Public Media Server (Meta/YouTube HTTPS Video Host):** `https://reels.192-227-172-231.sslip.io` *(Direct port fallback: `http://192.227.172.231:3006`)*
     - **Sample Rendered 9:16 Reel:** `https://reels.192-227-172-231.sslip.io/xavier_case1_reel.mp4`
2. **Umami Login Credentials:**
   - **Username:** `admin`
   - **Password:** `umami` *(Change anytime under Profile -> Password)*
3. **Registered Website IDs (First-Party Proxied via `/api/umami`):**
   - **Divine Pilgrim (`divinepilgrim.com`):** `722f5bca-d797-4466-8481-393aa336273b`
   - **Geonauts Guide (`geonautsguide.com`):** `ba735871-038d-4bd1-9e74-af1da4dfc727`

---

## 3. Multi-Project `automation-hub` Workspace & Automated 9:16 Reels Pipeline

### Server & Container Naming
- **Linux Hostname:** `automation-hub`
- **Containers on `automation-hub-net` Docker Network:**
  - `caddy-https-gateway` (Ports `80` & `443` — automatic Let's Encrypt TLS for `*.192-227-172-231.sslip.io`)
  - `n8n-automation-hub` (Port `5678` — mounts `/opt/automation-hub` inside container at `/data/automation-hub`)
  - `umami` (Port `3005`) & `umami-db` (`postgres:15-alpine`, reachable from `n8n` at host `umami-db`, port `5432`, user `umami`, password `umami_secret_db_pass`, db `umami`)
  - `reels-media-server` (Port `3006` — serves `/opt/automation-hub/public-media/reels` over HTTPS for Instagram/Facebook Graph API pulls)

### Modular Folder Layout (`/opt/automation-hub` -> `/data/automation-hub` in n8n)
- `/opt/automation-hub/shared-tools/query-umami-stats.sh`: Queries `umami-db` PostgreSQL and outputs a JSON report of 24-hour & 7-day visitors, pageviews, and countries across all sites.
- `/opt/automation-hub/shared-tools/generate-reel.sh`: General-purpose `ffmpeg` 9:16 (`1080x1920`) vertical video generator (takes any image, voice MP3, optional background music MP3, title, subtitle, and footer CTA, and outputs a broadcast-ready H.264/AAC `.mp4` to `/opt/automation-hub/public-media/reels/`).
- `/opt/automation-hub/projects/divinepilgrim/`: Synced assets for Divine Pilgrim (`viasancta`).
- `/opt/automation-hub/projects/geonautsguide/`: Workspace for Geonauts Guide automations.
- `/opt/automation-hub/projects/general/`: Workspace for future unrelated projects.

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
