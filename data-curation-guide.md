# Via Sancta - Eucharistic Miracles Data Curation Guide

## Overview

This guide helps you manually curate 30-40 Eucharistic miracles from St. Carlo Acutis's compilation for the inaugural Via Sancta tour.

## Data Sources

1. **eucharisticmiracles.faith** - Modern, searchable database (142 miracles)
2. **miracolieucaristici.org** - Original Carlo Acutis website (Italian/English)
3. **Wikipedia** - Historical context and verification
4. **Vatican archives** - Official Church documentation

## Selection Criteria

### Priority Levels

**Tier 1 (Must Include - 10 miracles):**
- Most famous globally
- Scientifically documented
- Excellent Street View availability
- Strong visual documentation

**Tier 2 (Should Include - 15 miracles):**
- Geographic diversity (all continents)
- Mix of medieval and modern
- Variety of miracle types
- Cultural significance

**Tier 3 (Nice to Have - 10-15 miracles):**
- Lesser-known but significant
- Complete the geographic coverage
- Round out the narrative diversity

## Recommended 30-40 Miracles

### Europe (20 miracles)

**Italy (8):**
1. ✅ Lanciano (750 AD) - Most famous, scientifically tested
2. ✅ Bolsena (1263) - Led to Corpus Christi feast
3. Siena (1730) - Incorrupt hosts 290+ years
4. Cascia (1330) - Bleeding host
5. Turin (1453) - Fire miracle
6. Rimini (1227) - St. Anthony's miracle
7. Ferrara (1171) - Blood miracle
8. Alatri (1228) - Flesh transformation

**France (4):**
9. Blanot (1331) - Blood stains visible today
10. Bordeaux (1822) - Witnessed transformation
11. Paris (1290) - Jewish merchant miracle
12. Douai (1254) - Incorrupt host

**Poland (2):**
13. ✅ Legnica (2013) - Most recent, scientifically verified
14. Sokółka (2008) - Recent, heart tissue found

**Portugal (2):**
15. Santarém (1247) - Bleeding host preserved
16. Fatima (1917) - Connected to apparitions

**Spain (2):**
17. Daroca (1239) - Battle miracle
18. Alcalá de Henares (1597) - Bleeding host

**Netherlands (1):**
19. Amsterdam (1345) - Famous pilgrimage site

**Germany (1):**
20. Augsburg (1194) - Medieval miracle

### Americas (8 miracles)

**South America (4):**
21. ✅ Buenos Aires, Argentina (1996) - Pope Francis connection, scientifically tested
22. Betania, Venezuela (1991) - Modern, documented
23. Tumaco, Colombia (1906) - Earthquake survival
24. Chirattakonam, India (2001) - Recent Asian miracle

**North America (4):**
25. Stich, Louisiana, USA (1990s) - Modern American
26. Naju, South Korea (1990s) - Asian modern
27. Guadalajara, Mexico (2006) - Latin America recent
28. Tixtla, Mexico (2006) - Modern, photographed

### Asia/Middle East (2 miracles)

29. Chirattakonam, India (2001) - Modern Asian
30. Jerusalem - Various historical accounts

### Africa (Optional, if Street View available)

31. Alexandria, Egypt - Early Christian era
32. Ethiopia - Ancient tradition

## Data Collection Template

For each miracle, collect the following information:

### Basic Information
```json
{
  "id": "location-year",
  "name": "Official name",
  "location": {
    "city": "",
    "country": "",
    "coordinates": { "lat": 0.0, "lng": 0.0 },
    "address": "Full address for Google Maps"
  },
  "date": {
    "year": 0,
    "displayDate": "Human readable"
  }
}
```

### Story Content
- **Type:** (Flesh and Blood / Bleeding Host / Incorrupt Host / Fire Survival / etc.)
- **Description:** One sentence summary (50-100 chars)
- **Narrative:** Full story (300-500 words)
  - What happened?
  - Who witnessed it?
  - What were the circumstances?
  - How did people react?
  - What happened afterward?

### Scientific Evidence (if applicable)
- Laboratory tests conducted
- Scientists involved
- Findings (blood type, tissue type, etc.)
- Date of tests
- Institution/authority

### Verification Checklist
- [ ] Coordinates verified on Google Maps
- [ ] Street View available and tested
- [ ] Church/site still exists
- [ ] Wikipedia article found (or alternative source)
- [ ] 2-3 images sourced
- [ ] Historical sources documented
- [ ] Church recognition status confirmed

## Step-by-Step Process

### For Each Miracle:

**1. Research (30-45 min per miracle)**
- Visit eucharisticmiracles.faith
- Read Carlo Acutis exhibition panel
- Cross-reference Wikipedia
- Check Vatican documentation if available

**2. Verify Location (10 min)**
- Open Google Maps
- Find exact church address
- Get precise coordinates
- Test Street View availability
- Note best viewing angle

**3. Write Narrative (20 min)**
- Engaging opening (set the scene)
- Clear chronological story
- Include human elements (witnesses, emotions)
- Mention significance
- End with reflection point
- Target: 300-400 words

**4. Gather Images (15 min)**
- Church exterior
- Relic/display (if available)
- Historical illustration or panel
- Ensure proper attribution

**5. Document Sources (5 min)**
- List all references
- Include URLs
- Note publication dates
- Credit photographers

**Total time per miracle: ~90 minutes**

## Sample Completed Entry

```json
{
  "id": "lanciano-750",
  "name": "Miracle of Lanciano",
  "location": {
    "city": "Lanciano",
    "country": "Italy",
    "coordinates": { "lat": 42.2333, "lng": 14.3833 },
    "address": "Church of San Francesco, Via del Santuario, Lanciano, CH, Italy"
  },
  "date": {
    "year": 750,
    "displayDate": "8th Century AD"
  },
  "type": "Flesh and Blood Transformation",
  "description": "A doubting monk witnessed the host turn into flesh and wine into blood during Mass.",
  "narrative": "In the 8th century, in the small Italian town of Lanciano, a Basilian monk struggled with doubt about the Real Presence of Christ in the Eucharist. During the celebration of Mass, as he pronounced the words of consecration, the host suddenly transformed into living flesh, and the wine became real blood. The monk, overcome with fear and amazement, stood frozen for a long time before the altar. Eventually, he turned to the congregation and shared what had occurred. The flesh and blood have been preserved for over 1200 years and remain on display in the Church of San Francesco.",
  "scientificEvidence": "In 1971, Professor Odoardo Linoli conducted tests. Results: human cardiac tissue, AB blood type, living cells.",
  "hasStreetView": true,
  "wikiUrl": "https://en.wikipedia.org/wiki/Miracle_of_Lanciano",
  "images": [
    "/images/miracles/lanciano-church.jpg",
    "/images/miracles/lanciano-relic.jpg"
  ],
  "sources": [
    "miracolieucaristici.org",
    "eucharisticmiracles.faith",
    "Linoli, O. (1971). Scientific Study"
  ],
  "tags": ["scientifically-tested", "flesh-and-blood", "italy", "medieval"],
  "audioUrl": "/audio/eucharistic-miracles/lanciano-750.mp3"
}
```

## Timeline

**Week 1 (Top 10 miracles):**
- Days 1-2: Lanciano, Buenos Aires, Legnica
- Days 3-4: Bolsena, Siena, Santarém
- Days 5-7: Blanot, Amsterdam, Bordeaux, Fatima

**Week 2 (Next 10):**
- Days 8-14: European collection (France, Poland, Spain, Germany)

**Week 3 (Final 10-20):**
- Days 15-21: Americas, Asia, final European selections

## Quality Standards

Before marking a miracle as "complete":

- ✅ All required fields populated
- ✅ Narrative is engaging and accurate
- ✅ Coordinates verified on Google Maps
- ✅ Street View tested and works
- ✅ At least 2 quality sources cited
- ✅ Spell-checked and proofread
- ✅ JSON is valid
- ✅ Images sourced with attribution

## Output Format

Save all miracles in:
```
/Users/dcasteli/Documents/pda/viasancta/src/data/eucharistic-miracles.json
```

As a JSON array:
```json
[
  { "id": "lanciano-750", ... },
  { "id": "buenos-aires-1996", ... },
  ...
]
```

## Tools & Resources

**Coordinates:**
- Google Maps: https://maps.google.com
- GPS Coordinates: https://www.gps-coordinates.net/

**Street View Check:**
- Drop the yellow pegman on Google Maps
- Verify church is visible
- Note if it's blocked by trees/buildings

**Image Sources:**
- Wikimedia Commons (public domain)
- Official church websites
- Carlo Acutis exhibition panels
- Always credit photographers!

**Translation (if needed):**
- Google Translate for Italian sources
- DeepL for better quality

## Next Steps

After completing data curation:
1. Validate JSON format
2. Generate audio narrations via n8n workflow
3. Download and optimize images
4. Create tour metadata file
5. Begin frontend implementation

---

**Start with the Top 10 Tier 1 miracles - these are your MVP launch content!** 🙏

