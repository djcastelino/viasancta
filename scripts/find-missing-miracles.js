#!/usr/bin/env node

/**
 * Script to identify missing Eucharistic miracles
 * Compares current JSON with the official Carlo Acutis list
 */

const fs = require('fs');
const path = require('path');

// Read current miracles
const miraclesPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const miracles = JSON.parse(fs.readFileSync(miraclesPath, 'utf8'));

console.log('=== CURRENT MIRACLES ANALYSIS ===\n');
console.log(`Total miracles in JSON: ${miracles.length}`);
console.log(`Target (Carlo Acutis): 136`);
console.log(`Missing: ${136 - miracles.length}\n`);

// Group by country
const byCountry = {};
miracles.forEach(m => {
  const country = m.location.country;
  if (!byCountry[country]) byCountry[country] = [];
  byCountry[country].push(m.name);
});

console.log('=== MIRACLES BY COUNTRY ===\n');
Object.keys(byCountry).sort().forEach(country => {
  console.log(`${country}: ${byCountry[country].length} miracles`);
  byCountry[country].forEach(name => {
    console.log(`  - ${name}`);
  });
  console.log();
});

// Known Carlo Acutis list (based on miracolieucaristici.org)
// This is a reference list - you'll need to verify against the actual website
const carloAcutisList = [
  'Buenos Aires, Argentina (1996)',
  'Fiecht, Austria (1310)',
  'Seefeld, Austria (1384)',
  'Weiten-Raxendorf, Austria (1411)',
  'Bois-Seigneur-Isaac, Belgium (1405)',
  'Bruges, Belgium (1203)',
  'Brussels, Belgium (1370)',
  'Herentals, Belgium (1412)',
  'Herkenrode-Hasselt, Belgium (1317)',
  'Liège, Belgium (1374)',
  'Middleburg-Lovanio, Belgium (1374)',
  'Tumaco, Colombia (1906)',
  'Ludbreg, Croatia (1411)',
  'St. Mary of Egypt, Egypt (4th-5th century)',
  'Scete, Egypt (3rd-5th century)',
  // Add more as you discover them from the website
];

console.log('=== NEXT STEPS ===\n');
console.log('1. Visit https://www.miracolieucaristici.org/en/Liste/list.html');
console.log('2. Manually count all miracles listed there');
console.log('3. Compare with the output above');
console.log('4. Identify which specific miracles are missing\n');

// Check for potential duplicates
console.log('=== CHECKING FOR DUPLICATES ===\n');
const ids = new Set();
const names = new Set();
const duplicates = [];

miracles.forEach(m => {
  if (ids.has(m.id)) {
    duplicates.push(`Duplicate ID: ${m.id}`);
  }
  ids.add(m.id);

  if (names.has(m.name)) {
    duplicates.push(`Duplicate Name: ${m.name}`);
  }
  names.add(m.name);
});

if (duplicates.length > 0) {
  console.log('Found duplicates:');
  duplicates.forEach(d => console.log(`  - ${d}`));
} else {
  console.log('No duplicates found ✓');
}

console.log('\n=== SUMMARY ===\n');
console.log(`Current: ${miracles.length} miracles`);
console.log(`Target: 136 miracles`);
console.log(`To add: ${136 - miracles.length} miracles\n`);
