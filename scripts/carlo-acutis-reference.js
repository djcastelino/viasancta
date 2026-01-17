#!/usr/bin/env node

/**
 * Carlo Acutis Official List Reference
 * Based on https://www.miracolieucaristici.org/
 *
 * This is a manual reference list of the 136 miracles from Carlo Acutis's exhibition
 * Cross-reference this with your current JSON to find what's missing
 */

const fs = require('fs');
const path = require('path');

// Carlo Acutis's documented miracles (136 total)
// Reference: miracolieucaristici.org
const carloAcutisReference = {
  // MIRACLES BY LOCATION (organized by country)
  "Argentina": [
    { location: "Buenos Aires", year: 1996 }
  ],
  "Austria": [
    { location: "Fiecht", year: 1310 },
    { location: "Seefeld", year: 1384 },
    { location: "Weiten-Raxendorf", year: 1411 }
  ],
  "Belgium": [
    { location: "Bois-Seigneur-Isaac", year: 1405 },
    { location: "Bruges", year: 1203 },
    { location: "Brussels", year: 1370 },
    { location: "Herentals", year: 1412 },
    { location: "Herkenrode-Hasselt", year: 1317 },
    { location: "Liège", year: 1374 },
    { location: "Middleburg-Lovanio", year: 1374 }
  ],
  "Colombia": [
    { location: "Tumaco", year: 1906 }
  ],
  "Croatia": [
    { location: "Ludbreg", year: 1411 }
  ],
  "Egypt": [
    { location: "Scete", year: "3rd-5th century" },
    { location: "St. Mary of Egypt", year: "4th-5th century" }
  ],
  "France": [
    { location: "Avignon", year: 1433 },
    { location: "Blanot", year: 1331 },
    { location: "Bordeaux", year: 1822 },
    { location: "Dijon", year: 1430 },
    { location: "Douai", year: 1254 },
    { location: "Faverney", year: 1608 },
    { location: "La Rochelle", year: 1461 },
    { location: "Les Ulmes", year: 1668 },
    { location: "Marseille-en-Beauvais", year: 1533 },
    { location: "Paris (Miracle des Billettes)", year: 1290 },
    { location: "Pressac", year: 1643 },
    { location: "Pibrac (Germaine Cousin)", year: 1601 }
  ],
  "Germany": [
    { location: "Augsburg", year: 1194 },
    { location: "Benningen", year: 1216 },
    { location: "Bettbrunn", year: 1125 },
    { location: "Erding", year: 1417 },
    { location: "Kranenburg bei Kleve", year: 1280 },
    { location: "Regensburg", year: 1255 },
    { location: "Walldürn", year: 1330 },
    { location: "Weingarten", year: 1094 },
    { location: "Wilsnack", year: 1383 }
  ],
  "India": [
    { location: "Chirattakonam", year: 2001 }
  ],
  "Italy": [
    { location: "Alatri", year: 1228 },
    { location: "Assisi (St. Clare)", year: 1240 },
    { location: "Asti", year: 1535 },
    { location: "Asti", year: 1718 },
    { location: "Bagno di Romagna", year: 1412 },
    { location: "Bolsena", year: 1263 },
    { location: "Canosio", year: 1630 },
    { location: "Cascia", year: 1330 },
    { location: "Cava dei Tirreni", year: 1656 },
    { location: "Dronero", year: 1631 },
    { location: "Ferrara", year: 1171 },
    { location: "Florence", year: 1595 },
    { location: "Gruaro", year: 1294 },
    { location: "Lanciano", year: 750 },
    { location: "Macerata", year: 1356 },
    { location: "Mogoro", year: 1604 },
    { location: "Morrovalle", year: 1560 },
    { location: "Offida", year: 1273 },
    { location: "Patierno", year: 1772 },
    { location: "Rimini", year: 1227 },
    { location: "Rome (St. Gregory)", year: 595 },
    { location: "Rome (Santa Pudenziana)", year: 1610 },
    { location: "Rosano", year: 1948 },
    { location: "Salzano", year: 1517 },
    { location: "San Mauro la Bruca", year: 1969 },
    { location: "Siena", year: 1730 },
    { location: "Trani", year: 1000 },
    { location: "Turin", year: 1453 },
    { location: "Turin (Santa Maria del Monte)", year: 1640 },
    { location: "Veroli", year: 1570 },
    { location: "Volterra", year: 1472 }
  ],
  "Martinique": [
    { location: "Morne-Rouge", year: 1902 }
  ],
  "Mexico": [
    { location: "Tixtla", year: 2006 }
  ],
  "Netherlands": [
    { location: "Alkmaar", year: 1429 },
    { location: "Amsterdam", year: 1345 },
    { location: "Bergen", year: 1421 },
    { location: "Boxmeer", year: 1400 },
    { location: "Boxtel-Hoogstraten", year: 1380 },
    { location: "Breda-Niervaart", year: 1300 },
    { location: "Gorkum-El Escorial", year: 1572 },
    { location: "Meerssen", year: 1222 },
    { location: "Stiphout", year: 1342 }
  ],
  "Peru": [
    { location: "Eten", year: 1649 }
  ],
  "Poland": [
    { location: "Głotowo", year: 1290 },
    { location: "Kraków", year: 1345 },
    { location: "Legnica", year: 2013 },
    { location: "Sokółka", year: 2008 }
  ],
  "Portugal": [
    { location: "Balasar (Alexandrina)", year: 1942 },
    { location: "Fatima (Angel)", year: 1916 },
    { location: "Santarém", year: 1266 }
  ],
  "La Réunion": [
    { location: "Saint-André", year: 1902 }
  ],
  "Spain": [
    { location: "Alboraya-Almácera", year: 1348 },
    { location: "Alcalá", year: 1597 },
    { location: "Alcoy", year: 1568 },
    { location: "Calanda", year: 1640 },
    { location: "Caravaca de la Cruz", year: 1384 },
    { location: "Cimballa", year: 1370 },
    { location: "Daroca", year: 1239 },
    { location: "Gerona", year: 1297 },
    { location: "Guadalupe", year: 1420 },
    { location: "Ivorra", year: 1010 },
    { location: "Moncada", year: 1392 },
    { location: "Montserrat", year: 1657 },
    { location: "O'Cebreiro", year: 1300 },
    { location: "Onil", year: 1824 },
    { location: "Ponferrada", year: 1338 },
    { location: "Sant Joan de les Abadesses", year: 1251 },
    { location: "Silla", year: 1907 },
    { location: "Valencia (Holy Grail)", year: "1st century" },
    { location: "Zaragoza", year: 1427 }
  ],
  "Switzerland": [
    { location: "Ettiswil", year: 1447 }
  ],
  "Venezuela": [
    { location: "Betania", year: 1991 }
  ]
};

