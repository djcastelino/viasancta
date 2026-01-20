#!/usr/bin/env node

/**
 * Update Daily Promise verses with GNT/NABRE/RSV-2CE translations
 *
 * This script fetches verses from:
 * - GNT: Bible Gateway (Good News Translation)
 * - NABRE: USCCB Bible (bible.usccb.org)
 * - RSV-2CE: Bible Gateway (Revised Standard Version - Second Catholic Edition)
 *
 * Usage: node scripts/update-promise-verses.js [start] [end]
 * Example: node scripts/update-promise-verses.js 1 50
 */

const fs = require('fs');
const https = require('https');

const JSON_PATH = './src/daily-promises.json';
const START_ID = parseInt(process.argv[2]) || 1;
const END_ID = parseInt(process.argv[3]) || 50;

// Load promises
let promises = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

/**
 * Fetch verse from USCCB (NABRE translation)
 */
async function fetchNABRE(reference) {
  return new Promise((resolve, reject) => {
    // Parse reference (e.g., "John 6:35" or "Matthew 11:28-30")
    const parts = reference.split(/[\s:]/);
    const book = parts[0].toLowerCase();
    const chapter = parts[1];
    const verses = parts[2] ? parts[2].split('-')[0] : '1';

    const url = `https://bible.usccb.org/bible/${book}/${chapter}`;

    console.log(`  Fetching NABRE: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // Find main content section
          const contentMatch = data.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                              data.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                              data.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

          if (contentMatch) {
            let text = contentMatch[1]
              .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
              .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
              .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
              .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
              .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
              .replace(/<[^>]*>/g, ' ')
              .replace(/\[[^\]]*\]/g, '')
              .replace(/\s+/g, ' ')
              .trim();

            // Try to extract specific verse
            if (text.length > 500) {
              const versePattern = new RegExp(`${verses}[\\s:)]([^0-9]{30,300})`, 'i');
              const verseMatch = text.match(versePattern);
              if (verseMatch) {
                text = verseMatch[1].trim();
              } else {
                text = text.substring(0, 200).trim();
              }
            }

            resolve(text || null);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Fetch verse from Bible Gateway (GNT or RSV-2CE)
 */
async function fetchBibleGateway(reference, version) {
  return new Promise((resolve, reject) => {
    // Bible Gateway format
    const searchRef = encodeURIComponent(reference);
    const url = `https://www.biblegateway.com/passage/?search=${searchRef}&version=${version}`;

    console.log(`  Fetching ${version}: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // Try to extract verse text from Bible Gateway HTML
          const verseMatch = data.match(/<div class="passage-text">[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/i) ||
                            data.match(/<span class="text[^"]*">([\s\S]*?)<\/span>/i);

          if (verseMatch) {
            let text = verseMatch[1]
              .replace(/<[^>]*>/g, '')
              .replace(/\s+/g, ' ')
              .trim();
            resolve(text || null);
          } else {
            resolve(null);
          }
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Delay between requests
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to update verses
 */
async function updateVerses() {
  console.log('='.repeat(80));
  console.log('UPDATING DAILY PROMISE VERSES');
  console.log('='.repeat(80));
  console.log(`Processing promises ${START_ID} to ${END_ID}\n`);

  let updated = 0;
  let failed = [];

  for (let id = START_ID; id <= END_ID; id++) {
    const promise = promises.find(p => p.id === id);
    if (!promise) {
      console.log(`⚠️  Promise ${id}: Not found`);
      continue;
    }

    console.log(`\nPromise ${id}: ${promise.reference}`);
    console.log(`  Translation: ${promise.bibleTranslation}`);

    try {
      let verseText = null;

      if (promise.bibleTranslation === 'NABRE') {
        verseText = await fetchNABRE(promise.reference);
      } else if (promise.bibleTranslation === 'GNT') {
        verseText = await fetchBibleGateway(promise.reference, 'GNT');
      } else if (promise.bibleTranslation === 'RSV-2CE') {
        verseText = await fetchBibleGateway(promise.reference, 'RSVCE');
      }

      if (verseText) {
        promise.verse = verseText;
        updated++;
        console.log(`  ✅ Updated successfully`);
        console.log(`  Text preview: ${verseText.substring(0, 80)}...`);
      } else {
        failed.push({ id, reference: promise.reference, reason: 'Could not extract verse text' });
        console.log(`  ❌ Failed to extract verse text`);
      }

      // Wait 2 seconds between requests
      await delay(2000);

    } catch (err) {
      failed.push({ id, reference: promise.reference, reason: err.message });
      console.log(`  ❌ Error: ${err.message}`);
    }
  }

  // Write updated JSON
  fs.writeFileSync(JSON_PATH, JSON.stringify(promises, null, 2), 'utf8');

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully updated: ${updated} promises`);
  console.log(`❌ Failed: ${failed.length} promises`);

  if (failed.length > 0) {
    console.log('\nFailed promises:');
    failed.forEach(f => {
      console.log(`  - Promise ${f.id}: ${f.reference}`);
      console.log(`    Reason: ${f.reason}`);
    });
  }

  console.log('\n📝 JSON file updated: ' + JSON_PATH);
  console.log('='.repeat(80));
}

// Run the script
updateVerses().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
