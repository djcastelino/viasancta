# Eucharistic Miracles Web Scraper

## What This Does

Automatically scrapes miracle data from eucharisticmiracles.faith and converts it to Via Sancta JSON format.

## Installation

```bash
# Install required packages
pip3 install requests beautifulsoup4

# Or using a virtual environment (recommended)
cd /Users/dcasteli/Documents/pda/viasancta
python3 -m venv venv
source venv/bin/activate
pip install requests beautifulsoup4
```

## Usage

### Step 1: Inspect the Website First

Before running the scraper, let's check the site structure:

```bash
# Open the website
open https://eucharisticmiracles.faith

# Look for:
# - How miracles are listed (grid? list? map?)
# - URL pattern for individual miracles
# - HTML structure of miracle pages
```

### Step 2: Run the Scraper

```bash
cd /Users/dcasteli/Documents/pda/viasancta
python3 scrape-miracles.py
```

### Step 3: Review Output

The scraper will create: `src/data/eucharistic-miracles-scraped.json`

## What Gets Scraped

✅ **Automatically:**
- Name/title
- Location (city, country)
- Date/year
- Story/narrative
- Type of miracle
- Images
- Sources

⏭️ **You Add Manually:**
- Coordinates (Google Maps)
- Street View verification
- Scientific evidence details
- Tags

## Site Structure Notes

The scraper needs to be adjusted based on the actual HTML structure of eucharisticmiracles.faith. 

Common patterns to look for:

1. **Miracle List Page:**
   - Grid of miracle cards?
   - Links to individual pages?
   - API endpoint?

2. **Individual Miracle Page:**
   - Title in `<h1>`?
   - Content in `<div class="content">`?
   - Location/date in sidebar?

## Testing Approach

**Phase 1: Manual Inspection**
```bash
# Fetch homepage HTML
curl https://eucharisticmiracles.faith > homepage.html
open homepage.html
# Look at the structure
```

**Phase 2: Test Scraper on 5 Miracles**
```python
# In scrape-miracles.py, line 106:
miracle_urls[:5]  # Only scrape first 5
```

**Phase 3: Review & Adjust**
- Check if data is extracted correctly
- Fix any parsing issues
- Adjust CSS selectors

**Phase 4: Full Scrape**
```python
# Change to scrape all:
miracle_urls  # Remove [:5] limit
```

## Troubleshooting

### Issue: No miracle URLs found

**Solution:** The site might use JavaScript to load content. Try:
1. Inspect page source (View > Developer > View Source)
2. Look for API calls in Network tab
3. May need Selenium instead of requests

### Issue: Data not extracted correctly

**Solution:** Adjust CSS selectors in `scrape_miracle_detail()`
```python
# Example: If title is in <h2 class="miracle-title">
title = soup.find('h2', class_='miracle-title')
```

### Issue: Rate limiting / blocking

**Solution:** Add more delay between requests:
```python
time.sleep(2)  # Increase from 1 to 2 seconds
```

## Alternative: API Approach

If the website has an API (check Network tab in browser):

```python
# Example if API exists:
response = requests.get('https://eucharisticmiracles.faith/api/miracles')
miracles = response.json()
```

## Manual Backup Plan

If scraping doesn't work well:

1. **Copy/Paste Approach:**
   - Open each miracle page
   - Copy text into template
   - Use AI to format

2. **Spreadsheet First:**
   - Create CSV with basic info
   - Convert CSV to JSON

## Legal/Ethical Notes

✅ **Allowed:**
- Personal educational use
- Giving credit to source
- Not violating robots.txt

⚠️ **Best Practices:**
- Add delays between requests (1-2 seconds)
- Respect server load
- Cache results (don't re-scrape)
- Give attribution in app

## Next Steps After Scraping

1. ✅ Review generated JSON
2. ⏭️ Add coordinates with Google Maps
3. ⏭️ Verify Street View availability
4. ⏭️ Fill missing fields
5. ⏭️ Test with Via Sancta app

---

**Let's first inspect the website structure, then adjust the scraper accordingly!** 🔍

