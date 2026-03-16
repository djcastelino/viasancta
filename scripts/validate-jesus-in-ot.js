#!/usr/bin/env node

/**
 * Validation Script for Jesus in OT Data
 * Checks all 365 entries for common issues
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔍 Validating 365 Jesus in OT entries...\n');

let issues = {
  missingScripture: [],
  invalidScripture: [],
  invalidReferences: [],
  missingFields: [],
  suspiciousSources: []
};

data.forEach((entry, index) => {
  const day = entry.dayOfYear;

  // Check 1: Missing or error scripture text
  if (!entry.otText || entry.otText.trim() === '') {
    issues.missingScripture.push({ day, title: entry.title });
  } else if (
    entry.otText.includes("We couldn't find this page") ||
    entry.otText.includes("404") ||
    entry.otText.includes("Not Found") ||
    entry.otText.includes("Error")
  ) {
    issues.invalidScripture.push({
      day,
      title: entry.title,
      text: entry.otText.substring(0, 100)
    });
  }

  // Check 2: Invalid Bible references format
  if (!entry.otReference || !entry.otReference.match(/^[0-9]?\s?[A-Za-z]+\s+\d+:\d+/)) {
    issues.invalidReferences.push({
      day,
      title: entry.title,
      reference: entry.otReference
    });
  }

  // Check 3: Missing required fields
  const requiredFields = ['title', 'otBook', 'otReference', 'otText', 'howItPointsToJesus'];
  requiredFields.forEach(field => {
    if (!entry[field] || entry[field].trim() === '') {
      issues.missingFields.push({ day, title: entry.title, field });
    }
  });

  // Check 4: Suspicious source references
  if (entry.sources && entry.sources.length > 0) {
    entry.sources.forEach(source => {
      // Check for vague references like "Aquinas" without specific citation
      if (
        (source.includes('Aquinas') && !source.match(/ST\s+[IVX]+,\s*q\.\s*\d+/i)) ||
        (source.includes('Augustine') && !source.match(/City of God|Confessions|De Trinitate|Sermon/i) && !source.match(/\d+\.\d+/)) ||
        (source.includes('Jerome') && !source.match(/Commentary|Letter|Against/i))
      ) {
        issues.suspiciousSources.push({
          day,
          title: entry.title,
          source: source.substring(0, 100)
        });
      }
    });
  }
});

// Report findings
console.log('📊 VALIDATION RESULTS:\n');
console.log('=' .repeat(60));

console.log(`\n❌ Scripture Errors (${issues.invalidScripture.length}):`);
if (issues.invalidScripture.length > 0) {
  issues.invalidScripture.forEach(issue => {
    console.log(`  Day ${issue.day}: ${issue.title}`);
    console.log(`    Text: "${issue.text}..."`);
  });
} else {
  console.log('  ✅ No invalid scripture found');
}

console.log(`\n⚠️  Invalid References (${issues.invalidReferences.length}):`);
if (issues.invalidReferences.length > 0) {
  issues.invalidReferences.forEach(issue => {
    console.log(`  Day ${issue.day}: ${issue.title}`);
    console.log(`    Reference: "${issue.reference}"`);
  });
} else {
  console.log('  ✅ All references valid');
}

console.log(`\n📚 Suspicious Sources (${issues.suspiciousSources.length}):`);
if (issues.suspiciousSources.length > 0) {
  console.log('  (Aquinas/Augustine/Jerome without specific citations)');
  issues.suspiciousSources.forEach(issue => {
    console.log(`  Day ${issue.day}: ${issue.title}`);
    console.log(`    Source: "${issue.source}"`);
  });
} else {
  console.log('  ✅ All sources have proper citations');
}

console.log(`\n📝 Missing Fields (${issues.missingFields.length}):`);
if (issues.missingFields.length > 0) {
  issues.missingFields.forEach(issue => {
    console.log(`  Day ${issue.day}: ${issue.title} - Missing: ${issue.field}`);
  });
} else {
  console.log('  ✅ All required fields present');
}

console.log('\n' + '=' .repeat(60));
console.log('\n📋 SUMMARY:');
console.log(`  Total entries: ${data.length}`);
console.log(`  Invalid scripture: ${issues.invalidScripture.length}`);
console.log(`  Invalid references: ${issues.invalidReferences.length}`);
console.log(`  Suspicious sources: ${issues.suspiciousSources.length}`);
console.log(`  Missing fields: ${issues.missingFields.length}`);

const totalIssues =
  issues.invalidScripture.length +
  issues.invalidReferences.length +
  issues.suspiciousSources.length +
  issues.missingFields.length;

if (totalIssues === 0) {
  console.log('\n✅ All entries are valid!');
} else {
  console.log(`\n⚠️  Found ${totalIssues} total issues that need fixing`);

  // Save detailed report
  const reportPath = path.join(__dirname, '../JESUS-OT-ISSUES.json');
  fs.writeFileSync(reportPath, JSON.stringify(issues, null, 2));
  console.log(`\n📄 Detailed report saved to: JESUS-OT-ISSUES.json`);
}
