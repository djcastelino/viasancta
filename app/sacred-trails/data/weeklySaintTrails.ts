import { TrailStop } from './saintsTrails';

export const ST_FRANCIS_XAVIER_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Pyrenean Fortress & The Sweating Crucifix',
    subtitle: 'Inspect the medieval Castle of Javier in Navarre to uncover 3 hidden memories',
    eraLabel: '1506 – 1525 AD · Birthplace in Navarre',
    ancientPlaceName: 'Castillo de Xavier (Kingdom of Navarre)',
    modernPlaceName: 'Javier (Navarre)',
    modernCountry: 'Spain',
    image: '/images/trails/xavier_step1_javier.jpg',
    imageCaption:
      'Medieval stone Castle of Javier (Castillo de Javier) in the Pyrenean foothills of Navarre, northern Spain, birthplace of St. Francis Xavier.',
    whatYouCanSeeToday:
      'Today in the village of Javier (50 km east of Pamplona in Navarre, Spain), pilgrims cross the wooden drawbridge into the restored 10th-century Castle of Javier, climb the Tower of San Miguel, and venerate the 13th-century walnut "Smiling Christ of Javier" in the castle chapel.',
    didYouKnowHighlight:
      'Every March, over 30,000 pilgrims walk up to 50 km across the Navarrese valleys in the famous "Javierada" pilgrimage to this castle. According to 16th-century chronicles, the walnut crucifix inside the family chapel sweated blood on Fridays during 1552, the final year of Xavier’s life in Asia!',
    saintQuote:
      '“Tell the students to give up their small ambitions and come eastward to preach the Gospel of Christ.”',
    globePlacement: {
      latDeg: 42.59,
      lngDeg: -1.21,
      regionLabel: 'Pyrenean Foothills, Navarre, Northern Spain',
      beaconColorHex: '#F59E0B',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #1 · The Pyrenean Castle of the Smiling Crucifix',
    detectiveLeadPrompt:
      'Read the 3 detective clues below, then locate the northern Spanish mountain fortress where St. Francis Xavier was born in 1506.',
    detectiveClues: [
      {
        id: 'x1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Medieval Castle Village in Navarre, Northern Spain',
        clueText:
          'Look to the southern foothills of the Pyrenees in northern Spain, just east of Pamplona in the autonomous community of Navarre. This stone castle village gave its very name ("Xavier") to the saint.',
        soundCue: 'compass_click',
      },
      {
        id: 'x1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The 13th-Century Walnut "Smiling Christ" & The Javierada Walk',
        clueText:
          'Every March, tens of thousands of pilgrims trek across Navarre to this castle, where a 13th-century walnut crucifix with a gentle smile hangs above a unique medieval fresco of the Dance of Death.',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x1-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Born in the New House Wing on April 7, 1506',
        clueText:
          'Born into Basque aristocracy when Navarre was an independent kingdom, young Francisco de Jasso y Azpilicueta grew up inside these crenellated stone walls before riding north to study in Paris.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The crenellated stone keep of San Miguel rising high above the castle walls.',
        hintDirection: 'Click marker #1 on the tallest stone tower of the castle.',
        foundTitle: 'What Happened Here: Birth of the Basque Nobleman (1506)',
        xPercent: 36,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'On April 7, 1506, Francisco de Jasso y Azpilicueta was born inside the Castle of Javier. When Castilian troops partially dismantled the family’s fortress in 1516, young Francis resolved to restore his family’s prestige through university scholarship in Paris.',
        stoneKeyWord: 'BORN IN NAVARRE (1506)',
        stoneKeyMeaning: 'The medieval castle keep where St. Francis Xavier began his life',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x1-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The stone chapel gable with its small bell-cot inside the castle courtyard.',
        hintDirection: 'Click marker #2 on the inner castle chapel roof.',
        foundTitle: 'Did You Know? The Walnut "Smiling Christ of Javier"',
        xPercent: 64,
        yPercent: 45,
        hitRadius: 14,
        storyUnlocked:
          'Inside the Chapel of the Santo Cristo hangs a life-sized 13th-century walnut crucifix carved with a serene smile. Witnesses in 1552 recorded that the crucifix sweated blood on the very Fridays Francis Xavier was suffering his final illness off the coast of China!',
        stoneKeyWord: 'CRUCIFIX OF JAVIER',
        stoneKeyMeaning: 'The 13th-century walnut crucifix venerated inside the castle chapel',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The wooden drawbridge spanning the dry moat at the castle gate.',
        hintDirection: 'Click marker #3 on the wooden bridge leading to the arched gate.',
        foundTitle: 'Where Is It Modern Day Now? Javier, Navarre, Spain',
        xPercent: 42,
        yPercent: 69,
        hitRadius: 14,
        storyUnlocked:
          'Today in Javier (Navarre, northern Spain), visitors cross this original drawbridge path into a museum and basilica complex that welcomes over 200,000 pilgrims a year, peaking during the two-weekend Javierada walk every March.',
        stoneKeyWord: 'JAVIER, NAVARRE, SPAIN',
        stoneKeyMeaning: 'The modern Spanish village and restored castle in Navarre',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Basque Fortress',
        questionPrompt: 'When and where was St. Francis Xavier born?',
        correctStoneId: 'x1-art-1',
      },
      {
        slotLabel: 'Lock II · The Castle Chapel Relic',
        questionPrompt: 'What famous 13th-century carving hangs inside the Castle of Javier?',
        correctStoneId: 'x1-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which northern Spanish region does the Castle of Javier stand today?',
        correctStoneId: 'x1-art-3',
      },
    ],
    sealName: 'Seal of Javier',
  },
  {
    stopNumber: 2,
    title: 'The Roommates of Paris & The Vow of Montmartre',
    subtitle: 'Step into the candlelit crypt of Montmartre in Paris to uncover 3 hidden memories',
    eraLabel: '1525 – 1536 AD · University & Vows',
    ancientPlaceName: 'Lutetia / Collège de Sainte-Barbe & Montmartre',
    modernPlaceName: 'Paris',
    modernCountry: 'France',
    image: '/images/trails/xavier_step2_paris.jpg',
    imageCaption:
      'Candlelit subterranean stone crypt of the Martyrium of St. Denis on Montmartre Hill in Paris, France.',
    whatYouCanSeeToday:
      'Today in Paris, France, pilgrims visit the Collège de Sainte-Barbe in the Latin Quarter (near the Panthéon) and climb Montmartre Hill to 11 Rue Yvonne Le Tac, where the quiet Chapel of the Martyrium of St. Denis marks the spot of the 1534 vows.',
    didYouKnowHighlight:
      'At the University of Paris, an ambitious young Francis Xavier was a champion high-jumper on the Seine island meadows—until his older roommate, Iñigo of Loyola, kept whispering Mark 8:36 in his ear: "What does it profit a man to gain the whole world and lose his soul?"',
    saintQuote:
      '“What does it profit a man to gain the whole world, and suffer the loss of his own soul?”',
    globePlacement: {
      latDeg: 48.88,
      lngDeg: 2.34,
      regionLabel: 'Île-de-France, Seine Basin, Northern France',
      beaconColorHex: '#38BDF8',
      labelOffsetPx: [-66, -28],
    },
    detectiveCaseTitle: 'Case #2 · The Hill of Martyrs & The Seven University Companions',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the French capital where Francis Xavier met Ignatius of Loyola and took his first vows.',
    detectiveClues: [
      {
        id: 'x2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Capital of France on the Seine River',
        clueText:
          'Look to northern France along the curving Seine River. Above the city rises the famous white-domed hill of Montmartre ("Mount of Martyrs"), just north of the historic Latin Quarter.',
        soundCue: 'compass_click',
      },
      {
        id: 'x2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Most Famous College Roommate Trio in History',
        clueText:
          'At the Collège de Sainte-Barbe in this city’s 5th arrondissement, three roommates shared a single student chamber in 1529: Peter Faber, Francis Xavier, and an older Basque student named Ignatius of Loyola!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x2-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Underground Crypt Vow of August 15, 1534',
        clueText:
          'On the Feast of the Assumption in 1534, Francis Xavier and six university companions climbed Montmartre Hill and descended into a candlelit stone crypt to vow poverty, chastity, and a pilgrimage to Jerusalem.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The candlelit stone altar beneath the Romanesque arch in the crypt.',
        hintDirection: 'Click marker #1 on the stone altar glowing with beeswax candles.',
        foundTitle: 'What Happened Here: The Vow of Montmartre (August 15, 1534)',
        xPercent: 56,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'In this quiet crypt on Montmartre Hill on August 15, 1534, Peter Faber—the only ordained priest among the seven students—celebrated Mass while Francis Xavier, Ignatius of Loyola, and four others vowed poverty and missionary service.',
        stoneKeyWord: 'VOW OF MONTMARTRE (1534)',
        stoneKeyMeaning: 'The foundational vow taken by Xavier, Ignatius, and five companions',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The open leather-bound Latin manuscript resting on the stone altar step.',
        hintDirection: 'Click marker #2 on the open book and pilgrim staff on the steps.',
        foundTitle: 'Did You Know? The Question That Changed Xavier’s Life',
        xPercent: 50,
        yPercent: 74,
        hitRadius: 14,
        storyUnlocked:
          'Xavier initially dreamed of a prestigious canonry in Pamplona. For four years in Paris, his roommate Ignatius helped pay Xavier’s tuition and sent him new students, gently repeating Jesus’s words from Mark 8:36 until Xavier’s heart caught fire.',
        stoneKeyWord: 'ROOMMATES OF SAINTE-BARBE',
        stoneKeyMeaning: 'How Ignatius of Loyola won over the proud young professor in Paris',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The wrought-iron sanctuary gate on the left side of the subterranean vault.',
        hintDirection: 'Click marker #3 on the arched iron gate of the crypt.',
        foundTitle: 'Where Is It Modern Day Now? 11 Rue Yvonne Le Tac, Montmartre, Paris',
        xPercent: 22,
        yPercent: 58,
        hitRadius: 14,
        storyUnlocked:
          'Today, just steps down the hill from the Basilica of Sacré-Cœur at 11 Rue Yvonne Le Tac in Paris’s 18th arrondissement, the Crypt of the Martyrium of St. Denis welcomes pilgrims from around the world.',
        stoneKeyWord: 'MONTMARTRE, PARIS, FRANCE',
        stoneKeyMeaning: 'The modern Parisian sanctuary where the Society of Jesus was born',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Crypt on the Hill',
        questionPrompt: 'What historic pledge took place in the Montmartre crypt on August 15, 1534?',
        correctStoneId: 'x2-art-1',
      },
      {
        slotLabel: 'Lock II · The University Roommates',
        questionPrompt: 'Where did Francis Xavier, Peter Faber, and Ignatius of Loyola live as students?',
        correctStoneId: 'x2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which modern European capital does the Montmartre Martyrium stand today?',
        correctStoneId: 'x2-art-3',
      },
    ],
    sealName: 'Seal of Montmartre',
  },
  {
    stopNumber: 3,
    title: 'The Tagus Caravel & The Sail to the Indies',
    subtitle: 'Explore the Belém cloister and Tagus harbor in Lisbon to uncover 3 hidden memories',
    eraLabel: '1540 – April 7, 1541 · Departure for Asia',
    ancientPlaceName: 'Olisipo / Restelo Harbor (Belém)',
    modernPlaceName: 'Lisbon',
    modernCountry: 'Portugal',
    image: '/images/trails/xavier_step3_lisbon.jpg',
    imageCaption:
      'Manueline limestone cloister of Jerónimos Monastery overlooking a 16th-century Portuguese carrack on the Tagus River in Belém, Lisbon.',
    whatYouCanSeeToday:
      'Today in the Belém district of Lisbon, Portugal, visitors walk the honey-colored limestone cloisters of the UNESCO Jerónimos Monastery and stand on the Tagus River waterfront beside Belém Tower, where the India fleets weighed anchor.',
    didYouKnowHighlight:
      'Given less than 24 hours’ notice in Rome to replace an ailing missionary bound for India, Francis Xavier patched his own worn cassock, said goodbye to Ignatius, rode across the Alps and Pyrenees to Lisbon, and set sail on his 35th birthday—April 7, 1541!',
    saintQuote:
      '“Great indeed are the perils of the sea, yet far greater is the love of God that draws us across the ocean.”',
    globePlacement: {
      latDeg: 38.69,
      lngDeg: -9.2,
      regionLabel: 'Tagus River Estuary, Atlantic Coast of Portugal',
      beaconColorHex: '#Facc15',
      labelOffsetPx: [-72, 24],
    },
    detectiveCaseTitle: 'Case #3 · The Atlantic Gateway of the Caravels',
    detectiveLeadPrompt:
      'Read the 3 clues below, then zoom into the Atlantic port capital where Xavier boarded the flagship Santiago for his 13-month voyage to India.',
    detectiveClues: [
      {
        id: 'x3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Westernmost Capital of Mainland Europe on the Tagus Estuary',
        clueText:
          'Look to the Atlantic coast of the Iberian Peninsula where the broad Tagus River meets the ocean. Its waterfront district of Belém is famous for Manueline limestone monuments and custard tarts.',
        soundCue: 'compass_click',
      },
      {
        id: 'x3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The "Apostle of the Indies" Who Slept on Coiled Ship Ropes',
        clueText:
          'While waiting 9 months for the spring monsoon fleet in this port, Xavier lived in the Hospital of All Saints rather than the royal palace, and on board the flagship Santiago he used a coil of anchor rope as his pillow!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x3-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Setting Sail on His 35th Birthday (April 7, 1541)',
        clueText:
          'Commissioned by King John III of Portugal and Pope Paul III as Apostolic Nuncio to the East, Xavier boarded the carrack Santiago here on April 7, 1541, never to return to Europe again.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The tall three-masted Portuguese carrack anchored in the golden Tagus mist.',
        hintDirection: 'Click marker #1 on the sailing ship framed through the stone arch.',
        foundTitle: 'What Happened Here: Departure on the Flagship Santiago (1541)',
        xPercent: 58,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'On April 7, 1541—his 35th birthday—Francis Xavier boarded the flagship Santiago in Belém harbor with the new Governor of India, Martim Afonso de Sousa, beginning a perilous 13-month voyage around Africa to Goa.',
        stoneKeyWord: 'FLAGSHIP SANTIAGO (1541)',
        stoneKeyMeaning: 'The Portuguese carrack that carried Xavier from Lisbon around Africa to India',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The robed friars walking along the vaulted limestone cloister gallery.',
        hintDirection: 'Click marker #2 on the figures in the left stone cloister.',
        foundTitle: 'Did You Know? Why King John III Wanted to Keep Him in Portugal',
        xPercent: 18,
        yPercent: 64,
        hitRadius: 14,
        storyUnlocked:
          'During the nine months Xavier spent tending prisoners and the sick in Lisbon while waiting for the spring fleet, his preaching transformed the royal court so deeply that King John III nearly begged the Pope to let Xavier stay in Portugal!',
        stoneKeyWord: 'NINE MONTHS IN LISBON',
        stoneKeyMeaning: 'How Xavier’s service in Lisbon’s hospitals moved the Portuguese court',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The ornate carved Manueline limestone column in the foreground.',
        hintDirection: 'Click marker #3 on the carved stone pillar of the cloister.',
        foundTitle: 'Where Is It Modern Day Now? Belém, Lisbon, Portugal',
        xPercent: 36,
        yPercent: 55,
        hitRadius: 14,
        storyUnlocked:
          'Today in Belém (western Lisbon, Portugal), the UNESCO Jerónimos Monastery—carved with maritime ropes, astrolabes, and sea corals—stands directly overlooking the Tagus River departure point of the 16th-century India armadas.',
        stoneKeyWord: 'BELÉM, LISBON, PORTUGAL',
        stoneKeyMeaning: 'The historic maritime district of Lisbon where the India fleets sailed',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Birthday Voyage',
        questionPrompt: 'Which ship carried St. Francis Xavier from Lisbon to India in 1541?',
        correctStoneId: 'x3-art-1',
      },
      {
        slotLabel: 'Lock II · Hospital Ministry',
        questionPrompt: 'How did Xavier spend his nine months in Lisbon before the fleet sailed?',
        correctStoneId: 'x3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which modern district of Lisbon did the 16th-century India fleets embark?',
        correctStoneId: 'x3-art-3',
      },
    ],
    sealName: 'Seal of Lisbon',
  },
  {
    stopNumber: 4,
    title: 'The Handbell in the Streets & The Silver Shrine of Bom Jesus',
    subtitle: 'Examine the red laterite Basilica of Bom Jesus in Old Goa to uncover 3 hidden memories',
    eraLabel: 'May 6, 1542 – 1554 AD · Mission Base & Shrine',
    ancientPlaceName: 'Goa Velha (Golden Goa)',
    modernPlaceName: 'Old Goa',
    modernCountry: 'India',
    image: '/images/trails/xavier_step4_goa.jpg',
    imageCaption:
      'UNESCO Basilica of Bom Jesus built of warm red laterite stone in Old Goa, India, housing the silver reliquary tomb of St. Francis Xavier.',
    whatYouCanSeeToday:
      'Today in Old Goa (Velha Goa, 10 km east of Panaji in Goa, India), millions of visitors of all faiths enter the unplastered red laterite Basilica of Bom Jesus to pray before the elevated silver casket of "Goencho Saib" (Lord of Goa), St. Francis Xavier.',
    didYouKnowHighlight:
      'Upon landing in Goa on May 6, 1542, Xavier walked barefoot through the streets ringing a small handbell and singing catechism rhymes so children and pearl-fishers could learn prayers through music. Today he is affectionately revered across Goa as "Goencho Saib"!',
    saintQuote:
      '“Many times my arms grow weary of baptizing and my voice fails me from repeating the prayers, yet my spirit overflows with joy.”',
    globePlacement: {
      latDeg: 15.5,
      lngDeg: 73.91,
      regionLabel: 'Konkan Coast, Arabian Sea, Goa, India',
      beaconColorHex: '#10B981',
      labelOffsetPx: [-66, 26],
    },
    detectiveCaseTitle: 'Case #4 · The Red Laterite Basilica of "Goencho Saib"',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the tropical Arabian Sea coast of India where Xavier’s silver reliquary rests today.',
    detectiveClues: [
      {
        id: 'x4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A UNESCO World Heritage Former Capital on India’s Smallest State Coast',
        clueText:
          'Look to the lush tropical Konkan coast along the Arabian Sea in western India, just east of modern Panaji. Its palm-shaded avenues preserve monumental 16th-century Baroque churches.',
        soundCue: 'compass_click',
      },
      {
        id: 'x4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Florentine Marble & Silver Mausoleum Opened Once Every Decade',
        clueText:
          'Inside the Basilica of Bom Jesus here, a three-tiered mausoleum gifted by the Grand Duke of Tuscany holds a silver casket adorned with 32 relief plates, brought down for public Exposition once every 10 years!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x4-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Walking Barefoot with a Little Handbell (May 1542)',
        clueText:
          'Arriving here after 13 months at sea, Xavier lived in the royal hospital beside lepers and walked the dusty lanes ringing a handbell to gather children and slaves for sung lessons.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The bronze bell hanging high in the left laterite stone belfry tower.',
        hintDirection: 'Click marker #1 on the bell window of the upper left tower.',
        foundTitle: 'What Happened Here: The Missionary with the Little Bell (1542)',
        xPercent: 39,
        yPercent: 25,
        hitRadius: 14,
        storyUnlocked:
          'Landing in Goa on May 6, 1542, Francis Xavier bypassed stately carriages and walked barefoot through the markets ringing a small bell, inviting children to learn prayers set to catchy Konkani and Portuguese melodies.',
        stoneKeyWord: 'HANDBELL IN GOA (1542)',
        stoneKeyMeaning: 'How Xavier used music and a handbell to teach children across Goa and South India',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The glowing golden sanctuary visible through the central arched doorway.',
        hintDirection: 'Click marker #2 inside the illuminated central portal of the basilica.',
        foundTitle: 'Did You Know? The Incorrupt Relics in the Florentine Silver Casket',
        xPercent: 62,
        yPercent: 78,
        hitRadius: 14,
        storyUnlocked:
          'When Xavier’s body was brought back from China to Goa in 1554, doctors examined it and found it completely incorrupt. Today it rests inside a 17th-century silver casket crafted by Goan silversmiths atop a marble pedestal carved in Florence.',
        stoneKeyWord: 'SILVER SHRINE OF BOM JESUS',
        stoneKeyMeaning: 'The 17th-century silver and Florentine marble reliquary in Old Goa',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The unplastered reddish-brown laterite facade of the Basilica.',
        hintDirection: 'Click marker #3 on the central red laterite stone pediment.',
        foundTitle: 'Where Is It Modern Day Now? Basilica of Bom Jesus, Old Goa, India',
        xPercent: 62,
        yPercent: 42,
        hitRadius: 14,
        storyUnlocked:
          'Today in Old Goa, India, the Basilica of Bom Jesus (consecrated in 1605) is a UNESCO World Heritage landmark. In 1950, builders removed its white lime plaster, exposing the warm red laterite stone that hardens with every monsoon!',
        stoneKeyWord: 'OLD GOA, INDIA',
        stoneKeyMeaning: 'The UNESCO World Heritage site housing St. Francis Xavier’s tomb',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Bell in the Lanes',
        questionPrompt: 'How did St. Francis Xavier gather children and townsfolk upon arriving in Goa in 1542?',
        correctStoneId: 'x4-art-1',
      },
      {
        slotLabel: 'Lock II · The Sacred Mausoleum',
        questionPrompt: 'What rests inside the Basilica of Bom Jesus in Old Goa today?',
        correctStoneId: 'x4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which historic Indian coastal town does the Basilica of Bom Jesus stand?',
        correctStoneId: 'x4-art-3',
      },
    ],
    sealName: 'Seal of Old Goa',
  },
  {
    stopNumber: 5,
    title: 'The Volcano Bay & The First Footsteps in Japan',
    subtitle: 'Survey Kagoshima Bay and Sakurajima volcano to uncover 3 hidden memories',
    eraLabel: 'August 15, 1549 · Arrival in Japan',
    ancientPlaceName: 'Satsuma Domain (Kagoshima)',
    modernPlaceName: 'Kagoshima',
    modernCountry: 'Japan',
    image: '/images/trails/xavier_step5_kagoshima.jpg',
    imageCaption:
      'St. Francis Xavier Memorial Cathedral and landing monument overlooking Kagoshima Bay and the active volcano Sakurajima in Kyushu, Japan.',
    whatYouCanSeeToday:
      'Today in Kagoshima (at the southern tip of Kyushu Island, Japan), visitors stroll through Xavier Park (Zabieru Kōen) to see his bronze statue and stone landing monument, and visit the nearby St. Francis Xavier Memorial Cathedral facing smoking Mount Sakurajima.',
    didYouKnowHighlight:
      'Sailing aboard a Chinese junk nicknamed "The Thief’s Ship," Xavier landed in Kagoshima on August 15, 1549—exactly 15 years to the day after his vow on Montmartre—guided by Anjiro, a samurai from Kagoshima who became the first Japanese Christian!',
    saintQuote:
      '“The people whom we have met so far in Japan are the best who have yet been discovered, and a people of remarkable honor.”',
    globePlacement: {
      latDeg: 31.59,
      lngDeg: 130.55,
      regionLabel: 'Satsuma Peninsula, Southern Kyushu, Japan',
      beaconColorHex: '#EC4899',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #5 · The Samurai Harbor Beneath the Smoking Volcano',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the southern Japanese bay where Francis Xavier landed on August 15, 1549.',
    detectiveClues: [
      {
        id: 'x5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The "Naples of the East" at the Southern Tip of Kyushu, Japan',
        clueText:
          'Look to the southernmost of Japan’s four main islands. This coastal prefectural capital wraps around a deep blue bay dominated by Sakurajima, an active smoking stratovolcano just 4 km offshore.',
        soundCue: 'compass_click',
      },
      {
        id: 'x5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '"Zabieru" Park & The Samurai Daimyo Shimazu Takahisa',
        clueText:
          'Every schoolchild in Japan knows this missionary as "Furanshisuko Zabieru." In this city’s central park stands a monument honoring his 1549 meeting with the samurai lord Shimazu Takahisa of Satsuma!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x5-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Landing with Anjiro on August 15, 1549',
        clueText:
          'Guided by his Japanese companion Anjiro (baptized Paulo de Santa Fé in Goa), Xavier stepped ashore here on the Feast of the Assumption in 1549 and spent a year learning Japanese and translating the catechism.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The engraved stone monument and lanterns in the lower left foreground.',
        hintDirection: 'Click marker #1 on the carved stone monument in the park.',
        foundTitle: 'What Happened Here: Landing with Anjiro in Satsuma (August 15, 1549)',
        xPercent: 18,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'On August 15, 1549, Francis Xavier stepped ashore at Kagoshima alongside Anjiro, a local samurai who had met Xavier in Malacca. Welcomed by the Daimyo Shimazu Takahisa, Xavier spent 10 months here translating the Creed into Japanese.',
        stoneKeyWord: 'LANDING IN KAGOSHIMA (1549)',
        stoneKeyMeaning: 'Where Xavier and Anjiro introduced Christianity to Japan on August 15, 1549',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The smoking volcanic peak of Sakurajima rising across the blue bay.',
        hintDirection: 'Click marker #2 on the volcano and plume of smoke across the water.',
        foundTitle: 'Did You Know? Why Every Japanese Textbook Pictures "Zabieru"',
        xPercent: 63,
        yPercent: 34,
        hitRadius: 14,
        storyUnlocked:
          'In Japan, St. Francis Xavier ("Zabieru") is one of the most famous figures in national history textbooks because his 1549 arrival in Kagoshima opened Japan’s first cultural, scientific, and artistic exchange with Europe—including mechanical clocks, spectacles, and polyphonic music!',
        stoneKeyWord: 'ZABIERU IN JAPAN',
        stoneKeyMeaning: 'How Xavier opened the first cultural bridge between Europe and Japan',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The red-brick spire of St. Francis Xavier Memorial Cathedral on the left.',
        hintDirection: 'Click marker #3 on the church steeple overlooking the bay.',
        foundTitle: 'Where Is It Modern Day Now? Kagoshima, Kyushu, Japan',
        xPercent: 29,
        yPercent: 40,
        hitRadius: 14,
        storyUnlocked:
          'Today in Kagoshima, Japan, visitors visit St. Francis Xavier Cathedral (built in 1908 and rebuilt after WWII) and nearby Xavier Park, where the original stone arches of the 1908 church frame views toward Kagoshima Bay.',
        stoneKeyWord: 'KAGOSHIMA, KYUSHU, JAPAN',
        stoneKeyMeaning: 'The southern Japanese port city where Xavier landed in 1549',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Samurai Companion',
        questionPrompt: 'Who guided St. Francis Xavier to his hometown of Kagoshima on August 15, 1549?',
        correctStoneId: 'x5-art-1',
      },
      {
        slotLabel: 'Lock II · Cultural Bridge',
        questionPrompt: 'By what name is St. Francis Xavier universally known in Japanese history?',
        correctStoneId: 'x5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which southern Japanese city facing Sakurajima volcano did Xavier land?',
        correctStoneId: 'x5-art-3',
      },
    ],
    sealName: 'Seal of Kagoshima',
  },
  {
    stopNumber: 6,
    title: 'The Island at the Gates of China & The Final Dawn',
    subtitle: 'Ascend the hillside chapel on Shangchuan Island to uncover 3 hidden memories',
    eraLabel: 'December 3, 1552 AD · Final Resting Threshold',
    ancientPlaceName: 'Sancian Island (São João)',
    modernPlaceName: 'Shangchuan Island (Taishan)',
    modernCountry: 'China',
    image: '/images/trails/xavier_step6_shangchuan.jpg',
    imageCaption:
      'White hillside Memorial Chapel of St. Francis Xavier on Shangchuan Island, Guangdong, China, looking out across the South China Sea.',
    whatYouCanSeeToday:
      'Today on Shangchuan Island (part of Taishan in Guangdong Province, southern China, 14 km off the mainland coast), pilgrims climb the stone staircase through green coastal hills to the restored white Gothic Memorial Chapel marking where Xavier died on December 3, 1552.',
    didYouKnowHighlight:
      'Only a young Chinese Christian seminarian named Antonio of Santa Fé was with Xavier in his thatched hut when he died at dawn on December 3, 1552. Packed in two sacks of unslaked lime to speed decomposition, his body was found completely fresh and intact 10 weeks later!',
    saintQuote:
      '“In You, O Lord, have I hoped; let me never be confounded in eternity.”',
    globePlacement: {
      latDeg: 21.73,
      lngDeg: 112.77,
      regionLabel: 'Chuanshan Archipelago, Guangdong Coast, South China Sea',
      beaconColorHex: '#A855F7',
      labelOffsetPx: [-76, 26],
    },
    detectiveCaseTitle: 'Case #6 · The Island Sanctuary at the Threshold of China',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the South China Sea island off Guangdong where St. Francis Xavier completed his earthly journey.',
    detectiveClues: [
      {
        id: 'x6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Lush Subtropical Island 14 km Off Guangdong Province, Southern China',
        clueText:
          'Look to the South China Sea just west of Macau and Hong Kong, off the coast of Taishan in Guangdong, China. Known to 16th-century Portuguese sailors as "Sancian," it is the largest island in Guangdong after Hainan.',
        soundCue: 'compass_click',
      },
      {
        id: 'x6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Two Sacks of Lime & The Ten-Week Miracle',
        clueText:
          'When Xavier died in a windswept reed hut on this island on December 3, 1552, four men packed his coffin with unslaked lime so they could later carry his bones to Goa—yet in February 1553 his body was still completely fresh!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x6-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Gazing Toward the Mainland of China at Age 46',
        clueText:
          'Having realized in Japan that Japanese culture looked to China as its teacher, Xavier sailed to this offshore trading island and waited in vain for a Cantonese junk to smuggle him onto the Ming mainland.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'x6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The white hillside chapel crowning the stone staircase above the sea.',
        hintDirection: 'Click marker #1 on the white chapel on the right hillside.',
        foundTitle: 'What Happened Here: Dawn of December 3, 1552',
        xPercent: 71,
        yPercent: 34,
        hitRadius: 14,
        storyUnlocked:
          'Stricken with a high fever inside a drafty reed hut on Shangchuan Island while waiting for a boat to Canton, 46-year-old Francis Xavier died at dawn on December 3, 1552, attended only by his faithful Chinese companion Antonio.',
        stoneKeyWord: 'DAWN ON SHANGCHUAN (1552)',
        stoneKeyMeaning: 'Where St. Francis Xavier died at age 46 gazing toward mainland China',
        soundCue: 'relic_discovered',
      },
      {
        id: 'x6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The long stone stairway ascending through the green coastal hillside.',
        hintDirection: 'Click marker #2 on the stone steps leading up to the chapel.',
        foundTitle: 'Did You Know? How Xavier Inspired Matteo Ricci’s Mission to Beijing',
        xPercent: 60,
        yPercent: 63,
        hitRadius: 14,
        storyUnlocked:
          'In the exact year Xavier died on Shangchuan Island (1552), a baby named Matteo Ricci was born in Italy—who 30 years later would fulfill Xavier’s dream by entering mainland China and reaching the Imperial Forbidden City in Beijing!',
        stoneKeyWord: 'TORCH PASSED TO RICCI',
        stoneKeyMeaning: 'Matteo Ricci was born in 1552, the very year Xavier died at China’s gates',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'x6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The golden South China Sea horizon dotted with traditional wooden boats.',
        hintDirection: 'Click marker #3 on the sunlit bay on the left.',
        foundTitle: 'Where Is It Modern Day Now? Shangchuan Island, Taishan, Guangdong, China',
        xPercent: 32,
        yPercent: 48,
        hitRadius: 14,
        storyUnlocked:
          'Today on Shangchuan Island (Taishan, Guangdong Province, China), the hillside St. Francis Xavier Memorial Chapel and stone obelisk are protected heritage monuments visited by pilgrims arriving by ferry from Shanzui Harbor.',
        stoneKeyWord: 'SHANGCHUAN ISLAND, CHINA',
        stoneKeyMeaning: 'The South China Sea island sanctuary in Guangdong Province today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Final Watch',
        questionPrompt: 'When did St. Francis Xavier pass away on Shangchuan Island?',
        correctStoneId: 'x6-art-1',
      },
      {
        slotLabel: 'Lock II · The Torch Passed On',
        questionPrompt: 'Which future Jesuit missionary to Beijing was born in the exact year Xavier died (1552)?',
        correctStoneId: 'x6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Off which southern Chinese province does Shangchuan Island lie today?',
        correctStoneId: 'x6-art-3',
      },
    ],
    sealName: 'Seal of Shangchuan',
  },
];

