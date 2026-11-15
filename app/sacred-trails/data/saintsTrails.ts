export interface HiddenSceneArtifact {
  id: string;
  orderNumber: 1 | 2 | 3;
  category: 'What Happened Here' | 'Where Is It Today?' | 'Did You Know?';
  riddleToFind: string;
  hintDirection: string;
  foundTitle: string;
  xPercent: number;
  yPercent: number;
  hitRadius: number; // Percentage radius for finding the hidden spot
  storyUnlocked: string;
  stoneKeyWord: string;
  stoneKeyMeaning: string;
  soundCue: 'relic_discovered' | 'sanctuary_bell' | 'gregorian_chime';
}

export interface VaultSequencePrompt {
  slotLabel: string;
  questionPrompt: string;
  correctStoneId: string;
}

export interface DetectiveClueCard {
  id: string;
  clueNumber: 1 | 2 | 3;
  badgeLabel: 'Modern-Day City Clue' | 'Did You Know? Fun Fact' | 'Saint’s Life Clue';
  headline: string;
  clueText: string;
  soundCue: 'compass_click' | 'gregorian_chime' | 'relic_discovered';
}

export interface GlobePlacement {
  /** Internal 3D globe spherical angle — never rendered as raw coordinate text */
  latDeg: number;
  /** Internal 3D globe spherical angle — never rendered as raw coordinate text */
  lngDeg: number;
  regionLabel: string;
  beaconColorHex: string;
  labelOffsetPx?: [number, number];
}

export type SaintId = 'augustine' | 'thomas';

export interface SaintTrailProfile {
  id: SaintId;
  saintName: string;
  shortTitle: string;
  feastDay: string;
  eraSpan: string;
  trailSubtitle: string;
  overviewButtonLabel: string;
  globeHeaderSubtitle: string;
  overviewCamera: {
    camLat: number;
    camLng: number;
    camAltitude: number;
    lookLat: number;
    lookLng: number;
    lookRadiusScale: number;
  };
  highlightedIsoCountries: string[];
  completionSummary: string;
  stops: TrailStop[];
}

export interface TrailStop {
  stopNumber: number;
  title: string;
  subtitle: string;
  eraLabel: string;
  ancientPlaceName: string;
  modernPlaceName: string;
  modernCountry: string;
  image: string;
  imageCaption: string;
  whatYouCanSeeToday: string;
  didYouKnowHighlight: string;
  saintQuote: string;
  hiddenArtifacts: [HiddenSceneArtifact, HiddenSceneArtifact, HiddenSceneArtifact];
  vaultPrompts: [VaultSequencePrompt, VaultSequencePrompt, VaultSequencePrompt];
  sealName: string;
  globePlacement: GlobePlacement;
  detectiveCaseTitle: string;
  detectiveLeadPrompt: string;
  detectiveClues: [DetectiveClueCard, DetectiveClueCard, DetectiveClueCard];
}

