#!/usr/bin/env node

/**
 * Apply manually entered verses from template file
 *
 * Reads the verses-X-Y.txt file and updates jesus-in-ot.json
 *
 * Usage: node scripts/apply-manual-verses.js verses-1-50.txt
 */

const fs = require('fs');

const JSON_PATH = './public/jesus-in-ot.json';
const TEMPLATE_FILE = process.argv[2] || './scripts/verses-1-50.txt';

if (!fs.existsSync(TEMPLATE_FILE)) {
  console.error(`❌ Template file not found: ${TEMPLATE_FILE}`);
  console.error('');
  console.error('Usage: node scripts/apply-manual-verses.js <template-file>');
  console.error('Example: node scripts/apply-manual-verses.js verses-1-50.txt');
  process.exit(1);
}

// Load JSON
let entries = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// Read template file
const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');

// Parse entries
const entryRegex = /ENTRY_(\d+)_START([\s\S]*?)TEXT:\s*([\s\S]*?)ENTRY_\1_END/g;
let match;
let updated = 0;
let skipped = 0;

console.log('='.repeat(80));
console.log('APPLYING MANUAL VERSES');
console.log('='.repeat(80));
console.log('');

while ((match = entryRegex.exec(templateContent)) !== null) {
  const entryId = parseInt(match[1]);
  const verseText = match[3].trim();

  const entry = entries.find(e => e.id === entryId);
  if (!entry) {
    console.log(`⚠️  Entry ${entryId}: Not found in JSON`);
    continue;
  }

  if (!verseText || verseText.length < 10) {
    console.log(`⏭️  Entry ${entryId}: Skipped (no text provided)`);
    skipped++;
    continue;
  }

  console.log(`✅ Entry ${entryId}: ${entry.title}`);
  console.log(`   Updated with: ${verseText.substring(0, 80)}...`);

  entry.otText = verseText;
  updated++;
}

// Write back to JSON
fs.writeFileSync(JSON_PATH, JSON.stringify(entries, null, 2), 'utf8');

console.log('');
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`✅ Updated: ${updated} entries`);
console.log(`⏭️  Skipped: ${skipped} entries (no text provided)`);
console.log('');
console.log(`📝 JSON file updated: ${JSON_PATH}`);
console.log('='.repeat(80));
