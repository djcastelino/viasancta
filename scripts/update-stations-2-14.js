#!/usr/bin/env node

/**
 * Update Stations 2-14 with Google Earth descriptions
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/stations-of-the-cross.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Google Earth descriptions paraphrased with interesting facts
const currentSiteDescriptions = {
  2: "Now the Monastery of the Flagellation. Here Jesus was flogged by Roman soldiers before receiving the cross.",
  3: "Located near the Armenian Catholic Church on the corner of Via Dolorosa and Haja'y Street.",
  4: "Now the Armenian Church of Our Lady of Sorrows, with a crypt containing mosaics showing Mary's footprints.",
  5: "A handprint imprint remains on the wall where tradition says Jesus steadied Himself. Pilgrims have deepened the impression over centuries.",
  6: "Now a small Greek Catholic chapel, the Church of the Holy Face. Believed to be the site of Veronica's house.",
  7: "A small Franciscan chapel now stands at this location.",
  8: "Marked by a Greek Orthodox monastery with 'NIKA' (Jesus Christ conquers) inscribed here.",
  9: "Marked by a Roman column outside the Coptic Orthodox Patriarchate entrance, steps from Calvary.",
  10: "Inside the Church of the Holy Sepulchre. The Chapel of the Franks marks where Jesus was stripped.",
  11: "Inside the Church of the Holy Sepulchre on the second level. A Franciscan altar marks Golgotha, the place of crucifixion.",
  12: "A Greek Orthodox altar marks this station. A visible cracked rock is believed caused by the earthquake at Christ's death.",
  13: "The Stone of Unction on the ground level marks where Jesus' body was anointed with oil and spices for burial.",
  14: "Located in the church's large rotunda, covered by an enclosed tomb structure."
};

// Update each station
data.forEach((station) => {
  if (station.number >= 2 && station.number <= 14) {
    if (!station.location.currentSite) {
      station.location.currentSite = currentSiteDescriptions[station.number];
      console.log(`✅ Updated Station ${station.number}: ${station.title}`);
    } else {
      console.log(`⏭️  Station ${station.number} already has currentSite`);
    }
  }
});

// Write updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

console.log('\n✅ All stations 2-14 updated with Google Earth descriptions!');
