# 🎵 Background Music Setup Guide

## ✅ **Fixed: Music Now Works!**

The background music URL has been updated to use **Bensound** (a working royalty-free music service).

Current music: **"Slow Motion"** by Bensound (ambient/peaceful)

---

## 🎼 **Want to Use Your Own Sacred Music?**

### **Option 1: Use a Local File (RECOMMENDED)**

1. **Find or create sacred background music:**
   - Gregorian chant
   - Sacred organ music
   - Peaceful instrumental (violin, cello)
   - Adoration music

2. **Convert to MP3** (if needed):
   - Keep file size under 5MB
   - Bitrate: 128kbps is enough for background music

3. **Add to your project:**
   ```bash
   # Place your file here:
   /Users/dcasteli/Documents/pda/viasancta/public/audio/background-music.mp3
   ```

4. **Update the code:**
   - Open: `/Users/dcasteli/Documents/pda/viasancta/app/miracles/[id]/page.tsx`
   - Find line ~159
   - Change:
     ```typescript
     const bgMusic = new Audio('https://www.bensound.com/bensound-music/bensound-slowmotion.mp3');
     ```
   - To:
     ```typescript
     const bgMusic = new Audio('/audio/background-music.mp3');
     ```

5. **Commit and push:**
   ```bash
   cd /Users/dcasteli/Documents/pda/viasancta
   git add public/audio/background-music.mp3
   git add app/miracles/[id]/page.tsx
   git commit -m "Add custom sacred background music"
   git push
   ```

---

### **Option 2: Use External URL**

If you have music hosted elsewhere (YouTube Audio Library, SoundCloud, etc.):

```typescript
const bgMusic = new Audio('YOUR_MP3_URL_HERE');
```

**Test the URL first:**
```bash
curl -I "YOUR_URL" | head -5
```

Look for: `HTTP/2 200` or `HTTP/1.1 200`

---

## 🎧 **Free Sacred Music Sources**

### 1. **YouTube Audio Library**
- URL: https://www.youtube.com/audiolibrary
- Filter: "Ambient" or "Classical"
- License: Free to use (check attribution)

### 2. **Free Music Archive**
- URL: https://freemusicarchive.org
- Search: "Sacred", "Gregorian", "Organ"
- License: Various (check each track)

### 3. **Pixabay Music** (if you have an account)
- URL: https://pixabay.com/music/
- Many ambient/peaceful tracks
- Free with attribution

### 4. **Bensound** (Current)
- URL: https://www.bensound.com
- License: Free with attribution
- Great for ambient/peaceful music

---

## 🎚️ **Adjusting Volume**

The background music is set to **20% volume** by default.

To change it:
1. Open: `app/miracles/[id]/page.tsx`
2. Find line ~176:
   ```typescript
   fadeInMusic(bgMusic, 0.2);  // 0.2 = 20%
   ```
3. Change the value:
   - `0.1` = 10% (very quiet)
   - `0.15` = 15% (subtle)
   - `0.2` = 20% (current)
   - `0.3` = 30% (more prominent)

---

## 🐛 **Troubleshooting**

### **No music playing?**

1. **Check browser console** (F12):
   - Look for errors like "Failed to load" or "CORS error"
   - Should see: "Background music started successfully"

2. **Test the URL:**
   ```bash
   curl -I "YOUR_MUSIC_URL"
   ```
   - Should return `200 OK`
   - If `403 Forbidden` → URL is blocked
   - If `404 Not Found` → Wrong URL

3. **Browser autoplay restrictions:**
   - Some browsers block autoplay
   - Music will only start AFTER user clicks "Play Narration"
   - This is normal and expected

4. **Check file path** (if using local file):
   ```
   /public/audio/background-music.mp3
   
   Should be accessible at:
   https://viasancta.vercel.app/audio/background-music.mp3
   ```

---

## 📋 **Recommended Sacred Music**

### **Eucharistic Miracles:**
- "Adoro Te Devote" (instrumental)
- "Tantum Ergo" (organ)
- Peaceful organ adoration music

### **Marian Apparitions:**
- "Ave Maria" (instrumental)
- Gentle harp or strings
- Peaceful rosary music

### **Stations of the Cross:**
- Solemn organ music
- Gregorian chant
- Contemplative strings

### **All Tours (General):**
- Ambient sacred music
- Peaceful instrumental
- Gentle piano or organ

---

## 🎼 **Music Specifications**

| Property | Recommended | Notes |
|----------|-------------|-------|
| **Format** | MP3 | Best browser support |
| **Duration** | 30+ seconds | Will loop automatically |
| **Bitrate** | 128kbps | Good quality, small file |
| **File Size** | < 5MB | Faster loading |
| **Style** | Ambient/Sacred | Won't distract from narration |
| **Volume** | Moderate | App reduces to 20% |

---

## ✅ **Current Status**

- ✅ Background music is **enabled**
- ✅ Using **Bensound - Slow Motion** (working URL)
- ✅ Fades in/out smoothly
- ✅ Volume set to 20%
- ✅ Auto-loops during narration
- ✅ Stops when narration ends

---

## 🚀 **Next Steps**

1. **Test the current music:**
   - Deploy and listen
   - Check if the style fits

2. **Replace with sacred music** (optional):
   - Follow "Option 1" above
   - Use Gregorian chant or organ music

3. **Adjust volume** (if needed):
   - Change from 20% to your preference

🙏 **Enjoy your sacred audio experience!** 🎶

