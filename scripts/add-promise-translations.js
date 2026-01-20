#!/usr/bin/env node

/**
 * Add Bible translation field to daily promises
 *
 * Rotates through 3 Catholic Bible translations:
 * - Good News Translation (GNT)
 * - NABRE (New American Bible Revised Edition)
 * - RSV-2CE (Revised Standard Version - Second Catholic Edition)
 *
 * Usage: node scripts/add-promise-translations.js
 */

const fs = require('fs');

const JSON_PATH = './src/daily-promises.json';

// Load promises
let promises = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

console.log('='.repeat(80));
console.log('ADDING BIBLE TRANSLATIONS TO DAILY PROMISES');
console.log('='.repeat(80));
console.log('');
console.log(`Total promises: ${promises.length}`);
console.log('');

// Add translation field to each promise
let updated = 0;
promises.forEach(promise => {
  // Rotate through 3 translations
  if (promise.id % 3 === 1) {
    promise.bibleTranslation = 'GNT'; // Good News Translation
  } else if (promise.id % 3 === 2) {
    promise.bibleTranslation = 'NABRE'; // New American Bible Revised Edition
  } else {
    promise.bibleTranslation = 'RSV-2CE'; // Revised Standard Version - Second Catholic Edition
  }
  updated++;
});

// Write back
fs.writeFileSync(JSON_PATH, JSON.stringify(promises, null, 2), 'utf8');

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`✅ Updated ${updated} promises with translation field`);
console.log('');
console.log('Translation distribution:');
const gnt = promises.filter(p => p.bibleTranslation === 'GNT').length;
const nabre = promises.filter(p => p.bibleTranslation === 'NABRE').length;
const rsvce = promises.filter(p => p.bibleTranslation === 'RSV-2CE').length;
console.log(`  GNT:     ${gnt} promises (IDs: 1, 4, 7, 10...)`);
console.log(`  NABRE:   ${nabre} promises (IDs: 2, 5, 8, 11...)`);
console.log(`  RSV-2CE: ${rsvce} promises (IDs: 3, 6, 9, 12...)`);
console.log('');
console.log('📝 JSON file updated:', JSON_PATH);
console.log('='.repeat(80));