export const ST_PAUL_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Street Called Straight & The Scales That Fell',
    subtitle: 'Inspect the Roman arches and Underground Chapel of Ananias in Damascus',
    eraLabel: 'c. 34 AD · Conversion & Baptism',
    ancientPlaceName: 'Damascus (Via Recta)',
    modernPlaceName: 'Damascus',
    modernCountry: 'Syria',
    image: '/images/trails/paul_step1_damascus.jpg',
    imageCaption:
      'Roman colonnade arch on Straight Street (Via Recta) and the subterranean stone Chapel of St. Ananias in Old Damascus, Syria.',
    whatYouCanSeeToday:
      'Today in the Old City of Damascus, Syria, visitors walk the 1.5-kilometer Roman thoroughfare still called Midhat Pasha / Straight Street (Via Recta) and descend 23 stone steps at its eastern end into the 1st-century underground House-Chapel of St. Ananias.',
    didYouKnowHighlight:
      'Wait until you see Bab Kisan on the southeastern wall of Old Damascus: built directly into the ancient stone city wall is a chapel marking the exact window from which disciples lowered Paul at night in a large woven basket (Acts 9:25) to escape arrest!',
    saintQuote:
      '“Immediately something like scales fell from his eyes, and his sight was restored; then he got up and was baptized.”',
    globePlacement: {
      latDeg: 33.51,
      lngDeg: 36.31,
      regionLabel: 'Ghouta Oasis, Anti-Lebanon Foothills, Syria',
      beaconColorHex: '#F59E0B',
      labelOffsetPx: [64, -22],
    },
    detectiveCaseTitle: 'Case #1 · The Ancient Capital of the Street Called Straight',
    detectiveLeadPrompt:
      'Read the 3 clues below, then locate the ancient Syrian capital where blinded Saul of Tarsus regained his sight.',
    detectiveClues: [
      {
        id: 'p1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'One of the World’s Oldest Continuously Inhabited Capital Cities',
        clueText:
          'Look to the eastern Mediterranean Levant, just east of the Anti-Lebanon mountains. This ancient Syrian capital is famous for its walled Old City and the Roman thoroughfare still running east-to-west.',
        soundCue: 'compass_click',
      },
      {
        id: 'p1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Cellar Four Meters Underground & The Basket Escape Window',
        clueText:
          'Centuries of rebuilding raised this city’s street level by four meters, so visitors today walk down 23 steps into the original 1st-century stone rooms of Ananias—and nearby stands Bab Kisan, where Paul escaped in a basket!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p1-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Three Days Blind at the House of Judas on Straight Street',
        clueText:
          'After a blinding light knocked Saul to the ground outside this city’s gates, the Lord sent a disciple named Ananias to Straight Street to lay hands on him and baptize the future Apostle to the Gentiles.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The candlelit subterranean stone chapel beneath the heavy masonry arch.',
        hintDirection: 'Click marker #1 inside the candlelit underground vault on the right.',
        foundTitle: 'What Happened Here: Ananias Restores Saul’s Sight (Acts 9)',
        xPercent: 78,
        yPercent: 62,
        hitRadius: 14,
        storyUnlocked:
          'Inside this 1st-century stone cellar at the eastern end of Straight Street, Ananias laid his hands on blinded Saul of Tarsus, saying, "Brother Saul, the Lord Jesus who appeared to you on the road has sent me so that you may regain your sight."',
        stoneKeyWord: 'SIGHT RESTORED IN DAMASCUS',
        stoneKeyMeaning: 'Where Ananias healed and baptized Saul of Tarsus',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p1-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The row of ancient Roman stone columns lining the paved street.',
        hintDirection: 'Click marker #2 on the Roman colonnade along the street.',
        foundTitle: 'Did You Know? The Roman Via Recta ("Street Called Straight")',
        xPercent: 39,
        yPercent: 45,
        hitRadius: 14,
        storyUnlocked:
          'Mentioned by name in Acts 9:11, Damascus’s "Street Called Straight" (Via Recta) was originally a 26-meter-wide Hellenistic and Roman boulevard flanked by Corinthian columns stretching 1,500 meters from Bab Sharqi to Bab al-Jabiya!',
        stoneKeyWord: 'VIA RECTA COLONNADE',
        stoneKeyMeaning: 'The 1.5-km Roman boulevard in Old Damascus mentioned in Acts 9:11',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The stone steps descending from the old city street into the chapel.',
        hintDirection: 'Click marker #3 at the bottom center stone steps.',
        foundTitle: 'Where Is It Modern Day Now? Bab Sharqi Quarter, Old Damascus, Syria',
        xPercent: 52,
        yPercent: 80,
        hitRadius: 14,
        storyUnlocked:
          'Today in the Christian Quarter near Bab Sharqi in Old Damascus, Syria, the Underground House-Chapel of St. Ananias remains an active place of pilgrimage four meters below the modern cobblestones.',
        stoneKeyWord: 'OLD DAMASCUS, SYRIA',
        stoneKeyMeaning: 'The modern capital of Syria where the Chapel of St. Ananias stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Healing Touch',
        questionPrompt: 'Who laid hands on Saul of Tarsus in Damascus to restore his sight?',
        correctStoneId: 'p1-art-1',
      },
      {
        slotLabel: 'Lock II · The Roman Boulevard',
        questionPrompt: 'What famous Roman street in Damascus is named in Acts 9:11?',
        correctStoneId: 'p1-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which modern capital city does the subterranean Chapel of St. Ananias stand?',
        correctStoneId: 'p1-art-3',
      },
    ],
    sealName: 'Seal of Damascus',
  },
  {
    stopNumber: 2,
    title: 'The Cliffside Cave & Where Disciples Were First Called Christians',
    subtitle: 'Examine the rock-cut Cave Church of St. Peter in Antakya (ancient Antioch)',
    eraLabel: 'c. 43 – 49 AD · Launchpad of the Missions',
    ancientPlaceName: 'Antioch on the Orontes',
    modernPlaceName: 'Antakya',
    modernCountry: 'Turkey',
    image: '/images/trails/paul_step2_antioch.jpg',
    imageCaption:
      'Rock-hewn Cave Church of St. Peter (Sen Piyer Kilisesi) carved into the cliffside of Mount Starius in Antakya (ancient Antioch), Turkey.',
    whatYouCanSeeToday:
      'Today in Antakya (Hatay Province in southernmost Turkey near the Mediterranean coast), visitors climb the western slope of Mount Starius to enter the Cave Church of St. Peter (Sen Piyer Kilisesi), featuring a 13th-century stone facade set into a natural limestone cavern.',
    didYouKnowHighlight:
      'Acts 11:26 records a milestone that happened right here in Antioch after Barnabas brought Paul from Tarsus to teach for a full year: "It was in Antioch that the disciples were first called Christians!"',
    saintQuote:
      '“Set apart for Me Barnabas and Saul for the work to which I have called them.”',
    globePlacement: {
      latDeg: 36.2,
      lngDeg: 36.16,
      regionLabel: 'Orontes River Valley, Hatay, Southern Turkey',
      beaconColorHex: '#38BDF8',
      labelOffsetPx: [64, -26],
    },
    detectiveCaseTitle: 'Case #2 · The Rock-Cut Grotto Where the Name "Christian" Was Born',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the southern Turkish city (ancient Antioch) from which Paul and Barnabas launched their missionary journeys.',
    detectiveClues: [
      {
        id: 'p2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Southern Turkish City on the Orontes River Near the Mediterranean',
        clueText:
          'Look to the southernmost tip of modern Turkey (Hatay Province) along the Orontes River. In Roman times, this city was the third-largest metropolis of the entire Empire after Rome and Alexandria.',
        soundCue: 'compass_click',
      },
      {
        id: 'p2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The World’s Oldest Cave Church & Its Secret Mountain Escape Tunnel',
        clueText:
          'Carved 13 meters deep into the cliff of Mount Starius above this city is the Cave Church of St. Peter, which still preserves a rock-hewn escape tunnel and water cistern from the 1st century!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p2-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"In Antioch the Disciples Were First Called Christians" (Acts 11:26)',
        clueText:
          'Fetched from Tarsus by Barnabas, Paul taught a thriving mixed community of Jews and Greeks here and used this city as the home base for all three of his great missionary journeys.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The triple-arched stone facade built directly into the sheer limestone cliff.',
        hintDirection: 'Click marker #1 on the central stone facade of the cave church.',
        foundTitle: 'What Happened Here: First Called "Christians" (Acts 11:26)',
        xPercent: 60,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'Here in Antioch on the Orontes, Paul and Barnabas taught side-by-side for a full year, welcoming Greek Gentiles alongside Jewish believers—leading the city’s residents to coin the name "Christianoi" (Christians) for the very first time.',
        stoneKeyWord: 'FIRST CALLED CHRISTIANS',
        stoneKeyMeaning: 'Antioch was where followers of Jesus were first called Christians (Acts 11:26)',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The natural rock cavern opening and stone altar on the right side.',
        hintDirection: 'Click marker #2 on the rock grotto opening on the right.',
        foundTitle: 'Did You Know? The 1st-Century Secret Rock Escape Tunnel',
        xPercent: 86,
        yPercent: 66,
        hitRadius: 14,
        storyUnlocked:
          'Inside the limestone cavern of St. Peter’s Grotto, water seeping through the mountain rock was collected in a stone basin for baptisms, while a narrow tunnel carved into the rear cliff allowed early believers to slip out onto the mountain during Roman raids.',
        stoneKeyWord: 'GROTTO OF MOUNT STARIUS',
        stoneKeyMeaning: 'The 1st-century cave sanctuary and escape tunnel in Antakya',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The modern valley city of Antakya visible in the sunlit distance on the left.',
        hintDirection: 'Click marker #3 overlooking the valley city on the left.',
        foundTitle: 'Where Is It Modern Day Now? Antakya (Hatay), Turkey',
        xPercent: 18,
        yPercent: 58,
        hitRadius: 14,
        storyUnlocked:
          'Today in Antakya (Hatay Province, southern Turkey), the Cave Church of St. Peter—declared a Papal pilgrimage shrine by Pope Paul VI in 1963—celebrates a solemn ecumenical feast every June 29.',
        stoneKeyWord: 'ANTAKYA (HATAY), TURKEY',
        stoneKeyMeaning: 'The modern Turkish city occupying the site of ancient Antioch',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The New Name',
        questionPrompt: 'What historic name was used for the first time in Antioch according to Acts 11:26?',
        correctStoneId: 'p2-art-1',
      },
      {
        slotLabel: 'Lock II · The Cliffside Sanctuary',
        questionPrompt: 'Into which mountain cliff in Antakya is the Cave Church of St. Peter carved?',
        correctStoneId: 'p2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'By what modern Turkish city name is ancient Antioch on the Orontes known today?',
        correctStoneId: 'p2-art-3',
      },
    ],
    sealName: 'Seal of Antioch',
  },
  {
    stopNumber: 3,
    title: 'The River of Purple Cloth & The First Baptism in Europe',
    subtitle: 'Explore the Zygaktis river baptistery and Roman ruins of Philippi in northern Greece',
    eraLabel: 'c. 49 – 50 AD · First Step in Europe',
    ancientPlaceName: 'Philippi (Via Egnatia)',
    modernPlaceName: 'Philippi (Kavala)',
    modernCountry: 'Greece',
    image: '/images/trails/paul_step3_philippi.jpg',
    imageCaption:
      'Outdoor river Baptistery of St. Lydia on the Zygaktis stream beside the UNESCO Roman ruins of Philippi near Kavala, northern Greece.',
    whatYouCanSeeToday:
      'Today at the UNESCO World Heritage archaeological site of Philippi (15 km northwest of the port of Kavala in Macedonia, northern Greece), pilgrims step down into the clear waters of the Zygaktis stream at the Outdoor Baptistery of St. Lydia and walk the Roman Via Egnatia.',
    didYouKnowHighlight:
      'Summoned to Macedonia by a dream vision at Troas, Paul walked outside the city gate of Philippi on the Sabbath to the riverbank, where he met Lydia—a businesswoman dealing in luxury purple dye—who became the very first baptized Christian on the continent of Europe!',
    saintQuote:
      '“The Lord opened Lydia’s heart to listen eagerly to what was said by Paul.”',
    globePlacement: {
      latDeg: 41.01,
      lngDeg: 24.28,
      regionLabel: 'Eastern Macedonia, Aegean North, Greece',
      beaconColorHex: '#10B981',
      labelOffsetPx: [-70, -26],
    },
    detectiveCaseTitle: 'Case #3 · The Macedonian River Where Europe Was First Baptized',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to northern Greece where Paul baptized Lydia and sang hymns at midnight during an earthquake.',
    detectiveClues: [
      {
        id: 'p3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A UNESCO Archaeological Site Near the Aegean Port of Kavala, Northern Greece',
        clueText:
          'Look to the northern Aegean coast of Greece in Eastern Macedonia. Founded by King Philip II (father of Alexander the Great), this city straddled the famous Roman highway Via Egnatia.',
        soundCue: 'compass_click',
      },
      {
        id: 'p3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Octagonal Mosaic Steps in the Flowing Zygaktis Stream',
        clueText:
          'Just outside the western walls of these ruins, the crystal-clear Zygaktis river still flows over an octagonal mosaic outdoor baptistery where modern pilgrims wade into the water!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p3-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Lydia the Purple-Cloth Merchant & The Midnight Prison Earthquake',
        clueText:
          'Here Paul baptized Europe’s first Christian convert (Lydia of Thyatira) and later sang hymns with Silas in stocks at midnight when a sudden earthquake flung open the prison doors (Acts 16).',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The octagonal mosaic baptismal platform submerged in the clear river water.',
        hintDirection: 'Click marker #1 on the submerged octagonal mosaic in the stream.',
        foundTitle: 'What Happened Here: Baptism of St. Lydia, First Convert in Europe (Acts 16)',
        xPercent: 44,
        yPercent: 76,
        hitRadius: 14,
        storyUnlocked:
          'Along the banks of the Zygaktis river outside Philippi’s gate, Paul spoke to a group of women gathered for Sabbath prayer. Lydia, a merchant of purple cloth, believed and was baptized here with her entire household—the first Christian baptism in Europe.',
        stoneKeyWord: 'LYDIA BAPTIZED IN EUROPE',
        stoneKeyMeaning: 'The riverbank at Philippi where the first European believer was baptized',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The tall Roman stone pillars and arches of the ancient forum basilica.',
        hintDirection: 'Click marker #2 on the tall stone ruins on the right.',
        foundTitle: 'Did You Know? Singing Hymns at Midnight Before the Earthquake',
        xPercent: 72,
        yPercent: 32,
        hitRadius: 14,
        storyUnlocked:
          'Thrown into Philippi’s inner dungeon with their feet fastened in stocks, Paul and Silas prayed and sang hymns to God at midnight until a violent earthquake unfastened every chain—leading the Roman jailer and his family to be baptized that same night!',
        stoneKeyWord: 'MIDNIGHT HYMNS AT PHILIPPI',
        stoneKeyMeaning: 'How Paul and Silas’s midnight hymns and the earthquake converted the Roman jailer',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The stone steps leading down from the green riverbank into the stream.',
        hintDirection: 'Click marker #3 on the riverside stone steps on the right.',
        foundTitle: 'Where Is It Modern Day Now? Philippi (Kavala), Macedonia, Greece',
        xPercent: 76,
        yPercent: 60,
        hitRadius: 14,
        storyUnlocked:
          'Today in Philippi (near the modern port of Kavala, northern Greece), the UNESCO archaeological park and the adjacent Baptistery of St. Lydia welcome pilgrims walking the ancient stones of the Via Egnatia.',
        stoneKeyWord: 'PHILIPPI (KAVALA), GREECE',
        stoneKeyMeaning: 'The UNESCO site in northern Greece where Paul founded his first European church',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · First Convert in Europe',
        questionPrompt: 'Who was baptized by St. Paul in the river outside Philippi as Europe’s first convert?',
        correctStoneId: 'p3-art-1',
      },
      {
        slotLabel: 'Lock II · The Midnight Earthquake',
        questionPrompt: 'What were Paul and Silas doing in Philippi’s prison at midnight when the earthquake struck?',
        correctStoneId: 'p3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Near which modern northern Greek port city do the UNESCO ruins of Philippi stand?',
        correctStoneId: 'p3-art-3',
      },
    ],
    sealName: 'Seal of Philippi',
  },
  {
    stopNumber: 4,
    title: 'Mars Hill & The Altar to an Unknown God',
    subtitle: 'Climb the rocky marble steps of the Areopagus below the Acropolis in Athens',
    eraLabel: 'c. 50 AD · Sermon on the Areopagus',
    ancientPlaceName: 'Athenai (Areopagus / Mars Hill)',
    modernPlaceName: 'Athens',
    modernCountry: 'Greece',
    image: '/images/trails/paul_step4_athens.jpg',
    imageCaption:
      'Rock-hewn steps and bronze sermon plaque on the Areopagus (Mars Hill) with the Parthenon on the Acropolis rising behind it in Athens, Greece.',
    whatYouCanSeeToday:
      'Today in the heart of Athens, Greece, visitors climb the ancient rock-cut steps of the Areopagus (Mars Hill) just northwest of the Acropolis entrance, read Paul’s complete sermon engraved in Greek on a bronze plaque at the base, and visit the Cathedral of St. Dionysius the Areopagite.',
    didYouKnowHighlight:
      'Instead of condemning the Athenians with anger, Paul brilliantly quoted two of their own Greek philosopher-poets—Epimenides ("In Him we live and move and have our being") and Aratus ("For we too are His offspring")—right on Mars Hill!',
    saintQuote:
      '“What therefore you worship as unknown, this I proclaim to you… For in Him we live and move and have our being.”',
    globePlacement: {
      latDeg: 37.97,
      lngDeg: 23.72,
      regionLabel: 'Attica Peninsula, Saronic Gulf, Greece',
      beaconColorHex: '#Facc15',
      labelOffsetPx: [-68, -26],
    },
    detectiveCaseTitle: 'Case #4 · The Marble Outcrop Below the Parthenon',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the classical Greek capital where Paul addressed the Stoics and Epicureans on Mars Hill.',
    detectiveClues: [
      {
        id: 'p4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Capital of Modern Greece Crowned by the Acropolis',
        clueText:
          'Look to the Attica peninsula of southern Greece. Directly below its world-famous marble temple of the Parthenon juts a bare limestone rock called the Areopagus ("Hill of Ares / Mars Hill").',
        soundCue: 'compass_click',
      },
      {
        id: 'p4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Bronze Plaque of Acts 17 & The Judge Dionysius the Areopagite',
        clueText:
          'Mounted into the rock at the foot of the ancient staircase on Mars Hill today is a large bronze tablet inscribed in Greek with Paul’s speech, which converted a high-court judge named Dionysius and a woman named Damaris!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p4-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"To an Unknown God" (Agnosto Theo)',
        clueText:
          'Walking through the Agora while waiting for Silas and Timothy, Paul noticed a stone altar inscribed "To an Unknown God" and used it as the opening hook for his address before the council of the Areopagus.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The ancient stone staircase carved directly into the bare marble rock of Mars Hill.',
        hintDirection: 'Click marker #1 on the stone steps ascending the rocky hill.',
        foundTitle: 'What Happened Here: Paul’s Sermon to the Philosophers on the Areopagus (Acts 17)',
        xPercent: 38,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Invited by Stoic and Epicurean philosophers to explain his teaching before the venerable Council of the Areopagus, Paul stood on this rocky outcrop and proclaimed that the Creator of the cosmos does not dwell in shrines made by human hands.',
        stoneKeyWord: 'SERMON ON MARS HILL',
        stoneKeyMeaning: 'Where St. Paul proclaimed the Unknown God to the philosophers of Athens',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The dark bronze plaque mounted into the boulder in the lower right foreground.',
        hintDirection: 'Click marker #2 on the bronze tablet set into the stone.',
        foundTitle: 'Did You Know? Quoting Two Greek Poets & Converting Judge Dionysius',
        xPercent: 64,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Engraved on this bronze plaque at the foot of the Areopagus is Paul’s speech from Acts 17:22-31. Hearing him quote the Greek poets Epimenides and Aratus, a member of the high court named Dionysius the Areopagite and a woman named Damaris became believers—and Dionysius became Athens’s first bishop!',
        stoneKeyWord: 'DIONYSIUS & DAMARIS',
        stoneKeyMeaning: 'The Athenian high-court judge and woman who believed after Paul’s Mars Hill address',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The golden Parthenon temple crowning the Acropolis plateau in the background.',
        hintDirection: 'Click marker #3 on the Parthenon on the upper right hill.',
        foundTitle: 'Where Is It Modern Day Now? Areopagus Hill, Acropolis, Athens, Greece',
        xPercent: 70,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Today in central Athens, Greece, the Areopagus rock stands free and open to visitors just steps below the entrance to the Acropolis, offering a sweeping sunset panorama over the ancient Agora where Paul debated daily.',
        stoneKeyWord: 'AREOPAGUS, ATHENS, GREECE',
        stoneKeyMeaning: 'Mars Hill directly below the Acropolis in modern Athens',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Altar Inscription',
        questionPrompt: 'Which Athenian altar inscription did Paul use to open his speech on the Areopagus?',
        correctStoneId: 'p4-art-1',
      },
      {
        slotLabel: 'Lock II · The First Athenian Believers',
        questionPrompt: 'Which judge of the Areopagus council and which woman believed after Paul’s speech?',
        correctStoneId: 'p4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Directly below which famous Athenian landmark does the Areopagus (Mars Hill) stand today?',
        correctStoneId: 'p4-art-3',
      },
    ],
    sealName: 'Seal of Athens',
  },
  {
    stopNumber: 5,
    title: 'The Tentmaker’s Workshop & The Stone Bema of Gallio',
    subtitle: 'Inspect the Roman Bema and Temple of Apollo in Ancient Corinth',
    eraLabel: 'c. 50 – 52 AD · 18 Months in Corinth',
    ancientPlaceName: 'Corinthus (Roman Forum)',
    modernPlaceName: 'Corinth',
    modernCountry: 'Greece',
    image: '/images/trails/paul_step5_corinth.jpg',
    imageCaption:
      'Stone Bema (judgment platform) in the Roman Forum of Ancient Corinth with the Doric columns of the Temple of Apollo and Acrocorinth in Greece.',
    whatYouCanSeeToday:
      'Today at Ancient Corinth (80 km west of Athens across the Corinth Canal in the Peloponnese, Greece), visitors stand directly before the raised stone Bema platform in the Roman Forum, walk past the 6th-century BC Temple of Apollo, and read the famous Latin "Erastus Inscription" in the stone pavement.',
    didYouKnowHighlight:
      'In Corinth, Paul worked with his own hands sewing leather tents alongside Aquila and Priscilla, wrote his earliest surviving letters (1 & 2 Thessalonians), and stood before the Roman Proconsul Gallio—brother of the philosopher Seneca—at this exact stone Bema!',
    saintQuote:
      '“Love is patient; love is kind… Love never ends.”',
    globePlacement: {
      latDeg: 37.9,
      lngDeg: 22.88,
      regionLabel: 'Isthmus of Corinth, Northern Peloponnese, Greece',
      beaconColorHex: '#EC4899',
      labelOffsetPx: [-72, 26],
    },
    detectiveCaseTitle: 'Case #5 · The Two-Harbor Isthmus & The Proconsul’s Stone Platform',
    detectiveLeadPrompt:
      'Read the 3 clues below, then locate the Peloponnesian isthmus city where Paul stitched tents for 18 months and stood before Proconsul Gallio.',
    detectiveClues: [
      {
        id: 'p5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Gateway to the Peloponnese Guarding a Famous 6-Kilometer Sea Canal',
        clueText:
          'Look just west of Athens where a narrow land bridge connects mainland Greece to the Peloponnese peninsula. Above the ancient Roman forum looms the massive fortress mountain of Acrocorinth.',
        soundCue: 'compass_click',
      },
      {
        id: 'p5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The "Erastus Pavement" & The Delphi Inscription That Dated Paul’s Life',
        clueText:
          'Archaeologists here uncovered a marble paving stone laid by "Erastus, city treasurer"—whom Paul greets in Romans 16:23—and the Bema where Proconsul Gallio dismissed charges against Paul in 51–52 AD!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p5-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Stitching Tents with Aquila & Priscilla & The Hymn to Love (1 Cor 13)',
        clueText:
          'Paul lived here for a year and a half working as a tentmaker, and later wrote to this vibrant port community his immortal chapter on Love ("Love is patient, love is kind").',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The raised rectangular stone platform (Bema) in the center of the forum.',
        hintDirection: 'Click marker #1 on the elevated stone Bema platform.',
        foundTitle: 'What Happened Here: Paul Before Proconsul Gallio at the Bema (Acts 18:12)',
        xPercent: 42,
        yPercent: 54,
        hitRadius: 14,
        storyUnlocked:
          'In 51–52 AD, Paul was brought before this marble-clad Bema platform where Roman Proconsul Junius Gallio (brother of the stoic philosopher Seneca) ruled that Paul’s preaching broke no Roman law—establishing a legal precedent that protected Christians for a decade!',
        stoneKeyWord: 'BEMA OF GALLIO (51 AD)',
        stoneKeyMeaning: 'The exact stone judgment platform in Corinth where Proconsul Gallio acquitted Paul',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The ancient stone paving slabs in the foreground of the Roman forum.',
        hintDirection: 'Click marker #2 on the stone pavement in the lower right.',
        foundTitle: 'Did You Know? The Erastus Inscription & Tentmaking with Priscilla & Aquila',
        xPercent: 64,
        yPercent: 78,
        hitRadius: 14,
        storyUnlocked:
          'Near the theater in Ancient Corinth lies a 1st-century limestone block inscribed in Latin: "Erastus, in return for his aedileship, laid this pavement at his own expense"—confirming the historical identity of the city treasurer Erastus whom Paul names in Romans 16:23!',
        stoneKeyWord: 'ERASTUS INSCRIPTION',
        stoneKeyMeaning: 'The 1st-century marble inscription in Corinth naming Paul’s friend Erastus',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The seven monolithic Doric columns of the Temple of Apollo on the right.',
        hintDirection: 'Click marker #3 on the standing Doric columns on the right.',
        foundTitle: 'Where Is It Modern Day Now? Ancient Corinth (Archaia Korinthos), Greece',
        xPercent: 78,
        yPercent: 40,
        hitRadius: 14,
        storyUnlocked:
          'Today in Archaia Korinthos (just outside modern Corinth, Peloponnese, Greece), visitors can explore the Roman Forum, the Bema, the Temple of Apollo, and the nearby port of Cenchreae where Deaconess Phoebe carried Paul’s letter to Rome.',
        stoneKeyWord: 'ANCIENT CORINTH, GREECE',
        stoneKeyMeaning: 'The preserved Roman forum and Bema in the northern Peloponnese today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Roman Tribunal',
        questionPrompt: 'Before which Roman Proconsul did St. Paul stand at the stone Bema in Corinth?',
        correctStoneId: 'p5-art-1',
      },
      {
        slotLabel: 'Lock II · Archaeological Proof',
        questionPrompt: 'Which Corinthian city treasurer named by Paul in Romans 16:23 left a Latin pavement inscription in Corinth?',
        correctStoneId: 'p5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Greek isthmus city do the Bema and Temple of Apollo stand today?',
        correctStoneId: 'p5-art-3',
      },
    ],
    sealName: 'Seal of Corinth',
  },
  {
    stopNumber: 6,
    title: 'The Finished Race & The Basilica Outside the Walls',
    subtitle: 'Enter the palm courtyard of St. Paul Outside the Walls in Rome',
    eraLabel: 'c. 60 – 67 AD · Final Witness & Tomb',
    ancientPlaceName: 'Roma (Via Ostiensis)',
    modernPlaceName: 'Rome',
    modernCountry: 'Italy',
    image: '/images/trails/paul_step6_rome.jpg',
    imageCaption:
      'Quadriportico courtyard and golden mosaic facade of the Papal Basilica of St. Paul Outside the Walls (San Paolo fuori le Mura) in Rome, Italy.',
    whatYouCanSeeToday:
      'Today along the Via Ostiense in Rome, Italy, pilgrims walk through the 150-column palm courtyard of the Papal Basilica of St. Paul Outside the Walls and descend before the High Altar to view the 1st-century marble sarcophagus inscribed "PAULO APOSTOLO MART" alongside the iron links of Paul’s prison chain.',
    didYouKnowHighlight:
      'In December 2006, Vatican archaeologists excavated beneath the Papal Altar of St. Paul Outside the Walls and uncovered a massive marble sarcophagus never opened since Emperor Theodosius in 390 AD—and carbon-14 testing of bone fragments inside dated them directly to the 1st or 2nd century!',
    saintQuote:
      '“I have fought the good fight, I have finished the race, I have kept the faith.”',
    globePlacement: {
      latDeg: 41.86,
      lngDeg: 12.48,
      regionLabel: 'Via Ostiense, Tiber River Valley, Rome, Italy',
      beaconColorHex: '#A855F7',
      labelOffsetPx: [-68, -26],
    },
    detectiveCaseTitle: 'Case #6 · The Eternal City & The Sarcophagus on the Ostian Way',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Italian capital where St. Paul finished his race and rests beneath the Papal Altar.',
    detectiveClues: [
      {
        id: 'p6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Capital of Italy on the Banks of the Tiber River',
        clueText:
          'Look to central-western Italy near the Tyrrhenian coast. Two kilometers south of its ancient Aurelian Walls along the Via Ostiense stands one of the four Papal Major Basilicas.',
        soundCue: 'compass_click',
      },
      {
        id: 'p6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Mosaic Portraits of Every Pope & The "PAULO APOSTOLO MART" Tomb',
        clueText:
          'Inside this basilica, golden mosaic medallions of all 266 Popes in history line the upper frieze, and beneath the altar window glows a 9-link iron prison chain and the marble slab inscribed "To Paul, Apostle and Martyr"!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p6-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"I Have Fought the Good Fight, I Have Finished the Race" (2 Tim 4:7)',
        clueText:
          'Having appealed to Caesar as a Roman citizen, Paul spent two years in rented lodgings here preaching unhindered before his martyrdom under Emperor Nero around 67 AD.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'p6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The monumental white marble statue of St. Paul holding the sword of the Spirit.',
        hintDirection: 'Click marker #1 on the marble statue in the center of the courtyard.',
        foundTitle: 'What Happened Here: Appeal to Caesar & Final Witness in Rome (60–67 AD)',
        xPercent: 35,
        yPercent: 58,
        hitRadius: 14,
        storyUnlocked:
          'Arriving in Rome along the Appian Way in 60 AD, Paul penned his Prison Epistles (Ephesians, Philippians, Colossians, Philemon) and 2 Timothy before suffering martyrdom by the sword at Tre Fontane and being buried along the Via Ostiense.',
        stoneKeyWord: 'FINISHED THE RACE IN ROME',
        stoneKeyMeaning: 'Where St. Paul completed his ministry and suffered martyrdom c. 67 AD',
        soundCue: 'relic_discovered',
      },
      {
        id: 'p6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The gleaming golden mosaic pediment high on the basilica facade.',
        hintDirection: 'Click marker #2 on the golden mosaic gable of the church.',
        foundTitle: 'Did You Know? The 2006 Archaeological Discovery of Paul’s Sarcophagus',
        xPercent: 58,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Beneath the 13th-century Gothic ciborium of Arnolfo di Cambio inside this basilica, Vatican archaeologists in 2006 uncovered the undisturbed 2.55-meter marble sarcophagus beneath a 4th-century marble slab inscribed "PAULO APOSTOLO MART" (Paul, Apostle and Martyr), with a small round incense opening!',
        stoneKeyWord: 'PAULO APOSTOLO MART TOMB',
        stoneKeyMeaning: 'The 1st-century marble sarcophagus and 4th-century inscription beneath the altar',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'p6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The grand colonnaded quadriportico arches framing the palm garden.',
        hintDirection: 'Click marker #3 on the marble colonnade on the right.',
        foundTitle: 'Where Is It Modern Day Now? Basilica of St. Paul Outside the Walls, Rome, Italy',
        xPercent: 84,
        yPercent: 50,
        hitRadius: 14,
        storyUnlocked:
          'Today on the Via Ostiense in Rome, Italy (just steps from the Basilica San Paolo Metro station), pilgrims can walk down the confessio steps directly beneath the Papal Altar to see the exposed marble side of St. Paul’s sarcophagus.',
        stoneKeyWord: 'ST. PAUL OUTSIDE THE WALLS, ROME',
        stoneKeyMeaning: 'The Papal Major Basilica in Rome housing St. Paul’s tomb today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Final Testimony',
        questionPrompt: 'In which city did St. Paul write 2 Timothy ("I have finished the race") and suffer martyrdom?',
        correctStoneId: 'p6-art-1',
      },
      {
        slotLabel: 'Lock II · The Marble Inscription',
        questionPrompt: 'What Latin words are carved into the 4th-century marble slab over St. Paul’s sarcophagus?',
        correctStoneId: 'p6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Papal Major Basilica in Rome does St. Paul’s sarcophagus rest today?',
        correctStoneId: 'p6-art-3',
      },
    ],
    sealName: 'Seal of Rome (Via Ostiense)',
  },
];

