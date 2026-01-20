# Update Daily Promise Verses Script

This script automatically fetches Bible verses from multiple Catholic translations and updates the `daily-promises.json` file.

## Translations

The script rotates through **3 Catholic Bible translations**:

1. **GNT (Good News Translation)** - Modern, accessible Catholic translation
2. **NABRE (New American Bible Revised Edition)** - Official US Catholic liturgy
3. **RSV-2CE (Revised Standard Version - Second Catholic Edition)** - Literary, scholarly Catholic translation

## Usage

### Step 1: Add Translation Field

First, add the `bibleTranslation` field to all 365 promises:

```bash
node scripts/add-promise-translations.js
```

This assigns translations in a rotating pattern:
- **Promise ID % 3 = 1** → GNT (IDs: 1, 4, 7, 10...)
- **Promise ID % 3 = 2** → NABRE (IDs: 2, 5, 8, 11...)
- **Promise ID % 3 = 0** → RSV-2CE (IDs: 3, 6, 9, 12...)

### Step 2: Update Verses

```bash
# Update promises 1-50
node scripts/update-promise-verses.js 1 50

# Update promises 51-100
node scripts/update-promise-verses.js 51 100

# Update a specific range
node scripts/update-promise-verses.js 101 150
```

## How It Works

1. Reads `src/daily-promises.json`
2. For each promise in the specified range:
   - Checks the `bibleTranslation` field
   - Fetches the verse from the appropriate source:
     - **GNT**: biblegateway.com (Good News Translation)
     - **NABRE**: bible.usccb.org
     - **RSV-2CE**: biblegateway.com (RSVCE version)
3. Updates the `verse` field with the fetched text
4. Saves the updated JSON back to file

## Important Notes

- **Rate Limiting**: Script waits 2 seconds between requests to be respectful to servers
- **Time**: Updating 50 promises takes about 2-3 minutes
- **Errors**: If a verse fails, the script continues and reports failures at the end

## If the Script Doesn't Work

If automatic fetching fails (website structure changed, etc.), you can manually update verses:

### Manual Update Process

1. Generate a template:
```bash
node scripts/manual-promise-template.js 1 50
```

2. This creates a file: `scripts/promise-verses-1-50.txt`

3. Open the file and for each promise:
   - Visit the appropriate Bible website:
     - GNT: https://www.biblegateway.com/?version=GNT
     - NABRE: https://bible.usccb.org
     - RSV-2CE: https://www.biblegateway.com/?version=RSVCE
   - Search for the reference
   - Copy the verse text
   - Paste it after `TEXT: `

4. Save the file and apply the changes:
```bash
node scripts/apply-manual-promise-verses.js promise-verses-1-50.txt
```

## Translation Distribution

After running `add-promise-translations.js`, you'll have approximately:
- **122 promises** in GNT (1/3)
- **122 promises** in NABRE (1/3)
- **121 promises** in RSV-2CE (1/3)

This ensures variety and exposes users to different styles of Catholic Bible translations.

## Example Output

```bash
$ node scripts/update-promise-verses.js 1 5

================================================================================
UPDATING DAILY PROMISE VERSES
================================================================================
Processing promises 1 to 5

Promise 1: John 6:35
  Translation: GNT
  Fetching GNT: https://www.biblegateway.com/passage/?search=John+6:35&version=GNT
  ✅ Updated successfully
  Text preview: I am the bread of life. Those who come to me will never be hungry...

Promise 2: John 8:12
  Translation: NABRE
  Fetching NABRE: https://bible.usccb.org/bible/john/8
  ✅ Updated successfully
  Text preview: I am the light of the world. Whoever follows me will not walk in darkness...

...

================================================================================
SUMMARY
================================================================================
✅ Successfully updated: 5 promises
❌ Failed: 0 promises

📝 JSON file updated: ./src/daily-promises.json
================================================================================
```

## Troubleshooting

**Script fails with connection errors:**
- Check your internet connection
- The websites might be temporarily down
- Try again later or update manually

**Verse text looks wrong:**
- The website HTML structure may have changed
- Update the parsing logic in the script, or
- Update verses manually

**Permission errors:**
- Make sure the script has permission: `chmod +x scripts/update-promise-verses.js`
- Run with node: `node scripts/update-promise-verses.js 1 50`

## Files

- `add-promise-translations.js` - Adds translation field to all promises
- `update-promise-verses.js` - Fetches and updates verse text
- `manual-promise-template.js` - Generates template for manual entry
- `apply-manual-promise-verses.js` - Applies manually entered verses
- `README-promise-verses.md` - This documentation
