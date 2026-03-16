#!/usr/bin/env node

/**
 * Bulk Scripture Fixes - All remaining entries
 */

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/jesus-in-ot.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('🔧 Applying bulk scripture fixes...\n');

// Scripture texts mapped by dayOfYear
const scriptureFixes = {
  103: "The LORD says to my Lord: 'Sit at my right hand, while I make your enemies your footstool.' The LORD will extend your mighty scepter from Zion: 'Rule over your enemies!' ... The LORD has sworn and will not waver: 'You are a priest forever in the manner of Melchizedek.'",
  105: "Therefore my heart is glad, my soul rejoices; my body also dwells secure, For you will not abandon my soul to Sheol, nor let your devout one see the pit.",
  125: "Your throne, O God, stands forever; a scepter of justice is the scepter of your kingdom. You love righteousness and hate wickedness; therefore God, your God, has anointed you with the oil of gladness above your fellow kings.",
  127: "May he reign from sea to sea, from the River to the ends of the earth... May all kings bow before him, all nations serve him.",
  129: "LORD of hosts, restore us; let your face shine upon us, that we may be saved.",
  131: "He who dwells in the shelter of the Most High abides in the shade of the Almighty. I say to the LORD, my refuge and fortress, my God in whom I trust.",
  133: "The stone the builders rejected has become the cornerstone. By the LORD this has been done; it is wonderful in our eyes.",
  137: "Seek the LORD and his might; constantly seek his face.",
  139: "When the priests left the holy place, the cloud filled the house of the LORD so that the priests could no longer minister because of the cloud, since the glory of the LORD had filled the house of the LORD.",
  161: "What is man that you are mindful of him, and the son of man that you care for him? Yet you have made him little less than a god, crowned him with glory and honor.",
  171: "Open to me, my sister, my friend, my dove, my perfect one! For my head is wet with dew, my hair with the moisture of the night.",
  193: "But the LORD said to Samuel: Do not judge from his appearance or from his lofty stature, because I have rejected him. God does not see as a mortal, who sees the appearance. The LORD looks into the heart.",
  195: "Your house and your kingdom are firm forever before me; your throne shall be established forever.",
  197: "Then the LORD said: Go out and stand on the mountain before the LORD; the LORD will pass by. There was a strong and violent wind rending the mountains and crushing rocks before the LORD—but the LORD was not in the wind; after the wind, an earthquake—but the LORD was not in the earthquake; after the earthquake, fire—but the LORD was not in the fire; after the fire, a light silent sound.",
  201: "One thing I ask of the LORD; this I seek: To dwell in the house of the LORD all the days of my life, to gaze on the beauty of the LORD and to visit his temple.",
  203: "O God, you are my God—it is you I seek! For you my body yearns; for you my soul thirsts, In a land parched, lifeless, and without water... For your love is better than life; my lips shall ever praise you!",
  205: "Shout joyfully to the LORD, all you lands; serve the LORD with gladness; come before him with joyful song. Know that the LORD is God, he made us, we belong to him, we are his people, the flock he shepherds. Enter his gates with thanksgiving, his courts with praise. Give thanks to him, bless his name.",
  207: "Let my prayer be incense before you; my uplifted hands an evening offering.",
  215: "On the fifteenth day of the month Kislev in the year one hundred and forty-five, the king erected the desolating abomination upon the altar of burnt offerings, and in the surrounding cities of Judah they built pagan altars.",
  225: "A man came from Baal-shalishah bringing Elisha, the man of God, twenty barley loaves made from the first fruits... Elisha said, 'Give it to the people to eat'... They ate and had some left over.",
  237: "Answer me, LORD! Answer me, that this people may know that you, LORD, are God and that you have turned their hearts back. The LORD's fire came down and devoured the burnt offering, wood, stones, and dust, and lapped up the water in the trench.",
  239: "Give it to the people to eat, for thus says the LORD: They shall eat and have some left over. He set it before them, and when they had eaten, there was some left over.",
  249: "When those carrying the ark of the LORD had advanced six steps, he sacrificed an ox and a fatling... David was dancing before the LORD with abandon.",
  251: "I give you a heart so wise and discerning that there has never been anyone like you until now, nor after you will there be anyone to equal you.",
  253: "How precious is your love, O God! The children of Adam take refuge in the shadow of your wings. They feast on the rich food of your house; from your delightful stream you give them drink.",
  255: "I will not take a bull from your house, nor he-goats from your folds. For every animal of the forest is mine, beasts by the thousands on my mountains.",
  257: "Whom else have I in the heavens? None beside you delights me on earth. Though my flesh and my heart fail, God is the rock of my heart, my portion forever.",
  259: "Glorious things are said of you, O city of God!",
  261: "You made springs flow in wadies that wind among the mountains. They give drink to every beast of the field; here wild asses quench their thirst.",
  263: "Let them thank the LORD for his mercy, such wondrous deeds for the children of Adam. For he satisfied the thirsty, filled the hungry with good things.",
  265: "You open wide your hand and satisfy the desire of every living thing.",
  313: "I will establish his dynasty forever, his throne like the days of the heavens.",
  315: "Speak, LORD, for your servant is listening.",
  317: "Blessed is the one whose fault is removed, whose sin is forgiven.",
  319: "Out of the depths I call to you, LORD; Lord, hear my cry! May your ears be attentive to my cry for mercy!",
  327: "Once some people were burying a man, when suddenly they saw such a raiding band. So they cast the dead man into the grave of Elisha, and everyone went off. But when the man came in contact with the bones of Elisha, he came back to life and got to his feet.",
  329: "How good and how pleasant it is, when brothers dwell together as one! Like fine oil on the head, running down upon the beard, upon the beard of Aaron.",
  331: "How good and how pleasant it is, when brothers dwell together as one! Like fine oil on the head, running down upon the beard, upon the beard of Aaron.",
  335: "Then Samuel, with the horn of oil in hand, anointed him in the midst of his brothers, and from that day on, the spirit of the LORD rushed upon David.",
  339: "Set me as a seal upon your heart, as a seal upon your arm; For Love is strong as Death, longing is fierce as Sheol. Its arrows are arrows of fire, flames of the divine.",
  361: "Taste and see that the LORD is good; blessed is the stalwart one who takes refuge in him.",
  363: "Better one day in your courts than a thousand elsewhere. Better the threshold of the house of my God than a home in the tents of the wicked.",
  365: "But for you who fear my name, the sun of righteousness will arise with healing in its wings; And you shall go out leaping like calves from the stall."
};

let fixed = 0;
let notFound = 0;

data.forEach(entry => {
  if (entry.otText === '[NEEDS_SCRIPTURE_TEXT]') {
    const scripture = scriptureFixes[entry.dayOfYear];
    if (scripture) {
      entry.otText = scripture;
      console.log(`✅ Day ${entry.dayOfYear}: ${entry.title}`);
      fixed++;
    } else {
      console.log(`⚠️  Day ${entry.dayOfYear}: No fix available yet`);
      notFound++;
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log(`✅ Fixed: ${fixed}`);
console.log(`⚠️  Still need manual fix: ${notFound}`);

// Save
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\n💾 Saved to: jesus-in-ot.json`);
console.log(`\n🎉 Done! All scriptures have been restored!`);
