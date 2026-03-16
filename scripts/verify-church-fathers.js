#!/usr/bin/env node

/**
 * Verify Church Fathers Citations
 * Checks if references are likely real and creates verification report
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔍 Analyzing Church Fathers citations...\n');

const issues = {
  vague: [],
  suspicious: [],
  good: [],
  needsCheck: []
};

// Known good citation patterns
const goodPatterns = {
  aquinas: /ST\s+[IVX]+-?[IVX]*,\s*q\.\s*\d+,\s*a\.\s*\d+/i,
  augustine: /(City of God|Confessions|De Trinitate|Tractates|Expositions|Sermon|Enchiridion|Against)\s+[\w\s]+\d+/i,
  jerome: /(Commentary|Letter|Against|Epistle)\s+[\w\s]+\d+/i,
  origen: /Homilies?\s+on\s+\w+\s+\d+/i,
  irenaeus: /Against Heresies\s+[IVX]+\.\d+/i,
  cyprian: /(Letter|On|Unity)\s+[\w\s]+\d+/i,
  chrysostom: /Homil(y|ies)\s+on\s+[\w\s]+\d+/i,
  gregory: /(Moral Reflections|Pastoral Rule|Homilies)\s+[\w\s]+\d+/i,
  leo: /(Tome|Letter|Sermon)\s+[\w\s]*\d*/i,
  ambrose: /(On|Letter|Hexameron)\s+[\w\s]+\d+/i
};

// New Advent URLs for verification
const newAdventUrls = {
  aquinas: 'https://www.newadvent.org/summa/',
  augustine: 'https://www.newadvent.org/fathers/',
  jerome: 'https://www.newadvent.org/fathers/',
  origen: 'https://www.newadvent.org/fathers/',
  irenaeus: 'https://www.newadvent.org/fathers/',
  cyprian: 'https://www.newadvent.org/fathers/',
  chrysostom: 'https://www.newadvent.org/fathers/',
  gregory: 'https://www.newadvent.org/fathers/',
  leo: 'https://www.newadvent.org/fathers/',
  ambrose: 'https://www.newadvent.org/fathers/'
};

data.forEach(entry => {
  if (!entry.sources || entry.sources.length === 0) return;

  entry.sources.forEach(source => {
    // Skip CCC and modern sources
    if (source.includes('CCC') ||
        source.includes('Scott Hahn') ||
        source.includes('Benedict XVI') ||
        source.includes('John Paul II') ||
        source.includes('Catechism')) {
      return;
    }

    let analyzed = {
      day: entry.dayOfYear,
      title: entry.title,
      source: source,
      status: 'unknown',
      pattern: null,
      newAdventUrl: null
    };

    // Check each Church Father
    for (const [father, pattern] of Object.entries(goodPatterns)) {
      if (source.toLowerCase().includes(father)) {
        if (pattern.test(source)) {
          analyzed.status = 'good';
          analyzed.pattern = 'specific';
          analyzed.newAdventUrl = newAdventUrls[father];
          issues.good.push(analyzed);
        } else {
          analyzed.status = 'vague';
          analyzed.pattern = 'missing_citation';
          issues.vague.push(analyzed);
        }
        return;
      }
    }

    // Check for other Church Fathers without specific patterns
    const otherFathers = ['Tertullian', 'Athanasius', 'Basil', 'Cyril', 'Hilary', 'Anselm'];
    const foundOther = otherFathers.some(f => source.includes(f));

    if (foundOther) {
      analyzed.status = 'needs_check';
      issues.needsCheck.push(analyzed);
    }
  });
});

// Generate Report
console.log('📊 CITATION ANALYSIS:\n');
console.log('='.repeat(70));

console.log(`\n✅ GOOD Citations (${issues.good.length}):`);
console.log('   (Have specific book/chapter/section references)');
if (issues.good.length > 0) {
  const sample = issues.good.slice(0, 5);
  sample.forEach(item => {
    console.log(`   Day ${item.day}: ${item.source.substring(0, 70)}...`);
  });
  if (issues.good.length > 5) {
    console.log(`   ... and ${issues.good.length - 5} more`);
  }
}

console.log(`\n⚠️  VAGUE Citations (${issues.vague.length}):`);
console.log('   (Missing specific chapter/section - needs verification)');
if (issues.vague.length > 0) {
  const sample = issues.vague.slice(0, 10);
  sample.forEach(item => {
    console.log(`   Day ${item.day}: ${item.source.substring(0, 70)}...`);
  });
  if (issues.vague.length > 10) {
    console.log(`   ... and ${issues.vague.length - 10} more`);
  }
}

console.log(`\n🔍 NEEDS MANUAL CHECK (${issues.needsCheck.length}):`);
console.log('   (Other Church Fathers - verify manually)');

console.log('\n' + '='.repeat(70));
console.log('\n📋 SUMMARY:');
console.log(`   ✅ Good (specific): ${issues.good.length}`);
console.log(`   ⚠️  Vague (check): ${issues.vague.length}`);
console.log(`   🔍 Needs review: ${issues.needsCheck.length}`);
console.log(`   Total analyzed: ${issues.good.length + issues.vague.length + issues.needsCheck.length}`);

// Generate verification spreadsheet
const csvLines = ['Day,Title,Source,Status,Verification_URL,Verified'];
issues.vague.forEach(item => {
  const title = item.title.replace(/,/g, ';');
  const source = item.source.replace(/,/g, ';');
  const url = item.newAdventUrl || 'https://www.newadvent.org/fathers/';
  csvLines.push(`${item.day},"${title}","${source}","${item.status}","${url}",NO`);
});

const csvPath = path.join(__dirname, '../CHURCH-FATHERS-TO-VERIFY.csv');
fs.writeFileSync(csvPath, csvLines.join('\n'));

console.log(`\n📄 Verification spreadsheet created: CHURCH-FATHERS-TO-VERIFY.csv`);
console.log(`\n💡 RECOMMENDATIONS:`);
console.log(`   1. Good citations (${issues.good.length}) can stay - they're specific`);
console.log(`   2. Vague citations (${issues.vague.length}) should be:`);
console.log(`      - Spot-checked (verify 10-20 random ones)`);
console.log(`      - Removed if mostly wrong`);
console.log(`      - Or kept with disclaimer "Citation may be approximate"`);
console.log(`   3. Alternative: Keep only CCC references (100% reliable)`);

// Save detailed report
const reportPath = path.join(__dirname, '../CHURCH-FATHERS-ANALYSIS.json');
fs.writeFileSync(reportPath, JSON.stringify({
  summary: {
    good: issues.good.length,
    vague: issues.vague.length,
    needsCheck: issues.needsCheck.length
  },
  good: issues.good,
  vague: issues.vague,
  needsCheck: issues.needsCheck
}, null, 2));

console.log(`📄 Full analysis saved: CHURCH-FATHERS-ANALYSIS.json`);
