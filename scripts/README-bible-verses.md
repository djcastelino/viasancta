# Update Bible Verses Script

This script automatically fetches Bible verses from USCCB (NABRE) and Bible Gateway (RSV-CE) and updates the `jesus-in-ot.json` file.

## Usage

```bash
# Update entries 1-50
node scripts/update-bible-verses.js 1 50

# Update entries 51-100
node scripts/update-bible-verses.js 51 100

# Update a specific range
node scripts/update-bible-verses.js 26 35
```

## How It Works

1. Reads `public/jesus-in-ot.json`
2. For each entry in the specified range:
   - Checks the `bibleTranslation` field (NABRE or RSV-CE)
   - Fetches the verse from the appropriate source:
     - **NABRE**: bible.usccb.org
     - **RSV-CE**: biblegateway.com
3. Updates the `otText` field with the fetched verse
4. Saves the updated JSON back to file

## Important Notes

- **Rate Limiting**: Script waits 2 seconds between requests to be respectful to servers
- **Time**: Updating 50 entries takes about 2-3 minutes
- **Errors**: If a verse fails, the script continues and reports failures at the end

## If the Script Doesn't Work

If the automatic fetching fails (website structure changed, etc.), you can manually update verses:

### Option 1: Manual Copy/Paste
1. Visit https://bible.usccb.org (for NABRE) or https://www.biblegateway.com (for RSV-CE)
2. Search for the verse
3. Copy the text
4. Update the JSON file directly

### Option 2: Use the Manual Template Script
```bash
node scripts/manual-verse-update.js
```
This will create a template where you can paste verses.

## What's Updated

- **Odd entry IDs (1, 3, 5...)**: Uses NABRE translation
- **Even entry IDs (2, 4, 6...)**: Uses RSV-CE translation

## Example

```bash
$ node scripts/update-bible-verses.js 1 5

================================================================================
UPDATING BIBLE VERSES
================================================================================
Processing entries 1 to 5

Entry 1: The First Promise of a Savior
  Reference: Genesis 3:15
  Translation: NABRE
  Fetching NABRE: https://bible.usccb.org/bible/genesis/3
  ✅ Updated successfully
  Text preview: I will put enmity between you and the woman, and between your offspring ...

...

================================================================================
SUMMARY
================================================================================
✅ Successfully updated: 5 entries
❌ Failed: 0 entries

📝 JSON file updated: ./public/jesus-in-ot.json
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
- Make sure the script has permission: `chmod +x scripts/update-bible-verses.js`
- Run with node: `node scripts/update-bible-verses.js 1 50`
