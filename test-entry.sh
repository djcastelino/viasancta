#!/bin/bash

# Quick script to test any Jesus in OT entry
# Usage: ./test-entry.sh 50

ENTRY_ID=${1:-1}

python3 << PYSCRIPT
import json
import sys

with open('./public/jesus-in-ot.json', 'r') as f:
    entries = json.load(f)

entry_id = $ENTRY_ID
entry = next((e for e in entries if e['id'] == entry_id), None)

if not entry:
    print(f"❌ Entry {entry_id} not found")
    sys.exit(1)

print("=" * 70)
print(f"📖 ENTRY {entry['id']}: {entry['title']}")
print("=" * 70)
print(f"\n📍 Reference: {entry['otReference']}")
print(f"📚 Book: {entry['otBook']}")
print(f"🏷️  Category: {entry['category']}")
print(f"\n📜 OT Text:")
print(f"   \"{entry['otText'][:200]}{'...' if len(entry['otText']) > 200 else ''}\"")
print(f"\n🏛️  Historical Context:")
print(f"   {entry['historicalContext'][:200]}{'...' if len(entry['historicalContext']) > 200 else ''}")
print(f"\n✝️  How It Points to Jesus:")
print(f"   {entry['howItPointsToJesus'][:200]}{'...' if len(entry['howItPointsToJesus']) > 200 else ''}")
print("\n💡 Key Insights:")
for insight in entry['keyInsights']:
    print(f"   • {insight}")
print("\n📚 SOURCES & REFERENCES:")
print("-" * 70)
if entry.get('sources'):
    for i, source in enumerate(entry['sources'], 1):
        print(f"   {i}. {source}")
else:
    print("   ⚠️  No sources yet")
print("=" * 70)

PYSCRIPT
