#!/usr/bin/env node

/**
 * Option A: Remove All Non-CCC Citations
 * Keep ONLY CCC references (100% reliable)
 * Remove all Church Fathers and other citations
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🧹 Removing all non-CCC citations...\n');
console.log('='.repeat(70));

let totalRemoved = 0;
let totalKept = 0;

// Filter sources to keep only CCC references
const filteredData = data.map((entry) => {
  const originalCount = entry.sources.length;

  // Keep only sources that start with "CCC"
  const filteredSources = entry.sources.filter(source =>
    source.trim().startsWith('CCC')
  );

  const removedCount = originalCount - filteredSources.length;
  const keptCount = filteredSources.length;

  totalRemoved += removedCount;
  totalKept += keptCount;

  if (removedCount > 0) {
    console.log(`Day ${entry.dayOfYear}: ${entry.title}`);
    console.log(`  Removed: ${removedCount}, Kept: ${keptCount} CCC references`);
  }

  return {
    ...entry,
    sources: filteredSources
  };
});

// Write filtered data back
fs.writeFileSync(dataPath, JSON.stringify(filteredData, null, 2));

console.log('='.repeat(70));
console.log('\n✅ COMPLETE!\n');
console.log(`Total citations removed: ${totalRemoved}`);
console.log(`Total CCC citations kept: ${totalKept}`);
console.log(`\nResult: Only verified CCC references remain.`);
console.log('All Church Fathers citations have been removed.');
console.log('\n📁 Updated: public/jesus-in-ot.json');
