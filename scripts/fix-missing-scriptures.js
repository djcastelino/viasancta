#!/usr/bin/env node

/**
 * Fix Missing Scripture Texts
 * Fetches actual Bible verses from API.Bible
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// API.Bible provides free Bible access
// You can use: https://scripture.api.bible or https://bible-api.com (no key required)

async function fetchScripture(reference) {
  return new Promise((resolve, reject) => {
    // Using bible-api.com (no key required, NABRE available)
    // Format: https://bible-api.com/1+Samuel+3:19-20
    const cleanRef = reference.replace(/\s+/g, '+');
    const url = `https://bible-api.com/${cleanRef}?translation=nabre`;

    console.log(`  Fetching: ${reference}`);

    https.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.text) {
            // Clean up the text (remove verse numbers, extra whitespace)
            const cleanText = json.text
              .replace(/\[\d+:\d+\]/g, '') // Remove [1:1] style markers
              .replace(/\d+:\d+\s*/g, '') // Remove 1:1 style markers
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim();
            resolve(cleanText);
          } else {
            reject(new Error(`No text found for ${reference}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function fixEntry(entry) {
  if (entry.otText && (entry.otText.includes("couldn") || entry.otText.includes("We couldn") || entry.otText === "We couldn't find this page.")) {
    console.log(`\nDay ${entry.dayOfYear}: ${entry.title}`);
    console.log(`  Reference: ${entry.otReference}`);

    try {
      const scripture = await fetchScripture(entry.otReference);
      entry.otText = scripture;
      console.log(`  ✅ Fixed!`);
      return true;
    } catch (error) {
      console.log(`  ❌ Failed: ${error.message}`);
      console.log(`  📝 Manual fix needed for: ${entry.otReference}`);
      return false;
    }
  }
  return false;
}

async function main() {
  console.log('🔧 Fixing missing scripture texts...\n');

  const entriesNeedingFix = data.filter(e =>
    e.otText && (e.otText.includes("couldn") || e.otText.includes("We couldn") || e.otText === "We couldn't find this page.")
  );

  console.log(`Found ${entriesNeedingFix.length} entries needing fixes\n`);

  let fixed = 0;
  let failed = 0;

  for (const entry of entriesNeedingFix) {
    const success = await fixEntry(entry);
    if (success) {
      fixed++;
    } else {
      failed++;
    }
    // Rate limit: wait 500ms between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Fixed: ${fixed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏳ Total processed: ${entriesNeedingFix.length}`);

  if (fixed > 0) {
    // Backup original
    const backupPath = path.join(__dirname, '../public/jesus-in-ot-backup.json');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(dataPath, backupPath);
      console.log(`\n💾 Original backed up to: jesus-in-ot-backup.json`);
    }

    // Save fixed data
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`💾 Fixed data saved to: jesus-in-ot.json`);
  }

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} entries still need manual fixing`);
    console.log('Check the log above for which references failed');
  }
}

main().catch(console.error);