export const ST_AUGUSTINE_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Restless Youth & The Olive Tree',
    subtitle: 'Sweep your lantern across ancient Thagaste to uncover 3 hidden memories',
    eraLabel: 'Age 1 to 16 · Childhood & Youth',
    ancientPlaceName: 'Thagaste',
    modernPlaceName: 'Souk Ahras',
    modernCountry: 'Algeria',
    image: '/images/trails/augustine_step1_thagaste_olive_1794701798229.jpg',
    imageCaption: 'Hillside of Souk Ahras, Algeria (ancient Thagaste), where the living Olive Tree of St. Augustine still stands.',
    whatYouCanSeeToday:
      'Today, ancient Thagaste is the Algerian mountain town of Souk Ahras. On a quiet hill overlooking the town, pilgrims still visit the living "Olive Tree of St. Augustine" (El-Zitouna), where tradition holds he sat in contemplation.',
    didYouKnowHighlight:
      'In Book II of his Confessions, Augustine famously confessed to stealing pears from a neighbor’s tree at age 16—not because he was hungry, since he threw the fruit to pigs, but purely for the thrill of doing wrong with his friends.',
    saintQuote:
      '“You have made us for Yourself, O Lord, and our heart is restless until it rests in You.”',
    globePlacement: {
      latDeg: 36.15,
      lngDeg: 7.95,
      regionLabel: 'Atlas Highlands, Northeastern Algeria',
      beaconColorHex: '#D4AF37',
      labelOffsetPx: [-64, 28],
    },
    detectiveCaseTitle: 'Case #1 · The Mountain Town of the Thousand-Year Olive Tree',
    detectiveLeadPrompt:
      'Read the 3 detective clues below, then spin and zoom into the matching modern-day city on the 3D Globe where St. Augustine’s journey began.',
    detectiveClues: [
      {
        id: 'c1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'An Inland Mountain Town in Northeastern Algeria',
        clueText:
          'In Roman times this town was called Thagaste. Today it is an inland mountain city in northeastern Algeria near the Tunisian border, where locals still protect a living 1,000-year-old olive tree ("Zitouna Saint Augustin") on a hillside overlooking the town.',
        soundCue: 'compass_click',
      },
      {
        id: 'c1-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Confessed Midnight Pear Heist',
        clueText:
          'At age 16 in this town, young Augustine and his friends shook down a huge load of pears from a neighbor’s orchard at night—not to eat them (they threw them to hogs!), but strictly for the thrill of doing what was forbidden.',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c1-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Born Here in 354 AD to St. Monica & Patricius',
        clueText:
          'Many people don’t realize St. Augustine was North African! He was born in this Algerian hillside town in 354 AD, and returned here in 388 AD after his baptism to establish his very first monastery.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's1-art-1',
        orderNumber: 1,
        category: 'Did You Know?',
        riddleToFind: 'Search the upper left branches where the golden morning sunburst pierces directly through the leaves.',
        hintDirection: 'Look near the bright sunstar shining through the upper-left olive branches.',
        foundTitle: 'The Sunburst of Grace & The Pear Tree Confession',
        xPercent: 27,
        yPercent: 17,
        hitRadius: 13,
        storyUnlocked:
          'Did You Know? At age 16 in Thagaste, Augustine stole pears from a neighbor’s orchard at night—not to eat them (he threw them to pigs!), but simply for the thrill of rebellion. Yet a bishop consoled his weeping mother St. Monica: "It is impossible that the son of so many tears should perish."',
        stoneKeyWord: 'SOUK AHRAS, ALGERIA',
        stoneKeyMeaning: 'Modern-day town where ancient Thagaste stands today',
        soundCue: 'gregorian_chime',
      },
      {
        id: 's1-art-2',
        orderNumber: 2,
        category: 'What Happened Here',
        riddleToFind: 'Find the deep twisted hollows in the center of the ancient gnarled tree trunk.',
        hintDirection: 'Move your lantern to the middle of the thick twisted tree trunk on the left.',
        foundTitle: 'The Thousand-Year Olive Tree of St. Augustine',
        xPercent: 31,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'Born here in 354 AD to St. Monica and Patricius, Augustine returned to this very hillside in 388 AD after his conversion to form his first monastic community. Locals still revere this living olive tree ("Zitouna Saint Augustin") as his spot of prayer!',
        stoneKeyWord: 'THE STOLEN PEARS',
        stoneKeyMeaning: 'His boyhood prank in Confessions Book II that taught him how pride deceives the heart',
        soundCue: 'relic_discovered',
      },
      {
        id: 's1-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'Follow the ancient dry-stone wall winding toward the distant mountain ridge on the right.',
        hintDirection: 'Sweep your lantern along the stone wall on the right side of the hillside.',
        foundTitle: 'Where Is It Modern Day Now? Souk Ahras, Algeria',
        xPercent: 76,
        yPercent: 64,
        hitRadius: 14,
        storyUnlocked:
          'Many people don’t realize St. Augustine was North African of Berber-Roman heritage! Ancient Thagaste is today the mountain city of Souk Ahras in northeastern Algeria, 60 km west of the Tunisian border.',
        stoneKeyWord: 'ST. MONICA’S TEARS',
        stoneKeyMeaning: 'His mother’s 17-year vigil of prayer that followed him from Thagaste',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · What He Confessed Here',
        questionPrompt: 'Which stone tablet names the boyhood mistake in Thagaste that Augustine confessed in Book II?',
        correctStoneId: 's1-art-2',
      },
      {
        slotLabel: 'Lock II · Who Prayed for Him',
        questionPrompt: 'Which stone tablet recalls the mother whose prayers never gave up on him?',
        correctStoneId: 's1-art-3',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which stone tablet names the modern-day Algerian city where Thagaste and his Olive Tree stand today?',
        correctStoneId: 's1-art-1',
      },
    ],
    sealName: 'Seal of Thagaste',
  },
  {
    stopNumber: 2,
    title: 'The Spark of Wisdom by the Sea',
    subtitle: 'Search the sunset harbor of Carthage to uncover 3 hidden clues',
    eraLabel: 'Age 17 to 28 · Student & Teacher',
    ancientPlaceName: 'Carthage',
    modernPlaceName: 'Tunis',
    modernCountry: 'Tunisia',
    image: '/images/trails/augustine_step2_carthage_harbor_1794701799619.jpg',
    imageCaption: 'Roman harbor columns of ancient Carthage on the Mediterranean coast of modern Tunis, Tunisia.',
    whatYouCanSeeToday:
      'Today, ancient Carthage is a scenic coastal suburb of Tunis, the capital of Tunisia. You can walk beside the Roman Antonine Baths, the seaside columns, and the amphitheater where early Christian martyrs gave their lives.',
    didYouKnowHighlight:
      'When Augustine decided to sail secretly from Carthage to Rome in 383 AD, St. Monica followed him to the harbor. He tricked her into praying overnight inside a seaside chapel dedicated to St. Cyprian—and sailed away while she was praying!',
    saintQuote:
      '“Suddenly every vain hope became worthless to me, and I yearned with an incredible warmth of heart for the immortality of wisdom.”',
    globePlacement: {
      latDeg: 36.85,
      lngDeg: 10.32,
      regionLabel: 'Gulf of Tunis Coast, Tunisia',
      beaconColorHex: '#E09F3E',
      labelOffsetPx: [66, 8],
    },
    detectiveCaseTitle: 'Case #2 · The Harbor of the Midnight Escape',
    detectiveLeadPrompt:
      'Where did 19-year-old Augustine discover Cicero’s scroll and later slip aboard a ship at night while St. Monica prayed? Zoom into this coastal capital on the 3D Globe.',
    detectiveClues: [
      {
        id: 'c2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Coastal Suburb of Tunisia’s Modern Capital',
        clueText:
          'Once Rome’s greatest North African rival port (Carthage), its seaside marble columns and Roman Antonine Baths now sit just 25 minutes by commuter train from the heart of Tunisia’s modern capital city.',
        soundCue: 'compass_click',
      },
      {
        id: 'c2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'He Sailed Away While His Mother Prayed in a Chapel!',
        clueText:
          'In 383 AD, St. Monica followed Augustine to the docks here, begging him not to sail to Italy. He convinced her to spend the night praying inside the seaside Chapel of St. Cyprian—and secretly boarded the ship before dawn!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c2-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Cicero’s Lost Scroll “Hortensius” Awakened His Soul',
        clueText:
          'Studying rhetoric here at age 19, Augustine read a lost philosophical dialogue by Cicero called Hortensius. Instantly, his shallow ambition for fame turned into an unquenchable search for eternal Truth.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Search the foreground stone bench by the waves where an unrolled Latin parchment scroll is lying.',
        hintDirection: 'Look at the stone table in the lower-right foreground.',
        foundTitle: 'Cicero’s Lost Scroll “Hortensius” (Age 19)',
        xPercent: 63,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Sent to Carthage at age 17 to study rhetoric, 19-year-old Augustine unrolled a philosophical scroll by Cicero called Hortensius. Instantly, his ambition for wealth and flattery turned into a burning hunger for eternal Wisdom.',
        stoneKeyWord: 'CICERO’S HORTENSIUS',
        stoneKeyMeaning: 'The scroll in Carthage that awakened 19-year-old Augustine’s love for Wisdom',
        soundCue: 'relic_discovered',
      },
      {
        id: 's2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'Spot the wooden boats bobbing in the harbor cove where Augustine slipped away at night.',
        hintDirection: 'Shine your lantern on the small wooden boats floating in the water near the center-right.',
        foundTitle: 'Did You Know? His Midnight Escape from St. Monica!',
        xPercent: 66,
        yPercent: 50,
        hitRadius: 14,
        storyUnlocked:
          'When Augustine decided to sail from Carthage to Italy in 383 AD, St. Monica begged him not to go. He persuaded her to spend the night praying in the seaside Chapel of St. Cyprian—and secretly boarded the ship while she was praying! Little did either know that Italy was where God would convert him.',
        stoneKeyWord: 'TUNIS, TUNISIA',
        stoneKeyMeaning: 'The modern capital city where the coastal ruins of Carthage stand today',
        soundCue: 'gregorian_chime',
      },
      {
        id: 's2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'Illuminate the tall Corinthian marble columns towering above the ancient seaside walkway.',
        hintDirection: 'Move your lantern to the tall marble columns on the left side of the harbor.',
        foundTitle: 'Where Is It Modern Day Now? Tunis, Tunisia',
        xPercent: 22,
        yPercent: 36,
        hitRadius: 15,
        storyUnlocked:
          'Today, ancient Carthage is an archaeological coastal suburb of Tunis, the capital of Tunisia. A 25-minute train ride from downtown Tunis brings pilgrims right to these Mediterranean columns and the Antonine Baths.',
        stoneKeyWord: 'CHAPEL OF ST. CYPRIAN',
        stoneKeyMeaning: 'Where St. Monica prayed overnight while Augustine’s ship set sail for Italy',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Scroll of Awakening',
        questionPrompt: 'Which stone tablet names the scroll that sparked Augustine’s thirst for Wisdom at age 19?',
        correctStoneId: 's2-art-1',
      },
      {
        slotLabel: 'Lock II · The Midnight Harbor Escape',
        questionPrompt: 'Where did St. Monica pray overnight while Augustine secretly boarded the ship for Italy?',
        correctStoneId: 's2-art-3',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which modern capital city encompasses the seaside ruins of ancient Carthage today?',
        correctStoneId: 's2-art-2',
      },
    ],
    sealName: 'Seal of Carthage',
  },
  {
    stopNumber: 3,
    title: '“Take Up and Read” in the Garden',
    subtitle: 'Hunt through the cloister garden of Milan to uncover 3 turning points',
    eraLabel: 'Age 31 to 32 · Conversion & Baptism',
    ancientPlaceName: 'Mediolanum',
    modernPlaceName: 'Milan',
    modernCountry: 'Italy',
    image: '/images/trails/augustine_milan_garden_1794700012100.jpg',
    imageCaption: 'Cloister garden and octagonal brick baptistery of ancient Mediolanum in modern-day Milan, Italy.',
    whatYouCanSeeToday:
      'In modern-day Milan, Italy, you can go down the stairs beneath the front square of the famous Milan Cathedral (Duomo di Milano) and stand beside the actual 8-sided brick pool where St. Ambrose baptized St. Augustine at Easter in 387 AD!',
    didYouKnowHighlight:
      'When Augustine walked into Bishop Ambrose’s study in Milan, he was stunned to see Ambrose reading a book without moving his lips or making a sound—one of the earliest recorded descriptions of silent reading in human history!',
    saintQuote:
      '“Late have I loved You, O Beauty ever ancient, ever new, late have I loved You!”',
    globePlacement: {
      latDeg: 45.55,
      lngDeg: 9.19,
      regionLabel: 'Lombardy Plains, Northern Italy',
      beaconColorHex: '#52B788',
      labelOffsetPx: [-60, -24],
    },
    detectiveCaseTitle: 'Case #3 · The Garden Voice & The Hidden Pool Under the Cathedral',
    detectiveLeadPrompt:
      'Which northern Italian metropolis hides St. Augustine’s original 387 AD octagonal baptismal pool right underneath its famous main cathedral square?',
    detectiveClues: [
      {
        id: 'c3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Four Meters Underneath the Duomo Square in Northern Italy',
        clueText:
          'Known in Roman times as Mediolanum, this major northern Italian city is famous today for fashion and its white-marble Gothic Duomo. Right beneath the front steps of the Duomo lies the preserved 8-sided brick pool where Augustine was baptized!',
        soundCue: 'compass_click',
      },
      {
        id: 'c3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Bishop Who Read Without Moving His Lips!',
        clueText:
          'In the ancient world, manuscripts had no spaces between words, so everyone read out loud. When Augustine visited Bishop St. Ambrose here, he was astonished to watch Ambrose reading a book in complete silence without moving his tongue!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c3-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '“Tolle, Lege!” (“Take Up and Read!”) Under the Fig Tree',
        clueText:
          'Weeping in a garden here in August 386 AD, Augustine heard a child chanting "Tolle, lege!" ("Take up and read!"). Opening Romans 13:13, his heart was transformed, and St. Ambrose baptized him here at Easter Vigil 387 AD.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Find the open parchment book resting on the stone bench beneath the shade of the fig tree.',
        hintDirection: 'Shine your lantern on the open book on the stone bench in the lower center.',
        foundTitle: '“Tolle, Lege!” (“Take Up and Read!” — August 386 AD)',
        xPercent: 46,
        yPercent: 68,
        hitRadius: 14,
        storyUnlocked:
          'Weeping under a fig tree in his Milan garden, Augustine heard a child’s voice from a nearby house chanting "Tolle, lege! Tolle, lege!" ("Take up and read!"). Opening St. Paul’s Letter to the Romans (13:13–14), light flooded his heart and all doubt vanished.',
        stoneKeyWord: 'TOLLE, LEGE (TAKE & READ)',
        stoneKeyMeaning: 'The child’s chant in the Milan garden that led Augustine to open Romans 13:13',
        soundCue: 'relic_discovered',
      },
      {
        id: 's3-art-2',
        orderNumber: 2,
        category: 'Where Is It Today?',
        riddleToFind: 'Search the eight-sided red-brick baptistery building rising behind the garden courtyard.',
        hintDirection: 'Move your lantern to the octagonal brick building in the upper right.',
        foundTitle: 'Where Is It Modern Day Now? Underneath Milan’s Duomo!',
        xPercent: 68,
        yPercent: 28,
        hitRadius: 15,
        storyUnlocked:
          'On Easter Vigil (April 24–25, 387 AD), Bishop Ambrose baptized Augustine in the octagonal Baptistery of San Giovanni alle Fonti. Today in Milan, Italy, you can descend 4 meters beneath Piazza del Duomo to stand beside that exact 4th-century brick baptismal pool!',
        stoneKeyWord: 'BENEATH MILAN’S DUOMO',
        stoneKeyMeaning: 'Where the 378 AD octagonal baptismal pool of St. Ambrose still survives today',
        soundCue: 'sanctuary_bell',
      },
      {
        id: 's3-art-3',
        orderNumber: 3,
        category: 'Did You Know?',
        riddleToFind: 'Look along the shadowed stone pillars of the cloister walkway on the far left.',
        hintDirection: 'Sweep your lantern over the stone columns along the left portico.',
        foundTitle: 'Did You Know? St. Ambrose Reading Without Moving His Lips!',
        xPercent: 12,
        yPercent: 45,
        hitRadius: 14,
        storyUnlocked:
          'In antiquity, words were written without spaces, so almost everyone read aloud. In Confessions Book VI, Augustine recorded his amazement watching Bishop Ambrose read silently under this portico without making a sound!',
        stoneKeyWord: 'ST. AMBROSE OF MILAN',
        stoneKeyMeaning: 'The Bishop whose preaching and silent study guided Augustine to baptism',
        soundCue: 'gregorian_chime',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Voice Under the Fig Tree',
        questionPrompt: 'Which stone tablet holds the Latin words the child chanted in the garden of Milan?',
        correctStoneId: 's3-art-1',
      },
      {
        slotLabel: 'Lock II · The Bishop Who Baptized Him',
        questionPrompt: 'Which stone tablet names the Bishop of Milan who amazed Augustine by reading in silence and baptized him at Easter?',
        correctStoneId: 's3-art-3',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Where in modern-day Italy can pilgrims still visit the actual octagonal baptismal pool from 387 AD?',
        correctStoneId: 's3-art-2',
      },
    ],
    sealName: 'Seal of Milan',
  },
  {
    stopNumber: 4,
    title: 'The Window of Heaven with St. Monica',
    subtitle: 'Peer through the Roman arch in Ostia to uncover 3 hidden treasures',
    eraLabel: 'Age 33 · The Vision at Ostia',
    ancientPlaceName: 'Ostia Tiberina',
    modernPlaceName: 'Ostia Antica & Rome',
    modernCountry: 'Italy',
    image: '/images/trails/augustine_step4_ostia_window_1794701799589.jpg',
    imageCaption: 'Roman brick garden arch of Ostia Antica near Rome, where Augustine and St. Monica shared their vision of eternity.',
    whatYouCanSeeToday:
      'Today you can walk the ancient Roman streets of Ostia Antica (30 minutes from central Rome) to see St. Monica’s original marble tomb inscription at the Church of Sant’Aurea, and visit her tomb inside the Basilica of Sant’Agostino near Piazza Navona in Rome.',
    didYouKnowHighlight:
      'For 1,500 years, St. Monica’s ancient gravestone in Ostia was thought lost forever—until summer 1945, when two boys digging a hole for a soccer goalpost in the courtyard beside the Church of Sant’Aurea struck the original carved marble slab!',
    saintQuote:
      '“Lay this body anywhere; only remember me at the altar of the Lord, wherever you are.” — St. Monica',
    globePlacement: {
      latDeg: 41.78,
      lngDeg: 12.35,
      regionLabel: 'Tiber River Port & Rome, Central Italy',
      beaconColorHex: '#6495ED',
      labelOffsetPx: [70, -6],
    },
    detectiveCaseTitle: 'Case #4 · The 1945 Soccer Goalpost Miracle Near Rome',
    detectiveLeadPrompt:
      'Where did two boys digging a soccer goalpost in 1945 accidentally unearth St. Monica’s lost 5th-century marble gravestone? Locate this port of Rome on the 3D Globe.',
    detectiveClues: [
      {
        id: 'c4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Ancient Port 30 Minutes Outside Central Rome, Italy',
        clueText:
          'Located where the Tiber River meets the sea just 30 minutes from central Rome, this preserved Roman port town holds St. Monica’s original funerary slab at the Church of Sant’Aurea, while her tomb rests near Piazza Navona in Rome.',
        soundCue: 'compass_click',
      },
      {
        id: 'c4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Two Boys Digging a Soccer Post Found St. Monica’s Tombstone!',
        clueText:
          'Lost for 1,500 years, St. Monica’s ancient marble epitaph was miraculously rediscovered in the summer of 1945 when two boys digging a hole for a soccer goalpost in the church courtyard struck the carved Latin marble slab!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c4-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Mystical Vision at the Garden Window (387 AD)',
        clueText:
          'Waiting here for a ship back to Africa in autumn 387 AD, Augustine and St. Monica leaned inside a garden window and shared a mystical glimpse of heaven—just five days before Monica peacefully passed away at age 56.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Shine your lantern on the sunlit stone window ledge at the bottom of the brick arch.',
        hintDirection: 'Look right at the flat stone window sill in the bottom center.',
        foundTitle: 'The Vision at the Window in Ostia (Autumn 387 AD)',
        xPercent: 50,
        yPercent: 84,
        hitRadius: 14,
        storyUnlocked:
          'Leaning together inside this garden window at Ostia while awaiting a ship to Africa, Augustine and his mother St. Monica experienced a shared mystical glimpse of eternity. Monica told him her one earthly wish was fulfilled now that she saw him a Christian—and died peacefully five days later at age 56.',
        stoneKeyWord: 'THE WINDOW OF OSTIA',
        stoneKeyMeaning: 'Where mother and son shared a mystical glimpse of eternal Wisdom days before her passing',
        soundCue: 'relic_discovered',
      },
      {
        id: 's4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'Find the circular stone well-head standing in the middle of the courtyard garden.',
        hintDirection: 'Sweep your lantern to the round stone well in the left-center of the garden courtyard.',
        foundTitle: 'Did You Know? The 1945 Soccer Goalpost Discovery!',
        xPercent: 39,
        yPercent: 64,
        hitRadius: 13,
        storyUnlocked:
          'For 1,500 years, St. Monica’s original gravestone in Ostia was lost. Then in summer 1945, two boys digging a hole for a soccer goalpost in the courtyard beside the Church of Sant’Aurea struck a marble slab—unearthing her original 5th-century funerary inscription!',
        stoneKeyWord: '1945 SOCCER GOALPOST DIG',
        stoneKeyMeaning: 'How two boys in Ostia Antica accidentally unearthed St. Monica’s lost 5th-century gravestone',
        soundCue: 'gregorian_chime',
      },
      {
        id: 's4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'Locate the figure seated quietly on the stone bench beneath the tall green cypress trees.',
        hintDirection: 'Move your lantern to the bench beneath the tall cypress tree on the right side of the garden.',
        foundTitle: 'Where Is It Modern Day Now? Ostia Antica & Central Rome',
        xPercent: 60,
        yPercent: 65,
        hitRadius: 13,
        storyUnlocked:
          'Today you can see the rediscovered 1945 marble stone at the Church of Sant’Aurea in Ostia Antica (just outside Rome), and pray at St. Monica’s green marble tomb inside the Basilica of Sant’Agostino near Piazza Navona in central Rome!',
        stoneKeyWord: 'OSTIA ANTICA & ROME, ITALY',
        stoneKeyMeaning: 'Where pilgrims today can visit both her 1945 marble epitaph and her tomb near Piazza Navona',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · Their Mystical Conversation',
        questionPrompt: 'Where did Augustine and St. Monica lean together as they spoke of eternal Wisdom?',
        correctStoneId: 's4-art-1',
      },
      {
        slotLabel: 'Lock II · The 1945 Archaeological Miracle',
        questionPrompt: 'How was St. Monica’s lost 5th-century marble gravestone rediscovered after 1,500 years?',
        correctStoneId: 's4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Where can modern pilgrims visit both her rediscovered gravestone and her tomb today?',
        correctStoneId: 's4-art-3',
      },
    ],
    sealName: 'Seal of Ostia',
  },
  {
    stopNumber: 5,
    title: 'The Shepherd of Hippo & The City of God',
    subtitle: 'Explore the Mediterranean ruins of Hippo Regius to uncover 3 hidden relics',
    eraLabel: 'Age 37 to 75 · Bishop & Doctor of the Church',
    ancientPlaceName: 'Hippo Regius',
    modernPlaceName: 'Annaba',
    modernCountry: 'Algeria',
    image: '/images/trails/augustine_thagaste_hippo_1794700013386.jpg',
    imageCaption: 'Roman mosaic ruins of Hippo Regius and the hilltop Basilica of St. Augustine in modern-day Annaba, Algeria.',
    whatYouCanSeeToday:
      'Today, ancient Hippo Regius is the coastal city of Annaba in northeastern Algeria. You can walk across the mosaic floors of Augustine’s ancient Basilica of Peace (Basilica Pacis) and climb the olive hill to the Basilica of St. Augustine overlooking the sea.',
    didYouKnowHighlight:
      'When Vandal armies besieged and burned Hippo in 430 AD just as 75-year-old Augustine died, only two things in the entire city were miraculously spared from the flames: Augustine’s cathedral and his library containing thousands of manuscripts!',
    saintQuote:
      '“Sing as wayfarers sing! Sing to comfort your toil, not loving indolence: sing, and keep on walking!”',
    globePlacement: {
      latDeg: 36.92,
      lngDeg: 7.72,
      regionLabel: 'Mediterranean Coast, Northeastern Algeria',
      beaconColorHex: '#E07A5F',
      labelOffsetPx: [-68, -18],
    },
    detectiveCaseTitle: 'Case #5 · The Besieged City Where Only His Library Survived the Fire',
    detectiveLeadPrompt:
      'Where did Augustine serve as Bishop for 35 years, write The Confessions and The City of God, and leave behind a library that miraculously survived the 430 AD siege fire?',
    detectiveClues: [
      {
        id: 'c5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'Algeria’s Fourth-Largest Coastal City ("Lalla Bouna")',
        clueText:
          'Known in antiquity as Hippo Regius, today this vibrant Mediterranean port city in northeastern Algeria is crowned by a hilltop Basilica of St. Augustine overlooking the ancient Roman mosaics of his Basilica of Peace.',
        soundCue: 'compass_click',
      },
      {
        id: 'c5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'When Invaders Burned the City, Only His Library Was Spared!',
        clueText:
          'When Vandal armies besieged and burned this city in 430 AD right after 75-year-old Augustine died, only two places in the entire city escaped the flames: Augustine’s cathedral and his library holding over 5 million words of manuscripts!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c5-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: '35 Years as Bishop & Author of The City of God',
        clueText:
          'Consecrated Bishop here in 395 AD, Augustine preached nearly every day for 35 years, judged disputes, cared for the poor, and authored both The Confessions and The City of God.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Search the four towering fluted marble columns standing against the sunset sky.',
        hintDirection: 'Shine your lantern on the four tall stone columns in the center of the ruins.',
        foundTitle: '35 Years as Bishop of Hippo & Author of “The City of God”',
        xPercent: 59,
        yPercent: 38,
        hitRadius: 15,
        storyUnlocked:
          'Ordained Bishop of Hippo in 395 AD, Augustine preached here nearly every day for 35 years, cared for the poor, founded the Rule of St. Augustine, and wrote over 5 million words—including The Confessions and The City of God.',
        stoneKeyWord: 'THE LIBRARY OF HIPPO',
        stoneKeyMeaning: 'Miraculously spared from the flames when Hippo burned during the 430 AD siege',
        soundCue: 'relic_discovered',
      },
      {
        id: 's5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'Inspect the intricate geometric Roman floor mosaic preserved in the lower foreground.',
        hintDirection: 'Move your lantern down to the patterned mosaic pavement at the bottom left-center.',
        foundTitle: 'Did You Know? His Library Survived the 430 AD Fire!',
        xPercent: 43,
        yPercent: 83,
        hitRadius: 14,
        storyUnlocked:
          'When Vandal armies besieged Hippo in 430 AD, 75-year-old Augustine prayed the Penitential Psalms on his deathbed until August 28, 430 AD. Though invaders burned the city afterward, they spared Augustine’s Basilica Pacis floor and his entire manuscript library!',
        stoneKeyWord: 'THE CITY OF GOD & CONFESSIONS',
        stoneKeyMeaning: 'His monumental masterpieces written during his 35 years as Bishop of Hippo',
        soundCue: 'gregorian_chime',
      },
      {
        id: 's5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'Look far across the blue bay on the right to spot the domed Basilica crowning the distant hill.',
        hintDirection: 'Sweep your lantern to the distant hilltop church across the water on the right.',
        foundTitle: 'Where Is It Modern Day Now? Annaba, Algeria',
        xPercent: 83,
        yPercent: 32,
        hitRadius: 13,
        storyUnlocked:
          'That domed church on the distant hill is the Basilica of St. Augustine ("Lalla Bouna") in modern-day Annaba, Algeria! Ancient Hippo Regius is today Algeria’s fourth-largest city, and the basilica holds the relic of Augustine’s right arm.',
        stoneKeyWord: 'ANNABA, ALGERIA',
        stoneKeyMeaning: 'The modern Mediterranean coastal city where ancient Hippo Regius stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · What He Wrote Here',
        questionPrompt: 'Which stone tablet names the immortal books Augustine wrote during his 35 years as Bishop?',
        correctStoneId: 's5-art-2',
      },
      {
        slotLabel: 'Lock II · What Survived the Siege Fire',
        questionPrompt: 'What was miraculously spared when invading armies burned Hippo in 430 AD?',
        correctStoneId: 's5-art-1',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which modern Algerian coastal city is ancient Hippo Regius today?',
        correctStoneId: 's5-art-3',
      },
    ],
    sealName: 'Seal of Hippo Regius',
  },
  {
    stopNumber: 6,
    title: 'The Marble Ark Beneath the Golden Sky',
    subtitle: 'Illuminate the candlelit sanctuary of Pavia to solve the final mystery',
    eraLabel: '725 AD to Present Day · His Resting Place Today',
    ancientPlaceName: 'San Pietro in Ciel d’Oro',
    modernPlaceName: 'Pavia (South of Milan)',
    modernCountry: 'Italy',
    image: '/images/trails/augustine_step6_pavia_ark_1794701800057.jpg',
    imageCaption: 'The white marble Arca di Sant’Agostino inside the Basilica of San Pietro in Ciel d’Oro in Pavia, Italy.',
    whatYouCanSeeToday:
      'Just 30 minutes south of Milan by train in Pavia, Italy, you can walk into the Romanesque Basilica of San Pietro in Ciel d’Oro and stand before the breathtaking white marble Arca di Sant’Agostino—carved with 95 statues and 50 scenes of his life—where his body rests today.',
    didYouKnowHighlight:
      'Why is the church in Pavia called “San Pietro in Ciel d’Oro” (“St. Peter in the Golden Sky”)? Because its ancient ceiling was once covered in real gold leaf mosaics—and the poet Dante Alighieri immortalized this exact church in Canto X of his Paradiso!',
    saintQuote:
      '“In my Father’s house there are many resting places… our peace is our rest, and our rest is in the fullness of love.”',
    globePlacement: {
      latDeg: 45.05,
      lngDeg: 9.15,
      regionLabel: 'Ticino Valley (South of Milan), Italy',
      beaconColorHex: '#C77DFF',
      labelOffsetPx: [66, 18],
    },
    detectiveCaseTitle: 'Case #6 · The Final Resting Place Under the “Golden Sky”',
    detectiveLeadPrompt:
      'Though St. Augustine died in Algeria, Lombard King Liutprand ransomed his body in gold in 725 AD. Zoom into the Italian city just south of Milan where his tomb rests today!',
    detectiveClues: [
      {
        id: 'c6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Historic University Town 30 Minutes South of Milan, Italy',
        clueText:
          'Once the royal capital of the Lombard kingdom, this northern Italian city just 30 minutes south of Milan houses St. Augustine’s body inside a magnificent white marble Gothic shrine carved with 95 statues.',
        soundCue: 'compass_click',
      },
      {
        id: 'c6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Why the Church Is Called “St. Peter in the Golden Sky” (Praised by Dante!)',
        clueText:
          'Its Basilica of San Pietro in Ciel d’Oro means "St. Peter in the Golden Sky" because its ceiling was once covered in real gold leaf mosaics—and Dante Alighieri praised this very ceiling and tomb in Canto X of his Paradiso!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 'c6-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Ransomed in Gold by King Liutprand in 725 AD',
        clueText:
          'To protect Augustine’s relics from raids, exiled African bishops first carried his body to Sardinia (~496 AD), and in 725 AD Lombard King Liutprand paid a fortune in gold to bring St. Augustine’s body to rest forever right beside Milan, where he was baptized!',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 's6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Find the glowing golden reliquary casket nestled inside the central arch of the white marble shrine.',
        hintDirection: 'Shine your lantern into the glowing golden center of the white marble monument.',
        foundTitle: 'King Liutprand’s 725 AD Rescue of St. Augustine’s Body',
        xPercent: 63,
        yPercent: 48,
        hitRadius: 14,
        storyUnlocked:
          'Why is St. Augustine’s body in Italy if he died in Algeria? First, exiled bishops carried his relics to Sardinia around 496 AD to protect them; then in 725 AD, Lombard King Liutprand paid a fortune in gold to ransom his body and carried it barefoot into this sanctuary!',
        stoneKeyWord: 'KING LIUTPRAND’S 725 AD RESCUE',
        stoneKeyMeaning: 'How St. Augustine’s relics were ransomed from Sardinia and brought to Italy',
        soundCue: 'relic_discovered',
      },
      {
        id: 's6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'Look high up at the ancient brick ribbed ceiling vaults arching above the sanctuary.',
        hintDirection: 'Move your lantern to the upper-left brick ceiling vaults.',
        foundTitle: 'Did You Know? “St. Peter in the Golden Sky” & Dante’s Paradise!',
        xPercent: 32,
        yPercent: 18,
        hitRadius: 15,
        storyUnlocked:
          'This church is called San Pietro in Ciel d’Oro ("St. Peter in the Golden Sky") because its ceiling was once lined with gold leaf. In Canto X of Dante’s Paradiso, Dante praises this exact "gilded ceiling below which that peaceful body lies!"',
        stoneKeyWord: '95 MARBLE STATUES & GOLD CEILING',
        stoneKeyMeaning: 'The 1362 Gothic marble Ark beneath the "Golden Sky" praised by Dante',
        soundCue: 'gregorian_chime',
      },
      {
        id: 's6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'Warm your lantern over the row of flickering votive candles burning in front of the shrine.',
        hintDirection: 'Shine your lantern on the row of lit candles at the bottom-center of the monument.',
        foundTitle: 'Where Is It Modern Day Now? Pavia, Italy (Just South of Milan)',
        xPercent: 57,
        yPercent: 70,
        hitRadius: 14,
        storyUnlocked:
          'Today, pilgrims take a 30-minute train ride south from Milan to Pavia, Italy to pray before St. Augustine’s tomb. Remarkably, his resting place in Pavia lies right next to Milan—bringing him full circle to the place where St. Ambrose baptized him!',
        stoneKeyWord: 'PAVIA, ITALY (SOUTH OF MILAN)',
        stoneKeyMeaning: 'Modern-day city where St. Augustine’s body rests today inside San Pietro in Ciel d’Oro',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · How His Body Reached Italy',
        questionPrompt: 'Which stone tablet explains how St. Augustine’s relics traveled from North Africa and Sardinia to Italy?',
        correctStoneId: 's6-art-1',
      },
      {
        slotLabel: 'Lock II · The Monument’s Design',
        questionPrompt: 'Which stone tablet describes the 14th-century shrine and the "Golden Sky" basilica ceiling?',
        correctStoneId: 's6-art-2',
      },
      {
        slotLabel: 'Lock III · Where His Tomb Is Today',
        questionPrompt: 'In which modern Italian city (just 30 minutes south of Milan) does St. Augustine’s body rest today?',
        correctStoneId: 's6-art-3',
      },
    ],
    sealName: 'Seal of Pavia',
  },
];

