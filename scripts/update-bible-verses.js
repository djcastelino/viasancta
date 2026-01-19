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
    // Parse reference (e.g., "Genesis 3:15" or "Genesis 3:15-16")
    const parts = reference.split(/[\s:]/);
    const book = parts[0].toLowerCase();
    const chapter = parts[1];
    const verses = parts[2] ? parts[2].split('-')[0] : '1'; // Get first verse number

    const url = `https://bible.usccb.org/bible/${book}/${chapter}`;

    console.log(`  Fetching NABRE: ${url}`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          // USCCB uses a more complex structure - look for verse content area
          // Try multiple patterns to find verse text

          // Pattern 1: Look for content within main article or content area
          let text = null;

          // Find the main content section (between header and footer)
          const contentMatch = data.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
                              data.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                              data.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);

          if (contentMatch) {
            // Extract text and clean it up
            text = contentMatch[1]
              .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts
              .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')   // Remove styles
              .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')     // Remove head
              .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')       // Remove navigation
              .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '') // Remove header
              .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '') // Remove footer
              .replace(/<[^>]*>/g, ' ')                         // Remove all HTML tags
              .replace(/\[[^\]]*\]/g, '')                       // Remove footnote markers [a], [*], etc.
              .replace(/\s+/g, ' ')                             // Normalize whitespace
              .trim();

            // If we got a lot of text, it's probably the whole chapter
            // Try to extract just the verse(s) we need
            if (text.length > 500) {
              // Look for verse number patterns
              const versePattern = new RegExp(`${verses}[\\s:)]([^0-9]{50,200})`, 'i');
              const verseMatch = text.match(versePattern);
              if (verseMatch) {
                text = verseMatch[1].trim();
              } else {
                // Fallback: take first 200 characters of content
                text = text.substring(0, 200).trim() + '...';
              }
            }
          }

          if (text && text.length > 20) {
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