export const ST_FRANCIS_ASSISI_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Merchant’s Son & The Pink-Stone Hill Town',
    subtitle: 'Explore the Papal Basilica of St. Francis and hill town of Assisi',
    eraLabel: '1181 – 1206 AD · Youth & Renunciation',
    ancientPlaceName: 'Asisium (Spoleto Valley)',
    modernPlaceName: 'Assisi',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step1_assisi.jpg',
    imageCaption:
      'Papal Basilica of St. Francis and the pink-and-cream Subasio limestone hill town of Assisi overlooking the Umbrian valley, Italy.',
    whatYouCanSeeToday:
      'Today in Assisi (Province of Perugia in Umbria, central Italy), pilgrims walk the medieval pink-limestone streets from the Piazza del Vescovado—where Francis renounced his inheritance—to the two-story Papal Basilica of San Francesco, where Giotto’s frescoes and Francis’s stone crypt tomb rest.',
    didYouKnowHighlight:
      'Before St. Francis was buried here in 1230, the western promontory of Assisi was called "Colle d’Inferno" (Hill of Hell) because criminals were executed there. Pope Gregory IX renamed it "Colle del Paradiso" (Hill of Paradise) when laying the basilica’s foundation stone!',
    saintQuote:
      '“Lord, make me an instrument of Your peace; where there is hatred, let me sow love.”',
    globePlacement: {
      latDeg: 43.07,
      lngDeg: 12.61,
      regionLabel: 'Mount Subasio Slopes, Umbria, Central Italy',
      beaconColorHex: '#F59E0B',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #1 · The Rose-Limestone Citadel on Mount Subasio',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Umbrian hill town where Giovanni di Pietro di Bernardone ("Francesco") was born.',
    detectiveClues: [
      {
        id: 'f1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A UNESCO Medieval Hill Town in Umbria, the "Green Heart of Italy"',
        clueText:
          'Look to central Italy between Rome and Florence, in the region of Umbria. Built from the rose-tinted limestone of Mount Subasio, this terraced town overlooks the fertile Spoleto Valley.',
        soundCue: 'compass_click',
      },
      {
        id: 'f1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'From "Hill of Hell" to "Hill of Paradise" & Giotto’s 28 Frescoes',
        clueText:
          'At the western tip of this town rises a two-level Papal Basilica containing 28 masterpieces by Giotto and a sunken rock crypt holding the saint’s rough stone sarcophagus flanked by Brothers Leo, Rufino, Masseo, and Angelo!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f1-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Handing Back His Fine Clothes in the Bishop’s Square (1206)',
        clueText:
          'Nicknamed "Francesco" ("The Little Frenchman") by his silk-merchant father Pietro, the former troubadour and prisoner-of-war publicly returned his purse and velvet garments in the bishop’s courtyard here in 1206.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The soaring white-and-pink limestone gable and bell tower of the Basilica on the hill.',
        hintDirection: 'Click marker #1 on the Basilica of St. Francis on the upper left.',
        foundTitle: 'What Happened Here: From Troubadour to "Il Poverello" (1181–1206)',
        xPercent: 28,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Born in Assisi in 1181 to wealthy cloth merchant Pietro di Bernardone, young Francis dreamed of knighthood until a year in a Perugia prison and an embrace of a leper on the plain below Assisi transformed him into "Il Poverello" (The Little Poor Man).',
        stoneKeyWord: 'RENOUNCED WEALTH IN ASSISI',
        stoneKeyMeaning: 'Where young Francis handed back his father’s gold and clothes to serve the poor',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f1-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The massive arched stone substructures supporting the Sacro Convento on the cliff.',
        hintDirection: 'Click marker #2 on the fortified stone arches below the basilica.',
        foundTitle: 'Did You Know? Rediscovering the Hidden Stone Tomb in 1818',
        xPercent: 45,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'To protect St. Francis’s body from medieval tomb raiders, Brother Elias sealed it deep inside the bedrock beneath the Lower Basilica in 1230. Its exact location remained hidden for nearly 600 years until 52 nights of secret excavation rediscovered it in 1818!',
        stoneKeyWord: 'HIDDEN CRYPT REDISCOVERED (1818)',
        stoneKeyMeaning: 'How Francis’s bedrock tomb beneath the Lower Basilica was found after 600 years',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The cypress-lined winding road and olive groves descending into the Umbrian valley.',
        hintDirection: 'Click marker #3 on the olive groves and cypress trees in the foreground.',
        foundTitle: 'Where Is It Modern Day Now? Assisi, Umbria, Italy',
        xPercent: 56,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Today in Assisi, Umbria, Italy, the Papal Basilica of San Francesco (Upper Basilica, Lower Basilica, and Crypt Tomb) welcomes over five million pilgrims and art lovers every year.',
        stoneKeyWord: 'ASSISI, UMBRIA, ITALY',
        stoneKeyMeaning: 'The UNESCO hill town in central Italy where St. Francis was born and buried',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Bishop’s Courtyard',
        questionPrompt: 'What did young Francis do in the Bishop’s Square of Assisi in 1206?',
        correctStoneId: 'f1-art-1',
      },
      {
        slotLabel: 'Lock II · The Secret Bedrock Tomb',
        questionPrompt: 'In what year was St. Francis’s hidden bedrock tomb beneath the Lower Basilica rediscovered?',
        correctStoneId: 'f1-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Umbrian hill town does the Papal Basilica of San Francesco stand today?',
        correctStoneId: 'f1-art-3',
      },
    ],
    sealName: 'Seal of Assisi',
  },
  {
    stopNumber: 2,
    title: 'The Speaking Crucifix & The Canticle of the Sun',
    subtitle: 'Step under the stone portico of San Damiano among the olive groves',
    eraLabel: '1205 – 1225 AD · "Rebuild My Church"',
    ancientPlaceName: 'Ecclesia Sancti Damiani',
    modernPlaceName: 'San Damiano (Assisi)',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step2_sandamiano.jpg',
    imageCaption:
      '12th-century stone Church and Convent of San Damiano nestled in the olive groves below Assisi, where the painted Crucifix spoke to St. Francis.',
    whatYouCanSeeToday:
      'Today, a 15-minute walk down a steep cobbled footpath through olive groves outside Porta Nuova in Assisi leads to the untouched stone Sanctuary of San Damiano, where St. Clare lived for 41 years and where St. Francis composed the Canticle of the Sun.',
    didYouKnowHighlight:
      'When the painted wooden Byzantine crucifix at San Damiano said, "Francis, go and repair My house, which as you see is falling into ruin," literal-minded young Francis immediately started begging for actual stones and mortar in the streets to patch the chapel’s crumbling walls with his own hands!',
    saintQuote:
      '“Praised be You, my Lord, with all Your creatures, especially Sir Brother Sun, who is the day and through whom You give us light.”',
    globePlacement: {
      latDeg: 43.06,
      lngDeg: 12.62,
      regionLabel: 'Olive Slopes Below Assisi, Umbria, Italy',
      beaconColorHex: '#38BDF8',
      labelOffsetPx: [66, 26],
    },
    detectiveCaseTitle: 'Case #2 · The Olive-Grove Chapel Where the Painted Cross Spoke',
    detectiveLeadPrompt:
      'Read the 3 clues below, then locate the rustic olive-grove sanctuary just below Assisi where Francis heard his calling and Clare founded the Poor Ladies.',
    detectiveClues: [
      {
        id: 'f2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Rustic 12th-Century Stone Sanctuary in the Olive Groves Below Assisi',
        clueText:
          'Look to the southern olive slopes just below the medieval walls of Assisi in Umbria, Italy. This three-arched stone convent remains virtually unchanged since the 13th century.',
        soundCue: 'compass_click',
      },
      {
        id: 'f2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Where Blind & Ailing Francis Composed the First Poem in Italian Literature',
        clueText:
          'Resting in a reed hut on the garden terrace here in 1225 while nearly blind, Francis composed "The Canticle of the Creatures" (Brother Sun, Sister Moon)—the earliest known masterpiece written in the vernacular Italian language!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f2-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"Francis, Go and Repair My House" (1205)',
        clueText:
          'Kneeling inside this crumbling country chapel in 1205, Francis heard the painted Byzantine icon cross speak three times, and later welcomed St. Clare and her sisters to live here for over four decades.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The glowing painted Byzantine crucifix hanging beneath the central arch.',
        hintDirection: 'Click marker #1 on the golden San Damiano Crucifix above the altar.',
        foundTitle: 'What Happened Here: "Francis, Go and Repair My House" (1205)',
        xPercent: 68,
        yPercent: 60,
        hitRadius: 14,
        storyUnlocked:
          'In 1205, praying before the 12th-century painted wooden San Damiano Crucifix, young Francis heard Christ’s voice from the cross: "Francis, go and repair My house, which as you see is falling completely into ruin."',
        stoneKeyWord: 'CRUCIFIX OF SAN DAMIANO',
        stoneKeyMeaning: 'The painted Byzantine cross that spoke to St. Francis in 1205',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The upper stone window and garden terrace of the convent on the right.',
        hintDirection: 'Click marker #2 on the upper stone wall and window on the right.',
        foundTitle: 'Did You Know? St. Clare’s 41 Years & The Canticle of Brother Sun',
        xPercent: 86,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'San Damiano became the first monastery of St. Clare and her Poor Ladies in 1212. And in the winter of 1224–1225, while lodged beside the convent garden nearly blind, Francis composed the "Canticle of the Sun"—the very first work of Italian literature!',
        stoneKeyWord: 'CANTICLE OF BROTHER SUN',
        stoneKeyMeaning: 'Composed by St. Francis at San Damiano in 1225—the dawn of Italian poetry',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The ancient olive trees lining the dirt path with Assisi rising on the hill behind.',
        hintDirection: 'Click marker #3 on the olive grove path on the left.',
        foundTitle: 'Where Is It Modern Day Now? Sanctuary of San Damiano, Assisi, Italy',
        xPercent: 25,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Today at San Damiano (just 1 km downhill from Assisi’s Porta Nuova), visitors can walk through St. Clare’s dormitory, refectory, and choir, while the original painted San Damiano Crucifix is venerated nearby in the Basilica of Santa Chiara.',
        stoneKeyWord: 'SAN DAMIANO, ASSISI, ITALY',
        stoneKeyMeaning: 'The preserved 12th-century olive-grove sanctuary just below Assisi',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Voice from the Cross',
        questionPrompt: 'What message did the painted Byzantine crucifix at San Damiano speak to Francis?',
        correctStoneId: 'f2-art-1',
      },
      {
        slotLabel: 'Lock II · Song of Creation',
        questionPrompt: 'What famous hymn did a nearly blind St. Francis compose at San Damiano in 1225?',
        correctStoneId: 'f2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which olive-grove sanctuary just below Assisi did St. Clare and her sisters live?',
        correctStoneId: 'f2-art-3',
      },
    ],
    sealName: 'Seal of San Damiano',
  },
  {
    stopNumber: 3,
    title: 'Brother Wolf & The Peace Pact of Gubbio',
    subtitle: 'Inspect the stone monument and Church of San Francesco della Pace in Gubbio',
    eraLabel: 'c. 1206 – 1220 AD · Taming the Fierce Wolf',
    ancientPlaceName: 'Iguvium (Mount Ingino)',
    modernPlaceName: 'Gubbio',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step3_gubbio.jpg',
    imageCaption:
      'Statue of St. Francis and Brother Wolf before the medieval stone church in the Apennine mountain town of Gubbio, Umbria, Italy.',
    whatYouCanSeeToday:
      'Today in the medieval stone town of Gubbio (40 km north of Assisi on the slopes of Mount Ingino in northern Umbria, Italy), visitors see the Church of San Francesco della Pace ("Chiesa della Vittorina")—where the wolf’s skull and stone sarcophagus are kept—and the Basilica of San Francesco.',
    didYouKnowHighlight:
      'After walking out of Assisi naked in 1206, Gubbio was the very first town Francis walked to, where his old friend Federico Spadalunga gave him his first rough gray-brown tunic. And in 1872, masons renovating the Church of San Francesco della Pace actually unearthed a large medieval wolf skeleton buried beneath the threshold!',
    saintQuote:
      '“Come here, Brother Wolf! I command you in the name of Christ that you do no harm to me or to anyone else.”',
    globePlacement: {
      latDeg: 43.35,
      lngDeg: 12.57,
      regionLabel: 'Mount Ingino, Northern Umbria, Apennines, Italy',
      beaconColorHex: '#10B981',
      labelOffsetPx: [-66, -28],
    },
    detectiveCaseTitle: 'Case #3 · The Mountain Town of the Tamed Apennine Wolf',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the northern Umbrian mountain town where Francis shook paws with "Brother Wolf."',
    detectiveClues: [
      {
        id: 'f3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Perfectly Preserved Medieval Stone Town on Mount Ingino in Northern Umbria',
        clueText:
          'Look 40 km north of Assisi into the Umbrian Apennines. Famous for its hanging Palazzo dei Consoli and the annual Corsa dei Ceri race, this town is linked to Assisi by the "Sentiero Francescano della Pace" hiking trail.',
        soundCue: 'compass_click',
      },
      {
        id: 'f3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Medieval Wolf Skeleton Discovered Under the Church Floor in 1872',
        clueText:
          'Inside this town’s Church of San Francesco della Pace rests a carved stone lid over the skeleton of a large Apennine wolf discovered during 1872 renovations—kept for two peaceful years fed by the townsfolk!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f3-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"Brother Wolf, Give Me Your Pledge of Peace" (Fioretti Ch. 21)',
        clueText:
          'When a ravenous wolf terrorized this town, Francis walked out unarmed beyond the city gates, made the Sign of the Cross, and brokered a peace treaty in which the wolf placed its right paw in Francis’s hand.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The carved stone statue of St. Francis taking the paw of the Wolf in the square.',
        hintDirection: 'Click marker #1 on the statue of Francis and the wolf.',
        foundTitle: 'What Happened Here: The Peace Treaty with Brother Wolf',
        xPercent: 35,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'As recorded in Chapter 21 of the Little Flowers of St. Francis (Fioretti), Francis walked out alone to meet the fierce wolf of Gubbio, promising that the townspeople would feed it daily if it never harmed human or flock again—and the wolf gently laid its paw in Francis’s hand.',
        stoneKeyWord: 'PEACE PACT WITH BROTHER WOLF',
        stoneKeyMeaning: 'How St. Francis reconciled the town of Gubbio and the Apennine wolf',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The arched wooden portal and rose window of the medieval stone church.',
        hintDirection: 'Click marker #2 on the church facade and portal.',
        foundTitle: 'Did You Know? Francis’s First Tunic & The 1872 Wolf Skeleton Find',
        xPercent: 56,
        yPercent: 50,
        hitRadius: 14,
        storyUnlocked:
          'Gubbio was where the Spadalunga family clothed Francis in his very first poor hermit’s tunic in 1206 (the Basilica of San Francesco in Gubbio is built directly over the Spadalunga house!), and in 1872 workers at the Church of La Pace unearthed a medieval wolf skeleton buried beneath the floor.',
        stoneKeyWord: 'WOLF TOMB & FIRST TUNIC',
        stoneKeyMeaning: 'Gubbio clothed Francis in his first tunic and buried Brother Wolf in its church',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The medieval Palazzo dei Consoli and tiered stone houses climbing Mount Ingino.',
        hintDirection: 'Click marker #3 on the upper medieval town on the hillside.',
        foundTitle: 'Where Is It Modern Day Now? Gubbio, Province of Perugia, Umbria, Italy',
        xPercent: 28,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Today in Gubbio, Umbria, Italy, thousands of walkers hike the 50-kilometer Franciscan Path of Peace (Via di Francesco) from Assisi to Gubbio to visit the Church of San Francesco della Pace and the cave where the wolf lived.',
        stoneKeyWord: 'GUBBIO, UMBRIA, ITALY',
        stoneKeyMeaning: 'The medieval Apennine town in northern Umbria on the Via di Francesco',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Paw of Peace',
        questionPrompt: 'How did Brother Wolf seal his peace agreement with St. Francis outside Gubbio?',
        correctStoneId: 'f3-art-1',
      },
      {
        slotLabel: 'Lock II · The 1872 Discovery',
        questionPrompt: 'What did masons discover buried beneath the Church of San Francesco della Pace in Gubbio in 1872?',
        correctStoneId: 'f3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which northern Umbrian mountain town is famous for St. Francis and the Wolf?',
        correctStoneId: 'f3-art-3',
      },
    ],
    sealName: 'Seal of Gubbio',
  },
  {
    stopNumber: 4,
    title: 'The Cliffside Grotto & The World’s First Christmas Nativity',
    subtitle: 'Explore the cliff-clinging Sanctuary of Greccio above the Rieti Valley',
    eraLabel: 'Christmas Eve, 1223 AD · First Living Crèche',
    ancientPlaceName: 'Grecium (Rieti Valley)',
    modernPlaceName: 'Greccio (Rieti)',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step4_greccio.jpg',
    imageCaption:
      'Franciscan Sanctuary of Greccio built into the limestone cliffside overlooking the Rieti Valley in Lazio, Italy, birthplace of the Christmas Nativity scene.',
    whatYouCanSeeToday:
      'Today at the Sanctuary of Greccio (perched at 638 meters altitude on a sheer rock cliff in the Province of Rieti, northern Lazio, Italy), pilgrims enter the original rock Cave of the Nativity (Cappella del Presepio) and visit an international museum of Christmas Nativity scenes from around the world.',
    didYouKnowHighlight:
      'Every Christmas Nativity scene (presepio / crèche) in the world today—under Christmas trees, in churches, and on town squares—traces its origin to December 24, 1223, when Francis asked his friend Giovanni Velita of Greccio to bring a real manger filled with hay, an ox, and a donkey into this rocky cave!',
    saintQuote:
      '“I want to do something that will recall to memory the Little Child who was born in Bethlehem, and to see with bodily eyes the inconveniences of His infant needs.”',
    globePlacement: {
      latDeg: 42.44,
      lngDeg: 12.75,
      regionLabel: 'Sabine Mountains, Rieti Valley, Northern Lazio, Italy',
      beaconColorHex: '#Facc15',
      labelOffsetPx: [66, 24],
    },
    detectiveCaseTitle: 'Case #4 · The Cliffside Cave That Invented the Christmas Crèche',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the cliffside sanctuary in the Rieti Valley where Francis staged the first Christmas Nativity scene in 1223.',
    detectiveClues: [
      {
        id: 'f4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Cliffside Sanctuary Overlooking the Rieti Valley in Northern Lazio, Italy',
        clueText:
          'Look halfway between Assisi and Rome in the Sabine Mountains of Rieti Province. Called the "Franciscan Bethlehem," this sanctuary clings like an eagle’s nest to a vertical limestone cliff.',
        soundCue: 'compass_click',
      },
      {
        id: 'f4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Birthplace of Every Christmas Nativity Scene on Earth (1223)',
        clueText:
          'Before Christmas Eve 1223 in this mountain cave, no one had ever set up a three-dimensional Christmas Nativity manger scene. Today the village hosts a permanent International Museum of the Nativity!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f4-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Torchlit Woods, the Ox & Donkey, and the Deacon Singing the Gospel',
        clueText:
          'Inspired by his recent pilgrimage to the Holy Land, Francis had a hay-filled manger, an ox, and an ass brought into this rocky grotto on Christmas night 1223 and sang the Christmas Gospel in deacon’s vestments.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The candlelit limestone cave grotto on the right holding the manger and altar.',
        hintDirection: 'Click marker #1 inside the glowing rock Nativity cave on the right.',
        foundTitle: 'What Happened Here: The First Christmas Crèche (December 24, 1223)',
        xPercent: 80,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'On Christmas Eve 1223, villagers walked through the woods with blazing torches to this rock cave in Greccio, where Francis had prepared a manger of hay between a live ox and donkey so everyone could behold the humility of Bethlehem with their own eyes.',
        stoneKeyWord: 'FIRST CHRISTMAS CRÈCHE (1223)',
        stoneKeyMeaning: 'Where St. Francis created the world’s first Christmas Nativity scene',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The stone arches and bell tower built directly into the vertical limestone cliff.',
        hintDirection: 'Click marker #2 on the cliffside monastery and bell tower.',
        foundTitle: 'Did You Know? Why Francis Chose This Spot with a Burning Firebrand',
        xPercent: 48,
        yPercent: 42,
        hitRadius: 14,
        storyUnlocked:
          'When the people of Greccio begged Francis to stay near their village, he asked a young boy to toss a burning firebrand into the air. The brand flew across the ravine and landed on this exact sheer limestone ledge owned by nobleman Giovanni Velita!',
        stoneKeyWord: 'CLIFF OF GIOVANNI VELITA',
        stoneKeyMeaning: 'How the cliffside ledge of Greccio was chosen and gifted for the sanctuary',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The sweeping green Rieti Valley ("Sacred Valley") stretching out on the left.',
        hintDirection: 'Click marker #3 overlooking the valley on the left.',
        foundTitle: 'Where Is It Modern Day Now? Greccio (Rieti), Lazio, Italy',
        xPercent: 20,
        yPercent: 60,
        hitRadius: 14,
        storyUnlocked:
          'Today in Greccio (Province of Rieti, northern Lazio, Italy, 90 minutes north of Rome), the Cave of the Nativity, St. Bonaventure’s dormitory, and the historical reenactment of the 1223 Living Nativity draw visitors from around the globe.',
        stoneKeyWord: 'GRECCIO (RIETI), ITALY',
        stoneKeyMeaning: 'The "Franciscan Bethlehem" overlooking the Rieti Valley today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Christmas Eve 1223',
        questionPrompt: 'What world-famous Christmas tradition did St. Francis originate at Greccio in 1223?',
        correctStoneId: 'f4-art-1',
      },
      {
        slotLabel: 'Lock II · Friend of the Saint',
        questionPrompt: 'Which nobleman of Greccio helped Francis prepare the ox, donkey, and manger in the cave?',
        correctStoneId: 'f4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Italian valley province does the cliffside Sanctuary of Greccio stand today?',
        correctStoneId: 'f4-art-3',
      },
    ],
    sealName: 'Seal of Greccio',
  },
  {
    stopNumber: 5,
    title: 'The Sacred Mountain & The Chasm of the Stigmata',
    subtitle: 'Ascend the beech-forested cliff of Mount La Verna in Tuscany',
    eraLabel: 'September 14, 1224 AD · The Stigmata',
    ancientPlaceName: 'Mons Alvernae (Mount Penna)',
    modernPlaceName: 'La Verna (Chiusi della Verna)',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step5_laverna.jpg',
    imageCaption:
      'Franciscan Sanctuary of La Verna perched atop the sheer limestone cliff and ancient forest of Mount Penna in Chiusi della Verna, Tuscany, Italy.',
    whatYouCanSeeToday:
      'Today at the Sanctuary of La Verna (at 1,128 meters altitude in the Casentino Apennines of Arezzo Province, Tuscany, Italy), pilgrims walk through ancient beech forests, admire monumental glazed terracotta reliefs by Andrea della Robbia, and pray in the cliff-edge Chapel of the Stigmata.',
    didYouKnowHighlight:
      'Mount La Verna was gifted to St. Francis as a solitary retreat in 1213 by a Tuscan knight named Count Orlando of Chiusi—who wrote a parchment deed gifting the entire forested mountain peak "without any tax, in exchange only for the prayers of Brother Francis and his companions"!',
    saintQuote:
      '“You are beauty, You are meekness, You are our protector, You are our guardian and defender.”',
    globePlacement: {
      latDeg: 43.7,
      lngDeg: 11.93,
      regionLabel: 'Casentino Apennines, Arezzo, Tuscany, Italy',
      beaconColorHex: '#EC4899',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #5 · The Cliff-Top Tuscan Sanctuary of the Six-Winged Seraph',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the high Tuscan mountain peak where Francis received the Stigmata in 1224.',
    detectiveClues: [
      {
        id: 'f5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A 1,128-Meter Limestone Cliff Sanctuary in the Casentino Forests of Tuscany',
        clueText:
          'Look north of Umbria into eastern Tuscany (Province of Arezzo). Rising abruptly above a primeval forest of towering beech and silver fir trees is the sheer rock plateau of Mount Penna.',
        soundCue: 'compass_click',
      },
      {
        id: 'f5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Andrea della Robbia’s Glazed Terracottas & The Daily 3 PM Procession',
        clueText:
          'Because winter frost destroys wall frescoes at this high altitude, the churches here house the world’s largest collection of weatherproof blue-and-white glazed terracotta masterpieces by Renaissance sculptor Andrea della Robbia!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f5-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Forty-Day Fast of St. Michael & The Wounds of Christ (September 1224)',
        clueText:
          'Gifted this mountain by Count Orlando in 1213, Francis was keeping a 40-day fast on the cliff ledge around the Feast of the Exaltation of the Cross in 1224 when he beheld a six-winged seraph and received the Stigmata.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The small stone chapel clinging to the lower rock ledge above the sheer chasm.',
        hintDirection: 'Click marker #1 on the lower cliff-edge chapel on the right.',
        foundTitle: 'What Happened Here: The Stigmata on Mount La Verna (September 1224)',
        xPercent: 76,
        yPercent: 70,
        hitRadius: 14,
        storyUnlocked:
          'Before dawn near the Feast of the Exaltation of the Cross in September 1224, while praying on this isolated rock ledge on Mount La Verna, Francis beheld a vision of a six-winged seraph and received the five wounds of Christ—the first recorded Stigmata in history.',
        stoneKeyWord: 'STIGMATA OF LA VERNA (1224)',
        stoneKeyMeaning: 'The cliff-edge ledge where St. Francis received the wounds of Christ in 1224',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The stone bell tower and basilica complex crowning the rock cliff.',
        hintDirection: 'Click marker #2 on the bell tower and main sanctuary buildings.',
        foundTitle: 'Did You Know? Count Orlando’s Gift & The Reliquary of Brother Leo’s Parchment',
        xPercent: 68,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Right after receiving the Stigmata on La Verna, Francis took a piece of parchment and wrote in his own hand the "Blessing for Brother Leo" (the famous Chartula)—signed with the Tau cross—which is still preserved today in Assisi!',
        stoneKeyWord: 'BLESSING FOR BROTHER LEO',
        stoneKeyMeaning: 'The handwritten parchment blessing Francis wrote for Brother Leo on Mount La Verna',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The monumental ancient beech and fir forest blanketing the Tuscan mountain slope.',
        hintDirection: 'Click marker #3 on the golden-lit forest slope on the left.',
        foundTitle: 'Where Is It Modern Day Now? Sanctuary of La Verna (Chiusi della Verna), Tuscany, Italy',
        xPercent: 26,
        yPercent: 48,
        hitRadius: 14,
        storyUnlocked:
          'Today in Chiusi della Verna (Arezzo, Tuscany, Italy), located inside the Foreste Casentinesi National Park, pilgrims can stay in the monastery guesthouse and join the friars’ daily 3:00 PM procession to the Chapel of the Stigmata.',
        stoneKeyWord: 'LA VERNA, TUSCANY, ITALY',
        stoneKeyMeaning: 'The cliff-top Franciscan sanctuary in the Tuscan Apennines today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Mountain Vision',
        questionPrompt: 'What sacred event occurred on the cliff ledge of Mount La Verna in September 1224?',
        correctStoneId: 'f5-art-1',
      },
      {
        slotLabel: 'Lock II · The Handwritten Parchment',
        questionPrompt: 'For which close companion did Francis write a famous handwritten blessing on La Verna?',
        correctStoneId: 'f5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Italian region does the cliff-top Sanctuary of La Verna stand today?',
        correctStoneId: 'f5-art-3',
      },
    ],
    sealName: 'Seal of La Verna',
  },
  {
    stopNumber: 6,
    title: 'The Little Portion & Welcome Sister Death',
    subtitle: 'Behold the tiny Portiuncula Chapel beneath the dome of Santa Maria degli Angeli',
    eraLabel: 'October 3, 1226 AD · Cradle of the Order & Transitus',
    ancientPlaceName: 'Portiuncula (Santa Maria degli Angeli)',
    modernPlaceName: 'Santa Maria degli Angeli (Assisi)',
    modernCountry: 'Italy',
    image: '/images/trails/francis_step6_portiuncula.jpg',
    imageCaption:
      'The tiny 4th-century stone Chapel of the Portiuncula preserved directly beneath the great marble dome of the Papal Basilica of Santa Maria degli Angeli in the valley below Assisi.',
    whatYouCanSeeToday:
      'Today in Santa Maria degli Angeli (on the valley floor 4 km below the hill of Assisi in Umbria, Italy), pilgrims walk inside the seventh-largest church in the world to find the tiny rough-stone Chapel of the Portiuncula ("Little Portion") and the Chapel of the Transitus where Francis died on October 3, 1226.',
    didYouKnowHighlight:
      'Because Benedictine monks owned the tiny woodland chapel of the Portiuncula, Francis insisted on never owning the property outright—so every year he sent the monks a basket of small river fish (lasche) as annual rent, a tradition still reenacted every August 2 during the Pardon of Assisi!',
    saintQuote:
      '“Praised be You, my Lord, through our Sister Bodily Death, from whom no living person can escape.”',
    globePlacement: {
      latDeg: 43.05,
      lngDeg: 12.57,
      regionLabel: 'Umbrian Valley Plain, Santa Maria degli Angeli, Italy',
      beaconColorHex: '#A855F7',
      labelOffsetPx: [-76, 30],
    },
    detectiveCaseTitle: 'Case #6 · The Tiny Stone Chapel Inside a Giant Marble Dome',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Umbrian valley town below Assisi where the tiny Portiuncula chapel is enclosed inside a massive Papal Basilica.',
    detectiveClues: [
      {
        id: 'f6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Valley Town Directly Below Assisi Housing the 7th-Largest Basilica on Earth',
        clueText:
          'Look to the flat Umbrian valley plain just 4 km southwest of Assisi’s hill, right beside the Assisi train station. In 1569, Pope Pius V ordered a monumental domed basilica built around a tiny 4th-century chapel.',
        soundCue: 'compass_click',
      },
      {
        id: 'f6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Rent Paid with a Basket of River Fish & The Thornless Rose Garden',
        clueText:
          'Inside this basilica stands a stone chapel only 4 meters wide, rented from Benedictine monks for an annual basket of river fish, alongside a courtyard garden where ancient rose bushes grow completely without thorns!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f6-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"Welcome, Sister Death!" (October 3, 1226)',
        clueText:
          'This tiny chapel ("The Little Portion") was the motherhouse of the Franciscan movement, where Clare received her habit and where Francis asked to be laid on the bare earth at sunset on October 3, 1226.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'f6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The golden frescoed gable of the tiny stone Portiuncula chapel in the center.',
        hintDirection: 'Click marker #1 on the tiny stone chapel beneath the dome.',
        foundTitle: 'What Happened Here: The "Little Portion" & The Pardon of Assisi',
        xPercent: 50,
        yPercent: 58,
        hitRadius: 14,
        storyUnlocked:
          'Repaired by St. Francis’s own hands in 1208, this tiny stone chapel—the Portiuncula ("Little Portion")—became the cradle of the Franciscan Order, where the first friars gathered, where St. Clare took her vows on Palm Sunday 1212, and where Francis obtained the famous Portiuncula Indulgence ("Pardon of Assisi") in 1216.',
        stoneKeyWord: 'CRADLE OF THE PORTIUNCULA',
        stoneKeyMeaning: 'The tiny stone chapel where Francis founded the Order of Friars Minor',
        soundCue: 'relic_discovered',
      },
      {
        id: 'f6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The small stone doorway of the Chapel of the Transitus on the left.',
        hintDirection: 'Click marker #2 on the rustic stone wall and doorway on the left.',
        foundTitle: 'Did You Know? Laid on the Bare Earth to Welcome "Sister Death" (1226)',
        xPercent: 12,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Just steps from the Portiuncula stands the tiny infirmary cell—now the Chapel of the Transitus—where on the evening of October 3, 1226, 44-year-old Francis asked to be laid on the bare ground, sang Psalm 142, and welcomed "Sister Bodily Death." Inside rests the actual rough wool cord he wore!',
        stoneKeyWord: 'CHAPEL OF THE TRANSITUS (1226)',
        stoneKeyMeaning: 'The infirmary cell beside the Portiuncula where St. Francis died on October 3, 1226',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'f6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The soaring white marble dome rising directly overhead.',
        hintDirection: 'Click marker #3 on the great white cupola dome at the top.',
        foundTitle: 'Where Is It Modern Day Now? Basilica of Santa Maria degli Angeli, Assisi, Italy',
        xPercent: 50,
        yPercent: 18,
        hitRadius: 14,
        storyUnlocked:
          'Today in Santa Maria degli Angeli (4 km below Assisi in Umbria, Italy), Galeazzo Alessi’s soaring 16th-century Papal Basilica shelters both the Portiuncula and the Chapel of the Transitus, plus the garden where white doves still nest in the hands of Francis’s statue!',
        stoneKeyWord: 'SANTA MARIA DEGLI ANGELI, ASSISI',
        stoneKeyMeaning: 'The Papal Basilica in the valley below Assisi enclosing the Portiuncula today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Little Portion',
        questionPrompt: 'What is the name of the tiny stone chapel repaired by Francis that became the cradle of his Order?',
        correctStoneId: 'f6-art-1',
      },
      {
        slotLabel: 'Lock II · Sunset of October 3, 1226',
        questionPrompt: 'In which small cell beside the Portiuncula did St. Francis welcome "Sister Bodily Death"?',
        correctStoneId: 'f6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which domed Papal Basilica in the valley below Assisi encloses the Portiuncula today?',
        correctStoneId: 'f6-art-3',
      },
    ],
    sealName: 'Seal of the Portiuncula',
  },
];