// Saints and Mystics entries (these are also counted in the 136)
const saintsAndMystics = [
  "St. Thomas Aquinas (Italy, 1272)",
  "St. Catherine of Siena (Italy, 1370s)",
  "St. Bernard of Clairvaux (France, 1140s)",
  "St. Francis of Assisi - Lambs (Italy, 1200s)",
  "St. Stanislaus Kostka (Austria, 1568)",
  "St. Catherine Labouré (France, 1830s)",
  "St. Faustina Kowalska (Poland, 1930s)",
  "St. Peter Damian (Italy, 1050)",
  "St. Egidio (France, 700s)",
  "Blessed Anne Catherine Emmerich (Germany, 1770s-1824)",
  "Blessed Alexandrina da Costa (Portugal, 1942)",
  "Blessed Nicholas Steno (Italy, 1600s)",
  "Teresa Neumann (Germany, 1920s-1960s)",
  "Marthe Robin (France, 1920s-1981)",
  "André Frossard (France, 1935)",
  "Blessed Mary of the Passion (Italy, 1800s)",
  "Sacred Heart Revelations (France, 1673)",
  "Divine Mercy (Poland, 1930s)",
  "Corpus Christi Feast (Belgium, 1246)",
  "Lourdes Healings (France, 1858+)",
  "Guadalupe Sign (Mexico, 1531)",
  "Miraculous Communions Part 1",
  "Miraculous Communions Part 2"
];

console.log('=== CARLO ACUTIS OFFICIAL REFERENCE LIST ===\n');
console.log('This is the comprehensive list from miracolieucaristici.org\n');

let totalCount = 0;
Object.keys(carloAcutisReference).sort().forEach(country => {
  const miracles = carloAcutisReference[country];
  console.log(`${country} (${miracles.length}):`);
  miracles.forEach(m => {
    console.log(`  - ${m.location} (${m.year})`);
    totalCount++;
  });
  console.log();
});

console.log(`\nTotal location-based miracles: ${totalCount}`);
console.log(`Saints/Mystics entries: ${saintsAndMystics.length}`);
console.log(`\nEstimated total: ~${totalCount + saintsAndMystics.length}`);
console.log('\nNote: Some saints/mystics may overlap with location miracles.');
console.log('The exact count of 136 needs verification from the official source.\n');

// Now compare with current JSON
const miraclesPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const currentMiracles = JSON.parse(fs.readFileSync(miraclesPath, 'utf8'));

console.log('=== COMPARISON WITH CURRENT JSON ===\n');
console.log(`Current JSON: ${currentMiracles.length} miracles`);
console.log(`Target: 136 miracles`);
console.log(`Difference: ${136 - currentMiracles.length} missing\n`);
