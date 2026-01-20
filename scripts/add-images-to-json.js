// Script to add Carlo Acutis image references to all miracles

const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const miracles = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Add image data to each miracle
const updatedMiracles = miracles.map(miracle => {
  // Only update if images array is empty
  if (!miracle.images || miracle.images.length === 0) {
    return {
      ...miracle,
      images: [
        {
          url: `/images/miracles/${miracle.id}.jpg`,
          source: "Carlo Acutis Eucharistic Miracles Exhibition",
          sourceUrl: "https://www.miracolieucaristici.org",
          credit: "Image courtesy of Carlo Acutis Eucharistic Miracles Exhibition",
          alt: `${miracle.name || `Eucharistic Miracle of ${miracle.location.city}`}`,
          type: "exhibition-panel"
        }
      ]
    };
  }
  return miracle;
});

// Write back to file
fs.writeFileSync(jsonPath, JSON.stringify(updatedMiracles, null, 2), 'utf8');

console.log(`✅ Updated ${updatedMiracles.length} miracles with image references`);
console.log(`\nNext steps:`);
console.log(`1. Download panel images from miracolieucaristici.org`);
console.log(`2. Save them to: public/images/miracles/[miracle-id].jpg`);
console.log(`3. Example: public/images/miracles/buenos-aires-1996.jpg`);

