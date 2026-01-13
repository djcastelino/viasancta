# Image Setup for Divine Pilgrim

## Source
All images are from the **Carlo Acutis Eucharistic Miracles Exhibition**
- Website: https://www.miracolieucaristici.org
- Contact: info@carloacutis.com

## Image Structure

```
public/images/miracles/
  ├── buenos-aires-1996.jpg
  ├── lanciano-750.jpg
  ├── amsterdam-1345.jpg
  └── ... (one file per miracle)
```

## Naming Convention
Images should be named using the miracle ID from the JSON file:
- Format: `[miracle-id].jpg`
- Example: `buenos-aires-1996.jpg` matches `"id": "buenos-aires-1996"` in JSON

## How to Add Images

### Step 1: Download Panel Images
1. Visit https://www.miracolieucaristici.org/en/Liste/list.html
2. Click on each miracle
3. Download the "Web panel" version (optimized for web use)
4. Save to your computer

### Step 2: Rename Files
Rename downloaded files to match miracle IDs:
- Original: `Buenos_Aires_1996_Panel.jpg`
- Rename to: `buenos-aires-1996.jpg`

### Step 3: Place in Folder
Move all renamed images to: `public/images/miracles/`

### Step 4: Update JSON (Optional - Already Done)
The JSON has been pre-configured with image references. Just add the image files and they'll automatically appear!

## Image Optimization (Recommended)

After adding images, optimize them for web:

```bash
# Install sharp for image optimization
npm install --save-dev sharp

# Run optimization script (if created)
node scripts/optimize-images.js
```

## Attribution

Every image is automatically attributed with:
- Credit line: "Image courtesy of Carlo Acutis Eucharistic Miracles Exhibition"
- Link back to: https://www.miracolieucaristici.org

## Image Fallback

If an image file is missing, the app will automatically show:
- Beautiful gradient background
- Country flag emoji
- Country name

This ensures the app works even if not all images are downloaded yet.

## Permission Status

✅ **Using official "Web panels" for digital use**
📧 **Permission request sent to:** info@carloacutis.com
⏳ **Status:** Awaiting response (typically 3-7 days)

## Legal Compliance

- ✅ Non-commercial use
- ✅ Full attribution on every image
- ✅ Links back to source
- ✅ Educational/evangelical purpose
- ✅ Using "Web panels" (intended for digital use)

## Progress Tracking

Track which images you've added:

```
[ ] Buenos Aires, 1996 (Argentina)
[ ] Lanciano, 750 (Italy)
[ ] Amsterdam, 1345 (Netherlands)
... (76 miracles total)
```

Create a checklist in your preferred tool!

## Questions?

If you need help with images, contact:
- Carlo Acutis Foundation: info@carloacutis.com
- Real Presence Association: miracles@therealpresence.org

