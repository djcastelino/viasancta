# Stations of the Cross Setup Instructions

## Google Maps API Key Required

The Stations of the Cross feature uses Google Maps API for Street View integration.

### How to Get a Google Maps API Key (FREE):

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project** (or use existing)
   - Click "Select a project" → "New Project"
   - Name it: "Divine Pilgrim" or similar
   - Click "Create"

3. **Enable Required APIs**
   - Go to "APIs & Services" → "Library"
   - Search for and enable:
     - **Maps JavaScript API**
     - **Street View Static API**

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

5. **Restrict the API Key** (Recommended for security)
   - Click on your new API key
   - Under "Application restrictions":
     - Select "HTTP referrers"
     - Add: `localhost:3000/*` and your production domain
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose: Maps JavaScript API, Street View Static API
   - Click "Save"

6. **Add to Environment Variables**
   - Open `.env.local` in your project
   - Add this line:
     ```
     NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
     ```
   - Replace `YOUR_API_KEY_HERE` with your actual API key

7. **Restart the Development Server**
   ```bash
   npm run dev
   ```

## Free Tier Limits

Google Maps offers a generous free tier:
- **$200 monthly credit** (equivalent to ~28,000 map loads)
- Street View: First 28,000 loads/month are FREE
- For most apps, you won't exceed this limit

## Testing Without API Key

The page will still work without the API key, but Street View will show a placeholder.
All other features (navigation, audio meditations, text reading) work without the API key.

## Features

✅ **360° Street View** - Stand on the Via Dolorosa
✅ **14 Stations** - Complete traditional Stations of the Cross
✅ **Audio Meditations** - Professional narration with Azure TTS
✅ **Read Text** - Full meditation text for each station
✅ **Overview Map** - See the complete Via Dolorosa route
✅ **Station Navigation** - Click numbered buttons to jump to any station

## Troubleshooting

**Street View not loading?**
- Check that your API key is correctly added to `.env.local`
- Ensure Maps JavaScript API is enabled in Google Cloud Console
- Clear browser cache and restart dev server
- Check browser console for error messages

**"This page can't load Google Maps correctly"**
- Your API key may not be properly restricted
- Check billing is enabled in Google Cloud (even though you're on free tier)
- Verify the API key has no typos
