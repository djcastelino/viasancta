#!/usr/bin/env node

/**
 * Import Fixed Scriptures from CSV
 * Reads the filled-in CSV and updates the JSON
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const csvPath = path.join(__dirname, '../JESUS-OT-MISSING-SCRIPTURES.csv');

if (!fs.existsSync(csvPath)) {
  console.error('❌ CSV file not found!');
  console.error('Run: node scripts/export-missing-scriptures.js first');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const csvContent = fs.readFileSync(csvPath, 'utf8');

console.log('📥 Importing fixed scriptures from CSV...\n');

// Parse CSV (simple parser, handles quoted fields)
const lines = csvContent.split('\n');
const headers = lines[0].split(',');

let fixed = 0;
let skipped = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;

  // Simple CSV parse (handles quoted fields)
  const match = line.match(/^(\d+),"([^"]+)","([^"]+)","([^"]+)","([^"]*)"/);
  if (!match) continue;

  const [, day, title, ref, current, newText] = match;

  if (!newText || newText.trim() === '') {
    skipped++;
    continue;
  }

  // Find entry and update
  const entry = data.find(e => e.dayOfYear === parseInt(day));
  if (entry) {
    entry.otText = newText.trim();
    fixed++;
    console.log(`✅ Day ${day}: ${title.substring(0, 40)}...`);
  }
}

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed: ${fixed}`);
console.log(`⏭️  Skipped (empty): ${skipped}`);

if (fixed > 0) {
  // Backup original
  const backupPath = path.join(__dirname, '../public/jesus-in-ot-backup-before-fix.json');
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(dataPath, backupPath);
    console.log(`\n💾 Original backed up to: jesus-in-ot-backup-before-fix.json`);
  }

  // Save fixed data
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log(`💾 Fixed data saved to: jesus-in-ot.json`);
  console.log(`\n🎉 Done! Test your app to verify the fixes.`);
} else {
  console.log(`\n⚠️  No entries were fixed. Did you fill in the "NewText" column?`);
}
