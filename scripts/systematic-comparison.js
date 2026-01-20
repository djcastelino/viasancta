#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read current miracles
const miraclesPath = path.join(__dirname, '../src/eucharistic-miracles.json');
const miracles = JSON.parse(fs.readFileSync(miraclesPath, 'utf8'));

// Website miracles from Carlo Acutis (based on latest fetch)
const websiteMiracles = {
  locations: [
    { city: "Buenos Aires", country: "Argentina", year: 1996 },
    { city: "Fiecht", country: "Austria", year: 1310 },
    { city: "Seefeld", country: "Austria", year: 1384 },
    { city: "Weiten-Raxendorf", country: "Austria", year: 1411 },
    { city: "Bois-Seigneur-Isaac", country: "Belgium", year: 1405 },
    { city: "Bruges", country: "Belgium", year: 1203 },
    { city: "Brussels", country: "Belgium", year: 1370 },
    { city: "Herentals", country: "Belgium", year: 1412 },
    { city: "Herkenrode-Hasselt", country: "Belgium", year: 1317 },
    { city: "Liège", country: "Belgium", year: 1374 },
    { city: "Middleburg-Lovanio", country: "Belgium", year: 1374 },
    { city: "Tumaco", country: "Colombia", year: 1906 },
    { city: "Ludbreg", country: "Croatia", year: 1411 },
    { city: "St. Mary of Egypt", country: "Egypt", year: 400 },
    { city: "Scete", country: "Egypt", year: 300 },
    { city: "Avignon", country: "France", year: 1433 },
    { city: "Blanot", country: "France", year: 1331 },
    { city: "Bordeaux", country: "France", year: 1822 },
    { city: "Dijon", country: "France", year: 1430 },
    { city: "Douai", country: "France", year: 1254 },
    { city: "Faverney", country: "France", year: 1608 },
    { city: "La Rochelle", country: "France", year: 1461 },
    { city: "Neuvy Saint Sepulcre", country: "France", year: 1257 },
    { city: "Les Ulmes", country: "France", year: 1668 },
    { city: "Marseille-En-Beauvais", country: "France", year: 1533 },
    { city: "Paris", country: "France", year: 1290 },
    { city: "Pressac", country: "France", year: 1643 },
    { city: "Augsburg", country: "Germany", year: 1194 },
    { city: "Benningen", country: "Germany", year: 1216 },
    { city: "Bettbrunn", country: "Germany", year: 1125 },
    { city: "Erding", country: "Germany", year: 1417 },
    { city: "Kranenburg", country: "Germany", year: 1280 },
    { city: "Regensburg", country: "Germany", year: 1255 },
    { city: "Walldürn", country: "Germany", year: 1330 },
    { city: "Weingarten", country: "Germany", year: 1094 },
    { city: "Wilsnack", country: "Germany", year: 1383 },
    { city: "Chirattakonam", country: "India", year: 2001 },
    { city: "Morne-Rouge", country: "Martinique", year: 1902 },
    { city: "Saint-André", country: "Reunion", year: 1902 },
    { city: "Alatri", country: "Italy", year: 1228 },
    { city: "Assisi", country: "Italy", year: 1240 },
    { city: "Asti", country: "Italy", year: 1535 },
    { city: "Bagno di Romagna", country: "Italy", year: 1412 },
    { city: "Bolsena", country: "Italy", year: 1264 },
    { city: "Canosio", country: "Italy", year: 1630 },
    { city: "Cascia", country: "Italy", year: 1330 },
    { city: "Cava dei Tirreni", country: "Italy", year: 1656 },
    { city: "Dronero", country: "Italy", year: 1631 },
    { city: "San Mauro La Bruca", country: "Italy", year: 1969 },
    { city: "Ferrara", country: "Italy", year: 1171 },
    { city: "Florence", country: "Italy", year: 1595 },
    { city: "Gruaro", country: "Italy", year: 1294 },
    { city: "Lanciano", country: "Italy", year: 750 },
    { city: "Macerata", country: "Italy", year: 1356 },
    { city: "Mogoro", country: "Italy", year: 1604 },
    { city: "Morrovalle", country: "Italy", year: 1560 },
    { city: "Offida", country: "Italy", year: 1273 },
    { city: "Patierno", country: "Italy", year: 1772 },
    { city: "Rimini", country: "Italy", year: 1227 },
    { city: "Rome", country: "Italy", year: 595 },
    { city: "Rome", country: "Italy", year: 1610 },
    { city: "Rosano", country: "Italy", year: 1948 },
    { city: "Salzano", country: "Italy", year: 1517 },
    { city: "Scala", country: "Italy", year: 1732 },
    { city: "Siena", country: "Italy", year: 1730 },
    { city: "Trani", country: "Italy", year: 1000 },
    { city: "Turin", country: "Italy", year: 1453 },
    { city: "Turin", country: "Italy", year: 1640 },
    { city: "Veroli", country: "Italy", year: 1570 },
    { city: "Volterra", country: "Italy", year: 1472 },
    { city: "Tixtla", country: "Mexico", year: 2006 },
    { city: "Alkmaar", country: "Netherlands", year: 1429 },
    { city: "Amsterdam", country: "Netherlands", year: 1345 },
    { city: "Bergen", country: "Netherlands", year: 1421 },
    { city: "Boxmeer", country: "Netherlands", year: 1400 },
    { city: "Boxtel-Hoogstraten", country: "Netherlands", year: 1380 },
    { city: "Breda-Niervaart", country: "Netherlands", year: 1300 },
    { city: "Meerssen", country: "Netherlands", year: 1222 },
    { city: "Stiphout", country: "Netherlands", year: 1342 },
    { city: "Eten", country: "Peru", year: 1649 },
    { city: "Krakow", country: "Poland", year: 1345 },
    { city: "Glotowo", country: "Poland", year: 1290 },
    { city: "Legnica", country: "Poland", year: 2013 },
    { city: "Poznan", country: "Poland", year: 1399 },
    { city: "Sokółka", country: "Poland", year: 2008 },
    { city: "Santarém", country: "Portugal", year: 1247 },
    { city: "Alboraya-Almacéra", country: "Spain", year: 1348 },
    { city: "Alcalà", country: "Spain", year: 1597 },
    { city: "Alcoy", country: "Spain", year: 1568 },
    { city: "Caravaca de la Cruz", country: "Spain", year: 1231 },
    { city: "Cimballa", country: "Spain", year: 1370 },
    { city: "Daroca", country: "Spain", year: 1239 },
    { city: "Gerona", country: "Spain", year: 1297 },
    { city: "Gorkum-El Escorial", country: "Spain", year: 1572 },
    { city: "Guadalupe", country: "Spain", year: 1420 },
    { city: "Ivorra", country: "Spain", year: 1010 },
    { city: "Moncada", country: "Spain", year: 1392 },
    { city: "Montserrat", country: "Spain", year: 1657 },
    { city: "O'Cebreiro", country: "Spain", year: 1300 },
    { city: "Onil", country: "Spain", year: 1824 },
    { city: "Ponferrada", country: "Spain", year: 1533 },
    { city: "S. John of the Abbesses", country: "Spain", year: 1251 },
    { city: "Silla", country: "Spain", year: 1907 },
    { city: "Valencia", country: "Spain", year: 1 },
    { city: "Zaragoza", country: "Spain", year: 1427 },
    { city: "Ettiswil", country: "Switzerland", year: 1447 },
    { city: "Betania", country: "Venezuela", year: 1991 }
  ]
};

