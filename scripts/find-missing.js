#!/usr/bin/env node

/**
 * Find missing miracles by comparing current JSON with reference list
 */

const fs = require('fs');
const path = require('path');

// Read current miracles
const miraclesPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const miracles = JSON.parse(fs.readFileSync(miraclesPath, 'utf8'));

// Extract simplified list from current JSON
const currentList = miracles.map(m => {
  const city = m.location.city.toLowerCase();
  const year = m.date.year;
  return { city, year, name: m.name };
});

// Reference list based on Carlo Acutis (missing from reference = potentially missing from JSON)
const shouldHave = [
  // Check if these are missing
  { city: "liège", year: 1374, name: "Liège, Belgium" },
  { city: "paray-le-monial", name: "Sacred Heart Revelations (Paray-le-Monial), France" },
  { city: "fatima", year: 1916, name: "Fatima - Angel of Peace, Portugal" },
  { city: "balasar", year: 1942, name: "Balasar - Alexandrina da Costa, Portugal" },
  // Add more suspected missing ones here
];

console.log('=== QUICK MISSING CHECK ===\n');

console.log('Checking for potentially missing miracles...\n');

shouldHave.forEach(ref => {
  const found = currentList.find(c =>
    c.city.includes(ref.city) || ref.city.includes(c.city)
  );

  if (!found) {
    console.log(`❌ MISSING: ${ref.name}`);
  } else {
    console.log(`✓ Found: ${ref.name}`);
  }
});

console.log('\n=== SPECIFIC CHECKS ===\n');

// Check for Liège
const liege = currentList.filter(m => m.city.includes('liège') || m.city.includes('liege'));
console.log(`Liège miracles: ${liege.length}`);
if (liege.length === 0) {
  console.log('  ❌ Missing: Liège, Belgium (1374)');
}

// Check for Paray-le-Monial (Sacred Heart)
const paray = currentList.filter(m =>
  m.city.includes('paray') || m.name.includes('Sacred Heart')
);
console.log(`\nParay-le-Monial / Sacred Heart: ${paray.length}`);
paray.forEach(p => console.log(`  - ${p.name}`));
if (paray.length === 0) {
  console.log('  ⚠️  Check if Sacred Heart revelations are included');
}

// Check Fatima Angel
const fatimaAngel = currentList.filter(m =>
  m.name.includes('Fatima') || m.name.includes('Angel of Peace')
);
console.log(`\nFatima / Angel of Peace: ${fatimaAngel.length}`);
fatimaAngel.forEach(p => console.log(`  - ${p.name}`));

// Check Alexandrina
const alexandrina = currentList.filter(m =>
  m.name.includes('Alexandrina')
);
console.log(`\nAlexandrina da Costa: ${alexandrina.length}`);
alexandrina.forEach(p => console.log(`  - ${p.name}`));

// Count all Portugal entries
const portugal = miracles.filter(m => m.location.country === 'Portugal');
console.log(`\nTotal Portugal miracles: ${portugal.length}`);
console.log('Should have: 3 (Santarém, Alexandrina/Balasar, Angel of Peace/Fatima)');
portugal.forEach(p => console.log(`  - ${p.name}`));

// Check Austria
const austria = miracles.filter(m => m.location.country === 'Austria');
console.log(`\nTotal Austria miracles: ${austria.length}`);
console.log('Should have: 3 location miracles (Fiecht, Seefeld, Weiten-Raxendorf)');
console.log('Plus saints like Stanislaus Kostka might be counted separately');
austria.forEach(p => console.log(`  - ${p.name}`));

// Check Belgium
const belgium = miracles.filter(m => m.location.country === 'Belgium');
console.log(`\nTotal Belgium miracles: ${belgium.length}`);
console.log('Should have: 7 (Bois-Seigneur-Isaac, Bruges, Brussels, Herentals, Herkenrode-Hasselt, Liège, Middleburg-Lovanio)');
belgium.forEach(p => console.log(`  - ${p.name}`));

console.log('\n=== ACTION ITEMS ===\n');
console.log('1. Visit https://www.miracolieucaristici.org/en/Liste/list.html');
console.log('2. Manually go through each country section');
console.log('3. For each miracle listed there, search your JSON to verify it exists');
console.log('4. Look especially at:');
console.log('   - Belgium: Check if Liège (1374) is present');
console.log('   - France: Check if Sacred Heart/Paray-le-Monial variations');
console.log('   - Portugal: Verify Fatima Angel entry exists');
console.log('   - Check for duplicates or naming variations\n');

console.log('Current: 129 miracles');
console.log('Target: 136 miracles');
console.log('Missing: 7 miracles\n');