export const ST_THOMAS_TRAIL_STOPS: TrailStop[] = [
  {
    stopNumber: 1,
    title: 'The Upper Room & The Wounds of Christ',
    subtitle: 'Explore the stone Cenacle of Mount Zion where St. Thomas proclaimed “My Lord and my God!”',
    eraLabel: '33 AD · The Upper Room',
    ancientPlaceName: 'Cenacle of Mount Zion',
    modernPlaceName: 'Jerusalem',
    modernCountry: 'Israel',
    image: '/images/trails/thomas_step1_jerusalem.jpg',
    imageCaption: 'Vaulted limestone arches of the Cenacle (Upper Room) on Mount Zion in Jerusalem.',
    whatYouCanSeeToday:
      'Just outside Zion Gate on the southern crest of Jerusalem’s Old City, pilgrims can climb the stone steps into the medieval vaulted Cenacle (Upper Room), venerated since the early Church as the site of the Last Supper, Pentecost, and Christ’s appearance to St. Thomas.',
    didYouKnowHighlight:
      'Though remembered as “Doubting Thomas,” his exclamation upon seeing the Risen Christ—“My Lord and my God!” (John 20:28)—is actually the single boldest, clearest confession of Jesus’s divinity spoken by anyone in all four Gospels!',
    saintQuote:
      '“Thomas answered and said to Him: ‘My Lord and my God!’” — John 20:28',
    globePlacement: {
      latDeg: 31.77,
      lngDeg: 35.23,
      regionLabel: 'Mount Zion, Judean Hills, Levant',
      beaconColorHex: '#D4AF37',
      labelOffsetPx: [68, -18],
    },
    detectiveCaseTitle: 'Case #1 · The Stone Upper Room Where Doubt Turned to Boldest Faith',
    detectiveLeadPrompt:
      'Read the 3 detective clues below, then rotate and zoom into the ancient hilltop city on the 3D Globe where St. Thomas touched the Risen Christ’s wounds before setting out for the East.',
    detectiveClues: [
      {
        id: 't1-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Golden-Stone Hilltop Sanctuary Outside Zion Gate',
        clueText:
          'Perched between the Mediterranean Sea and the Dead Sea, this walled holy city requires golden limestone on every building facade. On Mount Zion just south of its Old City walls stands the medieval vaulted Cenacle (Upper Room).',
        soundCue: 'compass_click',
      },
      {
        id: 'c1-thomas-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Why “Doubting Thomas” Spoke the Highest Confession in the Gospels!',
        clueText:
          'While people call him "Doubting Thomas," his four-word cry in this room—"My Lord and my God!" (John 20:28)—is the only time in all four Gospels that an Apostle directly addresses Jesus as both Lord and God!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't1-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Eight Days After Easter in the Upper Room (33 AD)',
        clueText:
          'Eight days after the Resurrection, Jesus appeared through locked doors here and invited Thomas to place his finger into the nail marks. When the Apostles cast lots for their mission fields, Thomas received the distant lands of Parthia and India.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't1-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'Center of the vaulted limestone hall bathed in warm shafts of sunlight.',
        hintDirection: 'Click marker #1 in the sunlit center of the stone Upper Room.',
        foundTitle: 'Eight Days After Easter: “My Lord and My God!” (John 20:28)',
        xPercent: 48,
        yPercent: 52,
        hitRadius: 14,
        storyUnlocked:
          'Absent on Easter Sunday evening, Thomas declared he would not believe unless he saw the nail marks. Eight days later in this Upper Room, Christ stood before him—and Thomas uttered the supreme confession of faith: "My Lord and my God!"',
        stoneKeyWord: 'MY LORD AND MY GOD',
        stoneKeyMeaning: 'Thomas’s supreme confession of Christ’s divinity in the Upper Room',
        soundCue: 'relic_discovered',
      },
      {
        id: 't1-art-2',
        orderNumber: 2,
        category: 'Where Is It Today?',
        riddleToFind: 'The ancient stone columns and ribbed Crusader arches supporting the upper floor.',
        hintDirection: 'Click marker #2 on the stone pillar and gothic vaulting.',
        foundTitle: 'Where Is It Modern Day Now? Mount Zion, Jerusalem',
        xPercent: 26,
        yPercent: 42,
        hitRadius: 14,
        storyUnlocked:
          'Today the Cenacle stands on Mount Zion just outside the Zion Gate of Jerusalem’s Old City. Rebuilt with gothic ribbed vaults by Franciscan friars in the 14th century over early Judeo-Christian synagogue foundations, it remains open to pilgrims daily.',
        stoneKeyWord: 'MOUNT ZION, JERUSALEM',
        stoneKeyMeaning: 'The hilltop sanctuary where the Cenacle stands today',
        soundCue: 'sanctuary_bell',
      },
      {
        id: 't1-art-3',
        orderNumber: 3,
        category: 'Did You Know?',
        riddleToFind: 'The arched stone window looking out toward the eastern horizon.',
        hintDirection: 'Click marker #3 near the sunlit stone window on the right.',
        foundTitle: 'Did You Know? The Apostle Who Traveled Farther Than Any Other!',
        xPercent: 76,
        yPercent: 36,
        hitRadius: 14,
        storyUnlocked:
          'Known in Aramaic as Toma ("The Twin") and in Greek as Didymus, St. Thomas traveled farther outside the Roman Empire than any other of the Twelve Apostles—journeying across Mesopotamia and the Arabian Sea all the way to southern India!',
        stoneKeyWord: 'DIDYMUS (THE TWIN)',
        stoneKeyMeaning: 'The Greek name of the Apostle who carried the Gospel beyond the Roman Empire to India',
        soundCue: 'gregorian_chime',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · His Confession of Faith',
        questionPrompt: 'What four words did St. Thomas proclaim in the Upper Room?',
        correctStoneId: 't1-art-1',
      },
      {
        slotLabel: 'Lock II · His Aramaic & Greek Name',
        questionPrompt: 'What title meaning "The Twin" was given to St. Thomas?',
        correctStoneId: 't1-art-3',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Where does the vaulted Cenacle stand today?',
        correctStoneId: 't1-art-2',
      },
    ],
    sealName: 'Seal of Jerusalem',
  },
  {
    stopNumber: 2,
    title: 'Landing on the Spice Coast of Muziris',
    subtitle: 'Trace the monsoon trade winds to the Malabar harbor where St. Thomas landed in 52 AD',
    eraLabel: '52 AD · Arrival on the Malabar Coast',
    ancientPlaceName: 'Muziris (Cranganore)',
    modernPlaceName: 'Kodungallur, Kerala',
    modernCountry: 'India',
    image: '/images/trails/thomas_step2_kodungallur.jpg',
    imageCaption: 'Palm-lined Malabar backwaters of Kodungallur, Kerala (ancient Muziris), where St. Thomas landed in 52 AD.',
    whatYouCanSeeToday:
      'Today, ancient Muziris is the serene Malabar coast town of Kodungallur in Kerala’s Thrissur district, India. On the banks of the Periyar estuary at Azhikode stands the Mar Thoma Pontifical Shrine, marking the harbor where St. Thomas stepped ashore in 52 AD and preserving the relic of his right arm bone.',
    didYouKnowHighlight:
      'For centuries, skeptics wondered if 1st-century ships could sail directly from the Roman Middle East to Kerala—until recent excavations at Pattanam (ancient Muziris) unearthed thousands of 1st-century Roman wine amphorae and Augustus Caesar gold coins!',
    saintQuote:
      '“Go into the whole world and proclaim the Gospel to every creature.” — Mark 16:15',
    globePlacement: {
      latDeg: 10.05,
      lngDeg: 76.25,
      regionLabel: 'Malabar Coast, Southwestern India',
      beaconColorHex: '#E09F3E',
      labelOffsetPx: [-72, 26],
    },
    detectiveCaseTitle: 'Case #2 · The Lost Roman Spice Port of the Malabar Backwaters',
    detectiveLeadPrompt:
      'Sailing with the summer monsoon winds across the Arabian Sea in 52 AD, which legendary black-pepper harbor on India’s southwestern Malabar Coast welcomed St. Thomas ashore?',
    detectiveClues: [
      {
        id: 't2-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A River-Estuary Town in Thrissur District, Kerala, India',
        clueText:
          'Called Muziris by the Romans and Shingly by medieval travelers, today this lush backwater town in Kerala, southwestern India, hosts the Mar Thoma Pontifical Shrine where the Periyar River meets the Arabian Sea.',
        soundCue: 'compass_click',
      },
      {
        id: 't2-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: '1st-Century Roman Gold Coins & Amphorae Proved His Sea Route!',
        clueText:
          'Roman historian Pliny the Elder called this port "the first emporium of India"—just a 40-day monsoon sail from the Red Sea. Modern digs here unearthed thousands of 1st-century Roman amphorae and imperial coins from the exact era Thomas landed!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't2-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Landing at Maliankara in 52 AD & Founding the Seven Churches',
        clueText:
          'Arriving on a merchant vessel in 52 AD, St. Thomas was welcomed by the local Chera king and Jewish spice traders, establishing the first of Kerala’s historic "Ezharappallikal" (Seven and a Half Churches).',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't2-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The traditional wooden spice boat moored along the golden river estuary.',
        hintDirection: 'Click marker #1 on the wooden vessel in the harbor.',
        foundTitle: 'Sailing the Hippalus Monsoon Winds to India (52 AD)',
        xPercent: 34,
        yPercent: 64,
        hitRadius: 14,
        storyUnlocked:
          'In the 1st century AD, Greek and Roman navigators harnessed the seasonal southwest monsoon winds (Hippalus) to sail straight across the Arabian Sea in 40 days. St. Thomas boarded a spice ship with the merchant Habban and landed here at Muziris in 52 AD.',
        stoneKeyWord: 'MUZIRIS HARBOR (52 AD)',
        stoneKeyMeaning: 'The ancient spice port where St. Thomas first landed in India',
        soundCue: 'relic_discovered',
      },
      {
        id: 't2-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The carved granite cross and traditional oil lamp on the stone wharf.',
        hintDirection: 'Click marker #2 on the stone wharf in the right foreground.',
        foundTitle: 'Did You Know? The Pattanam Roman Treasure Digs!',
        xPercent: 68,
        yPercent: 72,
        hitRadius: 14,
        storyUnlocked:
          'Recent archaeological excavations at nearby Pattanam uncovered Roman terra sigillata pottery, Mediterranean glass beads, and 1st-century coins—proving vibrant daily contact between the Mediterranean world and Kerala during St. Thomas’s lifetime!',
        stoneKeyWord: 'EZHARAPPALLIKAL (7.5 CHURCHES)',
        stoneKeyMeaning: 'The seven and a half early Christian communities founded by St. Thomas in Kerala',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't2-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The palm-fringed shoreline looking toward the modern Pontifical Shrine.',
        hintDirection: 'Click marker #3 along the palm-lined distant shore.',
        foundTitle: 'Where Is It Modern Day Now? Kodungallur, Kerala, India',
        xPercent: 52,
        yPercent: 36,
        hitRadius: 14,
        storyUnlocked:
          'Today, ancient Muziris (later called Cranganore) is Kodungallur in Kerala’s Thrissur district. In 1953, Cardinal Eugene Tisserant brought a bone relic of St. Thomas’s right arm from Ortona, Italy back to the Mar Thoma Pontifical Shrine here!',
        stoneKeyWord: 'KODUNGALLUR, KERALA',
        stoneKeyMeaning: 'Modern-day Malabar coastal town where ancient Muziris stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Ancient Spice Port',
        questionPrompt: 'What was the ancient name of the Malabar harbor where St. Thomas landed in 52 AD?',
        correctStoneId: 't2-art-1',
      },
      {
        slotLabel: 'Lock II · The Malabar Communities',
        questionPrompt: 'What traditional Malayalam name describes the 7.5 churches founded by St. Thomas?',
        correctStoneId: 't2-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Which modern town in Kerala, India is ancient Muziris today?',
        correctStoneId: 't2-art-3',
      },
    ],
    sealName: 'Seal of Muziris',
  },
  {
    stopNumber: 3,
    title: 'The Baptismal Pond of the Malabar Scholars',
    subtitle: 'Visit India’s oldest continuous church and the lotus pond where St. Thomas baptized the first families',
    eraLabel: '52–54 AD · The Malabar Mission',
    ancientPlaceName: 'Palayoor (Palur)',
    modernPlaceName: 'Palayoor (Guruvayur), Kerala',
    modernCountry: 'India',
    image: '/images/trails/thomas_step3_palayoor.jpg',
    imageCaption: 'St. Thomas Syro-Malabar Pilgrim Church and historic baptismal pond at Palayoor, Kerala, India.',
    whatYouCanSeeToday:
      'In modern Palayoor (near Guruvayur in Thrissur district, Kerala), you can visit St. Thomas Major Archiepiscopal Pilgrim Church—the oldest continuously active church in India, established in 52 AD—and stand beside the preserved Thaliyakulam Pond where St. Thomas baptized local Namboothiri scholars.',
    didYouKnowHighlight:
      'Around the church courtyard in Palayoor, you can still see ancient carved granite Hindu temple stones, a traditional brass “Kalvilakku” (stone lamp), and the Boat Jetty ("Bottiukulam") where St. Thomas arrived by backwater canoe nearly 2,000 years ago!',
    saintQuote:
      '“Blessed are those who have not seen and yet have believed.” — John 20:29',
    globePlacement: {
      latDeg: 10.88,
      lngDeg: 75.92,
      regionLabel: 'Central Kerala Coast, Southwestern India',
      beaconColorHex: '#52B788',
      labelOffsetPx: [-76, -22],
    },
    detectiveCaseTitle: 'Case #3 · The Lotus Pond Baptism & India’s Oldest Active Parish',
    detectiveLeadPrompt:
      'Journey slightly north along Kerala’s Malabar coast to the ancient temple town where St. Thomas baptized Brahmin scholars in a lotus water tank that still exists today!',
    detectiveClues: [
      {
        id: 't3-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Historic Pilgrim Town Next to Guruvayur in Central Kerala',
        clueText:
          'Located in central Kerala’s Thrissur district just two kilometers from Guruvayur, this peaceful palm-shaded town is home to the oldest continuously functioning Christian church in all of India (founded in 52 AD).',
        soundCue: 'compass_click',
      },
      {
        id: 't3-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'The Preserved “Thaliyakulam” Baptismal Pond & Ancient Stone Lamps!',
        clueText:
          'When local Vedic scholars threw water into the air during morning prayers in the Thaliyakulam pond, tradition says Thomas prayed that the water droplets remain suspended like glowing pearls in midair—inspiring the families to seek baptism in that very pond!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't3-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Origin of the Ancient St. Thomas Christian (Nasrani) Families',
        clueText:
          'The ancestral families baptized here by St. Thomas—including Pakalomattam, Sankarapuri, Kalli, and Kaliyankal—preserved the Syriac liturgy and apostolic faith across twenty centuries.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't3-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The stone-stepped Thaliyakulam water tank reflecting the church facade.',
        hintDirection: 'Click marker #1 on the stepped water pond in the foreground.',
        foundTitle: 'The Thaliyakulam Baptismal Pond (52 AD)',
        xPercent: 45,
        yPercent: 74,
        hitRadius: 14,
        storyUnlocked:
          'Beside this tranquil stepped water tank (Thaliyakulam), St. Thomas engaged in dialogue with local Brahmin scholars performing morning ablutions, leading to the baptism of the pioneering St. Thomas Christian (Mar Thoma Nasrani) families of India.',
        stoneKeyWord: 'THALIYAKULAM POND',
        stoneKeyMeaning: 'The preserved water tank in Palayoor where St. Thomas baptized the first families',
        soundCue: 'relic_discovered',
      },
      {
        id: 't3-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The carved granite oil lamp (Kalvilakku) standing in the church courtyard.',
        hintDirection: 'Click marker #2 on the tall stone oil lamp beside the courtyard.',
        foundTitle: 'Did You Know? 2,000 Years of Unbroken Worship & Heritage!',
        xPercent: 72,
        yPercent: 54,
        hitRadius: 14,
        storyUnlocked:
          'Unlike the other six early churches in Kerala that were relocated or rebuilt on new sites over the millennia, Palayoor Church still stands on its original 52 AD plot—preserving ancient granite oil lamps (Kalvilakku) and weathered sculptures!',
        stoneKeyWord: 'INDIA’S OLDEST PARISH (52 AD)',
        stoneKeyMeaning: 'Standing on its original site in Palayoor for nearly two millennia',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't3-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The white-and-gold Kerala church facade rising beneath the coconut palms.',
        hintDirection: 'Click marker #3 on the main church sanctuary building.',
        foundTitle: 'Where Is It Modern Day Now? Palayoor (Near Guruvayur), Kerala',
        xPercent: 48,
        yPercent: 34,
        hitRadius: 14,
        storyUnlocked:
          'Every July on Dukrana (the July 3 Feast of St. Thomas), thousands of pilgrims walk the "Thoma Margam" procession to Palayoor in central Kerala, lighting oil lamps and praying in historic East Syriac and Malayalam.',
        stoneKeyWord: 'PALAYOOR, KERALA',
        stoneKeyMeaning: 'Modern-day central Kerala town housing the 52 AD St. Thomas Pilgrim Church',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Sacred Water Tank',
        questionPrompt: 'What is the name of the preserved pond where St. Thomas baptized the first families here?',
        correctStoneId: 't3-art-1',
      },
      {
        slotLabel: 'Lock II · Its Historic Distinction',
        questionPrompt: 'What makes the 52 AD church at Palayoor unique across all of India?',
        correctStoneId: 't3-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Kerala town near Guruvayur does this sanctuary stand today?',
        correctStoneId: 't3-art-3',
      },
    ],
    sealName: 'Seal of Palayoor',
  },
  {
    stopNumber: 4,
    title: 'The Cave Refuge & Palm Print in the Rock',
    subtitle: 'Step inside the granite cave of Little Mount where St. Thomas prayed and struck a spring from stone',
    eraLabel: '68–72 AD · Cave of Solitude',
    ancientPlaceName: 'Chinnamalai (Little Mount)',
    modernPlaceName: 'Little Mount, Chennai',
    modernCountry: 'India',
    image: '/images/trails/thomas_step4_little_mount.jpg',
    imageCaption: 'Rock-cut prayer cave and 16th-century chapel at Little Mount (Chinnamalai), Saidapet, Chennai, India.',
    whatYouCanSeeToday:
      'In the Saidapet neighborhood of southern Chennai, Tamil Nadu, you can stoop through the narrow granite cleft inside the 1551 Portuguese Chapel of Our Lady of Good Health to enter St. Thomas’s actual prayer cave, touch his palm print in the rock window, and see the perennial natural spring on the hillock outside.',
    didYouKnowHighlight:
      'Even in the blazing summer heat of Chennai when surrounding wells run dry, the tiny rock fissure outside the Little Mount cave—"St. Thomas’s Fountain," which tradition says he struck with his staff for thirsty listeners—still holds cool water!',
    saintQuote:
      '“Let us also go, that we may die with Him.” — St. Thomas (John 11:16)',
    globePlacement: {
      latDeg: 12.75,
      lngDeg: 80.02,
      regionLabel: 'Adyar River, Southern Chennai, Coromandel Coast',
      beaconColorHex: '#6495ED',
      labelOffsetPx: [74, 24],
    },
    detectiveCaseTitle: 'Case #4 · The Granite Cave With the Apostle’s Palm Print & Spring',
    detectiveLeadPrompt:
      'Crossing to India’s eastern Coromandel Coast, locate the granite hillock beside the Adyar River in southern Chennai where St. Thomas lived in a rock cave and left his handprint in stone!',
    detectiveClues: [
      {
        id: 't4-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Granite Hillock in Saidapet, Southern Chennai, India',
        clueText:
          'Known in Tamil as Chinnamalai ("Little Mount"), this rocky hillock beside the Adyar River in southern Chennai (formerly Madras) encloses a natural rock cavern beneath a 1551 Portuguese vaulted chapel.',
        soundCue: 'compass_click',
      },
      {
        id: 't4-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'A Handprint in the Rock Window & A Spring Struck from Granite!',
        clueText:
          'Inside the cave’s narrow escape tunnel, pilgrims can still see the fossil-like impression of a palm pressed into the granite wall, while outside on the solid rock hilltop sits a natural water fissure that never dries up!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't4-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'The Apostle’s Hermitage of Prayer Before His Martyrdom (68–72 AD)',
        clueText:
          'During his final years preaching along the eastern coast of Tamilakam, St. Thomas spent nights in fasting and prayer inside this cool rock cave, preaching to crowds gathered around the hillock by day.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't4-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The candlelit granite altar deep inside the natural rock cavern.',
        hintDirection: 'Click marker #1 in the glowing center of the rock cave.',
        foundTitle: 'St. Thomas’s Cave of Prayer & Fasting (68–72 AD)',
        xPercent: 48,
        yPercent: 56,
        hitRadius: 14,
        storyUnlocked:
          'After traveling across the southern peninsula to the Coromandel Coast, St. Thomas used this secluded granite cavern beside the Adyar River as his hermitage of silent prayer and teaching.',
        stoneKeyWord: 'CHINNAMALAI PRAYER CAVE',
        stoneKeyMeaning: 'The granite cavern in southern Chennai where St. Thomas prayed in solitude',
        soundCue: 'relic_discovered',
      },
      {
        id: 't4-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The narrow sunlit rock cleft on the side of the cave wall.',
        hintDirection: 'Click marker #2 on the sunlit rock opening on the right wall.',
        foundTitle: 'Did You Know? The Palm Print & The Perennial Rock Spring!',
        xPercent: 74,
        yPercent: 44,
        hitRadius: 14,
        storyUnlocked:
          'When hostile assailants cornered him inside the cave, tradition records that Thomas escaped through this narrow rock opening—leaving his right palm print pressed into the stone—and fled two miles south to Great Mount (St. Thomas Mount).',
        stoneKeyWord: 'PALM PRINT IN THE STONE',
        stoneKeyMeaning: 'Preserved inside the narrow rock escape cleft at Little Mount',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't4-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The rough-hewn stone steps leading from the 1551 Portuguese chapel into the cavern.',
        hintDirection: 'Click marker #3 on the stone entrance steps on the left.',
        foundTitle: 'Where Is It Modern Day Now? Little Mount (Saidapet), Chennai, India',
        xPercent: 24,
        yPercent: 66,
        hitRadius: 14,
        storyUnlocked:
          'Today, Little Mount has its own station on the Chennai Metro Blue Line in Saidapet! Overlooking the historic 1551 Portuguese cave chapel stands a striking circular modern shrine dedicated to Our Lady of Good Health.',
        stoneKeyWord: 'LITTLE MOUNT, CHENNAI',
        stoneKeyMeaning: 'Modern-day neighborhood in southern Chennai where the cave shrine stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The Hermitage in the Rock',
        questionPrompt: 'What Tamil name meaning "Little Mount" designates St. Thomas’s prayer cave?',
        correctStoneId: 't4-art-1',
      },
      {
        slotLabel: 'Lock II · The Mark Left Behind',
        questionPrompt: 'What physical impression can pilgrims still touch inside the cave’s narrow rock window?',
        correctStoneId: 't4-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'Where in modern-day India is this rock cave sanctuary located?',
        correctStoneId: 't4-art-3',
      },
    ],
    sealName: 'Seal of Little Mount',
  },
  {
    stopNumber: 5,
    title: 'Martyrdom on the Mount & The Tomb by the Sea',
    subtitle: 'Stand before San Thome Cathedral Basilica in Mylapore, built directly over St. Thomas’s 72 AD tomb',
    eraLabel: 'July 3, 72 AD · Crown of Martyrdom',
    ancientPlaceName: 'Mylapore (Mayilappur)',
    modernPlaceName: 'San Thome, Chennai',
    modernCountry: 'India',
    image: '/images/trails/thomas_step5_santhome.jpg',
    imageCaption: 'San Thome Cathedral Basilica on the Bay of Bengal shore in Mylapore, Chennai, India.',
    whatYouCanSeeToday:
      'Along the Marina beachfront in Mylapore, Chennai, you can enter the snow-white neo-Gothic San Thome Cathedral Basilica and descend into the underground crypt to pray directly beside St. Thomas’s original 1st-century tomb—and climb nearby St. Thomas Mount (Parangi Malai), where he was martyred in 72 AD.',
    didYouKnowHighlight:
      'Did you know there are only THREE basilicas in the entire world built directly over the tomb of one of Jesus’s Twelve Apostles? St. Peter’s Basilica in Rome (St. Peter), Santiago de Compostela in Spain (St. James), and San Thome Basilica in Chennai, India (St. Thomas)!',
    saintQuote:
      '“Jesus said to him: ‘I am the Way, and the Truth, and the Life.’” — Spoken in answer to St. Thomas (John 14:5–6)',
    globePlacement: {
      latDeg: 13.32,
      lngDeg: 80.36,
      regionLabel: 'Mylapore Coast, Bay of Bengal, Chennai, India',
      beaconColorHex: '#E07A5F',
      labelOffsetPx: [76, -20],
    },
    detectiveCaseTitle: 'Case #5 · One of Only Three Apostolic Tomb Basilicas on Earth',
    detectiveLeadPrompt:
      'Only three churches on earth stand directly over the original tomb of one of the Twelve Apostles: Rome, Santiago de Compostela, and this seaside neighborhood of peacocks on the Bay of Bengal!',
    detectiveClues: [
      {
        id: 't5-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A White Neo-Gothic Basilica on the Marina Coast of Chennai, India',
        clueText:
          'Anciently called Mayilappur ("Town of Peacocks"), this historic seaside district in central Chennai faces the Bay of Bengal and is crowned by the 1896 white spire of San Thome Cathedral Basilica.',
        soundCue: 'compass_click',
      },
      {
        id: 't5-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'One of Only Three Basilicas in the World Over an Apostle’s Tomb!',
        clueText:
          'Alongside St. Peter’s in the Vatican and St. James in Compostela, Spain, this basilica in Chennai is one of only three churches on the planet built directly over the first-century burial tomb of an Apostle! Even Marco Polo visited it in 1292!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't5-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'Martyred with a Lance at St. Thomas Mount on July 3, 72 AD',
        clueText:
          'On July 3, 72 AD, while praying before a stone cross carved on nearby Parangi Malai (St. Thomas Mount), the 72-year-old Apostle was pierced with a lance, and his disciples buried his body in this seaside sanctuary of Mylapore.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't5-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The soaring white spire of San Thome Basilica rising over the tomb crypt.',
        hintDirection: 'Click marker #1 on the tall white basilica spire.',
        foundTitle: 'Martyrdom on July 3, 72 AD & Burial in Mylapore',
        xPercent: 48,
        yPercent: 32,
        hitRadius: 14,
        storyUnlocked:
          'Pierced with a lance while praying on St. Thomas Mount on July 3, 72 AD, the Apostle’s body was carried by his disciples to the small chapel he had built by the beach in Mylapore and laid to rest in a brick tomb.',
        stoneKeyWord: 'JULY 3, 72 AD (DUKRANA)',
        stoneKeyMeaning: 'The feast of St. Thomas’s martyrdom at St. Thomas Mount and burial in Mylapore',
        soundCue: 'relic_discovered',
      },
      {
        id: 't5-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The subterranean crypt level beneath the cathedral nave.',
        hintDirection: 'Click marker #2 near the lower sanctuary arches.',
        foundTitle: 'Did You Know? Visited by King Alfred’s Envoys (883 AD) & Marco Polo (1292)!',
        xPercent: 46,
        yPercent: 68,
        hitRadius: 14,
        storyUnlocked:
          'Long before European colonial ships arrived, Anglo-Saxon King Alfred the Great sent alms all the way from England to St. Thomas’s tomb in India in 883 AD (recorded in the Anglo-Saxon Chronicle), and Marco Polo prayed here in 1292!',
        stoneKeyWord: 'ONE OF 3 APOSTOLIC BASILICAS',
        stoneKeyMeaning: 'Alongside Rome (St. Peter) and Compostela (St. James), built over an Apostle’s tomb',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't5-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The waves of the Bay of Bengal lapping the Mylapore shore.',
        hintDirection: 'Click marker #3 along the coastal garden and sea breeze.',
        foundTitle: 'Where Is It Modern Day Now? San Thome (Mylapore), Chennai, India',
        xPercent: 78,
        yPercent: 62,
        hitRadius: 14,
        storyUnlocked:
          'Today in Mylapore, Chennai, pilgrims descend into the underground crypt beneath San Thome Basilica to pray before the first-century tomb, and view the ancient lance head and earthen relics in the cathedral museum.',
        stoneKeyWord: 'SAN THOME, CHENNAI',
        stoneKeyMeaning: 'The coastal neighborhood of Mylapore in Chennai where the Basilica stands today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · His Crown of Martyrdom',
        questionPrompt: 'On what date and year did St. Thomas seal his witness with martyrdom in Chennai?',
        correctStoneId: 't5-art-1',
      },
      {
        slotLabel: 'Lock II · Its Global Rank',
        questionPrompt: 'Why is San Thome Cathedral Basilica one of only three such churches on earth?',
        correctStoneId: 't5-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which seaside district of Chennai does this white basilica stand today?',
        correctStoneId: 't5-art-3',
      },
    ],
    sealName: 'Seal of Mylapore',
  },
  {
    stopNumber: 6,
    title: 'The Adriatic Basilica of the Apostle’s Relics',
    subtitle: 'Cross back to Italy’s Adriatic coast where St. Thomas’s relics arrived by ship in 1258 AD',
    eraLabel: '1258 AD to Present · Resting Place of the Relics',
    ancientPlaceName: 'Ortona a Mare',
    modernPlaceName: 'Ortona, Abruzzo',
    modernCountry: 'Italy',
    image: '/images/trails/thomas_step6_ortona.jpg',
    imageCaption: 'Basilica of St. Thomas the Apostle overlooking the Adriatic Sea in Ortona, Abruzzo, Italy.',
    whatYouCanSeeToday:
      'On a sun-drenched cliff overlooking the Adriatic Sea in Ortona (Abruzzo region, eastern Italy), you can visit the Basilica Concattedrale di San Tommaso Apostolo and descend into the gilded crypt beneath the high altar where the major relics of St. Thomas rest inside a bronze urn.',
    didYouKnowHighlight:
      'How did St. Thomas’s relics travel from India to Italy? First carried along the Silk Road from Mylapore to Edessa (modern Urfa) in the 3rd century and later to the Greek island of Chios, they were brought across the Adriatic to Ortona on September 6, 1258 by naval captain Leone Acciaiuoli!',
    saintQuote:
      '“Lord, we do not know where You are going; how can we know the way?” — St. Thomas (John 14:5)',
    globePlacement: {
      latDeg: 42.35,
      lngDeg: 14.4,
      regionLabel: 'Trabocchi Coast, Adriatic Sea, Abruzzo, Italy',
      beaconColorHex: '#C77DFF',
      labelOffsetPx: [-70, 22],
    },
    detectiveCaseTitle: 'Case #6 · The Adriatic Cliffside Port That Guards the Apostle’s Relics',
    detectiveLeadPrompt:
      'After traveling from Mylapore to Edessa and the Greek island of Chios, a naval captain in 1258 AD carried St. Thomas’s relics across the sea to which cliffside port on Italy’s eastern Adriatic coast?',
    detectiveClues: [
      {
        id: 't6-modern',
        clueNumber: 1,
        badgeLabel: 'Modern-Day City Clue',
        headline: 'A Cliffside Port on the Adriatic “Trabocchi Coast” of Abruzzo, Italy',
        clueText:
          'Perched above the blue Adriatic Sea in eastern Italy’s Abruzzo region (province of Chieti), this coastal town is crowned by a medieval Aragonese Castle and the domed Basilica of St. Thomas the Apostle.',
        soundCue: 'compass_click',
      },
      {
        id: 't6-funfact',
        clueNumber: 2,
        badgeLabel: 'Did You Know? Fun Fact',
        headline: 'Saved Through a 1566 Siege & Rebuilt After World War II!',
        clueText:
          'Brought here from the Aegean island of Chios by Captain Leone Acciaiuoli on September 6, 1258, St. Thomas’s relics and original marble tombstone from Chios survived both a 1566 Ottoman naval raid and the 1943 World War II battle that destroyed the upper church!',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't6-life',
        clueNumber: 3,
        badgeLabel: 'Saint’s Life Clue',
        headline: 'From Mylapore to Edessa, Chios, and Ortona (232–1258 AD)',
        clueText:
          'While his original burial crypt remains revered in Mylapore, India (along with relic fragments in Kerala), the major skeletal relics of St. Thomas have rested in the crypt of this Italian Adriatic basilica since 1258 AD.',
        soundCue: 'relic_discovered',
      },
    ],
    hiddenArtifacts: [
      {
        id: 't6-art-1',
        orderNumber: 1,
        category: 'What Happened Here',
        riddleToFind: 'The copper-domed Basilica of St. Thomas rising above the coastal town.',
        hintDirection: 'Click marker #1 on the domed Basilica of St. Thomas.',
        foundTitle: 'September 6, 1258: Arrival of the Apostle’s Relics by Sea',
        xPercent: 46,
        yPercent: 34,
        hitRadius: 14,
        storyUnlocked:
          'On September 6, 1258, Ortonese naval captain Leone Acciaiuoli returned from the Aegean island of Chios bearing the skeletal relics of St. Thomas and the Greek-inscribed chalcedony slab ("Hagios Thomas"), welcomed by torchlight procession at the harbor.',
        stoneKeyWord: 'CAPTAIN LEONE’S 1258 VOYAGE',
        stoneKeyMeaning: 'How St. Thomas’s relics were brought by ship from Chios to Ortona in 1258 AD',
        soundCue: 'relic_discovered',
      },
      {
        id: 't6-art-2',
        orderNumber: 2,
        category: 'Did You Know?',
        riddleToFind: 'The cliffside Aragonese Castle watching over the Adriatic harbor.',
        hintDirection: 'Click marker #2 on the coastal fortress overlooking the sea.',
        foundTitle: 'Did You Know? The Relics Were Hidden Wall-Deep in 1943!',
        xPercent: 76,
        yPercent: 48,
        hitRadius: 14,
        storyUnlocked:
          'During the fierce December 1943 Battle of Ortona in World War II, the parish priest bricked St. Thomas’s bronze reliquary urn inside the bell-tower wall—saving the Apostle’s bones intact even when the cathedral nave collapsed around them!',
        stoneKeyWord: 'SAVED IN THE 1943 SIEGE',
        stoneKeyMeaning: 'How the Apostle’s urn and Greek marble slab survived World War II intact',
        soundCue: 'gregorian_chime',
      },
      {
        id: 't6-art-3',
        orderNumber: 3,
        category: 'Where Is It Today?',
        riddleToFind: 'The golden harbor promenade curving along the Adriatic Sea.',
        hintDirection: 'Click marker #3 along the sunlit coastal harbor.',
        foundTitle: 'Where Is It Modern Day Now? Ortona, Abruzzo, Italy',
        xPercent: 28,
        yPercent: 68,
        hitRadius: 14,
        storyUnlocked:
          'Today in Ortona (on Italy’s eastern Adriatic coast, 2.5 hours east of Rome), pilgrims from India and around the world gather in the gilded crypt beneath the rebuilt Basilica of St. Thomas, especially during the annual Perdono festival each May!',
        stoneKeyWord: 'ORTONA, ABRUZZO, ITALY',
        stoneKeyMeaning: 'The modern Italian Adriatic port where St. Thomas’s relics rest today',
        soundCue: 'sanctuary_bell',
      },
    ],
    vaultPrompts: [
      {
        slotLabel: 'Lock I · The 1258 Sea Translation',
        questionPrompt: 'How did St. Thomas’s relics arrive on the Adriatic coast of Italy in 1258 AD?',
        correctStoneId: 't6-art-1',
      },
      {
        slotLabel: 'Lock II · Miraculous Preservation',
        questionPrompt: 'How were the relics of St. Thomas protected when the basilica was bombed in 1943?',
        correctStoneId: 't6-art-2',
      },
      {
        slotLabel: 'Lock III · Where It Is Modern Day Now',
        questionPrompt: 'In which Italian Adriatic port town does the Basilica of St. Thomas stand today?',
        correctStoneId: 't6-art-3',
      },
    ],
    sealName: 'Seal of Ortona',
  },
];

