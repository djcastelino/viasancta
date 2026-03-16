#!/usr/bin/env node

/**
 * Spot Check Random Church Fathers Citations
 * Tests 10 random vague citations to see if they're real
 */

const fs = require('fs');
const path = require('path');

const analysisPath = path.join(__dirname, '../CHURCH-FATHERS-ANALYSIS.json');
const analysis = JSON.parse(fs.readFileSync(analysisPath, 'utf8'));

console.log('🎲 Selecting 10 random vague citations to verify...\n');
console.log('='.repeat(70));

// Randomly select 10 vague citations
const vague = analysis.vague;
const sample = [];
const usedIndices = new Set();

while (sample.length < Math.min(10, vague.length)) {
  const randomIndex = Math.floor(Math.random() * vague.length);
  if (!usedIndices.has(randomIndex)) {
    usedIndices.add(randomIndex);
    sample.push(vague[randomIndex]);
  }
}

console.log('\n📋 CITATIONS TO MANUALLY VERIFY:\n');
console.log('For each citation below, check if it\'s real and relevant:\n');

sample.forEach((item, index) => {
  console.log(`${index + 1}. Day ${item.day}: ${item.title}`);
  console.log(`   Citation: ${item.source}`);
  console.log(`   Verify at: ${item.newAdventUrl || 'https://www.newadvent.org/fathers/'}`);
  console.log(`   Theme: ${item.title}`);
  console.log('');
});

console.log('='.repeat(70));
console.log('\n🔍 HOW TO VERIFY:\n');
console.log('1. Go to New Advent URL above');
console.log('2. Search for the author/work mentioned');
console.log('3. Check if citation exists');
console.log('4. Verify if content matches the theme');
console.log('\n✅ If 8+ out of 10 are correct → Keep vague citations');
console.log('⚠️  If 4-7 are correct → Mark as "approximate"');
console.log('❌ If 0-3 are correct → Remove vague citations');

// Save sample for reference
const samplePath = path.join(__dirname, '../SPOT-CHECK-SAMPLE.json');
fs.writeFileSync(samplePath, JSON.stringify(sample, null, 2));
console.log(`\n📄 Sample saved to: SPOT-CHECK-SAMPLE.json`);

console.log('\n💡 QUICK TEST OPTION:');
console.log('   Want me to check these for you?');
console.log('   I can look them up and tell you if they\'re real!');
