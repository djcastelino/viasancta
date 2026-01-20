#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current miracles
const miraclesPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const miracles = JSON.parse(fs.readFileSync(miraclesPath, 'utf8'));

console.log('=== DETAILED VERIFICATION OF MISSING MIRACLES ===\n');
console.log(`Current JSON: ${miracles.length} miracles`);
console.log(`Target: 136 miracles`);
console.log(`Need to find: 7 missing miracles\n`);

// Check specific suspected missing miracles from website
const suspectedMissing = [
  { name: "Neuvy Saint Sepulcre", country: "France", year: 1257 },
  { name: "Scala", country: "Italy", year: 1732 },
  { name: "Poznan", country: "Poland", year: 1399 },
  { name: "Gorkum", country: "Spain/Netherlands", year: 1572, note: "You have this" },
  { name: "Liège 1374", country: "Belgium", year: 1374, note: "You have 1246 version" },
  { name: "Bruges", country: "Belgium", year: 1203, note: "You have 1256 version" },
  { name: "St. Nicholas of Flue", country: "Switzerland", year: 1417 },
  { name: "Saint Satyrus", country: "Italy", year: 300 },
  { name: "San Giovanni Bosco", country: "Italy", year: 1848 },
];

console.log('=== CHECKING SUSPECTED MISSING MIRACLES ===\n');

const actuallyMissing = [];
const foundButDifferent = [];

suspectedMissing.forEach(suspect => {
  // Normalize and search
  const found = miracles.find(m => {
    const cityMatch = m.location.city.toLowerCase().includes(suspect.name.toLowerCase()) ||
                      suspect.name.toLowerCase().includes(m.location.city.toLowerCase());
    const nameMatch = m.name.toLowerCase().includes(suspect.name.toLowerCase());
    return cityMatch || nameMatch;
  });

  if (!found) {
    actuallyMissing.push(suspect);
    console.log(`❌ MISSING: ${suspect.name}, ${suspect.country} (${suspect.year})`);
  } else {
    if (suspect.note) {
      foundButDifferent.push({ suspect, found: found.name });
      console.log(`⚠️  ${suspect.note}: ${suspect.name} - Found as "${found.name}"`);
    } else {
      console.log(`✓ Found: ${suspect.name}`);
    }
  }
});

console.log('\n=== CONFIRMED MISSING MIRACLES ===\n');
actuallyMissing.forEach((m, i) => {
  console.log(`${i + 1}. ${m.name}, ${m.country} (${m.year})`);
});

console.log(`\nTotal confirmed missing from this check: ${actuallyMissing.length}`);

// Now check for missing saints/mystics
console.log('\n=== CHECKING SAINTS & MYSTICS ===\n');

const saintsFromWebsite = [
  "Saint Margaret Mary Alacoque",
  "Saint Thomas Aquinas",
  "Saint Francis of Assisi",
  "Saint Bernard of Chiaravalle",
  "San Giovanni Bosco",
  "Saint Germaine Cousin",
  "Saint Egidio",
  "Saint Stanislaus Kostka",
  "Saint Faustina Kowalska",
  "Saint Satyrus",
  "Saint Catherine of Siena",
  "Blessed Alexandrina Maria da Costa",
  "Blessed Anne Catherine Emmerich",
  "Blessed Mary of the Passion",
  "Blessed Nicholas Steno",
  "St. Nicholas of Flue",
  "Anne-Louise Lateau",
  "Marthe Robin",
  "André Frossard",
  "Teresa Neumann"
];

const missingSaints = [];
saintsFromWebsite.forEach(saint => {
  const found = miracles.find(m =>
    m.name.toLowerCase().includes(saint.toLowerCase())
  );
  if (!found) {
    missingSaints.push(saint);
    console.log(`❌ Missing saint: ${saint}`);
  }
});

console.log(`\nMissing saints/mystics: ${missingSaints.length}`);

console.log('\n=== SUMMARY ===\n');
console.log(`Location miracles confirmed missing: ${actuallyMissing.length}`);
console.log(`Saints/mystics missing: ${missingSaints.length}`);
console.log(`TOTAL: ${actuallyMissing.length + missingSaints.length}`);

if (actuallyMissing.length + missingSaints.length >= 7) {
  console.log('\n✓ Found at least 7 missing miracles!');
}

console.log('\n=== THE MISSING 7 (MOST LIKELY) ===\n');
const finalMissing = [...actuallyMissing, ...missingSaints.map(s => ({ name: s, type: 'Saint' }))];
finalMissing.slice(0, 7).forEach((m, i) => {
  console.log(`${i + 1}. ${m.name} ${m.country ? `(${m.country}, ${m.year})` : '(Saint/Mystic)'}`);
});

console.log('\n');
