# 🔐 Google TTS API Key Setup

## ⚠️ SECURITY WARNING

**YOUR API KEY WAS TESTED AND WORKS!** However, you shared it publicly. Please:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your API key: `AIzaSyDLcDOKopyll9ByGplOcQ6sEUx3CYbLphU`
3. **Delete it or regenerate it immediately**
4. Create a new key and keep it secret!

---

## 🚀 Setting Up API Key in Vercel

### Step 1: Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new API key (or regenerate the old one)
3. **Copy the new key** (keep it secret!)

### Step 2: Add to Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Select `viasancta` project
3. Go to **Settings → Environment Variables**
4. Add new variable:
   - **Name:** `NEXT_PUBLIC_GOOGLE_TTS_API_KEY`
   - **Value:** Your new API key (paste it)
   - **Environment:** Production, Preview, Development (check all)
5. Click **Save**

### Step 3: Redeploy

After adding the environment variable:
- Vercel will automatically redeploy
- OR go to Deployments tab → Click "..." → Redeploy

---

## 💻 Using the API Key in Code

The app is already configured to use environment variables!

In your code:

```typescript
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY;

const ttsResponse = await fetch(
  `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
  // ... rest of the request
);
```

The `NEXT_PUBLIC_` prefix makes it available in the browser.

---

## 🧪 Testing Locally

### Option A: Create `.env.local` file

```bash
cd /Users/dcasteli/Documents/pda/viasancta
echo "NEXT_PUBLIC_GOOGLE_TTS_API_KEY=your_new_key_here" > .env.local
```

**Important:** `.env.local` is already in `.gitignore` - it won't be committed!

### Option B: Test without API key

The app works without the key - it just shows an error message explaining audio needs the key.

---

## 🎯 Update the Code

Current code has a placeholder. Update it:

**File:** `app/miracles/[id]/page.tsx`

**Change this line:**
```typescript
// OLD (line ~75):
`https://texttospeech.googleapis.com/v1/text:synthesize?key=YOUR_GOOGLE_API_KEY`,

// NEW:
`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY}`,
```

---

## ✅ Summary

1. ✅ Your API key **works** (tested successfully)
2. ⚠️ **Regenerate it** (was shared publicly)
3. ✅ Add new key to **Vercel environment variables**
4. ✅ Update code to use `process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY`
5. ✅ Deploy!

---

## 🔒 Security Best Practices

- ✅ Never share API keys
- ✅ Never commit API keys to Git
- ✅ Always use environment variables
- ✅ Regenerate keys if exposed
- ✅ Use API restrictions in Google Cloud (limit to your domain)

---

**Ready to secure your key and deploy?**

