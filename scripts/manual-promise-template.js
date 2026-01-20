#!/usr/bin/env node

/**
 * Generate a template for manually updating Daily Promise verses
 *
 * Creates a text file listing all promises that need updating,
 * making it easy to copy/paste from Bible websites.
 *
 * Usage: node scripts/manual-promise-template.js [start] [end]
 */

const fs = require('fs');

const JSON_PATH = './src/daily-promises.json';
const START_ID = parseInt(process.argv[2]) || 1;
const END_ID = parseInt(process.argv[3]) || 50;
const OUTPUT_FILE = `./scripts/promise-verses-${START_ID}-${END_ID}.txt`;

// Load promises
const promises = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

// Generate template
let output = [];
output.push('='.repeat(80));
output.push(`MANUAL DAILY PROMISE VERSE UPDATE TEMPLATE (Promises ${START_ID}-${END_ID})`);
output.push('='.repeat(80));
output.push('');
output.push('Instructions:');
output.push('1. For GNT verses: Visit https://www.biblegateway.com/?version=GNT');
output.push('2. For NABRE verses: Visit https://bible.usccb.org');
output.push('3. For RSV-2CE verses: Visit https://www.biblegateway.com/?version=RSVCE');
output.push('4. Search for each reference below');
output.push('5. Copy the verse text and paste after "TEXT: "');
output.push('6. Save this file');
output.push('7. Run: node scripts/apply-manual-promise-verses.js');
output.push('');
output.push('='.repeat(80));
output.push('');

for (let id = START_ID; id <= END_ID; id++) {
  const promise = promises.find(p => p.id === id);
  if (!promise) continue;

  output.push('');
  output.push(`PROMISE_${id}_START`);
  output.push(`Reference: ${promise.reference}`);
  output.push(`Translation: ${promise.bibleTranslation}`);
  output.push(`Category: ${promise.category}`);
  output.push(`Current Text: ${promise.verse.substring(0, 100)}...`);
  output.push('');
  output.push(`TEXT: `);
  output.push('');
  output.push(`PROMISE_${id}_END`);
  output.push('-'.repeat(80));
}

// Write to file
fs.writeFileSync(OUTPUT_FILE, output.join('\n'), 'utf8');

console.log('='.repeat(80));
console.log('MANUAL PROMISE VERSE TEMPLATE GENERATED');
console.log('='.repeat(80));
console.log('');
console.log(`✅ Template created: ${OUTPUT_FILE}`);
console.log('');
console.log('Next steps:');
console.log('1. Open the file in a text editor');
console.log('2. For each promise, copy the verse from the appropriate Bible website');
console.log('3. Paste it after "TEXT: "');
console.log('4. Save the file');
console.log('5. Run: node scripts/apply-manual-promise-verses.js');
console.log('');
console.log('='.repeat(80));
