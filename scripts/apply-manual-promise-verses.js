#!/usr/bin/env node

/**
 * Apply manually entered promise verses from template file
 *
 * Reads the promise-verses-X-Y.txt file and updates daily-promises.json
 *
 * Usage: node scripts/apply-manual-promise-verses.js promise-verses-1-50.txt
 */

const fs = require('fs');

const JSON_PATH = './src/daily-promises.json';
const TEMPLATE_FILE = process.argv[2] || './scripts/promise-verses-1-50.txt';

if (!fs.existsSync(TEMPLATE_FILE)) {
  console.error(`❌ Template file not found: ${TEMPLATE_FILE}`);
  console.error('');
  console.error('Usage: node scripts/apply-manual-promise-verses.js <template-file>');
  console.error('Example: node scripts/apply-manual-promise-verses.js promise-verses-1-50.txt');
  process.exit(1);
}

// Load JSON
let promises = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// Read template file
const templateContent = fs.readFileSync(TEMPLATE_FILE, 'utf8');

// Parse promises
const promiseRegex = /PROMISE_(\d+)_START[\s\S]*?TEXT:\s*([\s\S]*?)PROMISE_\1_END/g;
let match;
let updated = 0;
let skipped = 0;

console.log('='.repeat(80));
console.log('APPLYING MANUAL PROMISE VERSES');
console.log('='.repeat(80));
console.log('');

while ((match = promiseRegex.exec(templateContent)) !== null) {
  const promiseId = parseInt(match[1]);
  const verseText = match[2].trim();

  const promise = promises.find(p => p.id === promiseId);
  if (!promise) {
    console.log(`⚠️  Promise ${promiseId}: Not found in JSON`);
    continue;
  }

  if (!verseText || verseText.length < 10) {
    console.log(`⏭️  Promise ${promiseId}: Skipped (no text provided)`);
    skipped++;
    continue;
  }

  console.log(`✅ Promise ${promiseId}: ${promise.reference}`);
  console.log(`   Updated with: ${verseText.substring(0, 80)}...`);

  promise.verse = verseText;
  updated++;
}

// Write back to JSON
fs.writeFileSync(JSON_PATH, JSON.stringify(promises, null, 2), 'utf8');

console.log('');
console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`✅ Updated: ${updated} promises`);
console.log(`⏭️  Skipped: ${skipped} promises (no text provided)`);
console.log('');
console.log(`📝 JSON file updated: ${JSON_PATH}`);
console.log('='.repeat(80));
