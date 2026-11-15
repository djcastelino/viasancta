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
      latDeg: 33.4,
      lngDeg: 4.4,
      regionLabel: 'Atlas Highlands, Northeastern Algeria',
      beaconColorHex: '#D4AF37',
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
      latDeg: 36.8,
      lngDeg: 11.8,
      regionLabel: 'Gulf of Tunis Coast, Tunisia',
      beaconColorHex: '#E09F3E',
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
      latDeg: 46.4,
      lngDeg: 8.2,
      regionLabel: 'Lombardy Plains, Northern Italy',
      beaconColorHex: '#52B788',
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
      latDeg: 41.3,
      lngDeg: 13.6,
      regionLabel: 'Tiber River Port & Rome, Central Italy',
      beaconColorHex: '#6495ED',
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
      latDeg: 37.1,
      lngDeg: 7.4,
      regionLabel: 'Mediterranean Coast, Northeastern Algeria',
      beaconColorHex: '#E07A5F',
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
      latDeg: 44.3,
      lngDeg: 10.4,
      regionLabel: 'Ticino Valley (South of Milan), Italy',
      beaconColorHex: '#C77DFF',
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
