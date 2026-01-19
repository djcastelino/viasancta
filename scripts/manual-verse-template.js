#!/usr/bin/env node

/**
 * Generate a template for manually updating Bible verses
 *
 * This creates a text file listing all verses that need updating,
 * making it easy to copy/paste from Bible websites.
 *
 * Usage: node scripts/manual-verse-template.js [start] [end]
 */

const fs = require('fs');

const JSON_PATH = './public/jesus-in-ot.json';
const START_ID = parseInt(process.argv[2]) || 1;
const END_ID = parseInt(process.argv[3]) || 50;
const OUTPUT_FILE = `./scripts/verses-${START_ID}-${END_ID}.txt`;

// Load JSON
const entries = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// Generate template
let output = [];
output.push('='.repeat(80));
output.push(`MANUAL BIBLE VERSE UPDATE TEMPLATE (Entries ${START_ID}-${END_ID})`);
output.push('='.repeat(80));
output.push('');
output.push('Instructions:');
output.push('1. For NABRE verses: Visit https://bible.usccb.org');
output.push('2. For RSV-CE verses: Visit https://www.biblegateway.com/?version=RSVCE');
output.push('3. Search for each reference below');
output.push('4. Copy the verse text and paste after "TEXT: "');
output.push('5. Save this file');
output.push('6. Run: node scripts/apply-manual-verses.js');
output.push('');
output.push('='.repeat(80));
output.push('');

for (let id = START_ID; id <= END_ID; id++) {
  const entry = entries.find(e => e.id === id);
  if (!entry) continue;

  output.push('');
  output.push(`ENTRY_${id}_START`);
  output.push(`Title: ${entry.title}`);
  output.push(`Reference: ${entry.otReference}`);
  output.push(`Translation: ${entry.bibleTranslation}`);
  output.push(`Current Text: ${entry.otText.substring(0, 100)}...`);
  output.push('');
  output.push(`TEXT: `);
  output.push('');
  output.push(`ENTRY_${id}_END`);
  output.push('-'.repeat(80));
}

// Write to file
fs.writeFileSync(OUTPUT_FILE, output.join('\n'), 'utf8');

console.log('='.repeat(80));
console.log('MANUAL VERSE TEMPLATE GENERATED');
console.log('='.repeat(80));
console.log('');
console.log(`✅ Template created: ${OUTPUT_FILE}`);
console.log('');
console.log('Next steps:');
console.log('1. Open the file in a text editor');
console.log('2. For each entry, copy the verse from the appropriate Bible website');
console.log('3. Paste it after "TEXT: "');
console.log('4. Save the file');
console.log('5. Run: node scripts/apply-manual-verses.js');
console.log('');
console.log('='.repeat(80));