console.log('=== SYSTEMATIC COMPARISON ===\n');
console.log(`Website miracles (locations only): ${websiteMiracles.locations.length}`);
console.log(`Your JSON total: ${miracles.length}\n`);

// Normalize function to help match
function normalize(str) {
  return str.toLowerCase()
    .replace(/[àáâãäå]/g, 'a')
    .replace(/[èéêë]/g, 'e')
    .replace(/[ìíîï]/g, 'i')
    .replace(/[òóôõö]/g, 'o')
    .replace(/[ùúûü]/g, 'u')
    .replace(/ç/g, 'c')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '');
}

// Check each website miracle
const missing = [];
websiteMiracles.locations.forEach(web => {
  const found = miracles.find(m => {
    const cityMatch = normalize(m.location.city).includes(normalize(web.city)) ||
                      normalize(web.city).includes(normalize(m.location.city));
    const yearMatch = Math.abs(m.date.year - web.year) <= 5; // Allow 5 year tolerance
    return cityMatch && yearMatch;
  });

  if (!found) {
    missing.push(`${web.city}, ${web.country} (${web.year})`);
  }
});

console.log('=== MISSING FROM YOUR JSON ===\n');
if (missing.length > 0) {
  console.log(`Found ${missing.length} potentially missing miracles:\n`);
  missing.forEach((m, i) => {
    console.log(`${i + 1}. ${m}`);
  });
} else {
  console.log('No obvious missing miracles found from location list.');
}

console.log('\n=== NOTES ===');
console.log('- Website shows Liège 1374 (not 1246)');
console.log('- Check if saints/mystics are counted separately');
console.log('- Some miracles may have name variations\n');
