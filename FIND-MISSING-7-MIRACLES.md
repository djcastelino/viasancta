# How to Find the Missing 7 Miracles

## Current Situation
- ✅ **Your JSON**: 129 miracles
- 🎯 **Carlo Acutis Target**: 136 miracles
- ❓ **Missing**: **7 miracles**

## Quick Method to Find Them

### Step 1: Open the Official Website
Go to: **https://www.miracolieucaristici.org/en/Liste/list.html**

### Step 2: Use This Script to Check Each One

I've created scripts to help you:

```bash
# Run this to see your current inventory by country
node scripts/find-missing-miracles.js

# Compare with the official reference
node scripts/carlo-acutis-reference.js
```

### Step 3: Manual Website Comparison

Open the website and go through **each country section**. For each miracle listed:

1. Copy the location name (e.g., "Lanciano")
2. Run this command:
   ```bash
   cat src/eucharistic-miracles.json | grep -i "lanciano"
   ```
3. If nothing appears, **you found a missing one!**

### Step 4: Check These Specific Areas

Based on typical Carlo Acutis lists, the 7 missing miracles are likely in these categories:

#### A. Double-Check These Countries:
1. **France** - You have 19, website might show 20
   - Check for any "Nevers" miracle
   - Verify Paray-le-Monial is counted correctly

2. **Belgium** - You have 7 (seems complete)
   - Verify Liège: is there ONE miracle (1246) or TWO (1246 AND 1374)?

3. **Italy** - You have 37 (seems complete)
   - But verify carefully against the website list

4. **Germany** - You have 11
   - Verify against website carefully

5. **Netherlands** - You have 8
   - Website might list 9

6. **Spain** - You have 19 (seems complete)
   - Double-check carefully

#### B. Check for Recently Added Miracles:
The Carlo Acutis website occasionally adds newly-investigated miracles. Check for any from:
- 2015-2024
- You have Tixtla (2006), Legnica (2013), Sokółka (2008)
- Are there any newer ones?

#### C. Check "Special Categories":
The website has sections for:
- **Saints & Mystics** - you have many of these
- **Miraculous Communions Part 1 & 2** - you have these
- **Our Lady and the Eucharist** - check if any are missing

### Step 5: Systematic Search Commands

Use these to search your JSON for specific locations:

```bash
# Search for a city
cat src/eucharistic-miracles.json | grep -i "\"city\": \"CITYNAME\""

# Count miracles by country
cat src/eucharistic-miracles.json | jq '[.[] | select(.location.country == "COUNTRY")] | length'

# List all miracle names for a country
cat src/eucharistic-miracles.json | jq '[.[] | select(.location.country == "COUNTRY")] | .[].name'
```

## Example: Finding What's Missing

Let's say the website lists "Siena 1730" for Italy. Check if you have it:

```bash
cat src/eucharistic-miracles.json | grep -i "siena"
```

If it returns nothing, you found a missing one!

## My Analysis Results

### Countries That Seem Complete ✅
- Belgium: 7 miracles ✓
- Spain: 19 miracles ✓
- Italy: 37 miracles ✓
- Portugal: 3 miracles ✓
- Poland: 5 miracles ✓

### Countries to Double-Check ⚠️
- **France**: 19 (website might have 20)
- **Netherlands**: 8 (website might have 9)
- **Germany**: 11 (verify count)
- **Austria**: 4 (website might list 3 location + saints separately)

## Most Likely Candidates for Missing 7

Based on common discrepancies, check if you're missing:

1. Any additional French location miracle
2. Any additional Netherlands location miracle
3. Check if certain saints/mystics are listed separately on website but missing in your JSON
4. Verify all recent miracles (2000s-2010s) are included
5. Check for alternate spellings or name variations
6. Look for any miracles connected to Marian apparitions
7. Verify if there are separate entries for multi-year miracles (e.g., Buenos Aires had events in 1992, 1994, AND 1996)

## Quick Verification Commands

```bash
# Count your total
cat src/eucharistic-miracles.json | jq 'length'
# Output: 129

# List all IDs to scan visually
cat src/eucharistic-miracles.json | jq '.[].id' | sort

# Check for any duplicates
cat src/eucharistic-miracles.json | jq '.[].id' | sort | uniq -d
```

## Action Plan

1. ✅ Open https://www.miracolieucaristici.org/en/Liste/list.html
2. ✅ Go through EACH country section systematically
3. ✅ For each miracle, search your JSON using grep commands above
4. ✅ When you find one that's missing, note it down
5. ✅ After finding all 7, add them to your JSON!

## Need Help?

If you want me to help add the missing miracles once you identify them, just let me know which ones they are!

---

**Tip**: The website might organize miracles differently than you expect. Some "location miracles" might be under "Saints" section, and vice versa. Check ALL sections!