export const ST_IGNATIUS_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Shattered Leg & The Books in the Tower House',
    subtitle: 'Inspect the medieval Tower House and Baroque Basilica of Loyola in the Basque Country',
    eraLabel: '1491 – 1521 AD · Birth & Conversion',
    ancientPlaceName: 'Casa-Torre de Loyola (Azpeitia)',
    modernPlaceName: 'Azpeitia (Loyola)',
    modernCountry: 'Spain',
    image: '/images/trails/ignatius_step1_loyola.jpg',
    imageCaption:
      'Medieval brick-and-stone Tower House of the Loyola family and the domed Baroque Sanctuary of Loyola in Azpeitia, Basque Country, Spain.',
    whatYouCanSeeToday:
      'Today in the valley of Loyola in Azpeitia (Gipuzkoa Province in the Basque Country of northern Spain, 40 km southwest of San Sebastián), pilgrims enter the preserved 14th-century Loyola family Tower House and climb to the third-floor bedroom ("Chapel of Conversion") where Ignatius recovered in 1521.',
    didYouKnowHighlight:
      'After a French cannonball shattered his right leg at the Battle of Pamplona on May 20, 1521, bedridden Iñigo asked for chivalric romance novels like "Amadís of Gaul" to pass the time—but the Loyola castle only had two books in the house: the "Life of Christ" and the "Golden Legend" of the Saints!',
    saintQuote:
      '“Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will.”',
    globePlacement: {
      latDeg: 43.17,
      lngDeg: -2.28,
      regionLabel: 'Urola Valley, Gipuzkoa, Basque Country, Northern Spain',
      beaconColorHex: '#F59E0B',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #1 · The Basque Tower House Where Two Books Changed History',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the green Basque valley in northern Spain where wounded knight Iñigo of Loyola experienced his conversion.',
    detectiveClues: [
      {
        id: 'i1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Green Mountain Valley Town in Gipuzkoa, Basque Country, Northern Spain',
        clueText:
          'Look to the lush green Basque mountains of northern Spain near the Bay of Biscay, just southwest of San Sebastián. Here a massive 17th-century marble basilica wraps like a jewel box around a medieval brick-and-stone family fortress tower.',
        soundCue: 'compass_click',
      },
      {
        id: 'i1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'No Chivalric Romances in the House—Only the Lives of the Saints!',
        clueText:
          'Carried 60 miles on a stretcher over the mountains after a cannonball shattered his leg in 1521, the wounded knight asked his sister-in-law Magdalena for knightly romance novels—and discovered the art of spiritual discernment when she brought him the Lives of the Saints instead!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i1-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"What If I Should Do What St. Francis and St. Dominic Did?"',
        clueText:
          'Born in this tower house in 1491 as the youngest of 13 children, Iñigo noticed on his sickbed that daydreams of courtly fame left his heart dry afterward, while thoughts of walking barefoot like Francis and Dominic left deep peace.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The medieval brick-and-stone Tower House (Casa-Torre) in the left foreground.',
        hintDirection: 'Click marker #1 on the top floor of the medieval brick-and-stone tower.',
        foundTitle: 'What Happened Here: The Cannonball Recovery & First Discernment (1521)',
        xPercent: 32,
        yPercent: 42,
        hitRadius: 14,
        storyUnlocked:
          'On the top floor of this medieval Tower House in 1521, while recovering from brutal surgery on his cannonball-shattered leg, 30-year-old Iñigo of Loyola read the "Vita Christi" and the "Flos Sanctorum" and discovered how to discern the spirits of consolation and desolation.',
        stoneKeyWord: 'CHAPEL OF CONVERSION (1521)',
        stoneKeyMeaning: 'The upper bedroom in the Loyola Tower House where Iñigo converted',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i1-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The soaring 65-meter Baroque cupola dome rising behind the tower house.',
        hintDirection: 'Click marker #2 on the grand marble dome of the basilica.',
        foundTitle: 'Did You Know? Carlo Fontana’s Eagle-Wing Sanctuary Built Around the Castle',
        xPercent: 50,
        yPercent: 25,
        hitRadius: 14,
        storyUnlocked:
          'In the late 17th century, Queen Mariana of Austria commissioned Italian Baroque architect Carlo Fontana (a pupil of Bernini) to build this grand circular Basilica and two wings directly around the preserved medieval Loyola Tower House—forming the shape of a giant stone eagle!',
        stoneKeyWord: 'SANCTUARY OF LOYOLA',
        stoneKeyMeaning: 'The 17th-century Baroque basilica built around the medieval Loyola family tower',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The emerald-green Basque hills of the Urola Valley framing the sanctuary.',
        hintDirection: 'Click marker #3 on the green Basque mountains on the left.',
        foundTitle: 'Where Is It Modern Day Now? Azpeitia (Loyola), Basque Country, Spain',
        xPercent: 16,
        yPercent: 36,
        hitRadius: 14,
        storyUnlocked:
          'Today in Azpeitia (Gipuzkoa, Basque Country, Spain), the Sanctuary of Loyola is Stop #1 of the 650-kilometer "Ignatian Way" (Camino Ignaciano) walking trail that retraces Ignatius’s 1522 journey from Loyola to Manresa.',
        stoneKeyWord: 'AZPEITIA (LOYOLA), SPAIN',
        stoneKeyMeaning: 'The Basque valley town where St. Ignatius was born and converted',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Convalescent Knight',
        questionPrompt: 'What caused Iñigo of Loyola to spend months bedridden in the family Tower House in 1521?',
        correctStoneId: 'i1-art-1',
      },
      {
        slotLabel: 'Lock II · The Baroque Jewel Box',
        questionPrompt: 'Which Italian Baroque architect designed the domed basilica around the Loyola Tower House?',
        correctStoneId: 'i1-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Basque town in northern Spain does the Sanctuary of Loyola stand today?',
        correctStoneId: 'i1-art-3',
      },
    ],
    sealName: 'Seal of Loyola',
  },
  {
    stopNumber: 2,
    title: 'The Beggar’s Sackcloth & The Sword Left at the Black Madonna',
    subtitle: 'Explore the jagged mountain Abbey of Montserrat in Catalonia',
    eraLabel: 'March 24, 1522 AD · All-Night Vigil of Arms',
    ancientPlaceName: 'Mons Serratus (Santa Maria de Montserrat)',
    modernPlaceName: 'Montserrat (Barcelona)',
    modernCountry: 'Spain',
    image: '/images/trails/ignatius_step2_montserrat.jpg',
    imageCaption:
      'Benedictine Abbey of Santa Maria de Montserrat nestled among the serrated conglomerate rock peaks of Montserrat mountain in Catalonia, Spain.',
    whatYouCanSeeToday:
      'Today at Montserrat Abbey (perched at 720 meters altitude in the jagged "Serrated Mountain" 45 km northwest of Barcelona in Catalonia, Spain), pilgrims ascend by rack railway or cable car to venerate the 12th-century statue of the Black Madonna ("La Moreneta") and see the altar where Ignatius laid down his sword.',
    didYouKnowHighlight:
      'On the Eve of the Annunciation (March 24, 1522), Ignatius secretly gave all his expensive nobleman’s clothes to a poor beggar at Montserrat, put on a rough sackcloth tunic and one rope sandal, and stood all night before the Black Madonna before hanging his sword and dagger at her altar!',
    saintQuote:
      '“He determined to keep a vigil of arms for one whole night before the altar of Our Lady of Montserrat, without sitting or lying down.”',
    globePlacement: {
      latDeg: 41.59,
      lngDeg: 1.83,
      regionLabel: 'Montserrat Massif, Catalonia, Northeastern Spain',
      beaconColorHex: '#38BDF8',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #2 · The Serrated Mountain where the Knight Laid Down His Sword',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the jagged Catalan mountain abbey northwest of Barcelona where Ignatius kept his all-night vigil.',
    detectiveClues: [
      {
        id: 'i2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Famous Saw-Toothed Mountain Abbey 45 km Northwest of Barcelona',
        clueText:
          'Look to Catalonia in northeastern Spain near the Mediterranean coast. Its name literally means "Serrated Mountain" because of its extraordinary pink conglomerate rock needles rising over the Llobregat river valley.',
        soundCue: 'compass_click',
      },
      {
        id: 'i2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '"La Moreneta" (The Black Madonna) & Europe’s Oldest Boys’ Choir',
        clueText:
          'Founded in the 11th century, this Benedictine mountain monastery houses Catalonia’s patron saint statue ("La Moreneta") and the Escolania boys’ choir that has sung here daily since the 13th century!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i2-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Trading Noble Finery for Sackcloth & Hanging Up His Sword (March 1522)',
        clueText:
          'After making a three-day written general confession to a Benedictine monk here in March 1522, Ignatius gave his fine clothes to a beggar and left his knightly sword and dagger at Our Lady’s altar.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The warm golden-lit arched portal of the Abbey Basilica in the center.',
        hintDirection: 'Click marker #1 on the illuminated basilica entrance.',
        foundTitle: 'What Happened Here: The All-Night Vigil of Arms (March 24, 1522)',
        xPercent: 61,
        yPercent: 62,
        hitRadius: 14,
        storyUnlocked:
          'On the night of March 24, 1522, dressed in a rough pilgrim sackcloth tunic after giving his nobleman’s attire to a beggar, Ignatius stood and knelt all night before the Black Madonna of Montserrat and surrendered his sword and dagger at her altar.',
        stoneKeyWord: 'SWORD LAID AT MONTSERRAT',
        stoneKeyMeaning: 'Where Ignatius traded his armor for a pilgrim’s sackcloth on March 24, 1522',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The towering pink conglomerate rock needles rising behind the monastery.',
        hintDirection: 'Click marker #2 on the dramatic serrated rock peaks at the top right.',
        foundTitle: 'Did You Know? How the Beggar Nearly Got Arrested for Ignatius’s Clothes!',
        xPercent: 78,
        yPercent: 24,
        hitRadius: 14,
        storyUnlocked:
          'After Ignatius slipped out of Montserrat at dawn in sackcloth, town guards arrested the poor beggar wearing Ignatius’s velvet nobleman’s clothes, assuming he had robbed someone—until the tearful Ignatius had to confirm he had gifted the clothes himself!',
        stoneKeyWord: 'GIFT TO THE BEGGAR',
        stoneKeyMeaning: 'Why the beggar wearing Ignatius’s fine clothes at Montserrat was questioned by guards',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The stone pilgrim terrace overlooking the mist-filled Catalan valley.',
        hintDirection: 'Click marker #3 on the lower stone terrace and valley view.',
        foundTitle: 'Where Is It Modern Day Now? Abbey of Montserrat (Barcelona), Catalonia, Spain',
        xPercent: 48,
        yPercent: 78,
        hitRadius: 14,
        storyUnlocked:
          'Today at the Abbey of Santa Maria de Montserrat (45 minutes by train and cable car from Barcelona, Spain), a marble relief and replica sword inside the Basilica commemorate Ignatius’s 1522 vigil.',
        stoneKeyWord: 'MONTSERRAT, CATALONIA, SPAIN',
        stoneKeyMeaning: 'The mountain monastery above Barcelona where Ignatius laid down his sword',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Vigil of Arms',
        questionPrompt: 'What did St. Ignatius leave before the altar of Our Lady of Montserrat on March 24, 1522?',
        correctStoneId: 'i2-art-1',
      },
      {
        slotLabel: 'Lock II · The Nobleman’s Coat',
        questionPrompt: 'To whom did Ignatius give his fine velvet clothes on the Eve of the Annunciation at Montserrat?',
        correctStoneId: 'i2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which jagged Catalan mountain abbey northwest of Barcelona hosted Ignatius’s vigil?',
        correctStoneId: 'i2-art-3',
      },
    ],
    sealName: 'Seal of Montserrat',
  },
  {
    stopNumber: 3,
    title: 'The Cave by the River & The Spiritual Exercises',
    subtitle: 'Inspect the Cave of St. Ignatius and medieval bridge on the Cardener River in Manresa',
    eraLabel: '1522 – 1523 AD · Eleven Months in the Cave',
    ancientPlaceName: 'Minorisa (Cova de Sant Ignasi)',
    modernPlaceName: 'Manresa',
    modernCountry: 'Spain',
    image: '/images/trails/ignatius_step3_manresa.jpg',
    imageCaption:
      'Sanctuary of the Cave of St. Ignatius (Cova de Sant Ignasi) overlooking the Cardener River and the medieval Pont Vell bridge in Manresa, Catalonia, Spain.',
    whatYouCanSeeToday:
      'Today in Manresa (15 km north of Montserrat in central Catalonia, Spain), pilgrims cross the medieval arched bridge of Pont Vell over the Cardener River and enter the natural sandstone Cave of St. Ignatius (La Cova), where he drafted the "Spiritual Exercises."',
    didYouKnowHighlight:
      'Intending to stop in Manresa for just a few days to jot down notes in his notebook, Ignatius stayed for 11 transformative months! Inside this natural sandstone cave overlooking Montserrat, he drafted the "Spiritual Exercises"—the four-week retreat handbook still used across the globe today.',
    saintQuote:
      '“Look how God dwells in creatures: in the elements giving them existence, in the plants giving them life, in the animals giving them sensation, in human beings giving them understanding.”',
    globePlacement: {
      latDeg: 41.72,
      lngDeg: 1.83,
      regionLabel: 'Cardener River Valley, Bages, Catalonia, Spain',
      beaconColorHex: '#10B981',
      labelOffsetPx: [66, -24],
    },
    detectiveCaseTitle: 'Case #3 · The Sandstone Cave & The Illumination by the Cardener River',
    detectiveLeadPrompt:
      'Read the 3 clues below, then locate the Catalan river town just north of Montserrat where Ignatius lived in a cave and wrote the Spiritual Exercises.',
    detectiveClues: [
      {
        id: 'i3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Historic Catalan Town on the Cardener River Just North of Montserrat',
        clueText:
          'Look 15 km north of Montserrat mountain in central Catalonia, Spain. Spanning its river is the 13th-century gothic stone bridge of Pont Vell, overlooked by the Basilica of La Seu and the Sanctuary of La Cova.',
        soundCue: 'compass_click',
      },
      {
        id: 'i3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Eleven-Month Detour That Produced the "Spiritual Exercises"',
        clueText:
          'Ignatius planned to spend only a few days in this town’s hospice, yet stayed 11 months praying seven hours a day inside a natural sandstone grotto and writing the Spiritual Exercises in his notebook!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i3-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Mystical Illumination on the Banks of the Cardener River',
        clueText:
          'While walking beside the river here toward the little church of St. Paul, Ignatius sat down facing the water and experienced a sudden illumination that made all things appear new to him.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The natural sandstone cave grotto with the carved alabaster altar on the left.',
        hintDirection: 'Click marker #1 inside the rock cave grotto on the left.',
        foundTitle: 'What Happened Here: Writing the Spiritual Exercises in the Cave (1522)',
        xPercent: 22,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Inside this natural sandstone cave overlooking the Cardener River and the distant peaks of Montserrat, Ignatius spent seven hours a day in prayer during 1522–1523 and wrote the core of his "Spiritual Exercises."',
        stoneKeyWord: 'CAVE OF THE SPIRITUAL EXERCISES',
        stoneKeyMeaning: 'The sandstone cave in Manresa where St. Ignatius drafted the Spiritual Exercises',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The winding Cardener River and the medieval arched stone bridge (Pont Vell).',
        hintDirection: 'Click marker #2 on the arched stone bridge over the river.',
        foundTitle: 'Did You Know? The Illumination by the Cardener River',
        xPercent: 72,
        yPercent: 60,
        hitRadius: 14,
        storyUnlocked:
          'In his Autobiography, Ignatius recalled sitting on the steps beside the Cardener River in Manresa when the eyes of his understanding were suddenly opened—saying that even if he totaled every other help he received in his entire life, it would not equal what he received in that single moment by the river!',
        stoneKeyWord: 'ILLUMINATION BY THE CARDENER',
        stoneKeyMeaning: 'The mystical enlightenment Ignatius experienced beside the Cardener River in Manresa',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The medieval stone town and hilltop Basilica of La Seu in the center distance.',
        hintDirection: 'Click marker #3 on the hilltop basilica and town in the center.',
        foundTitle: 'Where Is It Modern Day Now? Manresa, Catalonia, Spain',
        xPercent: 60,
        yPercent: 32,
        hitRadius: 14,
        storyUnlocked:
          'Today in Manresa (Catalonia, Spain), the Sanctuary of La Cova de Sant Ignasi is an international retreat center and the finish line of the 650-kilometer Camino Ignaciano pilgrimage trail from Loyola.',
        stoneKeyWord: 'MANRESA, CATALONIA, SPAIN',
        stoneKeyMeaning: 'The Catalan river town where the Cave of St. Ignatius welcomes pilgrims today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Cave Grotto',
        questionPrompt: 'What world-famous spiritual handbook did St. Ignatius begin writing in the cave at Manresa?',
        correctStoneId: 'i3-art-1',
      },
      {
        slotLabel: 'Lock II · Beside the Water',
        questionPrompt: 'Along the banks of which river in Manresa did Ignatius receive his great illumination?',
        correctStoneId: 'i3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Catalan town does the Sanctuary of the Cave of St. Ignatius (La Cova) stand today?',
        correctStoneId: 'i3-art-3',
      },
    ],
    sealName: 'Seal of Manresa',
  },
  {
    stopNumber: 4,
    title: 'The Thirty-Seven-Year-Old Student & The Friends in the Lord',
    subtitle: 'Explore the medieval Latin Quarter courtyard and Montmartre Hill in Paris',
    eraLabel: '1528 – 1535 AD · Master of Arts & First Companions',
    ancientPlaceName: 'Collège de Montaigu & Sainte-Barbe (Paris)',
    modernPlaceName: 'Paris',
    modernCountry: 'France',
    image: '/images/trails/ignatius_step4_paris.jpg',
    imageCaption:
      'Historic stone courtyard of the Latin Quarter in Paris with the dome of Montmartre rising on the northern horizon, France.',
    whatYouCanSeeToday:
      'Today in Paris, France, visitors can walk from the Place du Panthéon in the 5th arrondissement—where plaques mark the Collège de Montaigu and Collège de Sainte-Barbe—across the Seine to the Crypt of the Martyrium on Montmartre Hill.',
    didYouKnowHighlight:
      'Because Spanish Inquisitors kept barring him from teaching theology without a university degree, 37-year-old Ignatius walked all the way to Paris in February 1528, sat on wooden benches alongside 12-year-old boys to master Latin grammar, and graduated as a Master of Arts in 1534!',
    saintQuote:
      '“Love ought to manifest itself more in deeds than in words.”',
    globePlacement: {
      latDeg: 48.85,
      lngDeg: 2.35,
      regionLabel: 'Latin Quarter & Montmartre, Paris, France',
      beaconColorHex: '#Facc15',
      labelOffsetPx: [-68, -26],
    },
    detectiveCaseTitle: 'Case #4 · The Latin Quarter Where Seven Companions Became One',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the French university capital where Ignatius earned his Master of Arts and gathered his first six companions.',
    detectiveClues: [
      {
        id: 'i4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Capital of France & Its Historic Left-Bank "Latin Quarter"',
        clueText:
          'Look to the Seine River in northern France. On the Left Bank around the Sorbonne and Panthéon lies the university district called the Latin Quarter because medieval scholars spoke Latin in its streets.',
        soundCue: 'compass_click',
      },
      {
        id: 'i4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The "Midnight Billiards Match" Between Ignatius and a University Professor',
        clueText:
          'According to early Jesuit chronicles in this city, when the rector of Collège de Sainte-Barbe threatened to publicly flog Ignatius for turning students into ascetics, Ignatius calmly explained his mission and won the rector’s tearful apology in front of the whole school!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i4-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Gathering the Six "Friends in the Lord" (1528–1534)',
        clueText:
          'Starting over as a 37-year-old student here, Ignatius shared a room with Peter Faber and Francis Xavier and guided six fellow students through the Spiritual Exercises before their 1534 vows on Montmartre.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The historic limestone courtyard and arched passage of the medieval college.',
        hintDirection: 'Click marker #1 on the stone archway in the right courtyard.',
        foundTitle: 'What Happened Here: Starting Over at Age 37 in the Latin Quarter (1528)',
        xPercent: 74,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'Arriving in Paris in February 1528 at age 37 driving a little donkey loaded with books, Ignatius spent seven years studying Latin, philosophy, and theology at Montaigu and Sainte-Barbe—and gathered his first six lifelong companions.',
        stoneKeyWord: 'MASTER OF ARTS IN PARIS (1534)',
        stoneKeyMeaning: 'Where 37-year-old Ignatius earned his degree and gathered his first six companions',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The stone staircase and upper student windows on the left building.',
        hintDirection: 'Click marker #2 on the stone steps and windows on the left.',
        foundTitle: 'Did You Know? How Rector Jacques Gouvea Knelt Before His Student',
        xPercent: 22,
        yPercent: 58,
        hitRadius: 14,
        storyUnlocked:
          'When Principal Jacques Gouvea of Collège de Sainte-Barbe prepared to subject Ignatius to the "Salle" (a public gauntlet beating) for distracting students with prayer, Ignatius spoke with such humility before the bell rang that Gouvea knelt down in tears before the entire college and declared Ignatius a saint!',
        stoneKeyWord: 'TRIUMPH OF HUMILITY AT SAINTE-BARBE',
        stoneKeyMeaning: 'How Principal Gouvea knelt in tears after hearing Ignatius explain his mission',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The distant white domes of Montmartre rising on the northern skyline.',
        hintDirection: 'Click marker #3 on the distant hilltop domes in the upper center.',
        foundTitle: 'Where Is It Modern Day Now? Latin Quarter & Montmartre, Paris, France',
        xPercent: 64,
        yPercent: 28,
        hitRadius: 14,
        storyUnlocked:
          'Today in Paris, France, visitors can see the preserved archway and plaques of the Collège de Sainte-Barbe on Rue Valette (5th arrondissement) and ride the Metro north to the Crypt of the Martyrium on Montmartre.',
        stoneKeyWord: 'LATIN QUARTER, PARIS, FRANCE',
        stoneKeyMeaning: 'The historic university quarter of Paris where the first Jesuits met',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Back to School at 37',
        questionPrompt: 'Why did 37-year-old Ignatius walk to Paris in 1528 and sit alongside young students?',
        correctStoneId: 'i4-art-1',
      },
      {
        slotLabel: 'Lock II · The College Principal',
        questionPrompt: 'What happened when Principal Gouvea of Sainte-Barbe confronted Ignatius before the whole school?',
        correctStoneId: 'i4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which historic district of Paris did Ignatius, Peter Faber, and Francis Xavier study?',
        correctStoneId: 'i4-art-3',
      },
    ],
    sealName: 'Seal of Paris',
  },
  {
    stopNumber: 5,
    title: 'The Lagoon Hospitals & Ordination in Venice',
    subtitle: 'Examine the Venetian canal and Renaissance facade of the Church of San Zulian',
    eraLabel: '1535 – 1537 AD · Hospital Service & Priesthood',
    ancientPlaceName: 'Venetia (Ospedale degli Incurabili)',
    modernPlaceName: 'Venice',
    modernCountry: 'Italy',
    image: '/images/trails/ignatius_step5_venice.jpg',
    imageCaption:
      'Renaissance Istrian stone facade of the Church of San Zulian and canal reflections in Venice, Italy.',
    whatYouCanSeeToday:
      'Today in Venice, Italy, pilgrims walk along the Zattere waterfront in Dorsoduro to see the 16th-century Ospedale degli Incurabili (where Ignatius and Xavier nursed patients) and visit the Church of San Zulian and Church of San Giovanni Elemosinario near Rialto.',
    didYouKnowHighlight:
      'Ignatius and his companions walked across the snowy Alps to Venice in January 1537 hoping to board the annual spring pilgrim ship to Jerusalem—only for a war between Venice and the Ottoman Empire to cancel every single pilgrim ship that year, redirecting their entire destiny toward Rome!',
    saintQuote:
      '“If no ship sails to Jerusalem this year, we will place ourselves at the disposal of the Vicar of Christ to be sent wherever there is greater need.”',
    globePlacement: {
      latDeg: 45.43,
      lngDeg: 12.33,
      regionLabel: 'Venetian Lagoon, Northern Adriatic Coast, Italy',
      beaconColorHex: '#EC4899',
      labelOffsetPx: [-66, -26],
    },
    detectiveCaseTitle: 'Case #5 · The Canal Republic Where the Cancelled Ship Changed History',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the northern Italian lagoon city where Ignatius was ordained a priest in 1537.',
    detectiveClues: [
      {
        id: 'i5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A UNESCO City Built on 118 Islands in a Northern Adriatic Lagoon',
        clueText:
          'Look to northeastern Italy at the head of the Adriatic Sea. Linked by over 400 bridges and plied by gondolas, this maritime republic was the medieval gateway for ships sailing to the Holy Land.',
        soundCue: 'compass_click',
      },
      {
        id: 'i5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Only Year in Decades When No Pilgrim Ship Sailed to Jerusalem (1537)!',
        clueText:
          'For decades, a pilgrim galley sailed from this lagoon to Jaffa every spring—except in 1537, when a Venetian-Ottoman naval war closed the sea, activating the companions’ backup vow to go to Rome instead!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i5-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Serving at the Hospital of the Incurables & Ordination on June 24, 1537',
        clueText:
          'Reunited with his Paris companions here in January 1537, Ignatius nursed patients in the Ospedale degli Incurabili and was ordained to the priesthood on the Feast of St. John the Baptist, June 24, 1537.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The carved white Istrian stone church portal on the right.',
        hintDirection: 'Click marker #1 on the Renaissance stone entrance of the church.',
        foundTitle: 'What Happened Here: Ordination to the Priesthood (June 24, 1537)',
        xPercent: 74,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'On June 24, 1537, in Venice, Ignatius of Loyola, Francis Xavier, and four companions were ordained priests by Bishop Vincenzo Nigusanti—pouring out such tears of joy that the bishop said he had never experienced an ordination like it.',
        stoneKeyWord: 'ORDAINED IN VENICE (1537)',
        stoneKeyMeaning: 'Where Ignatius and Francis Xavier were ordained priests on June 24, 1537',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The sunlit Venetian canal waters and moored wooden boats on the left.',
        hintDirection: 'Click marker #2 on the canal water and gondolas.',
        foundTitle: 'Did You Know? The Cancelled Jerusalem Galley & The Ospedale degli Incurabili',
        xPercent: 26,
        yPercent: 68,
        hitRadius: 14,
        storyUnlocked:
          'Their 1534 Montmartre vow stipulated that if they waited one full year in Venice and no ship sailed to Jerusalem, they would offer themselves to the Pope in Rome. Because the 1537 Ottoman-Venetian War cancelled the annual pilgrim galley for the first time in 39 years, the Society of Jesus became a global missionary order!',
        stoneKeyWord: 'CANCELLED GALLEY OF 1537',
        stoneKeyMeaning: 'How a naval war in Venice redirected Ignatius and his companions to Rome and the world',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The distant Venetian bell tower (campanile) rising against the sunset sky.',
        hintDirection: 'Click marker #3 on the distant brick campanile in the upper left.',
        foundTitle: 'Where Is It Modern Day Now? Venice, Veneto, Italy',
        xPercent: 25,
        yPercent: 38,
        hitRadius: 14,
        storyUnlocked:
          'Today in Venice, Italy, the Renaissance quadrangle of the Ospedale degli Incurabili along the Zattere waterfront (now housing the Venice Academy of Fine Arts) still stands where Ignatius and Xavier lived and tended the sick in 1537.',
        stoneKeyWord: 'VENICE, VENETO, ITALY',
        stoneKeyMeaning: 'The Adriatic lagoon city where Ignatius was ordained and served in the hospitals',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Feast of St. John the Baptist',
        questionPrompt: 'What sacred milestone took place for Ignatius and Francis Xavier in Venice on June 24, 1537?',
        correctStoneId: 'i5-art-1',
      },
      {
        slotLabel: 'Lock II · The Closed Sea',
        questionPrompt: 'Why were Ignatius and his companions unable to sail from Venice to Jerusalem in 1537?',
        correctStoneId: 'i5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Italian lagoon city does the 16th-century Ospedale degli Incurabili stand today?',
        correctStoneId: 'i5-art-3',
      },
    ],
    sealName: 'Seal of Venice',
  },
  {
    stopNumber: 6,
    title: 'The Rooms of St. Ignatius & The Lapis Lazuli Altar of the Gesù',
    subtitle: 'Enter the Baroque Chapel of St. Ignatius inside the Church of the Gesù in Rome',
    eraLabel: '1537 – July 31, 1556 AD · Founding the Jesuits & Tomb',
    ancientPlaceName: 'Roma (Chiesa del Gesù & Camerette)',
    modernPlaceName: 'Rome',
    modernCountry: 'Italy',
    image: '/images/trails/ignatius_step6_rome.jpg',
    imageCaption:
      'Baroque Chapel and lapis lazuli urn of St. Ignatius of Loyola inside the Mother Church of the Gesù in Rome, Italy.',
    whatYouCanSeeToday:
      'Today at Piazza del Gesù in central Rome, Italy (just steps from Piazza Venezia), visitors enter the Mother Church of the Society of Jesus—the Church of the Gesù—to pray before the gilded bronze and lapis lazuli urn of St. Ignatius, and walk upstairs into the preserved "Camerette" (the actual 4 small rooms where Ignatius lived and died in 1556!).',
    didYouKnowHighlight:
      'Every afternoon at 5:30 PM inside the Church of the Gesù in Rome, a hidden 17th-century mechanical pulley designed by Andrea Pozzo slowly slides down the huge painting above St. Ignatius’s altar to reveal a gleaming statue of the saint while sacred music fills the nave!',
    saintQuote:
      '“Go forth and set the world on fire! — Ad Maiorem Dei Gloriam (For the Greater Glory of God).”',
    globePlacement: {
      latDeg: 41.89,
      lngDeg: 12.48,
      regionLabel: 'Piazza del Gesù, Campus Martius, Rome, Italy',
      beaconColorHex: '#A855F7',
      labelOffsetPx: [66, 26],
    },
    detectiveCaseTitle: 'Case #6 · The Lapis Lazuli Shrine & The Four Rooms at Piazza del Gesù',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Italian capital where Pope Paul III approved the Society of Jesus in 1540 and where Ignatius rests today.',
    detectiveClues: [
      {
        id: 'i6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Capital of Italy & The World’s First True Baroque Church Facade',
        clueText:
          'Look to the historic heart of Italy’s capital between the Pantheon and Piazza Venezia. Here stands the Church of the Gesù, whose 1584 facade became the architectural model for Baroque churches worldwide.',
        soundCue: 'compass_click',
      },
      {
        id: 'i6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The 5:30 PM Mechanical Altar Reveal & The Preserved Shoes of St. Ignatius',
        clueText:
          'Every day at 5:30 PM inside this church, a 300-year-old theatrical machine lowers the altar painting over the saint’s blue lapis lazuli tomb—and upstairs in his preserved study sit the actual worn leather shoes he walked in!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i6-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Vision at La Storta & Sending 1,000 Jesuits Across the Globe (1540–1556)',
        clueText:
          'Entering this city in 1537 after a vision at the wayside chapel of La Storta ("I will be favorable to you in Rome"), Ignatius wrote the Jesuit Constitutions in four small rooms here until his death on July 31, 1556.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'i6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The deep blue lapis lazuli and gilded bronze urn beneath the statue of St. Ignatius.',
        hintDirection: 'Click marker #1 on the blue and gold reliquary urn at the base of the altar.',
        foundTitle: 'What Happened Here: Founding the Society of Jesus & Final Rest (1540–1556)',
        xPercent: 50,
        yPercent: 70,
        hitRadius: 14,
        storyUnlocked:
          'After Pope Paul III approved the Society of Jesus on September 27, 1540, Ignatius spent the last 16 years of his life in Rome writing over 6,800 letters and founding schools and colleges until he died on July 31, 1556. His relics rest inside this gilded bronze and lapis lazuli urn.',
        stoneKeyWord: 'URN OF ST. IGNATIUS (1556)',
        stoneKeyMeaning: 'The gilded bronze and lapis lazuli reliquary of St. Ignatius in the Church of the Gesù',
        soundCue: 'relic_discovered',
      },
      {
        id: 'i6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The silver statue of St. Ignatius framed between the green marble columns.',
        hintDirection: 'Click marker #2 on the central statue above the altar.',
        foundTitle: 'Did You Know? The 5:30 PM "Macchina Barocca" & The Four Little Rooms Upstairs',
        xPercent: 50,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Designed by Brother Andrea Pozzo in 1695, the Chapel of St. Ignatius features a hidden counterweight mechanism that lowers the altar painting every afternoon at 5:30 PM. Directly next door at Via degli Astalli 16, visitors can walk through the four original rooms ("Camerette di Sant’Ignazio") where he lived and died!',
        stoneKeyWord: 'CAMERETTE & BAROQUE ALTAR',
        stoneKeyMeaning: 'The 1695 Pozzo altar machine and the preserved 4 rooms where Ignatius lived',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'i6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The sunbeam streaming through the gilded Baroque dome and frescoed vault.',
        hintDirection: 'Click marker #3 on the golden sunbeam and dome above.',
        foundTitle: 'Where Is It Modern Day Now? Church of the Gesù, Piazza del Gesù, Rome, Italy',
        xPercent: 52,
        yPercent: 24,
        hitRadius: 14,
        storyUnlocked:
          'Today at Piazza del Gesù in central Rome, Italy, both the Church of the Gesù and the upstairs Rooms of St. Ignatius (preceded byAndrea Pozzo’s famous optical-illusion perspective corridor) are open free to visitors daily.',
        stoneKeyWord: 'CHURCH OF THE GESÙ, ROME',
        stoneKeyMeaning: 'The Mother Church of the Society of Jesus in central Rome today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Lapis Lazuli Urn',
        questionPrompt: 'In what year did Pope Paul III approve the Society of Jesus in Rome?',
        correctStoneId: 'i6-art-1',
      },
      {
        slotLabel: 'Lock II · The Four Small Rooms',
        questionPrompt: 'What are the preserved upstairs rooms next to the Church of the Gesù where Ignatius lived and died?',
        correctStoneId: 'i6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which famous Roman Baroque church does St. Ignatius’s tomb rest today?',
        correctStoneId: 'i6-art-3',
      },
    ],
    sealName: 'Seal of the Gesù (Rome)',
  },
];