export const SAINT_TRAILS: SaintTrailProfile[] = [
  {
    id: 'augustine',
    saintName: 'St. Augustine of Hippo',
    shortTitle: 'St. Augustine',
    feastDay: 'August 28',
    eraSpan: '354 – 430 AD · North Africa & Italy',
    trailSubtitle: '6 Stops · Algeria, Tunisia & Italy',
    overviewButtonLabel: 'Mediterranean',
    globeHeaderSubtitle: 'Sacred Trails of St. Augustine (Birthplace to Tomb)',
    overviewCamera: {
      camLat: 38.0,
      camLng: 9.5,
      camAltitude: 5.6,
      lookLat: 40.5,
      lookLng: 9.5,
      lookRadiusScale: 0.88,
    },
    highlightedIsoCountries: ['ITA', 'DZA', 'TUN'],
    completionSummary:
      'You traced St. Augustine’s footsteps across North Africa and Italy—from Souk Ahras, Algeria and Tunis, Tunisia to Milan, Ostia & Rome, Annaba, and his final resting place in Pavia, Italy.',
    stops: ST_AUGUSTINE_TRAIL_STOPS,
  },
  {
    id: 'thomas',
    saintName: 'St. Thomas the Apostle',
    shortTitle: 'St. Thomas',
    feastDay: 'July 3 (Dukrana)',
    eraSpan: '33 – 72 AD · Levant, India & Italy',
    trailSubtitle: '6 Stops · Jerusalem, Kerala, Chennai & Italy',
    overviewButtonLabel: 'Indo-Med Route',
    globeHeaderSubtitle: 'Sacred Trails of St. Thomas (Upper Room to India & Ortona)',
    overviewCamera: {
      camLat: 22.0,
      camLng: 54.0,
      camAltitude: 10.2,
      lookLat: 23.0,
      lookLng: 54.0,
      lookRadiusScale: 0.78,
    },
    highlightedIsoCountries: ['ISR', 'IND', 'ITA'],
    completionSummary:
      'You traced St. Thomas the Apostle’s footsteps from the Upper Room in Jerusalem across the Arabian Sea to Kodungallur and Palayoor in Kerala, Little Mount and San Thome in Chennai, India, and the Basilica of his relics in Ortona, Italy.',
    stops: ST_THOMAS_TRAIL_STOPS,
  },
];

/**
 * Automatically selects the featured Saint Trail of the Day based on the UTC calendar date,
 * so visitors see a rotating featured saint each day while retaining full freedom to switch!
 */
export function getDailySaintTrail(): SaintTrailProfile {
  const utcDayIndex = Math.floor(Date.now() / 86_400_000);
  return SAINT_TRAILS[utcDayIndex % SAINT_TRAILS.length];
}

