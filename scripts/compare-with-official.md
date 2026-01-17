# Finding the Missing 7 Miracles

## Current Status
- **Your JSON**: 129 miracles
- **Target (Carlo Acutis)**: 136 miracles
- **Missing**: 7 miracles

## How to Find What's Missing

### Step 1: Visit the Official Website
Go to: https://www.miracolieucaristici.org/en/Liste/list.html

### Step 2: Manual Country-by-Country Checklist

Use this checklist to verify each miracle on the website against your JSON:

#### Belgium (Target: 7) ✅
- [x] Bois-Seigneur-Isaac (1405)
- [x] Bruges (1203/1256)
- [x] Brussels (1370)
- [x] Herentals (1412)
- [x] Herkenrode-Hasselt (1317)
- [x] Liège (1246 - Corpus Christi)
- [x] Middleburg-Lovanio (1374)
Note: Check if Liège 1374 is a separate miracle or if it's part of Middleburg

#### Austria (Target: 3-4)
Your JSON has 4 (including Stanislaus Kostka):
- [x] Fiecht (1310)
- [x] Seefeld (1384)
- [x] Weiten-Raxendorf (1411)
- [x] Stanislaus Kostka (counted separately as saint miracle)

#### France (Target: ~19-20)
Your JSON has 19. Check website for:
- [ ] Is there a separate Paray-le-Monial location miracle?
- [ ] Is there a Nevers miracle?
- [ ] Check all listed French miracles carefully

#### Italy (Target: ~31-37)
Your JSON has 37. This seems complete.

#### Germany (Target: ~9-11)
Your JSON has 11 (including Anne Catherine Emmerich, Teresa Neumann).
- Check if all 9 location miracles are there
- Check if saints are counted separately

#### Spain (Target: ~19)
Your JSON has 19. Check carefully against website.

#### Poland (Target: ~4-5)
Your JSON has 5 (including St. Faustina).
- Location miracles: Głotowo, Kraków, Legnica, Sokółka
- Saints: Faustina

#### Netherlands (Target: ~9)
Your JSON has 8-9. Verify all are present.

### Step 3: Suspected Missing Miracles

Based on common Carlo Acutis lists, check if you have:

1. **Liège 1374** - Might be a separate miracle from Liège 1246 (Corpus Christi)
2. **Nevers, France** - Sometimes listed separately for Bernadette Soubirous connection
3. **Assisi - Lambs Miracle** - You have it but verify
4. **Guadalajara, Spain** - Sometimes confused with Guadalupe
5. **Any recent miracles (2010s-2020s)** - Check for newest additions
6. **Variations in names** - Some miracles might be listed under different cities

### Step 4: Search Strategy

For each country on the website, use this command to check your JSON:

```bash
# Example: Search for a specific location
cat src/eucharistic-miracles.json | grep -i "city_name" -A 5 -B 5
```

### Step 5: Focus Areas to Check

1. **Belgium**: Verify if Liège has 1 or 2 separate miracles (1246 and 1374)
2. **France**: Count carefully - you have 19, official might have 20
3. **Germany**: Verify count including saints
4. **Netherlands**: You might be missing 1
5. **Italy**: Seems complete but double-check
6. **Saints categories**: Check if they're counted within countries or separately

## Next Action

Run this command to help identify discrepancies:

```bash
node scripts/find-missing-miracles.js > output.txt
```

Then manually compare the output with the official website page by page.

## Notes

- Carlo Acutis's original exhibition had **136 panels**
- Some panels cover saints/mystics, not location miracles
- The numbering might include:
  - ~105-110 location-based miracles
  - ~25-30 saints/mystics/special categories
- Your 129 is very close - just need to find those final 7!

## Likely Missing (Based on Common Lists)

Check specifically for:
1. Liège 1374 (if separate from 1246)
2. Any French miracle you might have missed
3. Verify all Netherlands miracles
4. Check if any saints are missing from the count
5. Look for very recent miracles (post-2010)
6. Check for any miracles with alternate spellings
7. Verify if Marian apparition-related Eucharistic events are included