export const ST_JOAN_ARC_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Voices in the Garden & The Cottage on the Meuse',
    subtitle: 'Inspect Joan’s stone birthplace cottage and Bois-Chenu Basilica in Domrémy',
    eraLabel: '1412 – 1428 AD · Childhood & Calling',
    ancientPlaceName: 'Domrémy on the Meuse (Lorraine)',
    modernPlaceName: 'Domrémy-la-Pucelle',
    modernCountry: 'France',
    image: '/images/trails/joan_step1_domremy.jpg',
    imageCaption:
      '15th-century stone Birthplace Cottage of St. Joan of Arc and the hilltop Basilica of Bois-Chenu overlooking the Meuse River valley in Domrémy-la-Pucelle, France.',
    whatYouCanSeeToday:
      'Today in the quiet village of Domrémy-la-Pucelle (Vosges department in the Grand Est / Lorraine region of northeastern France), visitors walk inside Joan’s preserved 15th-century stone Birthplace House, touch her original baptismal font in the parish church of Saint-Rémy, and visit the hilltop Basilica of Bois-Chenu.',
    didYouKnowHighlight:
      'When King Charles VII ennobled Joan and her family in 1429, he exempted the village of Domrémy from all royal taxes in perpetuity. Every year in the royal tax ledger beside the name "Domrémy," French tax collectors simply wrote three words: "Néant, la Pucelle" ("Nothing—on account of the Maid")!',
    saintQuote:
      '“I was thirteen when I had a Voice from God to help me govern myself. And the first time, I was very much afraid.”',
    globePlacement: {
      latDeg: 48.44,
      lngDeg: 5.67,
      regionLabel: 'Meuse River Valley, Vosges, Lorraine, Northeastern France',
      beaconColorHex: '#F59E0B',
      labelOffsetPx: [66, -24],
    },
    detectiveCaseTitle: 'Case #1 · The Meuse River Village Written "Tax-Free for the Maid"',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the northeastern French village where 13-year-old Joan heard the voices of the saints in her father’s garden.',
    detectiveClues: [
      {
        id: 'j1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Pastoral Lorraine Village on the Meuse River in Northeastern France',
        clueText:
          'Look to the Vosges department of northeastern France along the green valley of the Meuse River. In 1578, this village officially added "-la-Pucelle" ("The Maid") to its name in honor of its most famous daughter.',
        soundCue: 'compass_click',
      },
      {
        id: 'j1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '360 Years of "Néant, la Pucelle" in the French Royal Tax Books!',
        clueText:
          'From 1429 until the French Revolution in 1789, residents of this village paid zero royal taxes—and Joan’s sloped-roof stone family cottage still stands intact beside the parish church where she was baptized!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j1-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Midday Summer Light in Her Father’s Garden at Age 13 (1425)',
        clueText:
          'Born here around January 6, 1412 to farmer Jacques d’Arc and Isabelle Romée, 13-year-old Joan heard the voices of St. Michael the Archangel, St. Catherine, and St. Margaret calling her to lift the siege of Orléans.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The sloped-roof 15th-century stone cottage nestled in the green garden.',
        hintDirection: 'Click marker #1 on the stone cottage in the lower right foreground.',
        foundTitle: 'What Happened Here: The Voices in Her Father’s Garden (1425)',
        xPercent: 64,
        yPercent: 66,
        hitRadius: 14,
        storyUnlocked:
          'Around noon on a summer day in 1425 in her father’s garden right beside this stone cottage and the parish church, 13-year-old Joan saw a bright light toward the church and heard St. Michael, St. Catherine, and St. Margaret entrusting her with the mission to save France.',
        stoneKeyWord: 'VOICES IN DOMRÉMY (1425)',
        stoneKeyMeaning: 'Where 13-year-old Joan first heard St. Michael, St. Catherine, and St. Margaret',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j1-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The twin-spired Basilica of Bois-Chenu crowning the wooded hill above the village.',
        hintDirection: 'Click marker #2 on the hilltop basilica in the upper right.',
        foundTitle: 'Did You Know? "Néant, la Pucelle" — 360 Years Without Taxes',
        xPercent: 82,
        yPercent: 24,
        hitRadius: 14,
        storyUnlocked:
          'When King Charles VII asked Joan after his coronation what reward she desired, she asked only that her native village of Domrémy be freed from royal taxes. For 360 years, the royal tax ledger entry for Domrémy simply read: "Néant, la Pucelle" (Nothing, because of the Maid)!',
        stoneKeyWord: 'NÉANT, LA PUCELLE (1429)',
        stoneKeyMeaning: 'The 360-year royal tax exemption Joan requested for her home village of Domrémy',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The winding Meuse River flowing through the green Lorraine meadows on the left.',
        hintDirection: 'Click marker #3 on the curving river valley on the left.',
        foundTitle: 'Where Is It Modern Day Now? Domrémy-la-Pucelle, Vosges, France',
        xPercent: 25,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Today in Domrémy-la-Pucelle (Vosges, Grand Est, France), visitors can walk inside the four preserved rooms of Joan’s childhood home (including her bedroom), see her baptismal font in Saint-Rémy church, and visit the Basilica of Bois-Chenu.',
        stoneKeyWord: 'DOMRÉMY-LA-PUCELLE, FRANCE',
        stoneKeyMeaning: 'The preserved Lorraine village and birthplace house of St. Joan of Arc',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Summer Garden',
        questionPrompt: 'Which three saints spoke to 13-year-old Joan in her father’s garden in Domrémy?',
        correctStoneId: 'j1-art-1',
      },
      {
        slotLabel: 'Lock II · The Royal Ledger',
        questionPrompt: 'What phrase was written beside Domrémy in the French royal tax books for 360 years?',
        correctStoneId: 'j1-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which northeastern French village on the Meuse River does Joan’s birthplace cottage stand?',
        correctStoneId: 'j1-art-3',
      },
    ],
    sealName: 'Seal of Domrémy',
  },
  {
    stopNumber: 2,
    title: 'The Captain’s Sword & The Ride Through the Gate of France',
    subtitle: 'Examine the medieval Porte de France and Castle Chapel in Vaucouleurs',
    eraLabel: 'February 23, 1429 AD · Beginning the Ride',
    ancientPlaceName: 'Vaucouleurs (Castrum Vallis Coloris)',
    modernPlaceName: 'Vaucouleurs',
    modernCountry: 'France',
    image: '/images/trails/joan_step2_vaucouleurs.jpg',
    imageCaption:
      'Fortified medieval stone Porte de France (Gate of France) and Castle Chapel in Vaucouleurs, Lorraine, France, where Joan rode out in February 1429.',
    whatYouCanSeeToday:
      'Today in Vaucouleurs (18 km north of Domrémy in the Meuse department of northeastern France), visitors walk beneath the original 14th-century stone archway of the Porte de France, descend into the Castle Chapel crypt to see the 14th-century statue of Our Lady of the Vaults, and view the ancient linden tree where Joan tied her horse.',
    didYouKnowHighlight:
      'Garrison commander Robert de Baudricourt twice laughed 17-year-old Joan out of Vaucouleurs, telling her uncle to "take her home and box her ears." Only on her third visit—when she accurately announced the French defeat at the Battle of the Herrings before any courier could arrive—did he hand her a sword and say: "Go, and come what may!"',
    saintQuote:
      '“Even if I had to crawl on my knees, I would go to the Dauphin, for there is no one else in the world who can recover the Kingdom of France.”',
    globePlacement: {
      latDeg: 48.6,
      lngDeg: 5.66,
      regionLabel: 'Meuse Valley, Lorraine, Northeastern France',
      beaconColorHex: '#38BDF8',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #2 · The Garrison Gate Where the Skeptical Captain Handed Her a Sword',
    detectiveLeadPrompt:
      'Read the 3 clues below, then locate the loyal Meuse garrison town just north of Domrémy where Captain Robert de Baudricourt equipped Joan for her ride.',
    detectiveClues: [
      {
        id: 'j2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Hilltop Garrison Town in the Meuse Department, 18 km North of Domrémy',
        clueText:
          'Look just 18 km north down the Meuse River from Domrémy in northeastern France. On its castle hill still stands the medieval stone archway called the "Porte de France" (Gate of France).',
        soundCue: 'compass_click',
      },
      {
        id: 'j2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '"Go, and Come What May!" & The Townspeople Who Bought Her a Horse',
        clueText:
          'Once gruff Captain Robert de Baudricourt finally relented here in February 1429, the townspeople pooled 16 francs to buy 17-year-old Joan a horse and riding tunic, while Baudricourt buckled a sword to her side!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j2-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Riding Out with Six Escorts on the Evening of February 23, 1429',
        clueText:
          'After praying in the subterranean crypt of Our Lady of the Vaults, Joan rode out through the Porte de France at dusk on February 23, 1429 with six armed companions on an 11-day dash across 300 miles of enemy territory.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The fortified medieval stone archway of the Porte de France in the center.',
        hintDirection: 'Click marker #1 on the central stone gate arch.',
        foundTitle: 'What Happened Here: Departure Through the Gate of France (February 23, 1429)',
        xPercent: 45,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'On the evening of February 23, 1429, equipped with a horse bought by the townsfolk of Vaucouleurs, a letter of safe-conduct, and a sword from Captain Robert de Baudricourt ("Go, and come what may!"), 17-year-old Joan rode out through this exact stone archway.',
        stoneKeyWord: 'PORTE DE FRANCE (FEB 1429)',
        stoneKeyMeaning: 'The medieval stone gate in Vaucouleurs through which Joan rode out to Chinon',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The castle chapel and subterranean crypt entrance on the right hillside.',
        hintDirection: 'Click marker #2 on the stone chapel and arched crypt door on the right.',
        foundTitle: 'Did You Know? Praying Before "Our Lady of the Vaults"',
        xPercent: 74,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'While waiting three weeks in Vaucouleurs for Baudricourt’s permission, Joan spent hours on her knees in the underground Castle Chapel crypt before the 14th-century stone statue of Notre-Dame des Voûtes ("Our Lady of the Vaults"), which is still preserved in Vaucouleurs today!',
        stoneKeyWord: 'OUR LADY OF THE VAULTS',
        stoneKeyMeaning: 'The 14th-century crypt statue in Vaucouleurs before which Joan prayed',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The cobblestone road curving westward toward the sunset horizon.',
        hintDirection: 'Click marker #3 on the cobbled road passing through the gate.',
        foundTitle: 'Where Is It Modern Day Now? Vaucouleurs, Meuse, Grand Est, France',
        xPercent: 45,
        yPercent: 80,
        hitRadius: 14,
        storyUnlocked:
          'Today in Vaucouleurs (Meuse department, France), visitors can walk through the Porte de France, visit the Castle Crypt of Our Lady of the Vaults, and explore the Joan of Arc Museum in the town hall square.',
        stoneKeyWord: 'VAUCOULEURS, MEUSE, FRANCE',
        stoneKeyMeaning: 'The Lorraine garrison town where Joan began her historic ride in 1429',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Skeptical Captain',
        questionPrompt: 'Which garrison captain in Vaucouleurs gave Joan a sword and said "Go, and come what may"?',
        correctStoneId: 'j2-art-1',
      },
      {
        slotLabel: 'Lock II · The Castle Crypt',
        questionPrompt: 'Before which 14th-century statue in the Vaucouleurs crypt did Joan pray while waiting?',
        correctStoneId: 'j2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Through which preserved stone gate in Vaucouleurs did Joan ride out on February 23, 1429?',
        correctStoneId: 'j2-art-3',
      },
    ],
    sealName: 'Seal of Vaucouleurs',
  },
  {
    stopNumber: 3,
    title: 'The Disguised Dauphin & The Great Hall on the Vienne',
    subtitle: 'Survey the Royal Fortress of Chinon above the Vienne River in the Loire Valley',
    eraLabel: 'March 6, 1429 AD · Recognizing the King',
    ancientPlaceName: 'Castrum Caino (Forteresse Royale de Chinon)',
    modernPlaceName: 'Chinon',
    modernCountry: 'France',
    image: '/images/trails/joan_step3_chinon.jpg',
    imageCaption:
      'Royal Fortress of Chinon perched on the limestone bluff above the Vienne River in the Loire Valley, France.',
    whatYouCanSeeToday:
      'Today in Chinon (Indre-et-Loire in the Loire Valley of central-western France, 45 km southwest of Tours), visitors ascend the cliff-top Royal Fortress of Chinon, pass beneath the 14th-century Clock Tower housing the Joan of Arc Museum, and stand beside the preserved stone fireplace wall of the Great Hall where Joan recognized the Dauphin.',
    didYouKnowHighlight:
      'To test whether 17-year-old Joan was truly sent by God, Dauphin Charles dressed a courtier in royal robes on the throne while he hid plainly dressed among 300 nobles in the torchlit Great Hall of Chinon. Joan walked straight past the decoy throne and knelt before the real Dauphin!',
    saintQuote:
      '“Gentle Dauphin, my name is Joan the Maid; the King of Heaven sends you word through me that you shall be anointed and crowned in the city of Reims.”',
    globePlacement: {
      latDeg: 47.16,
      lngDeg: 0.24,
      regionLabel: 'Vienne & Loire Valley, Touraine, Central-Western France',
      beaconColorHex: '#10B981',
      labelOffsetPx: [-72, 24],
    },
    detectiveCaseTitle: 'Case #3 · The Loire Valley Fortress Where She Picked Out the Hidden Prince',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Loire Valley river fortress where Joan met the uncrowned Dauphin Charles after an 11-day ride.',
    detectiveClues: [
      {
        id: 'j3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Cliff-Top Royal Castle Town on the Vienne River in the Loire Valley',
        clueText:
          'Look to the famous châteaux region of the Loire Valley in central-western France, southwest of Tours. Stretching 400 meters along a white limestone spur above the Vienne River stands a three-castle royal fortress.',
        soundCue: 'compass_click',
      },
      {
        id: 'j3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Torchlit Decoy Throne Test & The Secret Sign Whispered to the Prince',
        clueText:
          'In the Great Hall here on the evening of March 8, 1429, surrounded by 50 torches and 300 courtiers, Joan bypassed a richly dressed decoy on the throne, went straight to the disguised Dauphin Charles, and whispered a secret prayer only he knew!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j3-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Housed in the Tower of Coudray & The Sword of Sainte-Catherine-de-Fierbois',
        clueText:
          'After an 11-day ride from Vaucouleurs, Joan lodged in the keep of Coudray inside this fortress and directed messengers to unearth an ancient sword with five crosses buried behind the altar of nearby Fierbois.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The central royal palace ruins and gable wall atop the limestone cliff.',
        hintDirection: 'Click marker #1 on the central palace wall of the fortress.',
        foundTitle: 'What Happened Here: Recognizing the Disguised Dauphin (March 1429)',
        xPercent: 48,
        yPercent: 34,
        hitRadius: 14,
        storyUnlocked:
          'In the Great Hall of Chinon Castle on the evening of March 8, 1429, 17-year-old Joan walked past the richly dressed decoy on the throne and knelt directly before the disguised Dauphin Charles, assuring him that he was the true heir to the throne and would be crowned at Reims.',
        stoneKeyWord: 'RECOGNIZED AT CHINON (1429)',
        stoneKeyMeaning: 'Where Joan recognized the disguised Dauphin Charles among 300 courtiers',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The tall, slender Clock Tower (Tour de l’Horloge) rising on the right.',
        hintDirection: 'Click marker #2 on the tall clock tower on the right of the fortress.',
        foundTitle: 'Did You Know? The Tower of Coudray & The Buried Sword of Fierbois',
        xPercent: 72,
        yPercent: 32,
        hitRadius: 14,
        storyUnlocked:
          'While lodged in the circular Tower of Coudray inside Chinon Fortress, Joan told the Dauphin’s armorers to dig behind the altar of the Chapel of St. Catherine of Fierbois a few miles away—where they unearthed an ancient sword stamped with five crosses whose rust fell off at a single touch!',
        stoneKeyWord: 'SWORD OF FIERBOIS',
        stoneKeyMeaning: 'The ancient five-cross sword unearthed near Chinon at Joan’s direction',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The tranquil Vienne River reflecting the golden limestone fortress.',
        hintDirection: 'Click marker #3 on the river reflection in the foreground.',
        foundTitle: 'Where Is It Modern Day Now? Royal Fortress of Chinon, Loire Valley, France',
        xPercent: 52,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Today in Chinon (Indre-et-Loire, Loire Valley, France), visitors can climb the Tower of Coudray where Joan stayed, stand beside the second-floor fireplace of the Great Hall, and hear the 1399 Marie Javelle bell in the Clock Tower.',
        stoneKeyWord: 'CHINON, LOIRE VALLEY, FRANCE',
        stoneKeyMeaning: 'The restored royal fortress on the Vienne River in the Loire Valley today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Torchlit Test',
        questionPrompt: 'How did the royal court at Chinon test Joan when she entered the Great Hall?',
        correctStoneId: 'j3-art-1',
      },
      {
        slotLabel: 'Lock II · The Five Crosses',
        questionPrompt: 'Where did Joan instruct messengers from Chinon to dig to find her ancient sword?',
        correctStoneId: 'j3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Above which river in the Loire Valley does the Royal Fortress of Chinon stand today?',
        correctStoneId: 'j3-art-3',
      },
    ],
    sealName: 'Seal of Chinon',
  },
  {
    stopNumber: 4,
    title: 'The White Banner & The Lifting of the Siege',
    subtitle: 'Examine Sainte-Croix Cathedral and the equestrian statue in Orléans',
    eraLabel: 'April 29 – May 8, 1429 AD · The Maid of Orléans',
    ancientPlaceName: 'Aurelianum (Sainte-Croix d’Orléans)',
    modernPlaceName: 'Orléans',
    modernCountry: 'France',
    image: '/images/trails/joan_step4_orleans.jpg',
    imageCaption:
      'Twin-towered Gothic Cathedral of Sainte-Croix and the bronze equestrian statue of St. Joan of Arc in Orléans, France.',
    whatYouCanSeeToday:
      'Today in Orléans (on the northern bend of the Loire River, 120 km south of Paris, France), visitors marvel at the stained-glass windows of Sainte-Croix Cathedral depicting Joan’s life, visit the Maison de Jeanne d’Arc (the half-timbered house of treasurer Jacques Boucher where she stayed), and stand in Place du Martroi.',
    didYouKnowHighlight:
      'Although a seven-month siege had brought Orléans to the brink of surrender, 17-year-old Joan lifted the entire siege in just nine days (April 29 – May 8, 1429)! At her trial she explained why she carried her white linen banner into battle: "I loved my banner forty times better than my sword, so that I would never kill anyone!"',
    saintQuote:
      '“In God’s name, let us go on boldly! Enter among them—all is yours!”',
    globePlacement: {
      latDeg: 47.9,
      lngDeg: 1.9,
      regionLabel: 'Northern Bend of the Loire River, Centre-Val de Loire, France',
      beaconColorHex: '#Facc15',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #4 · The Loire Stronghold Freed in Nine Days Under a White Banner',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the strategic Loire River city whose seven-month siege Joan broke in May 1429.',
    detectiveClues: [
      {
        id: 'j4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Capital of the Centre-Val de Loire Region at the Northernmost Bend of the Loire',
        clueText:
          'Look 120 km south of Paris where the mighty Loire River curves farthest north. Because of her victory here in May 1429, Joan is universally known as the "Maid of [This City]."',
        soundCue: 'compass_click',
      },
      {
        id: 'j4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Europe’s Oldest Civic Festival Celebrated Every May 8 Since 1429!',
        clueText:
          'Every single year since May 8, 1429—for nearly 600 years—this city has celebrated the Fêtes Johanniques, choosing a local high-school girl to ride in full armor to Sainte-Croix Cathedral!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j4-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Storming the Tourelles Fortress & Praying at Sainte-Croix (May 1429)',
        clueText:
          'Entering the besieged city by boat at night with supply wagons on April 29, 1429, Joan rallied the defenders—even after taking an arrow above her collarbone at the Tourelles—and broke the siege in nine days.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The bronze equestrian statue of Joan raising her banner in the square.',
        hintDirection: 'Click marker #1 on the statue of Joan on horseback.',
        foundTitle: 'What Happened Here: Lifting the Siege in Nine Days (April 29 – May 8, 1429)',
        xPercent: 55,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Carrying her white linen banner inscribed "Jhesus Maria," 17-year-old Joan entered besieged Orléans on April 29, 1429. On May 7, despite being wounded by a crossbow bolt between her neck and shoulder, she returned to the ditch at sunset to lead the final charge that captured the Tourelles fortress, ending the siege the next morning!',
        stoneKeyWord: 'SIEGE LIFTED IN NINE DAYS',
        stoneKeyMeaning: 'How Joan liberated Orléans between April 29 and May 8, 1429',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The three carved Gothic rose windows on the facade of Sainte-Croix Cathedral.',
        hintDirection: 'Click marker #2 on the rose windows of the cathedral.',
        foundTitle: 'Did You Know? Why She Carried a Banner Forty Times More Often Than a Sword',
        xPercent: 32,
        yPercent: 54,
        hitRadius: 14,
        storyUnlocked:
          'On the evening of May 2 and again after victory on May 8, 1429, Joan attended solemn thanksgiving prayers inside Sainte-Croix Cathedral while citizens crowded around to touch her white banner—which she carried in hand so she would never strike down any person with a sword!',
        stoneKeyWord: 'BANNER OF JHESUS MARIA',
        stoneKeyMeaning: 'Joan carried her white banner instead of striking with a sword',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The twin carved limestone crown towers of Sainte-Croix Cathedral.',
        hintDirection: 'Click marker #3 on the twin upper towers of the cathedral.',
        foundTitle: 'Where Is It Modern Day Now? Orléans, Loiret, Centre-Val de Loire, France',
        xPercent: 32,
        yPercent: 24,
        hitRadius: 14,
        storyUnlocked:
          'Today in Orléans, France (one hour south of Paris by train), Sainte-Croix Cathedral, Place du Martroi, and the Maison de Jeanne d’Arc host the UNESCO-recognized Fêtes de Jeanne d’Arc every first week of May.',
        stoneKeyWord: 'ORLÉANS, LOIRET, FRANCE',
        stoneKeyMeaning: 'The Loire River city liberated by Joan in May 1429',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Nine Days in May',
        questionPrompt: 'How many days after Joan entered Orléans was the seven-month siege lifted?',
        correctStoneId: 'j4-art-1',
      },
      {
        slotLabel: 'Lock II · The White Standard',
        questionPrompt: 'Why did Joan say she loved her white banner forty times better than her sword?',
        correctStoneId: 'j4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which cathedral in Orléans features stained-glass windows of Joan’s 1429 victory?',
        correctStoneId: 'j4-art-3',
      },
    ],
    sealName: 'Seal of Orléans',
  },
  {
    stopNumber: 5,
    title: 'The Coronation Cathedral & The Banner Beside the Altar',
    subtitle: 'Marvel at the Gothic facade of Notre-Dame de Reims Cathedral',
    eraLabel: 'July 17, 1429 AD · Coronation of King Charles VII',
    ancientPlaceName: 'Durocortorum (Notre-Dame de Reims)',
    modernPlaceName: 'Reims',
    modernCountry: 'France',
    image: '/images/trails/joan_step5_reims.jpg',
    imageCaption:
      'Gothic facade and rose window of Notre-Dame de Reims Cathedral with the equestrian statue of St. Joan of Arc in Reims, Champagne, France.',
    whatYouCanSeeToday:
      'Today in Reims (130 km northeast of Paris in the Champagne region of France), visitors enter the UNESCO Gothic masterpiece of Notre-Dame de Reims Cathedral—where 33 French kings were crowned—to stand on the choir stones where Joan wept with joy beside newly anointed King Charles VII on July 17, 1429.',
    didYouKnowHighlight:
      'When asked after the five-hour coronation ceremony in Reims Cathedral why her white banner had been given the place of honor right beside the King at the altar, Joan gave one of the most famous replies in history: "It had borne the burden; it earned the honor!" ("Il avait été à la peine, c’était bien raison qu’il fût à l’honneur!")',
    saintQuote:
      '“Gentle King, now is fulfilled the pleasure of God, who willed that I should lift the siege of Orléans and bring you to this city of Reims to receive your holy coronation!”',
    globePlacement: {
      latDeg: 49.25,
      lngDeg: 4.03,
      regionLabel: 'Champagne Plains, Marne, Grand Est, Northeastern France',
      beaconColorHex: '#EC4899',
      labelOffsetPx: [66, -24],
    },
    detectiveCaseTitle: 'Case #5 · The Gothic Coronation Cathedral of the Kings of France',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the Champagne cathedral city where Joan fulfilled her promise by crowning King Charles VII.',
    detectiveClues: [
      {
        id: 'j5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Heart of the Champagne Region 130 km Northeast of Paris',
        clueText:
          'Look northeast of Paris in the Marne department of France. Famous worldwide for its sparkling wine caves and its soaring 13th-century Gothic cathedral adorned with 2,303 carved stone statues including the "Smiling Angel."',
        soundCue: 'compass_click',
      },
      {
        id: 'j5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '"It Had Borne the Burden; It Earned the Honor!"',
        clueText:
          'Since Clovis was baptized here in 496 AD, 33 French monarchs were anointed in this cathedral—and during the July 17, 1429 coronation, Joan’s father Jacques d’Arc traveled from Domrémy to watch his daughter stand beside the altar!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j5-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Fulfilling the Prophecy of Chinon on Sunday, July 17, 1429',
        clueText:
          'Leading a peaceful royal march through cities that opened their gates without a fight, Joan stood holding her banner in the choir here as Charles VII was anointed with oil from the Holy Ampulla.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The great Gothic rose window and Gallery of Kings on the cathedral facade.',
        hintDirection: 'Click marker #1 on the central rose window of the cathedral.',
        foundTitle: 'What Happened Here: Coronation of King Charles VII (July 17, 1429)',
        xPercent: 48,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'On Sunday, July 17, 1429, inside Notre-Dame de Reims Cathedral, the prophecy Joan had spoken four months earlier at Chinon came true: Charles VII was solemnly anointed and crowned King of France while Joan knelt weeping with joy and embracing his knees.',
        stoneKeyWord: 'CORONATION AT REIMS (1429)',
        stoneKeyMeaning: 'Where King Charles VII was crowned on July 17, 1429 with Joan standing beside the altar',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The bronze statue of Joan on horseback holding her banner on the right.',
        hintDirection: 'Click marker #2 on the equestrian statue of Joan on the right.',
        foundTitle: 'Did You Know? "It Had Borne the Burden; It Earned the Honor!"',
        xPercent: 77,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'When judges later asked Joan why her white banner was carried into Reims Cathedral ahead of all the other captains’ standards, she replied with immortal words NOW carved on monuments across France: "It had borne the burden; it was only right that it should share the honor!"',
        stoneKeyWord: 'BORNE THE BURDEN, EARNED THE HONOR',
        stoneKeyMeaning: 'Joan’s famous explanation for why her banner stood beside the altar at Reims',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The triple sculpted Gothic portals at the base of the cathedral.',
        hintDirection: 'Click marker #3 on the triple stone portals of the cathedral entrance.',
        foundTitle: 'Where Is It Modern Day Now? Notre-Dame de Reims Cathedral, Reims, France',
        xPercent: 48,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Today in Reims (Grand Est, France, 45 minutes from Paris by high-speed TGV), the UNESCO Reims Cathedral and adjacent Palace of Tau display coronation treasures alongside radiant modern stained glass by Marc Chagall.',
        stoneKeyWord: 'REIMS CATHEDRAL, FRANCE',
        stoneKeyMeaning: 'The UNESCO Gothic coronation cathedral of France in Reims today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Anointing of the King',
        questionPrompt: 'What historic event took place inside Reims Cathedral on Sunday, July 17, 1429?',
        correctStoneId: 'j5-art-1',
      },
      {
        slotLabel: 'Lock II · Place of Honor',
        questionPrompt: 'Why did Joan say her banner deserved to stand beside the altar at Reims Cathedral?',
        correctStoneId: 'j5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Champagne city does the Gothic Coronation Cathedral of France stand today?',
        correctStoneId: 'j5-art-3',
      },
    ],
    sealName: 'Seal of Reims',
  },
  {
    stopNumber: 6,
    title: 'The Cross Held High & The Rehabilitation of the Maid',
    subtitle: 'Explore the Place du Vieux-Marché and Memorial Cross in Rouen',
    eraLabel: 'May 30, 1431 & July 7, 1456 AD · Martyrdom & Vindication',
    ancientPlaceName: 'Rotomagus (Place du Vieux-Marché)',
    modernPlaceName: 'Rouen',
    modernCountry: 'France',
    image: '/images/trails/joan_step6_rouen.jpg',
    imageCaption:
      'Tall stone Memorial Cross and the boat-roofed Church of Sainte-Jeanne-d’Arc in the half-timbered Place du Vieux-Marché in Rouen, Normandy, France.',
    whatYouCanSeeToday:
      'Today in Rouen (capital of Normandy on the lower Seine River in northwestern France), visitors stand in the medieval half-timbered Place du Vieux-Marché beside the 20-meter National Memorial Cross, enter the sweeping Church of Sainte-Jeanne-d’Arc, and visit the Archbishop’s Palace ("Historial Jeanne d’Arc") where her 1456 Nullification Trial declared her innocent.',
    didYouKnowHighlight:
      'Every single word 19-year-old Joan spoke during her 1431 trial in Rouen was recorded verbatim by three court notaries—making Joan of Arc the most thoroughly documented person of the entire Middle Ages! Twenty-five years later in the same Archbishop’s Palace in Rouen (July 7, 1456), 115 witnesses testified and the Inquisitor General solemnly annulled her conviction!',
    saintQuote:
      '“Hold the cross high so that I may see it through the flames! … Jesus, Jesus!”',
    globePlacement: {
      latDeg: 49.44,
      lngDeg: 1.09,
      regionLabel: 'Lower Seine Valley, Normandy, Northwestern France',
      beaconColorHex: '#A855F7',
      labelOffsetPx: [-72, -26],
    },
    detectiveCaseTitle: 'Case #6 · The Norman Market Square & The Cross Seen Through the Flames',
    detectiveLeadPrompt:
      'Read the 3 clues below, then spin the 3D Globe to the historic capital of Normandy on the Seine where Joan gave her final witness and was vindicated 25 years later.',
    detectiveClues: [
      {
        id: 'j6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'The Historic Half-Timbered Capital of Normandy on the Lower Seine River',
        clueText:
          'Look northwest of Paris along the winding Seine River toward the English Channel. Known as the "City of a Hundred Spires," its medieval Old Market Square (Place du Vieux-Marché) is framed by half-timbered Norman houses.',
        soundCue: 'compass_click',
      },
      {
        id: 'j6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Church Roof Shaped Like an Overturned Longship & Flames Rising',
        clueText:
          'Rising directly beside the 20-meter Memorial Cross in this city’s Old Market Square is a striking church whose slate roof curves like both a Norman Viking ship hull and flames, illuminated inside by 13 giant Renaissance stained-glass windows!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j6-saint',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '"Hold the Cross High So I May See It!" (May 30, 1431)',
        clueText:
          'Tried here at age 19, she baffled 60 learned judges ("If I am not in God’s grace, may God put me there; if I am, may God keep me there") and fixed her eyes on a parish cross held high by Brother Isambart de la Pierre.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 'j6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The tall stone Memorial Cross rising in the right-center of the square.',
        hintDirection: 'Click marker #1 on the tall stone cross monument.',
        foundTitle: 'What Happened Here: The Cross Held High (May 30, 1431)',
        xPercent: 64,
        yPercent: 42,
        hitRadius: 14,
        storyUnlocked:
          'Standing at the exact spot marked by this 20-meter stone cross in Rouen’s Place du Vieux-Marché on May 30, 1431, 19-year-old Joan forgave her accusers, asked Dominican friar Isambart de la Pierre to hold the parish cross high so she could see it, and breathed her last whispering "Jesus!"',
        stoneKeyWord: 'CROSS OF PLACE DU VIEUX-MARCHÉ',
        stoneKeyMeaning: 'The exact site in Rouen where 19-year-old Joan gave her life on May 30, 1431',
        soundCue: 'relic_discovered',
      },
      {
        id: 'j6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The sweeping slate roof of the Church of Sainte-Jeanne-d’Arc in the center.',
        hintDirection: 'Click marker #2 on the dramatic curved slate roof of the church.',
        foundTitle: 'Did You Know? The 1456 Rehabilitation Trial & 16th-Century Stained Glass',
        xPercent: 44,
        yPercent: 48,
        hitRadius: 14,
        storyUnlocked:
          'When Allied bombings hit Rouen in 1944, parishioners had already hidden the 13 magnificent 16th-century stained-glass windows of the destroyed Church of Saint-Vincent—and today those exact 500-year-old windows glow inside this boat-shaped Church of Sainte-Jeanne-d’Arc!',
        stoneKeyWord: 'VINDICATED IN ROUEN (1456)',
        stoneKeyMeaning: 'Where Joan was solemnly declared innocent in 1456 and honored with a national sanctuary',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'j6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The historic half-timbered Norman facades framing the market square.',
        hintDirection: 'Click marker #3 on the half-timbered houses on the left.',
        foundTitle: 'Where Is It Modern Day Now? Place du Vieux-Marché, Rouen, Normandy, France',
        xPercent: 16,
        yPercent: 54,
        hitRadius: 14,
        storyUnlocked:
          'Today in Rouen, Normandy, France, pilgrims visit the Place du Vieux-Marché, the medieval Tour Jeanne d’Arc keep, and the Archbishop’s Palace (Historial Jeanne d’Arc) where her conviction was overturned in 1456 before her 1920 canonization.',
        stoneKeyWord: 'ROUEN, NORMANDY, FRANCE',
        stoneKeyMeaning: 'The Norman capital on the Seine where the Church of Sainte-Jeanne-d’Arc stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Final Request',
        questionPrompt: 'What did 19-year-old Joan ask Brother Isambart de la Pierre to hold high in Rouen’s market square?',
        correctStoneId: 'j6-art-1',
      },
      {
        slotLabel: 'Lock II · Solemn Vindication',
        questionPrompt: 'What happened in the Archbishop’s Palace of Rouen 25 years later on July 7, 1456?',
        correctStoneId: 'j6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Norman capital city does the Place du Vieux-Marché and Church of Sainte-Jeanne-d’Arc stand?',
        correctStoneId: 'j6-art-3',
      },
    ],
    sealName: 'Seal of Rouen',
  },
];
