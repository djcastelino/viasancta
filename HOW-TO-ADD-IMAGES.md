# 📸 How to Add Miracle Images

Your image gallery is **ready to go!** Here's how to add images from miracolieucaristici.org:

---

## 🎯 Quick Start (3 Easy Steps)

### **Step 1: Download Images**
1. Go to https://www.miracolieucaristici.org
2. Find the miracle (e.g., Lanciano)
3. Right-click images → "Save Image As..."
4. Save to: `/public/images/miracles/`
5. Name them clearly: `lanciano-1.jpg`, `lanciano-2.jpg`, etc.

### **Step 2: Update JSON**
Open `src/eucharistic-miracles.json` and find your miracle:

```json
{
  "id": "lanciano-750",
  "name": "Miracle of Lanciano",
  "images": [
    {
      "url": "/images/miracles/lanciano-1.jpg",
      "alt": "The sacred host that became flesh in Lanciano"
    },
    {
      "url": "/images/miracles/lanciano-2.jpg",
      "alt": "Scientific examination of the Eucharistic relic"
    }
  ]
}
```

### **Step 3: Refresh & See!**
- Refresh the miracle page: http://localhost:3000/miracles/lanciano-750
- Your images will appear in a beautiful gallery! 📸✨

---

## 📁 Folder Structure

Create this folder structure:
```
public/
  └── images/
      └── miracles/
          ├── lanciano-1.jpg
          ├── lanciano-2.jpg
          ├── buenos-aires-1.jpg
          ├── buenos-aires-2.jpg
          └── ...
```

---

## 🎨 Gallery Features (Already Built!)

### **What Users See:**
- ✅ Responsive grid (1-3 columns)
- ✅ Click image → View full size
- ✅ Navigation arrows (← →)
- ✅ Image captions
- ✅ Smooth animations
- ✅ Mobile-friendly

### **Layout:**
- **1 image**: Full-width display
- **2 images**: 2-column grid
- **3+ images**: 3-column grid

---

## 📝 JSON Format Examples

### **Single Image:**
```json
"images": [
  {
    "url": "/images/miracles/lanciano-1.jpg",
    "alt": "The sacred Eucharistic host preserved in Lanciano since 750 AD"
  }
]
```

### **Multiple Images:**
```json
"images": [
  {
    "url": "/images/miracles/buenos-aires-1.jpg",
    "alt": "The consecrated host that became flesh and blood in Buenos Aires"
  },
  {
    "url": "/images/miracles/buenos-aires-2.jpg",
    "alt": "Cardinal Bergoglio (later Pope Francis) investigating the miracle"
  },
  {
    "url": "/images/miracles/buenos-aires-3.jpg",
    "alt": "Scientific analysis results showing human heart tissue"
  }
]
```

### **No Images Yet:**
```json
"images": []
```
Gallery won't display if empty - no problem!

---

## 🚀 Recommended Workflow

### **Option 1: Do High-Priority Miracles First**
1. Start with famous miracles (Lanciano, Buenos Aires, Sokółka)
2. Add 2-3 images per miracle
3. Test and verify
4. Move to next batch

### **Option 2: Batch by Country**
1. Download all Italy miracles first
2. Then Poland, then France, etc.
3. Organize by country folders

### **Option 3: One at a Time**
- Add images as you discover great ones
- No rush - gallery is ready whenever!

---

## 💡 Tips for Good Images

### **What to Download:**
✅ **Main Relic Photos**: The actual Eucharistic host/blood
✅ **Scientific Images**: Lab analysis, microscope views
✅ **Church Interior**: Where the miracle is preserved
✅ **Historical Documents**: Original records (if clear)

### **Image Quality:**
- ✅ High resolution (at least 800px wide)
- ✅ Clear, well-lit photos
- ✅ Authentic from miracolieucaristici.org
- ✅ JPG or PNG format

### **Naming Convention:**
```
{miracle-id}-{number}.jpg

Examples:
- lanciano-1.jpg
- lanciano-2.jpg
- buenos-aires-1.jpg
- sokolka-1.jpg
```

---

## 🎯 Example: Adding Lanciano Images

### **1. Download from Website:**
- Go to miracolieucaristici.org/en/lista/scheda_en.html?nat=italia&wh=lanciano
- Download 2-3 best images
- Save to `/public/images/miracles/`

### **2. Edit JSON:**
```json
{
  "id": "lanciano-750",
  "name": "Miracle of Lanciano",
  "location": {
    "city": "Lanciano",
    "country": "Italy",
    "coordinates": { "lat": 42.2333, "lng": 14.3833 }
  },
  "date": {
    "year": 750,
    "displayDate": "8th Century"
  },
  "description": "In the 8th century, a Basilian monk doubted...",
  "images": [
    {
      "url": "/images/miracles/lanciano-1.jpg",
      "alt": "The consecrated host that became flesh"
    },
    {
      "url": "/images/miracles/lanciano-2.jpg",
      "alt": "The wine that became blood, preserved in a chalice"
    }
  ],
  "sources": ["miracolieucaristici.org"]
}
```

### **3. Test:**
Visit: http://localhost:3000/miracles/lanciano-750

You should see:
```
🎧 Listen to the Story
    [Audio player]

📸 Sacred Images
    [Image 1] [Image 2]
    Click image to view full size

📖 About This Miracle
    [Description text]
```

---

## ✨ Already Working!

The gallery is **100% ready**. Just add images to:
1. `/public/images/miracles/` folder
2. Update `images` array in JSON
3. Refresh page

That's it! 🎉

---

## 🙋 Questions?

**Q: What if I don't have images yet?**
A: No problem! Gallery hides automatically if `images: []` is empty.

**Q: Can I add more later?**
A: Yes! Add images anytime - one miracle at a time or in batches.

**Q: What if image doesn't load?**
A: Check file path matches JSON exactly (case-sensitive!).

**Q: How many images per miracle?**
A: Recommend 2-4 images. Gallery handles any number!

---

**Start with your favorite miracle and see the gallery in action! 📸🙏**
