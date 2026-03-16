#!/usr/bin/env node

/**
 * Export Missing Scriptures to CSV for Manual Fixing
 * Creates a spreadsheet you can easily fill in
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('📋 Exporting missing scriptures to CSV...\n');

const entriesNeedingFix = data.filter(e =>
  e.otText && (e.otText.includes("couldn") || e.otText === "We couldn't find this page.")
);

console.log(`Found ${entriesNeedingFix.length} entries needing fixes\n`);

// Create CSV
let csv = 'Day,Title,Reference,CurrentText,NewText (fill this in),BibleGatewayLink\n';

entriesNeedingFix.forEach(entry => {
  const day = entry.dayOfYear;
  const title = entry.title.replace(/,/g, ';'); // Escape commas
  const ref = entry.otReference;
  const current = entry.otText.substring(0, 30);

  // Create BibleGateway link for easy lookup
  const bgLink = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(ref)}&version=NABRE`;

  csv += `${day},"${title}","${ref}","${current}","",${bgLink}\n`;
});

// Save CSV
const csvPath = path.join(__dirname, '../JESUS-OT-MISSING-SCRIPTURES.csv');
fs.writeFileSync(csvPath, csv);

console.log(`✅ CSV exported to: JESUS-OT-MISSING-SCRIPTURES.csv`);
console.log(`\n📝 Instructions:`);
console.log(`1. Open the CSV in Excel/Google Sheets`);
console.log(`2. Click the BibleGateway links to open each scripture`);
console.log(`3. Copy the verse text from BibleGateway (NABRE translation)`);
console.log(`4. Paste into the "NewText" column`);
console.log(`5. Save the CSV`);
console.log(`6. Run: node scripts/import-fixed-scriptures.js`);
console.log(`\n💡 Tip: You can also use https://www.usccb.org/bible for NABRE`);
