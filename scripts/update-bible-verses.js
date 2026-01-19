#!/usr/bin/env node

/**
 * Update Bible verses in jesus-in-ot.json with NABRE/RSV-CE translations
 *
 * This script fetches verses from:
 * - NABRE: USCCB Bible (bible.usccb.org)
 * - RSV-CE: Bible Gateway or other authorized source
 *
 * Usage: node scripts/update-bible-verses.js [start] [end]
 * Example: node scripts/update-bible-verses.js 1 50
 */

const fs = require('fs');
const https = require('https');

const JSON_PATH = './public/jesus-in-ot.json';
const START_ID = parseInt(process.argv[2]) || 1;
const END_ID = parseInt(process.argv[3]) || 50;

// Load JSON
let entries = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

/**
 * Fetch verse from USCCB (NABRE translation)
 */
async function fetchNABRE(reference) {
  return new Promise((resolve, reject) => {
    // Parse reference (e.g., "Genesis 3:15" -> "genesis/3")
    const parts = reference.split(/[\s:]/);
    const book = parts[0].toLowerCase();
    const chapter = parts[1];

    const url = `https://bible.usccb.org/bible/${book}/${chapter}`;

    console.log(`  Fetching NABRE: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Parse HTML to extract verse text
        // This is a simplified parser - may need adjustment based on actual HTML structure
        try {
          const verseMatch = data.match(/<div class="content-body">([\s\S]*?)<\/div>/);
          if (verseMatch) {
            let text = verseMatch[1]
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/\s+/g, ' ')     // Normalize whitespace
              .trim();
            resolve(text);
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
 * Fetch verse from Bible Gateway (RSV-CE translation)
 */
async function fetchRSVCE(reference) {
  return new Promise((resolve, reject) => {
    // Bible Gateway format: https://www.biblegateway.com/passage/?search=Genesis+3:15&version=RSVCE
    const searchRef = encodeURIComponent(reference);
    const url = `https://www.biblegateway.com/passage/?search=${searchRef}&version=RSVCE`;

    console.log(`  Fetching RSV-CE: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Parse HTML to extract verse text
        try {
          const verseMatch = data.match(/<div class="passage-text">([\s\S]*?)<\/div>/);
          if (verseMatch) {
            let text = verseMatch[1]
              .replace(/<[^>]*>/g, '') // Remove HTML tags
              .replace(/\s+/g, ' ')     // Normalize whitespace
              .trim();
            resolve(text);
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
 * Delay between requests to be respectful to servers
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main function to update verses
 */
async function updateVerses() {
  console.log('='.repeat(80));
  console.log('UPDATING BIBLE VERSES');
  console.log('='.repeat(80));
  console.log(`Processing entries ${START_ID} to ${END_ID}\n`);

  let updated = 0;
  let failed = [];

  for (let id = START_ID; id <= END_ID; id++) {
    const entry = entries.find(e => e.id === id);
    if (!entry) {
      console.log(`⚠️  Entry ${id}: Not found`);
      continue;
    }

    console.log(`\nEntry ${id}: ${entry.title}`);
    console.log(`  Reference: ${entry.otReference}`);
    console.log(`  Translation: ${entry.bibleTranslation}`);

    try {
      let verseText = null;

      if (entry.bibleTranslation === 'NABRE') {
        verseText = await fetchNABRE(entry.otReference);
      } else if (entry.bibleTranslation === 'RSV-CE') {
        verseText = await fetchRSVCE(entry.otReference);
      }

      if (verseText) {
        entry.otText = verseText;
        updated++;
        console.log(`  ✅ Updated successfully`);
        console.log(`  Text preview: ${verseText.substring(0, 80)}...`);
      } else {
        failed.push({ id, title: entry.title, reason: 'Could not extract verse text' });
        console.log(`  ❌ Failed to extract verse text`);
      }

      // Be respectful - wait 2 seconds between requests
      await delay(2000);

    } catch (err) {
      failed.push({ id, title: entry.title, reason: err.message });
      console.log(`  ❌ Error: ${err.message}`);
    }
  }

  // Write updated JSON back to file
  fs.writeFileSync(JSON_PATH, JSON.stringify(entries, null, 2), 'utf8');

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully updated: ${updated} entries`);
  console.log(`❌ Failed: ${failed.length} entries`);

  if (failed.length > 0) {
    console.log('\nFailed entries:');
    failed.forEach(f => {
      console.log(`  - Entry ${f.id}: ${f.title}`);
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
