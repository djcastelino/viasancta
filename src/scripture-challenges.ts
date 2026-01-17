import type { ScriptureChallenge } from './types/scripture';

export const SCRIPTURE_CHALLENGES: ScriptureChallenge[] = [
  // OLD TESTAMENT - EASY (10 characters)
  {
    id: 1,
    name: "Moses",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Led a large group of people out of captivity",
      "Closely associated with Egypt and Pharaoh",
      "Received important laws on a mountain",
      "Had a brother named Aaron and sister named Miriam",
      "Parted a large body of water to escape enemies",
      "Carried a wooden staff that performed miracles"
    ],
    books: ["Exodus", "Numbers", "Deuteronomy"],
    role: "Prophet & Leader",
    famousFor: "Led the Exodus from Egypt and received the Ten Commandments",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Moses_with_the_Tablets_of_the_Law_by_Moritz_Daniel_Oppenheim%2C_1818.jpg"
  },
  {
    id: 2,
    name: "David",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Started as a humble shepherd in their youth",
      "Was skilled at playing musical instruments",
      "Faced a seemingly impossible challenge with courage",
      "Used an unconventional weapon in famous victory",
      "Became the most celebrated king of Israel",
      "Defeated the giant Goliath with a sling and stone"
    ],
    books: ["1 Samuel", "2 Samuel", "1 Kings", "Psalms"],
    role: "King & Psalmist",
    famousFor: "Defeated Goliath and became Israel's greatest king",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Artemisia_Gentileschi_-_David_with_the_head_of_Goliath.jpg"
  },
  {
    id: 3,
    name: "Noah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Was considered righteous in a corrupt generation",
      "Received unusual instructions for a massive construction project",
      "Gathered many pairs of creatures for preservation",
      "Built a large vessel to survive catastrophic judgment",
      "Sent out birds to search for dry ground",
      "Survived the great flood and saw God's rainbow covenant"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Built the ark and survived the great flood",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Noah-crop.jpg"
  },
  {
    id: 4,
    name: "Abraham",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Left his homeland to go to an unknown place",
      "Was promised countless descendants like stars",
      "Originally had a different name",
      "Father of Isaac and Ishmael",
      "Was tested by being asked to sacrifice his son",
      "Considered the father of many nations"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Father of the Israelite nation and man of great faith"
  },
  {
    id: 5,
    name: "Joseph",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Was deeply loved by their father but resented by siblings",
      "Had prophetic dreams that angered their family",
      "Was betrayed and sold into slavery",
      "Received a special colorful garment from their father",
      "Rose to power in Egypt through dream interpretation",
      "Eventually forgave the brothers who betrayed them"
    ],
    books: ["Genesis"],
    role: "Patriarch & Leader",
    famousFor: "Wore a coat of many colors and saved Egypt from famine"
  },
  {
    id: 6,
    name: "Solomon",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Inherited the throne from a famous warrior king",
      "Asked God for wisdom rather than riches or long life",
      "Made a famous judgment involving a disputed baby",
      "Built the magnificent temple in Jerusalem",
      "Wrote thousands of proverbs and songs",
      "Son of David and Bathsheba, known as the wisest king"
    ],
    books: ["1 Kings", "2 Chronicles", "Proverbs", "Ecclesiastes"],
    role: "King",
    famousFor: "Wisest king who built the temple"
  },
  {
    id: 7,
    name: "Daniel",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Taken captive to Babylon as a young man",
      "Refused to eat the king's rich food",
      "Could interpret dreams and visions",
      "Thrown into a den with dangerous animals",
      "The animals did not harm him",
      "Prayed three times daily facing Jerusalem"
    ],
    books: ["Daniel"],
    role: "Prophet",
    famousFor: "Survived the lion's den through faith"
  },
  {
    id: 8,
    name: "Samson",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Was dedicated to God before birth with special vows",
      "Possessed extraordinary physical abilities",
      "Defeated a dangerous predator with bare hands",
      "Had a secret weakness connected to their appearance",
      "Fell in love with Delilah who betrayed them",
      "Destroyed a Philistine temple - power was in uncut hair"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Strongest man whose power was in his hair"
  },
  {
    id: 9,
    name: "Adam",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Lived in a perfect garden with complete freedom",
      "Was given dominion over all living creatures",
      "Named every animal in creation",
      "Received a companion made from their own body",
      "Disobeyed by eating forbidden fruit",
      "The very first human being God created"
    ],
    books: ["Genesis"],
    role: "First Man",
    famousFor: "First human created by God"
  },
  {
    id: 10,
    name: "Jonah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Tried to flee from a divine assignment",
      "Boarded a ship sailing away from their destination",
      "Was thrown overboard during a violent storm",
      "Had an extraordinary three-day survival experience",
      "Was swallowed by a giant sea creature",
      "Eventually preached repentance to Nineveh"
    ],
    books: ["Jonah"],
    role: "Prophet",
    famousFor: "Swallowed by a great fish"
  },

  // NEW TESTAMENT - EASY (10 characters)
  {
    id: 11,
    name: "Jesus",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Born in Bethlehem in a stable",
      "Performed many miracles including healing the sick",
      "Taught using parables and stories",
      "Had twelve close followers",
      "Was crucified on a cross",
      "Rose from the dead after three days"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Messiah & Savior",
    famousFor: "Central figure of Christianity, Son of God"
  },
  {
    id: 12,
    name: "Peter",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was part of Jesus's inner circle of closest followers",
      "Made bold declarations but sometimes acted impulsively",
      "Had a brother who was also a disciple",
      "Was given a new name by Jesus meaning 'rock'",
      "Denied knowing Jesus three times before the rooster crowed",
      "Originally a fisherman, became leader of the early church"
    ],
    books: ["Matthew", "Mark", "Luke", "John", "Acts"],
    role: "Apostle",
    famousFor: "Walked on water and denied Jesus three times"
  },
  {
    id: 13,
    name: "Paul",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Originally persecuted Christians violently",
      "Had a dramatic conversion on a road",
      "Was temporarily blinded by a bright light",
      "Changed his name after conversion",
      "Wrote many letters to early churches",
      "Traveled extensively as a missionary"
    ],
    books: ["Acts", "Romans", "1 Corinthians", "2 Corinthians", "Galatians"],
    role: "Apostle & Missionary",
    famousFor: "Converted from persecutor to greatest missionary"
  },
  {
    id: 14,
    name: "Mary",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was a young woman living in Nazareth",
      "Received a life-changing visit from an angel",
      "Was engaged to a carpenter named Joseph",
      "Gave birth in unusual circumstances in Bethlehem",
      "Witnessed her son's crucifixion and resurrection",
      "Virgin mother of Jesus Christ, visited by Gabriel"
    ],
    books: ["Matthew", "Luke", "John", "Acts"],
    role: "Mother of Jesus",
    famousFor: "Virgin mother of Jesus"
  },
  {
    id: 15,
    name: "John the Baptist",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Lived an austere lifestyle in the wilderness",
      "Preached a message of repentance and preparation",
      "Baptized people in the Jordan River for repentance",
      "Had unusual clothing and diet of locusts and honey",
      "Baptized Jesus and saw the Spirit descend like a dove",
      "Was beheaded by King Herod at Herodias's request"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Prophet",
    famousFor: "Baptized Jesus and prepared his way"
  },
  {
    id: 16,
    name: "Judas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of the twelve closest followers",
      "Managed the finances for the group",
      "Made a secret deal with religious authorities",
      "Identified their target with a kiss in a garden",
      "Betrayed Jesus for thirty pieces of silver",
      "Felt deep remorse and died by hanging himself"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle (betrayer)",
    famousFor: "Betrayed Jesus for thirty pieces of silver"
  },
  {
    id: 17,
    name: "Thomas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of the twelve disciples of Jesus",
      "Expressed willingness to die alongside Jesus",
      "Was absent when Jesus first appeared to the disciples",
      "Insisted on physical proof before believing a report",
      "Wanted to touch the wounds to confirm the resurrection",
      "Known as 'Doubting Thomas' until he saw and believed"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "Doubted Jesus's resurrection until he saw proof"
  },
  {
    id: 18,
    name: "John",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Was one of Jesus's three closest disciples",
      "Brother of James, son of Zebedee",
      "Called the 'disciple whom Jesus loved'",
      "Wrote a gospel and several letters",
      "Wrote the book of Revelation",
      "Was exiled to the island of Patmos"
    ],
    books: ["John", "1 John", "2 John", "3 John", "Revelation"],
    role: "Apostle & Author",
    famousFor: "Beloved disciple who wrote five books"
  },
  {
    id: 19,
    name: "Matthew",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Worked as a tax collector before following Jesus",
      "Was despised by his fellow Jews",
      "Left everything to become a disciple",
      "Also known as Levi",
      "Wrote one of the four gospels",
      "His gospel emphasizes Jesus as the Messiah"
    ],
    books: ["Matthew"],
    role: "Apostle & Gospel Writer",
    famousFor: "Tax collector who became a gospel writer"
  },
  {
    id: 20,
    name: "Mary Magdalene",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Had seven demons cast out of her",
      "Became a devoted follower of Jesus",
      "Was present at the crucifixion",
      "Went to the tomb early on Sunday morning",
      "Was the first to see Jesus after resurrection",
      "Told the disciples about the empty tomb"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Disciple",
    famousFor: "First witness to Jesus's resurrection"
  },

  // OLD TESTAMENT - MEDIUM (15 characters)
  {
    id: 21,
    name: "Ruth",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was not born an Israelite",
      "Showed great loyalty to her mother-in-law",
      "Said 'Where you go, I will go'",
      "Worked gleaning in barley fields",
      "Married a wealthy relative named Boaz",
      "Great-grandmother of King David"
    ],
    books: ["Ruth"],
    role: "Faithful Woman",
    famousFor: "Loyal daughter-in-law and ancestor of David"
  },
  {
    id: 22,
    name: "Esther",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was an orphan raised by her cousin",
      "Became queen of Persia",
      "Hid her Jewish identity initially",
      "Risked her life by approaching the king uninvited",
      "Saved her people from genocide",
      "Said 'If I perish, I perish'"
    ],
    books: ["Esther"],
    role: "Queen",
    famousFor: "Saved the Jewish people from destruction"
  },
  {
    id: 23,
    name: "Elijah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Confronted 450 prophets of Baal",
      "Called down fire from heaven",
      "Was fed by ravens during a drought",
      "Raised a widow's son from the dead",
      "Did not die but was taken to heaven",
      "Went up in a whirlwind with chariots of fire"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Taken to heaven in a whirlwind"
  },
  {
    id: 24,
    name: "Joshua",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Moses's assistant and successor",
      "Led Israel into the Promised Land",
      "Commanded the sun to stand still",
      "Marched around a city for seven days",
      "The walls of Jericho fell before him",
      "Divided the land among the twelve tribes"
    ],
    books: ["Joshua"],
    role: "Military Leader",
    famousFor: "Led conquest of Canaan and battle of Jericho"
  },
  {
    id: 25,
    name: "Samuel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "His mother dedicated him to God before birth",
      "Served in the temple as a young boy",
      "Heard God's voice calling him at night",
      "Was the last judge of Israel",
      "Anointed the first two kings of Israel",
      "Wrote about the rights of kingship"
    ],
    books: ["1 Samuel", "2 Samuel"],
    role: "Prophet & Judge",
    famousFor: "Anointed both Saul and David as kings"
  },
  {
    id: 26,
    name: "Aaron",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Moses's older brother",
      "Served as spokesman for Moses",
      "Became the first high priest of Israel",
      "His staff budded with almonds",
      "Made a golden calf when Moses was away",
      "Wore special priestly garments"
    ],
    books: ["Exodus", "Leviticus", "Numbers"],
    role: "High Priest",
    famousFor: "First high priest and Moses's brother"
  },
  {
    id: 27,
    name: "Gideon",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was threshing wheat in a winepress",
      "Called by an angel to save Israel",
      "Asked for signs with a fleece",
      "Reduced his army from 32,000 to 300",
      "Used trumpets and torches in battle",
      "Defeated the Midianites with a small force"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Defeated vast army with only 300 men"
  },
  {
    id: 28,
    name: "Elisha",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was Elijah's servant and successor",
      "Received a double portion of Elijah's spirit",
      "Parted the Jordan River with a cloak",
      "Purified poisoned water with salt",
      "Made an axe head float on water",
      "Performed twice as many miracles as his mentor"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Succeeded Elijah and performed many miracles"
  },
  {
    id: 29,
    name: "Job",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was considered the most righteous person in their land",
      "Had immense wealth in livestock and servants",
      "Became the subject of a test between God and Satan",
      "Lost all possessions and family in a single day",
      "Sat in ashes covered with painful sores",
      "Three friends debated the cause of his suffering"
    ],
    books: ["Job"],
    role: "Righteous Sufferer",
    famousFor: "Remained faithful despite terrible suffering"
  },
  {
    id: 30,
    name: "Deborah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was a prophetess in Israel",
      "Served as a judge under a palm tree",
      "Led Israel during a time of oppression",
      "Summoned Barak to lead the army",
      "Went into battle with the military commander",
      "Sang a victory song after the battle"
    ],
    books: ["Judges"],
    role: "Prophetess & Judge",
    famousFor: "Only female judge of Israel"
  },
  {
    id: 31,
    name: "Isaiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Had a vision of God on a throne",
      "Saw angels with six wings",
      "Was touched by a burning coal on his lips",
      "Prophesied about a virgin birth",
      "Wrote about a suffering servant",
      "His book is the longest prophetic book"
    ],
    books: ["Isaiah"],
    role: "Prophet",
    famousFor: "Prophesied about the Messiah's coming"
  },
  {
    id: 32,
    name: "Jeremiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Called the 'weeping prophet'",
      "Was appointed before he was born",
      "Prophesied Jerusalem's destruction",
      "Was thrown into a muddy cistern",
      "Wrote lamentations about Jerusalem",
      "Witnessed the fall of Jerusalem"
    ],
    books: ["Jeremiah", "Lamentations"],
    role: "Prophet",
    famousFor: "Wept over Jerusalem's destruction"
  },
  {
    id: 33,
    name: "Nehemiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Served as cupbearer to a Persian king",
      "Was grieved by news about Jerusalem",
      "Led the rebuilding of city walls",
      "Completed the wall in 52 days",
      "Faced opposition from Sanballat",
      "Workers built with tools in one hand and weapons in the other"
    ],
    books: ["Nehemiah"],
    role: "Governor & Rebuilder",
    famousFor: "Rebuilt Jerusalem's walls"
  },
  {
    id: 34,
    name: "Ezra",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was a priest and scribe",
      "Led a group of exiles back to Jerusalem",
      "Was skilled in the Law of Moses",
      "Taught the people God's law",
      "Wept over the people's intermarriage",
      "Led a spiritual revival in Jerusalem"
    ],
    books: ["Ezra", "Nehemiah"],
    role: "Priest & Scribe",
    famousFor: "Led spiritual renewal after exile"
  },
  {
    id: 35,
    name: "Saul",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was head and shoulders taller than others",
      "Was anointed as Israel's first king",
      "Started well but became disobedient",
      "Became jealous of David's success",
      "Consulted a medium at Endor",
      "Died by falling on his own sword"
    ],
    books: ["1 Samuel"],
    role: "King",
    famousFor: "First king of Israel who fell from grace"
  },

  // NEW TESTAMENT - MEDIUM (15 characters)
  {
    id: 36,
    name: "Luke",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a physician by profession",
      "Traveled with Paul on missionary journeys",
      "Wrote a gospel and a sequel",
      "His gospel emphasizes Jesus's compassion",
      "Wrote the book of Acts",
      "Was a Gentile believer"
    ],
    books: ["Luke", "Acts"],
    role: "Gospel Writer & Historian",
    famousFor: "Doctor who wrote gospel and Acts"
  },
  {
    id: 37,
    name: "Mark",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Also known as John Mark",
      "His mother's house was a meeting place",
      "Traveled with Paul and Barnabas initially",
      "Left them during the first journey",
      "Later reconciled with Paul",
      "Wrote the shortest gospel"
    ],
    books: ["Mark"],
    role: "Gospel Writer",
    famousFor: "Wrote action-packed gospel"
  },
  {
    id: 38,
    name: "Stephen",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was one of the first seven deacons",
      "Was full of faith and power",
      "Performed great wonders and signs",
      "Gave a long speech before the council",
      "Saw heaven opened before his death",
      "Was the first Christian martyr"
    ],
    books: ["Acts"],
    role: "Deacon & Martyr",
    famousFor: "First Christian martyr"
  },
  {
    id: 39,
    name: "Barnabas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "His name means 'son of encouragement'",
      "Sold his land to help the church",
      "Introduced Paul to the apostles",
      "Traveled with Paul on missionary journeys",
      "Defended Mark when Paul rejected him",
      "Was a Levite from Cyprus"
    ],
    books: ["Acts"],
    role: "Apostle & Encourager",
    famousFor: "Encouraged and mentored early believers"
  },
  {
    id: 40,
    name: "Timothy",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Had a Jewish mother and Greek father",
      "Was Paul's spiritual son",
      "Joined Paul on his second journey",
      "Was young but faithful",
      "Received two letters from Paul",
      "Served as pastor in Ephesus"
    ],
    books: ["1 Timothy", "2 Timothy"],
    role: "Pastor & Missionary",
    famousFor: "Paul's young protégé and pastor"
  },
  {
    id: 41,
    name: "James",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was Jesus's half-brother",
      "Did not believe in Jesus at first",
      "Became a leader in Jerusalem church",
      "Wrote a practical letter about faith",
      "Emphasized that faith produces works",
      "Was martyred in Jerusalem"
    ],
    books: ["James"],
    role: "Church Leader & Author",
    famousFor: "Jesus's brother who led Jerusalem church"
  },
  {
    id: 42,
    name: "Lazarus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Bethany with his sisters",
      "Was a close friend of Jesus",
      "Became very sick and died",
      "Was in the tomb for four days",
      "Jesus wept at his tomb",
      "Was raised from the dead"
    ],
    books: ["John"],
    role: "Friend of Jesus",
    famousFor: "Raised from dead after four days"
  },
  {
    id: 43,
    name: "Zacchaeus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a chief tax collector",
      "Was very wealthy but despised",
      "Was short in stature",
      "Climbed a tree to see Jesus",
      "Jesus invited himself to his house",
      "Promised to repay those he cheated"
    ],
    books: ["Luke"],
    role: "Tax Collector",
    famousFor: "Short tax collector who climbed a tree"
  },
  {
    id: 44,
    name: "Nicodemus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a Pharisee and member of the Sanhedrin",
      "Came to Jesus at night",
      "Jesus told him he must be born again",
      "Asked how someone can be born twice",
      "Defended Jesus before the council",
      "Helped prepare Jesus's body for burial"
    ],
    books: ["John"],
    role: "Pharisee",
    famousFor: "Came to Jesus by night to learn"
  },
  {
    id: 45,
    name: "Philip",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was one of the twelve apostles",
      "Brought Nathanael to Jesus",
      "Asked Jesus to show them the Father",
      "Found a boy with loaves and fish",
      "Was from Bethsaida like Peter and Andrew",
      "Greeks came to him wanting to see Jesus"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "Brought others to Jesus"
  },
  {
    id: 46,
    name: "Pontius Pilate",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was the Roman governor of Judea",
      "Found no fault in Jesus",
      "Washed his hands before the crowd",
      "Gave the people a choice between prisoners",
      "His wife warned him about Jesus",
      "Ordered Jesus's crucifixion"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Roman Governor",
    famousFor: "Sentenced Jesus to crucifixion"
  },
  {
    id: 47,
    name: "Silas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was a leader in the Jerusalem church",
      "Traveled with Paul after Barnabas left",
      "Was beaten and imprisoned in Philippi",
      "Sang hymns in prison at midnight",
      "Was freed by an earthquake",
      "Also known as Silvanus"
    ],
    books: ["Acts"],
    role: "Missionary",
    famousFor: "Sang in prison with Paul"
  },
  {
    id: 48,
    name: "Andrew",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Was originally a disciple of John the Baptist",
      "Was Peter's brother",
      "Was one of the first to follow Jesus",
      "Brought his brother to Jesus",
      "Found the boy with loaves and fish",
      "Was a fisherman from Bethsaida"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Apostle",
    famousFor: "First disciple who brought others to Jesus"
  },
  {
    id: 49,
    name: "Martha",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Bethany with her siblings",
      "Was busy with serving and preparations",
      "Complained that her sister wasn't helping",
      "Jesus told her she was worried about many things",
      "Confessed Jesus as the Messiah",
      "Her brother was raised from the dead"
    ],
    books: ["Luke", "John"],
    role: "Disciple",
    famousFor: "Busy hostess who learned to prioritize"
  },
  {
    id: 50,
    name: "Ananias",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Lived in Damascus",
      "Was a devout follower of the law",
      "Had a vision from the Lord",
      "Was told to go to Straight Street",
      "Laid hands on a blind persecutor",
      "Restored Saul's sight"
    ],
    books: ["Acts"],
    role: "Disciple",
    famousFor: "Restored Paul's sight after conversion"
  },

  // ========== NEW CHARACTERS (51-100) ==========

  // EASY - Old Testament (10 characters)
  {
    id: 51,
    name: "Jacob",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A twin born second, grasping his brother's heel",
      "Traded food for something valuable from a sibling",
      "Deceived his father to receive a blessing",
      "Wrestled with a divine being all night",
      "Received a new name meaning 'he struggles with God'",
      "Father of twelve sons who became tribes of a nation"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Father of the twelve tribes and wrestling with God"
  },
  {
    id: 52,
    name: "Ruth",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A foreigner who became part of a chosen people",
      "Lost her husband but stayed loyal to her mother-in-law",
      "Said 'Where you go I will go'",
      "Gleaned grain in the fields of a relative",
      "Married a kinsman-redeemer named Boaz",
      "Great-grandmother of King David"
    ],
    books: ["Ruth"],
    role: "Moabite woman",
    famousFor: "Loyalty to Naomi and ancestor of David and Jesus"
  },
  {
    id: 53,
    name: "Elisha",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A farmer called to a greater purpose",
      "Poured water on the hands of a great prophet",
      "Asked for a double portion of his master's spirit",
      "Witnessed his mentor taken up in a whirlwind",
      "Healed a Syrian commander's leprosy in a river",
      "Performed twice as many miracles as his predecessor"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Successor to Elijah with twice the miracles"
  },
  {
    id: 54,
    name: "Esther",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "An orphan raised by her cousin Mordecai",
      "Chosen from many beautiful women across an empire",
      "Kept her nationality secret from her husband",
      "Risked death by approaching the throne uninvited",
      "Said 'If I perish, I perish'",
      "Saved her people from genocide in Persia"
    ],
    books: ["Esther"],
    role: "Queen",
    famousFor: "Saving the Jewish people from Haman's plot"
  },
  {
    id: 55,
    name: "Joshua",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Served as an assistant to the great lawgiver",
      "One of twelve spies with a good report",
      "Commanded the sun and moon to stand still",
      "Led people across a river on dry ground",
      "Marched around a city for seven days",
      "Succeeded Moses and conquered the Promised Land"
    ],
    books: ["Exodus", "Numbers", "Joshua"],
    role: "Military Leader",
    famousFor: "Leading Israel into the Promised Land and Battle of Jericho"
  },
  {
    id: 56,
    name: "Isaac",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "His name means 'laughter'",
      "Born to parents in their old age",
      "Nearly sacrificed by his father on a mountain",
      "Married a woman chosen by a servant",
      "Deceived by his son regarding a blessing",
      "Son of Abraham and father of twins"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Child of promise and near-sacrifice on Mount Moriah"
  },
  {
    id: 57,
    name: "Jonah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A prophet who ran from his calling",
      "Boarded a ship heading the opposite direction",
      "Thrown overboard during a storm",
      "Spent three days and nights in an unusual place",
      "Preached to Nineveh with great success",
      "Got angry when enemies repented and were spared"
    ],
    books: ["Jonah"],
    role: "Prophet",
    famousFor: "Swallowed by a great fish and reluctant missionary"
  },
  {
    id: 58,
    name: "Jeremiah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Called by God while still very young",
      "Known as the weeping prophet",
      "Thrown into a muddy cistern",
      "Prophesied the destruction of Jerusalem",
      "Purchased a field during a siege",
      "Foretold a new covenant written on hearts"
    ],
    books: ["Jeremiah", "Lamentations"],
    role: "Prophet",
    famousFor: "Weeping prophet who foretold exile and new covenant"
  },
  {
    id: 59,
    name: "Gideon",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Threshing wheat in a winepress when called",
      "Asked for miraculous signs with fleece",
      "Tore down his father's altar to a false god",
      "Started with thousands but ended with three hundred",
      "Defeated an army with torches and trumpets",
      "Judge who conquered Midian with a small force"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Defeating Midianites with 300 men, trumpets, and torches"
  },
  {
    id: 60,
    name: "Hannah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Deeply distressed and wept bitterly",
      "Prayed silently in the temple at Shiloh",
      "Accused of being drunk while praying",
      "Made a vow to dedicate her child to God",
      "Named her son 'heard by God'",
      "Mother of the prophet who anointed kings"
    ],
    books: ["1 Samuel"],
    role: "Mother",
    famousFor: "Mother of Samuel, dedicated him to temple service"
  },

  // EASY - New Testament (5 characters)
  {
    id: 61,
    name: "Stephen",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Chosen to serve tables and distribute food",
      "Full of grace and power, performed wonders",
      "His face shone like an angel's during trial",
      "Gave a lengthy speech recounting history",
      "Saw heaven opened before his death",
      "First Christian martyr, stoned while forgiving his killers"
    ],
    books: ["Acts"],
    role: "Deacon/Martyr",
    famousFor: "First Christian martyr who saw Jesus standing at God's right hand"
  },
  {
    id: 62,
    name: "Barnabas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "His name means 'son of encouragement'",
      "Sold his land and gave money to apostles",
      "Vouched for a former persecutor in Jerusalem",
      "Sent to investigate believers in Antioch",
      "Traveled on missionary journeys with a close partner",
      "Disagreed about giving a young man a second chance"
    ],
    books: ["Acts"],
    role: "Apostle/Missionary",
    famousFor: "Encourager who mentored Paul and gave Mark a second chance"
  },
  {
    id: 63,
    name: "Zacchaeus",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Short in stature but wealthy",
      "Despised by his community for his profession",
      "Climbed a tree to see over a crowd",
      "Received an unexpected dinner invitation",
      "Promised to give half his possessions to the poor",
      "Tax collector who repaid what he had stolen fourfold"
    ],
    books: ["Luke"],
    role: "Tax Collector",
    famousFor: "Wealthy tax collector who climbed a tree and repented"
  },
  {
    id: 64,
    name: "Philip",
    testament: "New",
    difficulty: "easy",
    clues: [
      "One of the original twelve followers",
      "From the same town as two other apostles",
      "Found a friend and said 'Come and see'",
      "Asked where to buy bread for a large crowd",
      "Brought Greek seekers to meet the Teacher",
      "Asked to be shown the Father, receiving a gentle rebuke"
    ],
    books: ["John", "Acts"],
    role: "Apostle",
    famousFor: "Apostle who brought Nathanael and asked to see the Father"
  },
  {
    id: 65,
    name: "Timothy",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Had a Jewish mother and Greek father",
      "Mentored by a spiritual father figure",
      "Received two personal letters of instruction",
      "Advised to take wine for his stomach",
      "Told not to let anyone look down on his youth",
      "Young pastor of Ephesus, Paul's trusted companion"
    ],
    books: ["Acts", "1 Timothy", "2 Timothy"],
    role: "Pastor",
    famousFor: "Young pastor mentored by Paul with two letters written to him"
  },

  // MEDIUM - Old Testament (15 characters)
  {
    id: 66,
    name: "Deborah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Held court under a palm tree",
      "Both a judge and prophetess",
      "Called a military commander named Barak",
      "Went into battle alongside the men",
      "Prophesied victory would go to a woman",
      "Led Israel and sang a victory song"
    ],
    books: ["Judges"],
    role: "Judge/Prophetess",
    famousFor: "Only female judge of Israel who led in battle"
  },
  {
    id: 67,
    name: "Nehemiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Served as cupbearer to a foreign king",
      "Wept when hearing about his homeland's walls",
      "Received permission and resources to rebuild",
      "Faced opposition from Sanballat and Tobiah",
      "Workers held weapons while building",
      "Rebuilt Jerusalem's walls in 52 days"
    ],
    books: ["Nehemiah"],
    role: "Governor/Rebuilder",
    famousFor: "Rebuilt Jerusalem's walls despite opposition in 52 days"
  },
  {
    id: 68,
    name: "Caleb",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "One of twelve scouts sent into a land",
      "Gave a minority report with positive outlook",
      "Wandered in the wilderness for forty years",
      "Outlived his entire generation",
      "Asked for a mountain inhabited by giants at age 85",
      "Received Hebron as his inheritance for faithful report"
    ],
    books: ["Numbers", "Joshua"],
    role: "Spy/Warrior",
    famousFor: "Faithful spy who conquered giants at age 85"
  },
  {
    id: 69,
    name: "Ezra",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A priest and teacher of the Law",
      "Skilled scribe devoted to studying Scripture",
      "Led a return from exile to Jerusalem",
      "Fasted and prayed for safe journey",
      "Grieved over intermarriage with foreigners",
      "Read and explained the Law to gathered people"
    ],
    books: ["Ezra", "Nehemiah"],
    role: "Priest/Scribe",
    famousFor: "Scribe who led spiritual revival and taught the Law"
  },
  {
    id: 70,
    name: "Hezekiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Became king at age 25",
      "Removed high places and broke sacred stones",
      "Prayed when his city was surrounded",
      "Showed his treasures to Babylonian envoys",
      "Turned his face to the wall when given bad news",
      "King granted 15 extra years of life after prayer"
    ],
    books: ["2 Kings", "2 Chronicles", "Isaiah"],
    role: "King",
    famousFor: "Righteous king whose life was extended 15 years"
  },
  {
    id: 71,
    name: "Naaman",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A great commander of a foreign army",
      "Had a serious skin disease",
      "Learned about healing from a young servant girl",
      "Initially angry at simple instructions given",
      "Washed seven times in a muddy river",
      "Syrian general healed of leprosy by a prophet"
    ],
    books: ["2 Kings"],
    role: "Military Commander",
    famousFor: "Syrian general healed of leprosy by washing in Jordan River"
  },
  {
    id: 72,
    name: "Mordecai",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Raised his orphaned cousin as his own daughter",
      "Uncovered a plot to assassinate the king",
      "Refused to bow to a high official",
      "Wore sackcloth and ashes in public mourning",
      "Honored with a royal robe and parade",
      "Became second in command of Persia after saving his people"
    ],
    books: ["Esther"],
    role: "Jewish Official",
    famousFor: "Esther's cousin who helped save the Jews from genocide"
  },
  {
    id: 73,
    name: "Josiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Became king at eight years old",
      "Ordered repairs to the temple",
      "The Book of the Law was found during renovations",
      "Tore his robes when hearing God's words",
      "Destroyed idols and high places throughout the land",
      "Boy king who brought spiritual reform to Judah"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Boy king who led greatest religious reform after finding the Law"
  },
  {
    id: 74,
    name: "Boaz",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A wealthy landowner in Bethlehem",
      "Noticed a foreign woman gleaning in his fields",
      "Extended protection and kindness to a widow",
      "Acted as kinsman-redeemer",
      "Married a Moabite woman",
      "Great-grandfather of King David, ancestor of Jesus"
    ],
    books: ["Ruth"],
    role: "Kinsman-Redeemer",
    famousFor: "Redeemed and married Ruth, ancestor of David and Jesus"
  },
  {
    id: 75,
    name: "Shadrach",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Taken into exile as a young man",
      "Given a Babylonian name by captors",
      "Refused to defile himself with royal food",
      "Promoted to high position in province",
      "Would not bow to a golden image",
      "Thrown into a furnace with two friends but protected by a fourth figure"
    ],
    books: ["Daniel"],
    role: "Exile",
    famousFor: "Survived fiery furnace with Meshach and Abednego"
  },
  {
    id: 76,
    name: "Amos",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A shepherd and fig tree farmer",
      "Not trained as a prophet or prophet's son",
      "Called from tending flocks to prophesy",
      "Denounced injustice and oppression of the poor",
      "Spoke of a coming day of the Lord",
      "Simple herdsman who prophesied against Israel's social injustice"
    ],
    books: ["Amos"],
    role: "Prophet",
    famousFor: "Shepherd prophet who condemned social injustice"
  },
  {
    id: 77,
    name: "Hosea",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Given an unusual command about marriage",
      "Told to marry an unfaithful woman",
      "Named his children with prophetic meanings",
      "Took back his wayward wife",
      "His marriage illustrated God's relationship with a nation",
      "Prophet whose unfaithful wife symbolized Israel's unfaithfulness"
    ],
    books: ["Hosea"],
    role: "Prophet",
    famousFor: "Married unfaithful Gomer to illustrate God's faithful love for Israel"
  },
  {
    id: 78,
    name: "Micah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A prophet from a small town",
      "Prophesied during reigns of multiple kings",
      "Announced what the Lord requires: justice, mercy, humility",
      "Condemned corrupt leaders and false prophets",
      "Predicted a ruler would come from a small town",
      "Prophet who foretold the Messiah's birthplace"
    ],
    books: ["Micah"],
    role: "Prophet",
    famousFor: "Prophesied Messiah would be born in Bethlehem"
  },
  {
    id: 79,
    name: "Rahab",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Lived in a house built into the city wall",
      "Had a profession that was looked down upon",
      "Hid two spies on her roof",
      "Hung a scarlet cord from her window",
      "Saved her entire family during a conquest",
      "Mentioned in the genealogy of Jesus"
    ],
    books: ["Joshua", "Matthew", "Hebrews"],
    role: "Canaanite Woman",
    famousFor: "Prostitute who hid spies and became ancestor of Jesus"
  },
  {
    id: 80,
    name: "Joel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Prophesied about a devastating locust plague",
      "Called for a sacred assembly and fasting",
      "Spoke of the day of the Lord coming",
      "Foretold God's Spirit being poured out on all people",
      "Prophesied sons and daughters would prophesy",
      "Prophet whose words Peter quoted at Pentecost"
    ],
    books: ["Joel"],
    role: "Prophet",
    famousFor: "Prophesied outpouring of the Spirit quoted at Pentecost"
  },

  // MEDIUM - New Testament (5 characters)
  {
    id: 81,
    name: "Lydia",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A businesswoman who sold purple cloth",
      "Worshiped God by a river on the Sabbath",
      "Heart was opened to respond to a message",
      "First European convert to Christianity",
      "Insisted on hospitality for traveling missionaries",
      "Wealthy merchant in Philippi who hosted the church"
    ],
    books: ["Acts"],
    role: "Businesswoman/Believer",
    famousFor: "First European Christian convert, dealer of purple cloth"
  },
  {
    id: 82,
    name: "Cornelius",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A Roman military officer",
      "Devout and God-fearing with his household",
      "Gave generously to those in need",
      "Had a vision of a messenger at three in the afternoon",
      "Sent for a man staying in Joppa",
      "First Gentile convert, received the Holy Spirit"
    ],
    books: ["Acts"],
    role: "Roman Centurion",
    famousFor: "First Gentile Christian convert who received the Holy Spirit"
  },
  {
    id: 83,
    name: "Silas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A leader among the believers in Jerusalem",
      "Chosen to accompany a letter to Gentile believers",
      "Became a traveling companion after a disagreement",
      "Beaten and imprisoned in a Macedonian city",
      "Sang hymns at midnight while in chains",
      "Paul's companion who praised God during earthquake in prison"
    ],
    books: ["Acts"],
    role: "Missionary",
    famousFor: "Paul's missionary companion who sang in prison during earthquake"
  },
  {
    id: 84,
    name: "Priscilla",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A tentmaker by trade with her husband",
      "Fled from Rome due to an emperor's edict",
      "Worked alongside a fellow tentmaker",
      "Taught a learned speaker more accurately",
      "A church met in her house",
      "Instructed Apollos with her husband Aquila"
    ],
    books: ["Acts", "Romans", "1 Corinthians"],
    role: "Teacher/Missionary",
    famousFor: "Taught Apollos with husband Aquila, hosted house church"
  },
  {
    id: 85,
    name: "Titus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A Gentile believer and trusted co-worker",
      "Sent to handle a difficult church situation",
      "Brought encouraging news about reconciliation",
      "Received a pastoral letter of instruction",
      "Left in Crete to organize churches",
      "Paul's representative in Corinth and Crete"
    ],
    books: ["2 Corinthians", "Titus"],
    role: "Pastor",
    famousFor: "Paul's trusted representative who organized churches in Crete"
  },

  // HARD - Old Testament (10 characters)
  {
    id: 86,
    name: "Jehoshaphat",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Strengthened his kingdom against a neighboring nation",
      "Sent officials to teach the Law in all the cities",
      "Formed an alliance through marriage that brought trouble",
      "Faced three armies coming against him",
      "Appointed singers to go before the army",
      "King who won battle when choir sang praise to God"
    ],
    books: ["1 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "King whose praise choir led army to miraculous victory"
  },
  {
    id: 87,
    name: "Zerubbabel",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A descendant of royal lineage",
      "Led first group of exiles back to homeland",
      "Laid foundation of temple amid opposition",
      "Worked stopped for sixteen years",
      "Encouraged by two prophets to resume building",
      "Governor who completed the second temple"
    ],
    books: ["Ezra", "Nehemiah", "Haggai", "Zechariah"],
    role: "Governor",
    famousFor: "Led temple rebuilding after Babylonian exile"
  },
  {
    id: 88,
    name: "Obadiah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Palace administrator who feared the Lord",
      "Hid prophets in caves during persecution",
      "Fed prophets with bread and water",
      "Met a prophet while looking for grass",
      "Feared being abandoned and killed",
      "Protected 100 prophets from Jezebel's massacre"
    ],
    books: ["1 Kings"],
    role: "Palace Official",
    famousFor: "Ahab's official who secretly saved 100 prophets from Jezebel"
  },
  {
    id: 89,
    name: "Haggai",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Prophesied during temple reconstruction",
      "Asked why people lived in paneled houses",
      "Challenged priorities regarding God's house",
      "Encouraged the governor and high priest",
      "Prophesied about shaking the nations",
      "Prophet who urged completion of the second temple"
    ],
    books: ["Ezra", "Haggai"],
    role: "Prophet",
    famousFor: "Urged completion of second temple after exile"
  },
  {
    id: 90,
    name: "Malachi",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "The last prophet of the Old Testament",
      "Rebuked priests for offering defiled sacrifices",
      "Spoke against divorce and unfaithfulness",
      "Challenged people about robbing God",
      "Promised the sun of righteousness would rise",
      "Final Old Testament prophet who foretold the forerunner"
    ],
    books: ["Malachi"],
    role: "Prophet",
    famousFor: "Last Old Testament prophet who spoke of tithing and forerunner"
  },
  {
    id: 91,
    name: "Uzziah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Became king at sixteen years old",
      "Sought God during his youth",
      "Built towers and dug cisterns",
      "Had a large army with advanced weaponry",
      "Became proud and entered the temple unlawfully",
      "King struck with leprosy for burning incense illegally"
    ],
    books: ["2 Chronicles", "Isaiah"],
    role: "King",
    famousFor: "Powerful king struck with leprosy for priestly presumption"
  },
  {
    id: 92,
    name: "Bezalel",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Filled with the Spirit for a special task",
      "Skilled in working with gold, silver, and bronze",
      "Also talented in cutting stones and woodcarving",
      "Able to teach others the crafts",
      "Worked with a helper named Oholiab",
      "Master craftsman who built the tabernacle and ark"
    ],
    books: ["Exodus"],
    role: "Craftsman",
    famousFor: "Spirit-filled master craftsman who built the tabernacle"
  },
  {
    id: 93,
    name: "Gedaliah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Appointed governor over the remnant",
      "Son of Ahikam who protected a prophet",
      "Ruled from Mizpah after Jerusalem fell",
      "Warned about an assassination plot",
      "Refused to believe the warning",
      "Governor assassinated by Ishmael after Babylon's conquest"
    ],
    books: ["2 Kings", "Jeremiah"],
    role: "Governor",
    famousFor: "Governor over Judah after exile, assassinated by Ishmael"
  },
  {
    id: 94,
    name: "Jethro",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A priest in Midian",
      "Gave refuge to a fugitive from Egypt",
      "Became father-in-law to a future leader",
      "Heard about great miracles at the sea",
      "Offered sacrifices and ate bread with elders",
      "Advised a judge to delegate and appoint leaders over thousands"
    ],
    books: ["Exodus"],
    role: "Priest",
    famousFor: "Moses' father-in-law who advised delegation of leadership"
  },
  {
    id: 95,
    name: "Jabez",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "His name means 'pain' due to his birth",
      "More honorable than his brothers",
      "Prayed for blessing and enlarged territory",
      "Asked for God's hand to be with him",
      "Requested protection from harm and pain",
      "Man whose brief prayer God granted in Chronicles"
    ],
    books: ["1 Chronicles"],
    role: "Man of Judah",
    famousFor: "Prayer for blessing and enlarged territory that God granted"
  },

  // HARD - New Testament (5 characters)
  {
    id: 96,
    name: "Apollos",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A learned man from Alexandria",
      "Eloquent speaker with thorough knowledge of Scriptures",
      "Taught about the Lord but knew only one baptism",
      "Instructed more accurately by a couple",
      "Greatly helped believers through his debating",
      "Eloquent teacher corrected by Priscilla and Aquila"
    ],
    books: ["Acts", "1 Corinthians"],
    role: "Teacher/Evangelist",
    famousFor: "Eloquent Alexandrian teacher instructed by Priscilla and Aquila"
  },
  {
    id: 97,
    name: "Onesimus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A runaway who met a prisoner",
      "His name means 'useful'",
      "Became beloved in his newfound faith",
      "Sent back with a personal letter",
      "No longer just a servant but a brother",
      "Runaway slave converted by Paul and returned to Philemon"
    ],
    books: ["Colossians", "Philemon"],
    role: "Former Slave",
    famousFor: "Runaway slave converted by Paul, returned as a brother"
  },
  {
    id: 98,
    name: "Epaphras",
    testament: "New",
    difficulty: "hard",
    clues: [
      "From a city in the Lycus Valley",
      "Faithful minister who started a church",
      "Always wrestling in prayer for believers",
      "Shared imprisonment with an apostle",
      "Prayed for maturity and full assurance",
      "Colossian who founded church and was Paul's fellow prisoner"
    ],
    books: ["Colossians", "Philemon"],
    role: "Church Planter",
    famousFor: "Founded Colossian church and prayed fervently for believers"
  },
  {
    id: 99,
    name: "Philemon",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A church met in his house",
      "His love refreshed the hearts of believers",
      "Received a letter about a personal matter",
      "Asked to welcome back someone who wronged him",
      "Urged to receive a former servant as a brother",
      "Wealthy Christian asked to forgive and free his runaway slave"
    ],
    books: ["Philemon"],
    role: "Church Host",
    famousFor: "Recipient of Paul's letter asking him to forgive Onesimus"
  },
  {
    id: 100,
    name: "Gamaliel",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Pharisee and teacher of the Law",
      "Honored by all the people",
      "Had a famous student who later changed sides",
      "Stood up in the Sanhedrin during a trial",
      "Advised caution using historical examples",
      "Wise teacher who advised council to leave apostles alone"
    ],
    books: ["Acts"],
    role: "Pharisee/Teacher",
    famousFor: "Wise Pharisee who advised leaving apostles alone, taught Paul"
  },

  // ADDITIONAL CHALLENGES (101-365) - Completing the year
  {
    id: 101,
    name: "Garden of Eden",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A perfect paradise at the beginning of time",
      "Had four rivers flowing from it",
      "Contained two special trees",
      "The first humans lived here",
      "A serpent deceived here",
      "Where Adam and Eve lived before the fall"
    ],
    books: ["Genesis"],
    role: "Place",
    famousFor: "The original paradise where humanity began"
  },
  {
    id: 102,
    name: "The Tower of Babel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A massive construction project in ancient times",
      "Built in the land of Shinar",
      "People wanted to make a name for themselves",
      "God confused something to stop it",
      "Explains why people speak different languages",
      "Tower built to reach heaven that caused language confusion"
    ],
    books: ["Genesis"],
    role: "Event",
    famousFor: "Where God confused human languages"
  },
  {
    id: 103,
    name: "Melchizedek",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A mysterious figure with no recorded genealogy",
      "King of Salem in ancient times",
      "Also served as a priest",
      "Blessed Abraham after a battle",
      "Received tithes from the patriarch",
      "Priest-king who blessed Abraham with bread and wine"
    ],
    books: ["Genesis", "Hebrews"],
    role: "Priest-King",
    famousFor: "Mysterious priest-king who prefigured Christ"
  },
  {
    id: 104,
    name: "Lot",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A relative of Abraham who traveled with him",
      "Chose to live in a fertile valley",
      "Settled near very wicked cities",
      "Was rescued from danger by angels",
      "His wife turned into salt",
      "Abraham's nephew who escaped Sodom"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Escaped Sodom's destruction, his wife became salt"
  },
  {
    id: 105,
    name: "Rebekah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Met a servant at a well",
      "Showed kindness by watering camels",
      "Left her family to marry a stranger",
      "Mother of twins who struggled in her womb",
      "Helped her favorite son deceive his father",
      "Isaac's wife who favored Jacob over Esau"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Isaac's wife and mother of Jacob and Esau"
  },
  {
    id: 106,
    name: "Jacob",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A twin who was born second",
      "Tricked his brother out of a birthright",
      "Deceived his father with goat skin",
      "Wrestled with God and received a new name",
      "Had twelve sons who became tribes",
      "Renamed Israel after wrestling with God"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Father of the twelve tribes of Israel"
  },
  {
    id: 107,
    name: "Rachel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A shepherdess who met her future husband at a well",
      "Her father tricked the man who wanted to marry her",
      "Was barren for many years",
      "Finally gave birth to two sons",
      "Died giving birth to her second son",
      "Jacob's beloved wife, mother of Joseph and Benjamin"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Jacob's beloved wife who died giving birth to Benjamin"
  },
  {
    id: 108,
    name: "Leah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "An older sister given in marriage by deception",
      "Had weak eyes but was very fertile",
      "Mother of six sons and one daughter",
      "Was less loved than her younger sister",
      "Her sons included Judah and Levi",
      "Jacob's first wife, given instead of Rachel"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Jacob's first wife, mother of Judah (Jesus's line)"
  },
  {
    id: 109,
    name: "Benjamin",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "The youngest of twelve brothers",
      "His mother died giving birth to him",
      "His father was very protective of him",
      "His brother hid a silver cup in his sack",
      "Smallest tribe but produced a famous king",
      "Joseph's only full brother, youngest son of Jacob"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Youngest of Jacob's sons, tribe produced King Saul"
  },
  {
    id: 110,
    name: "Potiphar",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "An Egyptian official of high rank",
      "Captain of the guard for Pharaoh",
      "Bought a Hebrew slave",
      "His household prospered under new management",
      "His wife falsely accused the slave",
      "Egyptian official whose wife accused Joseph"
    ],
    books: ["Genesis"],
    role: "Egyptian Official",
    famousFor: "Joseph's master whose wife falsely accused him"
  },
  {
    id: 111,
    name: "Aaron",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "The older brother of a famous leader",
      "Served as spokesman for his brother",
      "First person to hold an important religious position",
      "Made a golden calf while his brother was away",
      "Wore special garments with bells and pomegranates",
      "Moses's brother and first High Priest of Israel"
    ],
    books: ["Exodus", "Leviticus", "Numbers"],
    role: "High Priest",
    famousFor: "First High Priest of Israel, Moses's brother"
  },
  {
    id: 112,
    name: "Miriam",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Watched over a basket in the Nile as a child",
      "Led women in song and dance after a great victory",
      "A prophetess who spoke against her brother",
      "Was struck with leprosy for seven days",
      "Sister of two famous leaders",
      "Moses and Aaron's sister, struck with leprosy for rebellion"
    ],
    books: ["Exodus", "Numbers"],
    role: "Prophetess",
    famousFor: "Moses's sister who led victory song after Red Sea crossing"
  },
  {
    id: 113,
    name: "The Ten Plagues",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A series of divine judgments on Egypt",
      "Included water turning to blood",
      "Frogs, gnats, and locusts were involved",
      "Darkness covered the land for three days",
      "The final one led to the Exodus",
      "Ten disasters that forced Pharaoh to free the Israelites"
    ],
    books: ["Exodus"],
    role: "Event",
    famousFor: "Divine judgments that led to Israel's freedom from Egypt"
  },
  {
    id: 114,
    name: "The Passover",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A memorial of deliverance from slavery",
      "Involves eating unleavened bread",
      "Lamb's blood marked doorposts",
      "The angel of death passed over marked houses",
      "Jesus celebrated this before His crucifixion",
      "Jewish feast commemorating Israel's exodus from Egypt"
    ],
    books: ["Exodus", "Leviticus", "Gospels"],
    role: "Event/Feast",
    famousFor: "Annual feast commemorating Israel's deliverance from Egypt"
  },
  {
    id: 115,
    name: "The Ark of the Covenant",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A sacred gold-covered chest",
      "Built according to divine specifications",
      "Contained the stone tablets of the law",
      "Carried on poles by priests",
      "Captured by Philistines but caused them trouble",
      "Sacred chest containing the Ten Commandments"
    ],
    books: ["Exodus", "1 Samuel", "2 Samuel"],
    role: "Sacred Object",
    famousFor: "Sacred chest that held the Ten Commandments tablets"
  },
  {
    id: 116,
    name: "Caleb",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "One of twelve spies sent to scout a land",
      "Gave a faithful report despite others' fear",
      "Waited 40 years for a promise to be fulfilled",
      "Asked for a mountain in his old age",
      "Stayed strong and faithful at age 85",
      "Faithful spy who inherited Hebron at age 85"
    ],
    books: ["Numbers", "Joshua"],
    role: "Spy/Warrior",
    famousFor: "Faithful spy who trusted God to give Israel the Promised Land"
  },
  {
    id: 117,
    name: "Joshua",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Moses's assistant and successor",
      "Led Israel into the Promised Land",
      "Commanded the sun to stand still",
      "Led the conquest of Jericho",
      "Said 'Choose this day whom you will serve'",
      "Moses's successor who led Israel into Canaan"
    ],
    books: ["Joshua"],
    role: "Military Leader",
    famousFor: "Led Israel into the Promised Land, made sun stand still"
  },
  {
    id: 118,
    name: "The Battle of Jericho",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A city with massive walls",
      "Conquered by an unusual military strategy",
      "Involved priests, trumpets, and shouting",
      "Israelites marched around it for seven days",
      "The walls came tumbling down",
      "City whose walls fell after Israelites marched and shouted"
    ],
    books: ["Joshua"],
    role: "Event",
    famousFor: "First city conquered in Canaan when walls fell miraculously"
  },
  {
    id: 119,
    name: "Rahab",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A woman of questionable reputation in Jericho",
      "Hid two Israelite spies on her roof",
      "Used a scarlet cord as a sign",
      "Her family was spared when the city fell",
      "Listed in the genealogy of Jesus",
      "Jericho prostitute who hid spies and was saved"
    ],
    books: ["Joshua", "Matthew"],
    role: "Canaanite Woman",
    famousFor: "Saved spies in Jericho, became ancestor of Jesus"
  },
  {
    id: 120,
    name: "Deborah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A woman judge of Israel",
      "Also served as a prophetess",
      "Sat under a palm tree to judge disputes",
      "Led Israel to victory with Barak",
      "Sang a victory song after battle",
      "Female judge and prophetess who led Israel to victory"
    ],
    books: ["Judges"],
    role: "Judge/Prophetess",
    famousFor: "Only female judge of Israel who led military victory"
  },
  {
    id: 121,
    name: "Gideon",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was threshing wheat in a winepress when called",
      "Asked for signs using fleece",
      "Reduced his army from thousands to 300",
      "Defeated enemies with torches and trumpets",
      "Known for being unsure and asking for confirmation",
      "Judge who defeated Midianites with 300 men and trumpets"
    ],
    books: ["Judges"],
    role: "Judge/Military Leader",
    famousFor: "Defeated vast Midianite army with only 300 men"
  },
  {
    id: 122,
    name: "Samson",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A Nazirite from birth with special vows",
      "Possessed supernatural strength",
      "Killed a lion with his bare hands",
      "His strength was in his hair",
      "Betrayed by a woman named Delilah",
      "Strong man who lost power when hair was cut"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Strongest man in the Bible who destroyed Philistine temple"
  },
  {
    id: 123,
    name: "Delilah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A woman from the Valley of Sorek",
      "Was paid by Philistine leaders",
      "Persistently asked about a secret",
      "Discovered the source of a man's strength",
      "Betrayed her lover for money",
      "Philistine woman who betrayed Samson"
    ],
    books: ["Judges"],
    role: "Philistine Woman",
    famousFor: "Betrayed Samson by cutting his hair"
  },
  {
    id: 124,
    name: "Ruth",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A Moabite woman who left her homeland",
      "Remained loyal to her mother-in-law",
      "Gleaned grain in the fields",
      "Said 'Your people will be my people'",
      "Married a kinsman-redeemer named Boaz",
      "Moabite woman loyal to Naomi, married Boaz"
    ],
    books: ["Ruth"],
    role: "Faithful Woman",
    famousFor: "Model of loyalty and faith, ancestor of David and Jesus"
  },
  {
    id: 125,
    name: "Naomi",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Left Israel during a famine",
      "Lost her husband and both sons",
      "Urged her daughters-in-law to return home",
      "One daughter-in-law insisted on staying with her",
      "Changed her name to Mara meaning 'bitter'",
      "Ruth's mother-in-law who returned to Bethlehem"
    ],
    books: ["Ruth"],
    role: "Widow",
    famousFor: "Ruth's faithful mother-in-law"
  },
  {
    id: 126,
    name: "Boaz",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A wealthy landowner in Bethlehem",
      "Showed kindness to a foreign gleaner",
      "Acted as kinsman-redeemer",
      "Married a Moabite woman",
      "Grandfather of King David",
      "Wealthy man who married Ruth, ancestor of David"
    ],
    books: ["Ruth"],
    role: "Kinsman-Redeemer",
    famousFor: "Married Ruth and redeemed her family line"
  },
  {
    id: 127,
    name: "Hannah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A barren woman who prayed desperately for a child",
      "Made a vow to dedicate her son to God",
      "Was misunderstood while praying in the temple",
      "Named her son 'asked of God'",
      "Gave up her young son to temple service",
      "Samuel's mother who dedicated him to God's service"
    ],
    books: ["1 Samuel"],
    role: "Mother",
    famousFor: "Prayed for a son and dedicated Samuel to God"
  },
  {
    id: 128,
    name: "Eli",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "An elderly priest and judge of Israel",
      "Had two wicked sons who served as priests",
      "Trained a young boy in the temple",
      "Thought a praying woman was drunk",
      "Died when he heard the ark was captured",
      "High priest who raised Samuel"
    ],
    books: ["1 Samuel"],
    role: "High Priest/Judge",
    famousFor: "Raised Samuel but failed to discipline his own sons"
  },
  {
    id: 129,
    name: "Samuel",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Dedicated to God's service as a young child",
      "Heard God's voice calling him at night",
      "Served as the last judge of Israel",
      "Anointed the first two kings of Israel",
      "A prophet, priest, and judge",
      "Prophet who anointed Saul and David as kings"
    ],
    books: ["1 Samuel"],
    role: "Prophet/Judge",
    famousFor: "Last judge of Israel, anointed first two kings"
  },
  {
    id: 130,
    name: "Saul",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "From the tribe of Benjamin",
      "Stood head and shoulders above others",
      "First king of Israel",
      "Started well but became disobedient",
      "Became jealous of a young warrior",
      "Israel's first king who was rejected by God"
    ],
    books: ["1 Samuel"],
    role: "King",
    famousFor: "Israel's first king who was rejected for disobedience"
  },
  {
    id: 131,
    name: "Jonathan",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A prince and skilled warrior",
      "Won a battle with just his armor-bearer",
      "Made a covenant of friendship",
      "Gave his robe and armor to his friend",
      "Loved David as himself",
      "Saul's son who was David's loyal friend"
    ],
    books: ["1 Samuel"],
    role: "Prince/Warrior",
    famousFor: "David's best friend despite being Saul's son"
  },
  {
    id: 132,
    name: "Goliath",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A champion warrior over nine feet tall",
      "Wore heavy bronze armor",
      "Taunted Israel's army for 40 days",
      "Was defeated by an unlikely opponent",
      "Killed by a stone to the forehead",
      "Giant Philistine warrior killed by David"
    ],
    books: ["1 Samuel"],
    role: "Philistine Warrior",
    famousFor: "Giant defeated by young David with a sling"
  },
  {
    id: 133,
    name: "Bathsheba",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Was bathing when seen by a king",
      "Her husband was a soldier named Uriah",
      "Became involved in adultery with the king",
      "Her first child died",
      "Mother of Solomon",
      "David's wife, mother of Solomon"
    ],
    books: ["2 Samuel", "1 Kings"],
    role: "Queen",
    famousFor: "David committed adultery with her, became mother of Solomon"
  },
  {
    id: 134,
    name: "Nathan",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A prophet during David's reign",
      "Told David he couldn't build the temple",
      "Confronted David with a parable about a lamb",
      "Said 'You are the man!' to the king",
      "Helped ensure Solomon became king",
      "Prophet who confronted David about Bathsheba"
    ],
    books: ["2 Samuel", "1 Kings"],
    role: "Prophet",
    famousFor: "Boldly confronted King David about his sin"
  },
  {
    id: 135,
    name: "Absalom",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Known for his handsome appearance and hair",
      "A son of King David",
      "Rebelled against his father",
      "Rode a mule into battle",
      "His hair got caught in tree branches",
      "David's son who rebelled and died in battle"
    ],
    books: ["2 Samuel"],
    role: "Prince",
    famousFor: "David's handsome son who rebelled and died in a tree"
  },
  {
    id: 136,
    name: "The Queen of Sheba",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A wealthy foreign queen",
      "Heard reports of a wise king's fame",
      "Traveled a great distance with valuable gifts",
      "Tested the king with hard questions",
      "Was amazed by what she saw",
      "Wealthy queen who visited Solomon to test his wisdom"
    ],
    books: ["1 Kings", "2 Chronicles"],
    role: "Queen",
    famousFor: "Visited Solomon to test his legendary wisdom"
  },
  {
    id: 137,
    name: "Elijah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A prophet who confronted wicked royalty",
      "Fed by ravens during a drought",
      "Challenged prophets of Baal on Mount Carmel",
      "Called down fire from heaven",
      "Never died but was taken to heaven in a whirlwind",
      "Prophet taken to heaven in a fiery chariot"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Prophet",
    famousFor: "Taken to heaven in whirlwind, appeared at Transfiguration"
  },
  {
    id: 138,
    name: "Elisha",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Asked for a double portion of his master's spirit",
      "Received his master's mantle",
      "Performed twice as many miracles as his predecessor",
      "Made an axe head float",
      "Healed Naaman of leprosy",
      "Elijah's successor who received double portion of spirit"
    ],
    books: ["2 Kings"],
    role: "Prophet",
    famousFor: "Elijah's successor who performed many miracles"
  },
  {
    id: 139,
    name: "Jezebel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A foreign princess who married an Israelite king",
      "Promoted Baal worship in Israel",
      "Persecuted God's prophets",
      "Had Naboth killed for his vineyard",
      "Met a violent death as prophesied",
      "Wicked queen who promoted Baal worship"
    ],
    books: ["1 Kings", "2 Kings"],
    role: "Queen",
    famousFor: "Most wicked queen in the Bible, wife of Ahab"
  },
  {
    id: 140,
    name: "Naaman",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A respected military commander",
      "From Syria, not Israel",
      "Suffered from a skin disease",
      "Initially refused to follow a prophet's simple instructions",
      "Was healed by dipping in the Jordan River seven times",
      "Syrian commander healed of leprosy by Elisha"
    ],
    books: ["2 Kings"],
    role: "Syrian Commander",
    famousFor: "Healed of leprosy by washing in Jordan River"
  },
  {
    id: 141,
    name: "Hezekiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A righteous king of Judah",
      "Destroyed idols and high places",
      "Prayed when facing invasion",
      "God added 15 years to his life",
      "Showed his treasures to Babylonian envoys",
      "Good king whose life was extended by God"
    ],
    books: ["2 Kings", "2 Chronicles", "Isaiah"],
    role: "King",
    famousFor: "Faithful king whose life God extended by 15 years"
  },
  {
    id: 142,
    name: "Isaiah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A major prophet of Judah",
      "Saw a vision of God on His throne",
      "Had his lips touched by a burning coal",
      "Prophesied about a virgin conceiving",
      "Wrote about a suffering servant",
      "Major prophet who prophesied about Christ's birth and suffering"
    ],
    books: ["Isaiah"],
    role: "Prophet",
    famousFor: "Prophesied virgin birth and suffering servant (Jesus)"
  },
  {
    id: 143,
    name: "Jeremiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Called by God as a youth",
      "Known as the weeping prophet",
      "Warned of Jerusalem's destruction",
      "Thrown into a muddy cistern",
      "Witnessed the fall of Jerusalem",
      "Weeping prophet who warned of Jerusalem's fall"
    ],
    books: ["Jeremiah", "Lamentations"],
    role: "Prophet",
    famousFor: "Wept over Jerusalem's destruction he prophesied"
  },
  {
    id: 144,
    name: "Ezekiel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A prophet among the exiles",
      "Saw visions of heavenly beings with wheels",
      "Prophesied to a valley of dry bones",
      "Acted out prophecies through symbolic actions",
      "Saw a vision of a restored temple",
      "Prophet who saw vision of dry bones coming to life"
    ],
    books: ["Ezekiel"],
    role: "Prophet",
    famousFor: "Vision of valley of dry bones representing Israel's restoration"
  },
  {
    id: 145,
    name: "Daniel",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A young exile taken to Babylon",
      "Refused to eat the king's food",
      "Interpreted dreams for kings",
      "Survived a night in a den of lions",
      "Saw visions of future kingdoms",
      "Prophet who survived the lions' den"
    ],
    books: ["Daniel"],
    role: "Prophet",
    famousFor: "Survived lions' den, interpreted Nebuchadnezzar's dreams"
  },
  {
    id: 146,
    name: "Shadrach, Meshach, and Abednego",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Three young Hebrew exiles in Babylon",
      "Refused to bow to a golden statue",
      "Thrown into a furnace heated seven times hotter",
      "A fourth person was seen with them in the fire",
      "Came out without even smelling of smoke",
      "Three friends who survived fiery furnace"
    ],
    books: ["Daniel"],
    role: "Faithful Exiles",
    famousFor: "Survived fiery furnace for refusing to worship idol"
  },
  {
    id: 147,
    name: "Nebuchadnezzar",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Powerful king of Babylon",
      "Destroyed Jerusalem and the temple",
      "Had a troubling dream about a statue",
      "Built a golden image for worship",
      "Went insane for seven years",
      "Babylonian king who destroyed Jerusalem"
    ],
    books: ["2 Kings", "Daniel"],
    role: "King",
    famousFor: "Destroyed Jerusalem, went insane, then acknowledged God"
  },
  {
    id: 148,
    name: "Esther",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A Jewish orphan raised by her cousin",
      "Became queen in a foreign land",
      "Kept her nationality secret",
      "Risked her life approaching the king uninvited",
      "Saved her people from genocide",
      "Jewish queen who saved her people from genocide"
    ],
    books: ["Esther"],
    role: "Queen",
    famousFor: "Saved Jews from Haman's plot to destroy them"
  },
  {
    id: 149,
    name: "Mordecai",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A Jewish exile in Persia",
      "Raised his orphaned cousin",
      "Refused to bow to a high official",
      "Uncovered a plot against the king",
      "Was honored by being paraded through the city",
      "Esther's cousin who refused to bow to Haman"
    ],
    books: ["Esther"],
    role: "Jewish Leader",
    famousFor: "Refused to bow to Haman, helped save the Jews"
  },
  {
    id: 150,
    name: "Haman",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A high official in the Persian court",
      "Demanded everyone bow to him",
      "Plotted to destroy an entire people",
      "Built a gallows for his enemy",
      "Was forced to honor the man he hated",
      "Persian official who plotted to kill all Jews"
    ],
    books: ["Esther"],
    role: "Persian Official",
    famousFor: "Plotted Jewish genocide, hanged on his own gallows"
  },
  {
    id: 151,
    name: "Job",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "A righteous man who suffered greatly",
      "Lost his children, wealth, and health",
      "Had friends who gave poor counsel",
      "Questioned God but never cursed Him",
      "Had everything restored double",
      "Faithful man who suffered but never cursed God"
    ],
    books: ["Job"],
    role: "Faithful Sufferer",
    famousFor: "Model of patience through extreme suffering"
  },
  {
    id: 152,
    name: "Nehemiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Cupbearer to a Persian king",
      "Heard about Jerusalem's broken walls",
      "Led effort to rebuild city walls",
      "Workers built with a tool in one hand and weapon in other",
      "Completed the walls in 52 days",
      "Led rebuilding of Jerusalem's walls in 52 days"
    ],
    books: ["Nehemiah"],
    role: "Governor/Rebuilder",
    famousFor: "Rebuilt Jerusalem's walls despite opposition"
  },
  {
    id: 153,
    name: "Ezra",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A priest and scribe",
      "Led exiles back to Jerusalem",
      "Devoted to studying and teaching the Law",
      "Read the Law publicly for hours",
      "Led religious reforms",
      "Priest-scribe who led spiritual renewal"
    ],
    books: ["Ezra", "Nehemiah"],
    role: "Priest/Scribe",
    famousFor: "Led spiritual renewal and taught God's Law"
  },
  {
    id: 154,
    name: "Hosea",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A prophet with an unusual marriage",
      "Commanded to marry an unfaithful wife",
      "His marriage illustrated God's relationship with Israel",
      "Bought back his wife from slavery",
      "Prophesied about God's steadfast love",
      "Prophet whose unfaithful wife illustrated God's love"
    ],
    books: ["Hosea"],
    role: "Prophet",
    famousFor: "Married unfaithful wife to show God's love for Israel"
  },
  {
    id: 155,
    name: "Amos",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A shepherd and farmer, not trained as prophet",
      "Called from tending flock to prophesy",
      "Spoke against social injustice",
      "Warned the wealthy who oppressed the poor",
      "Said 'Let justice roll down like waters'",
      "Shepherd-prophet who condemned social injustice"
    ],
    books: ["Amos"],
    role: "Prophet",
    famousFor: "Common shepherd who prophesied against injustice"
  },
  {
    id: 156,
    name: "Malachi",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Last prophet of the Old Testament",
      "Rebuked priests for offering blemished sacrifices",
      "Spoke about tithing and testing God",
      "Prophesied about the messenger preparing the way",
      "400 years of prophetic silence followed",
      "Last Old Testament prophet before 400 silent years"
    ],
    books: ["Malachi"],
    role: "Prophet",
    famousFor: "Last OT prophet, prophesied John the Baptist"
  },
  {
    id: 157,
    name: "Zechariah (prophet)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Contemporary of Haggai",
      "Had many visions about the future",
      "Prophesied about a king riding on a donkey",
      "Saw vision of a lampstand and olive trees",
      "Encouraged rebuilding the temple",
      "Prophet who saw visions, prophesied king on donkey"
    ],
    books: ["Zechariah"],
    role: "Prophet",
    famousFor: "Prophesied details of Jesus's triumphal entry"
  },
  {
    id: 158,
    name: "Haggai",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A post-exilic prophet",
      "Rebuked people for living in nice houses while temple lay in ruins",
      "Encouraged completing the temple",
      "Spoke only four sermons recorded",
      "Ministry lasted about four months",
      "Prophet who motivated temple rebuilding"
    ],
    books: ["Haggai"],
    role: "Prophet",
    famousFor: "Motivated Jews to complete second temple"
  },
  {
    id: 159,
    name: "Micah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A prophet from a small town",
      "Contemporary of Isaiah",
      "Prophesied Messiah would be born in Bethlehem",
      "Asked 'What does the Lord require of you?'",
      "Called for justice, mercy, and humility",
      "Prophet who foretold Christ's birth in Bethlehem"
    ],
    books: ["Micah"],
    role: "Prophet",
    famousFor: "Prophesied Messiah born in Bethlehem 700 years before"
  },
  {
    id: 160,
    name: "Mount Sinai",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A sacred mountain in the wilderness",
      "Covered with thick cloud and fire",
      "God descended upon it with thunder and lightning",
      "Moses received the Law here",
      "People were warned not to touch it",
      "Mountain where Moses received Ten Commandments"
    ],
    books: ["Exodus"],
    role: "Place",
    famousFor: "Where God gave Moses the Ten Commandments"
  },
  {
    id: 161,
    name: "The Nativity",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A miraculous birth announced by angels",
      "Happened in a humble place with animals",
      "Shepherds came to visit first",
      "A star led wise men from the East",
      "Born in Bethlehem",
      "The birth of Jesus Christ"
    ],
    books: ["Matthew", "Luke"],
    role: "Event",
    famousFor: "The birth of Jesus celebrated at Christmas"
  },
  {
    id: 162,
    name: "The Wedding at Cana",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Jesus attended a celebration with his mother",
      "They ran out of something important",
      "Mary told servants to do whatever he says",
      "Involved six stone water jars",
      "Jesus's first miracle",
      "Jesus turned water into wine"
    ],
    books: ["John"],
    role: "Event/Miracle",
    famousFor: "Jesus's first public miracle"
  },
  {
    id: 163,
    name: "The Sermon on the Mount",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Jesus taught a large crowd on a hillside",
      "Contains the Beatitudes",
      "Includes the Lord's Prayer",
      "Talks about salt, light, and treasures",
      "Build house on rock, not sand",
      "Jesus's greatest sermon with Beatitudes"
    ],
    books: ["Matthew"],
    role: "Event/Teaching",
    famousFor: "Contains Beatitudes and Lord's Prayer"
  },
  {
    id: 164,
    name: "The Transfiguration",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Jesus took three disciples up a mountain",
      "His appearance changed dramatically",
      "Two Old Testament figures appeared",
      "Peter wanted to build three shelters",
      "A voice spoke from a cloud",
      "Jesus appeared in glory with Moses and Elijah"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Event",
    famousFor: "Jesus revealed his divine glory to Peter, James, and John"
  },
  {
    id: 165,
    name: "The Prodigal Son",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A story Jesus told about a family",
      "A younger son demanded his inheritance early",
      "He wasted everything in wild living",
      "Ended up feeding pigs and starving",
      "Father ran to embrace him when he returned",
      "Parable of son who returned home"
    ],
    books: ["Luke"],
    role: "Parable",
    famousFor: "Jesus's parable about God's forgiveness and love"
  },
  {
    id: 166,
    name: "The Good Samaritan",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A man was attacked by robbers on a road",
      "A priest and Levite passed by without helping",
      "An unexpected person stopped to help",
      "He bandaged wounds and paid for lodging",
      "Jesus asked 'Who was the neighbor?'",
      "Parable about helping your neighbor"
    ],
    books: ["Luke"],
    role: "Parable",
    famousFor: "Jesus's parable defining who our neighbor is"
  },
  {
    id: 167,
    name: "Lazarus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Had two sisters named Mary and Martha",
      "Lived in Bethany",
      "Became very sick and died",
      "Jesus wept when he heard about him",
      "Jesus raised him after four days",
      "Man Jesus raised from the dead"
    ],
    books: ["John"],
    role: "Friend of Jesus",
    famousFor: "Raised from dead by Jesus after four days"
  },
  {
    id: 168,
    name: "Martha",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Sister of Mary and Lazarus",
      "Known for being busy with hospitality",
      "Complained her sister wasn't helping",
      "Jesus told her she was worried about many things",
      "Lived in Bethany",
      "Sister who was busy serving while Mary listened"
    ],
    books: ["Luke", "John"],
    role: "Follower of Jesus",
    famousFor: "Busy hostess whom Jesus gently corrected"
  },
  {
    id: 169,
    name: "Mary of Bethany",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Sister of Martha and Lazarus",
      "Sat at Jesus's feet to learn",
      "Anointed Jesus with expensive perfume",
      "Judas complained about the cost",
      "Jesus defended her actions",
      "Woman who anointed Jesus with costly perfume"
    ],
    books: ["Luke", "John"],
    role: "Follower of Jesus",
    famousFor: "Chose 'better part' sitting at Jesus's feet; anointed him"
  },
  {
    id: 170,
    name: "Nicodemus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A Pharisee and member of ruling council",
      "Came to Jesus at night",
      "Jesus told him about being born again",
      "Defended Jesus before the Sanhedrin",
      "Helped prepare Jesus's body for burial",
      "Pharisee who visited Jesus at night"
    ],
    books: ["John"],
    role: "Pharisee/Seeker",
    famousFor: "Jesus taught him about being born again"
  },
  {
    id: 171,
    name: "Zacchaeus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A wealthy tax collector",
      "Very short in stature",
      "Climbed a tree to see Jesus",
      "Jesus invited himself to his house",
      "Promised to give half his possessions to poor",
      "Short tax collector who climbed a sycamore tree"
    ],
    books: ["Luke"],
    role: "Tax Collector",
    famousFor: "Climbed tree to see Jesus, repented and gave to poor"
  },
  {
    id: 172,
    name: "The Woman at the Well",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Met Jesus at Jacob's well in Samaria",
      "Had been married five times",
      "Jesus asked her for a drink of water",
      "Jesus offered her living water",
      "She told her whole town about Jesus",
      "Samaritan woman who met Jesus at well"
    ],
    books: ["John"],
    role: "Samaritan Woman",
    famousFor: "Jesus revealed himself as Messiah to her"
  },
  {
    id: 173,
    name: "The Feeding of the 5000",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A huge crowd followed Jesus to remote area",
      "People were hungry with no food nearby",
      "A boy offered his small lunch",
      "Jesus multiplied what the boy had",
      "Twelve baskets of leftovers collected",
      "Miracle where Jesus fed 5000 with loaves and fish"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Miracle",
    famousFor: "Jesus fed 5000 people with five loaves and two fish"
  },
  {
    id: 174,
    name: "Walking on Water",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Disciples were in a boat during a storm",
      "They saw someone approaching on the lake",
      "At first they thought it was a ghost",
      "One disciple tried to do the same but sank",
      "Jesus said 'Take courage, it is I'",
      "Jesus walked on the Sea of Galilee"
    ],
    books: ["Matthew", "Mark", "John"],
    role: "Miracle",
    famousFor: "Jesus walked on water and saved Peter"
  },
  {
    id: 175,
    name: "The Triumphal Entry",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Jesus rode into Jerusalem on a young donkey",
      "Crowds spread cloaks and branches on road",
      "People shouted 'Hosanna!'",
      "Fulfilled ancient prophecy about a king",
      "Happened one week before crucifixion",
      "Jesus entered Jerusalem on a donkey"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Event",
    famousFor: "Jesus's royal entry into Jerusalem on Palm Sunday"
  },
  {
    id: 176,
    name: "The Last Supper",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Jesus shared final meal with disciples",
      "He washed the disciples' feet",
      "Bread and wine given new meaning",
      "Jesus predicted his betrayal",
      "Instituted what Christians still practice",
      "Jesus's final Passover meal with disciples"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Event",
    famousFor: "Jesus instituted the Eucharist/Communion"
  },
  {
    id: 177,
    name: "Gethsemane",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A garden with olive trees",
      "Jesus prayed in agony there",
      "His sweat became like drops of blood",
      "Asked if cup could be taken from him",
      "Disciples fell asleep three times",
      "Garden where Jesus prayed before arrest"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Place",
    famousFor: "Where Jesus prayed before his arrest and crucifixion"
  },
  {
    id: 178,
    name: "Barabbas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A notorious prisoner",
      "Guilty of insurrection and murder",
      "Pilate offered to release one prisoner",
      "Crowd chose to release him instead of Jesus",
      "His name means 'son of the father'",
      "Criminal released instead of Jesus"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Criminal",
    famousFor: "Released by Pilate while Jesus was crucified"
  },
  {
    id: 179,
    name: "Simon of Cyrene",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Was passing by from the countryside",
      "Soldiers forced him to help",
      "Father of Alexander and Rufus",
      "Carried a heavy wooden beam",
      "Helped Jesus on way to crucifixion",
      "Man forced to carry Jesus's cross"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Bystander",
    famousFor: "Forced to carry Jesus's cross to Golgotha"
  },
  {
    id: 180,
    name: "The Resurrection",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Happened three days after crucifixion",
      "Women found an empty tomb",
      "An angel announced the news",
      "Stone was rolled away",
      "Central event of Christian faith",
      "Jesus rose from the dead"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Event",
    famousFor: "Jesus conquered death and rose on Easter Sunday"
  },
  {
    id: 181,
    name: "The Ascension",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Happened forty days after resurrection",
      "Jesus was lifted up before disciples' eyes",
      "A cloud hid him from their sight",
      "Two angels appeared in white",
      "Took place on Mount of Olives",
      "Jesus ascended to heaven"
    ],
    books: ["Mark", "Luke", "Acts"],
    role: "Event",
    famousFor: "Jesus returned to heaven after resurrection"
  },
  {
    id: 182,
    name: "Pentecost",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Happened fifty days after Passover",
      "Disciples were gathered together",
      "Sound like rushing wind filled the house",
      "Tongues of fire appeared on each person",
      "They spoke in many different languages",
      "Holy Spirit came upon the apostles"
    ],
    books: ["Acts"],
    role: "Event",
    famousFor: "Birth of the Church, Holy Spirit descended"
  },
  {
    id: 183,
    name: "Stephen",
    testament: "New",
    difficulty: "medium",
    clues: [
      "One of the first seven deacons",
      "Full of faith and power",
      "Performed great wonders and signs",
      "Falsely accused by religious leaders",
      "Saw heaven opened and Jesus standing",
      "First Christian martyr"
    ],
    books: ["Acts"],
    role: "Deacon/Martyr",
    famousFor: "First Christian martyr, stoned to death"
  },
  {
    id: 184,
    name: "Philip the Evangelist",
    testament: "New",
    difficulty: "hard",
    clues: [
      "One of the seven chosen deacons",
      "Preached in Samaria with great success",
      "Met someone on the road to Gaza",
      "Explained Isaiah to an Ethiopian official",
      "Baptized someone in desert water",
      "Evangelist who baptized Ethiopian eunuch"
    ],
    books: ["Acts"],
    role: "Deacon/Evangelist",
    famousFor: "Evangelized Samaria and baptized Ethiopian eunuch"
  },
  {
    id: 185,
    name: "Ananias of Damascus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A disciple living in Damascus",
      "Received a vision from the Lord",
      "Was afraid of the man he was sent to",
      "Laid hands on a persecutor to heal blindness",
      "Called Paul 'Brother'",
      "Disciple who baptized Saul/Paul"
    ],
    books: ["Acts"],
    role: "Disciple",
    famousFor: "Healed and baptized Saul after conversion"
  },
  {
    id: 186,
    name: "Barnabas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Name means 'Son of Encouragement'",
      "Sold his field to help the church",
      "Vouched for Paul to the apostles",
      "Traveled with Paul on missionary journey",
      "Had a disagreement with Paul over Mark",
      "Encouraging apostle who traveled with Paul"
    ],
    books: ["Acts"],
    role: "Apostle/Encourager",
    famousFor: "Encouraged Paul and traveled with him"
  },
  {
    id: 187,
    name: "Cornelius",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Roman centurion",
      "Devout and God-fearing",
      "An angel appeared to him",
      "Sent men to Joppa to find Peter",
      "First Gentile convert",
      "Roman centurion who received Holy Spirit"
    ],
    books: ["Acts"],
    role: "Roman Centurion",
    famousFor: "First Gentile Christian, baptized by Peter"
  },
  {
    id: 188,
    name: "Timothy",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Young minister trained by Paul",
      "Had a Greek father and Jewish mother",
      "Grandmother Lois and mother Eunice taught him",
      "Received two letters from Paul",
      "Served in Ephesus",
      "Paul's young protégé and pastor"
    ],
    books: ["Acts", "1 Timothy", "2 Timothy"],
    role: "Pastor/Disciple",
    famousFor: "Paul's faithful young minister"
  },
  {
    id: 189,
    name: "Titus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Greek convert and Paul's companion",
      "Left on island of Crete",
      "Received a letter from Paul about church leadership",
      "Helped with collection for Jerusalem",
      "Later went to Dalmatia",
      "Pastor left in Crete by Paul"
    ],
    books: ["2 Corinthians", "Galatians", "Titus"],
    role: "Pastor",
    famousFor: "Organized church in Crete"
  },
  {
    id: 190,
    name: "Silas",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A leading member of the church",
      "Traveled with Paul after Barnabas split",
      "Beaten and imprisoned in Philippi",
      "Sang hymns in prison at midnight",
      "Earthquake freed them from chains",
      "Paul's companion who sang in prison"
    ],
    books: ["Acts"],
    role: "Prophet/Missionary",
    famousFor: "Traveled with Paul, sang in prison before earthquake"
  },
  {
    id: 191,
    name: "Lydia",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A businesswoman from Thyatira",
      "Dealer in purple cloth",
      "Worshiped God before meeting Paul",
      "First European convert",
      "Opened her home to missionaries",
      "Seller of purple cloth converted in Philippi"
    ],
    books: ["Acts"],
    role: "Businesswoman/Convert",
    famousFor: "First European Christian convert"
  },
  {
    id: 192,
    name: "Priscilla and Aquila",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A married couple who were tentmakers",
      "Worked alongside Paul",
      "Instructed Apollos more accurately",
      "Had a church meeting in their home",
      "Risked their lives for Paul",
      "Married couple who taught Apollos"
    ],
    books: ["Acts", "Romans", "1 Corinthians"],
    role: "Missionaries/Teachers",
    famousFor: "Husband and wife team who taught Apollos"
  },
  {
    id: 193,
    name: "Apollos",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A learned man from Alexandria",
      "Eloquent speaker, mighty in Scriptures",
      "Knew only John's baptism at first",
      "Taught more accurately by a couple",
      "Vigorously refuted Jews in public",
      "Eloquent preacher taught by Priscilla and Aquila"
    ],
    books: ["Acts", "1 Corinthians"],
    role: "Teacher/Preacher",
    famousFor: "Eloquent preacher from Alexandria"
  },
  {
    id: 194,
    name: "The Road to Emmaus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Two disciples walking after resurrection",
      "A stranger joined them on the road",
      "He explained Scriptures to them",
      "They invited him to stay for dinner",
      "Recognized him when he broke bread",
      "Jesus appeared to disciples walking"
    ],
    books: ["Luke"],
    role: "Event",
    famousFor: "Risen Jesus walked with disciples who didn't recognize him"
  },
  {
    id: 195,
    name: "The Parable of the Sower",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A farmer went out to plant seeds",
      "Seeds fell on four different types of soil",
      "Birds ate some seeds",
      "Some grew but were choked by thorns",
      "Good soil produced abundant harvest",
      "Parable about different soils"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Parable",
    famousFor: "Jesus's parable about receiving God's word"
  },
  {
    id: 196,
    name: "The Lost Sheep",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A shepherd had 100 of these animals",
      "One wandered away from the flock",
      "The shepherd left the 99 to find it",
      "Great rejoicing when found",
      "Jesus told this to show God's love",
      "Parable of shepherd searching for one"
    ],
    books: ["Matthew", "Luke"],
    role: "Parable",
    famousFor: "Jesus's parable about seeking the lost"
  },
  {
    id: 197,
    name: "The Mustard Seed",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Jesus compared the kingdom to this",
      "Smallest of all seeds",
      "Grows into the largest garden plant",
      "Birds come and perch in its branches",
      "Shows how small things grow large",
      "Parable about tiny seed becoming large tree"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Parable",
    famousFor: "Shows kingdom starts small but grows large"
  },
  {
    id: 198,
    name: "The Pearl of Great Price",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A merchant searching for fine items",
      "Found one of extraordinary value",
      "Sold everything he owned",
      "Bought this one precious thing",
      "Represents the kingdom of heaven",
      "Parable about merchant selling all for one treasure"
    ],
    books: ["Matthew"],
    role: "Parable",
    famousFor: "Shows kingdom worth giving up everything"
  },
  {
    id: 199,
    name: "The Ten Virgins",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Parable about a wedding",
      "Half were wise, half were foolish",
      "Took lamps to meet the bridegroom",
      "Some ran out of oil",
      "Door was shut to the unprepared",
      "Parable about bridesmaids with lamps"
    ],
    books: ["Matthew"],
    role: "Parable",
    famousFor: "Jesus's parable about being ready"
  },
  {
    id: 200,
    name: "The Talents",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A master gave servants money before leaving",
      "Each received a different amount",
      "Two invested and doubled their portion",
      "One buried his in the ground out of fear",
      "Master rewarded the faithful ones",
      "Parable about using what you're given"
    ],
    books: ["Matthew"],
    role: "Parable",
    famousFor: "Jesus's parable about faithfulness with resources"
  },
  {
    id: 201,
    name: "The Sheep and Goats",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A judgment scene Jesus described",
      "Nations gathered before the Son of Man",
      "Two groups separated",
      "One group fed hungry, clothed naked, visited prisoners",
      "Whatever you did for least, you did for me",
      "Parable about judgment and serving others"
    ],
    books: ["Matthew"],
    role: "Parable",
    famousFor: "Jesus's parable about serving him by serving others"
  },
  {
    id: 202,
    name: "Bethlehem",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A small town in Judea",
      "Prophesied as birthplace of Messiah",
      "Joseph and Mary traveled here for census",
      "Jesus was born here",
      "Herod killed infants here",
      "City where Jesus was born"
    ],
    books: ["Matthew", "Luke", "Micah"],
    role: "Place",
    famousFor: "Birthplace of Jesus Christ"
  },
  {
    id: 203,
    name: "Nazareth",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A small town in Galilee",
      "Where Mary lived when angel appeared",
      "Jesus grew up here",
      "People rejected Jesus here",
      "Known for being insignificant",
      "Jesus's hometown"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Where Jesus grew up"
  },
  {
    id: 204,
    name: "Capernaum",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A fishing town on Sea of Galilee",
      "Jesus made this his base for ministry",
      "Peter's home was here",
      "Site of many miracles and teachings",
      "Jesus called it his own city",
      "Jesus's ministry headquarters"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Jesus's base of operations during ministry"
  },
  {
    id: 205,
    name: "The Temple",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Center of Jewish worship in Jerusalem",
      "Jesus presented here as infant",
      "Jesus cleared merchants from here",
      "Veil torn when Jesus died",
      "Destroyed in 70 AD",
      "Jerusalem's center of worship"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Center of Jewish worship, cleansed by Jesus"
  },
  {
    id: 206,
    name: "Golgotha",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A place outside Jerusalem",
      "Name means 'Place of the Skull'",
      "Site of crucifixions",
      "Where Jesus was crucified",
      "Also called Calvary",
      "Place where Jesus was crucified"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Where Jesus was crucified"
  },
  {
    id: 207,
    name: "The Upper Room",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A large furnished room in Jerusalem",
      "Site of the Last Supper",
      "Where disciples gathered after crucifixion",
      "Pentecost may have happened here",
      "Jesus appeared to disciples here",
      "Room where Last Supper took place"
    ],
    books: ["Mark", "Luke", "Acts"],
    role: "Place",
    famousFor: "Site of Last Supper and post-resurrection appearances"
  },
  {
    id: 208,
    name: "Macedonia",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A region in northern Greece",
      "Paul saw vision of man from here",
      "Included cities of Philippi and Thessalonica",
      "Lydia and jailer converted here",
      "Churches here were generous despite poverty",
      "Region Paul visited after vision"
    ],
    books: ["Acts", "2 Corinthians"],
    role: "Place/Region",
    famousFor: "Where Paul went after Macedonian call vision"
  },
  {
    id: 209,
    name: "Ephesus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Major city in Asia Minor",
      "Had temple of Artemis/Diana",
      "Paul spent 3 years here",
      "Site of riot by silversmiths",
      "Timothy later pastored here",
      "City where Paul ministered three years"
    ],
    books: ["Acts", "1 Corinthians", "Ephesians", "1 Timothy", "Revelation"],
    role: "Place/City",
    famousFor: "Major church Paul established"
  },
  {
    id: 210,
    name: "Corinth",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Wealthy Greek port city",
      "Known for immorality",
      "Paul met Priscilla and Aquila here",
      "Received two letters from Paul",
      "Had divisions and problems",
      "Church with many problems Paul wrote to"
    ],
    books: ["Acts", "1 Corinthians", "2 Corinthians"],
    role: "Place/City",
    famousFor: "Troubled church Paul extensively counseled"
  },
  {
    id: 211,
    name: "Philippi",
    testament: "New",
    difficulty: "hard",
    clues: [
      "First European city Paul visited",
      "Lydia converted here",
      "Paul and Silas imprisoned here",
      "Earthquake freed them from prison",
      "Jailer and household baptized",
      "City where Paul was imprisoned"
    ],
    books: ["Acts", "Philippians"],
    role: "Place/City",
    famousFor: "Where Paul and Silas sang in prison"
  },
  {
    id: 212,
    name: "The Philippian Jailer",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Responsible for guarding prisoners",
      "Almost killed himself after earthquake",
      "Asked 'What must I do to be saved?'",
      "Washed prisoners' wounds",
      "Baptized with whole household",
      "Prison guard converted after earthquake"
    ],
    books: ["Acts"],
    role: "Convert",
    famousFor: "Asked 'What must I do to be saved?'"
  },
  {
    id: 213,
    name: "The Seven Churches",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Mentioned in book of Revelation",
      "Received letters from John",
      "In Asia Minor",
      "Included Ephesus, Smyrna, Pergamum",
      "Also Thyatira, Sardis, Philadelphia, Laodicea",
      "Churches that received messages in Revelation"
    ],
    books: ["Revelation"],
    role: "Churches",
    famousFor: "Seven churches addressed in Revelation"
  },
  {
    id: 214,
    name: "Onesimus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A runaway slave",
      "Belonged to Philemon",
      "Met Paul while in prison",
      "Became a Christian",
      "Paul sent him back with a letter",
      "Slave Paul sent back to master"
    ],
    books: ["Philemon", "Colossians"],
    role: "Slave/Convert",
    famousFor: "Runaway slave Paul returned to Philemon as brother"
  },
  {
    id: 215,
    name: "Philemon",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A wealthy Christian man",
      "Had church meeting in his home",
      "Owned a slave who ran away",
      "Received shortest letter from Paul",
      "Asked to receive slave back as brother",
      "Master who received letter about Onesimus"
    ],
    books: ["Philemon"],
    role: "Church Leader",
    famousFor: "Received Paul's letter about forgiving slave"
  },
  {
    id: 216,
    name: "Demetrius the Silversmith",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Made silver shrines of Artemis",
      "Business hurt by Christianity",
      "Started a riot in his city",
      "Accused Paul of turning people away",
      "Defended by city clerk",
      "Silversmith who started riot in Ephesus"
    ],
    books: ["Acts"],
    role: "Opponent",
    famousFor: "Started riot against Paul in Ephesus"
  },
  {
    id: 217,
    name: "Eutychus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A young man in Troas",
      "Sitting in a window during long sermon",
      "Paul preached until midnight",
      "Fell asleep and fell three stories",
      "Paul raised him from the dead",
      "Young man who fell from window"
    ],
    books: ["Acts"],
    role: "Young Man",
    famousFor: "Fell from window during Paul's sermon, raised to life"
  },
  {
    id: 218,
    name: "Agrippa",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Roman king",
      "Paul testified before him",
      "Said 'Almost you persuade me'",
      "Agreed Paul had done nothing wrong",
      "Could have freed Paul",
      "King who heard Paul's defense"
    ],
    books: ["Acts"],
    role: "King",
    famousFor: "Told Paul 'Almost you persuade me to be a Christian'"
  },
  {
    id: 219,
    name: "Felix",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Roman governor of Judea",
      "Married to Drusilla",
      "Paul testified before him",
      "Trembled when Paul spoke of judgment",
      "Kept Paul imprisoned for two years",
      "Governor who trembled at Paul's message"
    ],
    books: ["Acts"],
    role: "Governor",
    famousFor: "Trembled at Paul's message but kept him imprisoned"
  },
  {
    id: 220,
    name: "Festus",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Succeeded Felix as governor",
      "Jews asked him to transfer Paul",
      "Paul appealed to Caesar before him",
      "Brought Paul before Agrippa",
      "Thought Paul was insane",
      "Governor when Paul appealed to Caesar"
    ],
    books: ["Acts"],
    role: "Governor",
    famousFor: "Governor when Paul appealed to Caesar"
  },
  {
    id: 221,
    name: "The Wise Men",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Came from the East following a star",
      "Sought a newborn king",
      "Brought gold, frankincense, and myrrh",
      "Warned in dream not to return to Herod",
      "Worshiped baby Jesus",
      "Magi who brought gifts to Jesus"
    ],
    books: ["Matthew"],
    role: "Visitors",
    famousFor: "Followed star to worship infant Jesus"
  },
  {
    id: 222,
    name: "The Manger",
    testament: "New",
    difficulty: "easy",
    clues: [
      "A feeding trough for animals",
      "Used as a bed for an infant",
      "In Bethlehem stable",
      "Angels announced birth to shepherds",
      "Jesus laid here after birth",
      "Where baby Jesus was laid"
    ],
    books: ["Luke"],
    role: "Object/Place",
    famousFor: "Jesus's first bed after birth"
  },
  {
    id: 223,
    name: "Simeon",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A righteous and devout man",
      "Waiting for consolation of Israel",
      "Holy Spirit revealed he would see Messiah",
      "Took baby Jesus in his arms at temple",
      "Said 'Now let your servant depart in peace'",
      "Old man who held baby Jesus in temple"
    ],
    books: ["Luke"],
    role: "Prophet",
    famousFor: "Held baby Jesus and prophesied over him"
  },
  {
    id: 224,
    name: "Anna the Prophetess",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A very old prophetess",
      "Daughter of Phanuel, tribe of Asher",
      "Widowed after seven years of marriage",
      "Never left the temple",
      "Fasted and prayed constantly",
      "Elderly prophetess who saw baby Jesus"
    ],
    books: ["Luke"],
    role: "Prophetess",
    famousFor: "Recognized baby Jesus as Messiah in temple"
  },
  {
    id: 225,
    name: "The Centurion's Servant",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A servant who was paralyzed and suffering",
      "His master was a Roman officer",
      "Master had great faith in Jesus",
      "Master said 'just say the word'",
      "Jesus healed him from a distance",
      "Servant healed by Jesus from afar"
    ],
    books: ["Matthew", "Luke"],
    role: "Miracle Recipient",
    famousFor: "Healed when centurion showed great faith"
  },
  {
    id: 226,
    name: "The Centurion",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A Roman military officer",
      "Had built a synagogue for Jews",
      "Sent elders to ask Jesus for help",
      "Said he was not worthy for Jesus to enter",
      "Jesus marveled at his faith",
      "Roman officer with great faith"
    ],
    books: ["Matthew", "Luke"],
    role: "Roman Officer",
    famousFor: "Jesus said 'I have not found such great faith in Israel'"
  },
  {
    id: 227,
    name: "The Widow of Nain",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A woman from a small Galilean town",
      "Her only son had died",
      "Met Jesus at town gate with funeral procession",
      "Jesus had compassion on her",
      "Jesus raised her son to life",
      "Widow whose son Jesus raised"
    ],
    books: ["Luke"],
    role: "Widow",
    famousFor: "Jesus raised her only son from the dead"
  },
  {
    id: 228,
    name: "Legion",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Many demons possessing one man",
      "Man lived among tombs",
      "Could break chains and shackles",
      "Jesus cast them into pigs",
      "Name means 'many'",
      "Demons Jesus cast into pigs"
    ],
    books: ["Mark", "Luke"],
    role: "Demons",
    famousFor: "Many demons Jesus cast out into herd of pigs"
  },
  {
    id: 229,
    name: "Jairus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A synagogue leader",
      "His twelve-year-old daughter was dying",
      "Fell at Jesus's feet begging for help",
      "Told his daughter had died",
      "Jesus raised her saying 'Talitha koum'",
      "Leader whose daughter Jesus raised"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Synagogue Leader",
    famousFor: "Jesus raised his daughter from the dead"
  },
  {
    id: 230,
    name: "The Woman with Bleeding",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Suffered for twelve years",
      "Spent all her money on doctors",
      "Touched edge of Jesus's garment",
      "Immediately healed",
      "Jesus said 'Your faith has healed you'",
      "Woman healed by touching Jesus's cloak"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Woman",
    famousFor: "Healed by touching Jesus's garment"
  },
  {
    id: 231,
    name: "The Man Born Blind",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Blind from birth",
      "Jesus put mud on his eyes",
      "Told to wash in Pool of Siloam",
      "Pharisees questioned him extensively",
      "Worshiped Jesus after seeing",
      "Blind man Jesus healed with mud"
    ],
    books: ["John"],
    role: "Man",
    famousFor: "Born blind, healed by Jesus"
  },
  {
    id: 232,
    name: "The Ten Lepers",
    testament: "New",
    difficulty: "medium",
    clues: [
      "All had same skin disease",
      "Called to Jesus from a distance",
      "Sent to show themselves to priests",
      "Cleansed as they went",
      "Only one returned to thank Jesus",
      "Ten healed, one returned to thank"
    ],
    books: ["Luke"],
    role: "Lepers",
    famousFor: "Jesus healed ten but only one thanked him"
  },
  {
    id: 233,
    name: "Bartimaeus",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A blind beggar",
      "Sat by roadside near Jericho",
      "Called out 'Son of David, have mercy'",
      "People told him to be quiet",
      "Jesus healed his sight",
      "Blind beggar Jesus healed"
    ],
    books: ["Mark", "Luke"],
    role: "Blind Beggar",
    famousFor: "Blind beggar who persistently called to Jesus"
  },
  {
    id: 234,
    name: "The Rich Young Ruler",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Wealthy and powerful young man",
      "Asked 'What must I do to inherit eternal life?'",
      "Kept all commandments from youth",
      "Jesus told him to sell everything",
      "Went away sad because very rich",
      "Rich man who went away sad"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Rich Man",
    famousFor: "Couldn't give up wealth to follow Jesus"
  },
  {
    id: 235,
    name: "The Widow's Mite",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A poor widow at the temple",
      "Put two small copper coins in offering",
      "Jesus watched people giving",
      "Jesus said she gave more than all others",
      "Gave all she had to live on",
      "Widow who gave two coins"
    ],
    books: ["Mark", "Luke"],
    role: "Widow",
    famousFor: "Gave all she had, two small coins"
  },
  {
    id: 236,
    name: "The Alabaster Jar",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Contained very expensive perfume",
      "Pure nard, very costly",
      "Broken and poured on Jesus",
      "Some were indignant at the waste",
      "Jesus said it was for his burial",
      "Jar of expensive perfume poured on Jesus"
    ],
    books: ["Matthew", "Mark", "John"],
    role: "Object",
    famousFor: "Expensive perfume poured on Jesus"
  },
  {
    id: 237,
    name: "The Thirty Pieces of Silver",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Price paid to betray Jesus",
      "Judas received this amount",
      "Thrown back in temple",
      "Used to buy potter's field",
      "Fulfilled prophecy from Zechariah",
      "Payment for betraying Jesus"
    ],
    books: ["Matthew"],
    role: "Object/Payment",
    famousFor: "What Judas was paid to betray Jesus"
  },
  {
    id: 238,
    name: "The Crown of Thorns",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Made by Roman soldiers",
      "Placed on Jesus's head in mockery",
      "Part of his torture before crucifixion",
      "Soldiers also put purple robe on him",
      "Said 'Hail, King of the Jews'",
      "Thorny crown mocking Jesus"
    ],
    books: ["Matthew", "Mark", "John"],
    role: "Object",
    famousFor: "Crown of mockery placed on Jesus"
  },
  {
    id: 239,
    name: "The Seamless Robe",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Jesus's garment at crucifixion",
      "Woven in one piece from top to bottom",
      "Soldiers didn't want to tear it",
      "Cast lots to decide who would get it",
      "Fulfilled Scripture about dividing garments",
      "Jesus's robe soldiers gambled for"
    ],
    books: ["John"],
    role: "Object",
    famousFor: "Jesus's seamless tunic soldiers cast lots for"
  },
  {
    id: 240,
    name: "The Sponge with Vinegar",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Offered to Jesus on the cross",
      "Put on a hyssop branch",
      "Given when Jesus said 'I thirst'",
      "Jesus tasted it",
      "After this Jesus said 'It is finished'",
      "Vinegar given to Jesus on cross"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Object",
    famousFor: "Sour wine offered to Jesus on cross"
  },
  {
    id: 241,
    name: "Joseph of Arimathea",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A rich man and secret disciple",
      "Member of the Sanhedrin",
      "Asked Pilate for Jesus's body",
      "Provided his own new tomb",
      "Helped Nicodemus bury Jesus",
      "Man who buried Jesus in his tomb"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Secret Disciple",
    famousFor: "Provided tomb for Jesus's burial"
  },
  {
    id: 242,
    name: "Mary Magdalene",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Jesus cast seven demons out of her",
      "Followed Jesus and supported his ministry",
      "Present at the crucifixion",
      "First to see risen Jesus",
      "Went to tomb with spices",
      "First witness of resurrection"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Follower of Jesus",
    famousFor: "First person to see risen Jesus"
  },
  {
    id: 243,
    name: "Thomas",
    testament: "New",
    difficulty: "easy",
    clues: [
      "One of the twelve disciples",
      "Also called Didymus (the twin)",
      "Absent when Jesus first appeared to disciples",
      "Said he wouldn't believe without seeing wounds",
      "Jesus appeared and invited him to touch",
      "Doubting disciple who needed proof"
    ],
    books: ["John"],
    role: "Apostle",
    famousFor: "Doubted resurrection until he saw Jesus"
  },
  {
    id: 244,
    name: "Cleopas",
    testament: "New",
    difficulty: "hard",
    clues: [
      "One of two disciples on road",
      "Walking to Emmaus after crucifixion",
      "Talked with stranger about recent events",
      "Didn't recognize Jesus at first",
      "Recognized him at breaking of bread",
      "Disciple on road to Emmaus"
    ],
    books: ["Luke"],
    role: "Disciple",
    famousFor: "Met risen Jesus on road to Emmaus"
  },
  {
    id: 245,
    name: "Matthias",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Chosen to replace Judas Iscariot",
      "Had followed Jesus from John's baptism",
      "Witness of resurrection",
      "Chosen by casting lots",
      "One of two candidates considered",
      "Apostle who replaced Judas"
    ],
    books: ["Acts"],
    role: "Apostle",
    famousFor: "Replaced Judas as twelfth apostle"
  },
  {
    id: 246,
    name: "Ananias and Sapphira",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A married couple in early church",
      "Sold property but kept back some money",
      "Lied to Peter about the price",
      "Both fell dead for lying",
      "Great fear came upon the church",
      "Couple who lied and died"
    ],
    books: ["Acts"],
    role: "Church Members",
    famousFor: "Lied to Holy Spirit and died"
  },
  {
    id: 247,
    name: "The Sanhedrin",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Jewish ruling council",
      "Led by high priest",
      "Seventy-one members",
      "Tried Jesus illegally at night",
      "Arrested and threatened apostles",
      "Jewish council that condemned Jesus"
    ],
    books: ["Matthew", "Mark", "Luke", "John", "Acts"],
    role: "Religious Council",
    famousFor: "Jewish council that condemned Jesus"
  },
  {
    id: 248,
    name: "Herod Antipas",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Son of Herod the Great",
      "Tetrarch of Galilee",
      "Married his brother's wife",
      "Beheaded John the Baptist",
      "Questioned Jesus during trial",
      "King who killed John the Baptist"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "King/Tetrarch",
    famousFor: "Beheaded John the Baptist"
  },
  {
    id: 249,
    name: "Herodias",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Wife of Herod Antipas",
      "Previously married to his brother Philip",
      "John the Baptist condemned her marriage",
      "Held a grudge against John",
      "Used her daughter to get John killed",
      "Woman who wanted John dead"
    ],
    books: ["Matthew", "Mark"],
    role: "Queen",
    famousFor: "Arranged John the Baptist's execution"
  },
  {
    id: 250,
    name: "Salome (Herodias's daughter)",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Daughter of Herodias",
      "Danced for Herod at his birthday",
      "Herod promised her anything she wanted",
      "Asked for head of John the Baptist",
      "John's head brought on a platter",
      "Dancer who asked for John's head"
    ],
    books: ["Matthew", "Mark"],
    role: "Princess",
    famousFor: "Danced and requested John the Baptist's head"
  },
  {
    id: 251,
    name: "The Gerasene Demoniac",
    testament: "New",
    difficulty: "hard",
    clues: [
      "Lived among tombs in Decapolis",
      "No one could bind him, not even with chains",
      "Cut himself with stones",
      "Jesus cast out many demons from him",
      "Found clothed and in right mind",
      "Demon-possessed man among tombs"
    ],
    books: ["Mark", "Luke"],
    role: "Demoniac",
    famousFor: "Freed from legion of demons"
  },
  {
    id: 252,
    name: "The Syrophoenician Woman",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Gentile woman from Phoenicia",
      "Her daughter was demon-possessed",
      "Begged Jesus to heal her daughter",
      "Jesus tested her faith with words about dogs",
      "She persisted with clever response",
      "Gentile woman with great faith"
    ],
    books: ["Matthew", "Mark"],
    role: "Gentile Woman",
    famousFor: "Great faith that impressed Jesus"
  },
  {
    id: 253,
    name: "The Canaanite Woman",
    testament: "New",
    difficulty: "hard",
    clues: [
      "From region of Tyre and Sidon",
      "Cried out 'Lord, Son of David'",
      "Her daughter was demon-possessed",
      "Disciples wanted Jesus to send her away",
      "Jesus praised her great faith",
      "Persistent mother with great faith"
    ],
    books: ["Matthew"],
    role: "Canaanite Woman",
    famousFor: "Persistent faith for daughter's healing"
  },
  {
    id: 254,
    name: "The Pool of Bethesda",
    testament: "New",
    difficulty: "medium",
    clues: [
      "A pool in Jerusalem near Sheep Gate",
      "Had five covered colonnades",
      "Disabled people waited here",
      "Believed angel stirred the water",
      "Jesus healed paralyzed man here",
      "Pool where Jesus healed on Sabbath"
    ],
    books: ["John"],
    role: "Place",
    famousFor: "Where Jesus healed paralyzed man on Sabbath"
  },
  {
    id: 255,
    name: "The Pool of Siloam",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A pool in Jerusalem",
      "Name means 'Sent'",
      "Jesus sent blind man to wash here",
      "Man born blind received sight",
      "Connected to Gihon Spring",
      "Pool where blind man washed and saw"
    ],
    books: ["John"],
    role: "Place",
    famousFor: "Where blind man washed and received sight"
  },
  {
    id: 256,
    name: "The Jordan River",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Major river in Israel",
      "John the Baptist baptized here",
      "Jesus was baptized in this river",
      "Heaven opened and Spirit descended",
      "Voice from heaven spoke",
      "River where Jesus was baptized"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Where Jesus was baptized"
  },
  {
    id: 257,
    name: "The Sea of Galilee",
    testament: "New",
    difficulty: "easy",
    clues: [
      "Large freshwater lake in Israel",
      "Jesus called fishermen here",
      "Site of many miracles",
      "Jesus walked on its waters",
      "Jesus calmed a storm here",
      "Lake where Jesus did many miracles"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Place",
    famousFor: "Site of many Jesus miracles"
  },
  {
    id: 258,
    name: "The Boat",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Used by disciples for fishing and travel",
      "Jesus taught from one",
      "Jesus slept in one during storm",
      "Disciples rowed while Jesus walked on water",
      "Nearly sank when filled with fish",
      "Fishing boat Jesus often used"
    ],
    books: ["Matthew", "Mark", "Luke", "John"],
    role: "Object",
    famousFor: "Vessel Jesus used to teach and travel"
  },
  {
    id: 259,
    name: "The Fig Tree",
    testament: "New",
    difficulty: "medium",
    clues: [
      "Jesus looked for fruit on it",
      "Had only leaves, no fruit",
      "Jesus cursed it",
      "Withered from the roots",
      "Lesson about faith and prayer",
      "Tree Jesus cursed for no fruit"
    ],
    books: ["Matthew", "Mark"],
    role: "Plant/Object",
    famousFor: "Cursed by Jesus as object lesson"
  },
  {
    id: 260,
    name: "The Denarius",
    testament: "New",
    difficulty: "hard",
    clues: [
      "A Roman silver coin",
      "Day's wage for a laborer",
      "Pharisees asked about paying taxes",
      "Had Caesar's image on it",
      "Jesus said 'Give to Caesar what is Caesar's'",
      "Coin used in tax question"
    ],
    books: ["Matthew", "Mark", "Luke"],
    role: "Object/Coin",
    famousFor: "Coin Jesus used to teach about taxes"
  },
  {
    id: 261,
    name: "Cain",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "First son of Adam and Eve",
      "Worked as a farmer",
      "His offering was not accepted",
      "Became angry and jealous",
      "Killed his brother Abel",
      "First murderer in the Bible"
    ],
    books: ["Genesis"],
    role: "Son of Adam",
    famousFor: "First murder - killed his brother Abel"
  },
  {
    id: 262,
    name: "Abel",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Second son of Adam and Eve",
      "Worked as a shepherd",
      "His offering was accepted by God",
      "First martyr",
      "Killed by his brother",
      "First murder victim"
    ],
    books: ["Genesis", "Hebrews"],
    role: "Son of Adam",
    famousFor: "First martyr, killed by his brother Cain"
  },
  {
    id: 263,
    name: "Seth",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Third son of Adam and Eve",
      "Born after Abel's death",
      "Means 'appointed' or 'granted'",
      "Ancestor of Noah",
      "Part of Messiah's lineage",
      "Son born after Abel died"
    ],
    books: ["Genesis"],
    role: "Son of Adam",
    famousFor: "Replaced Abel in Adam's line"
  },
  {
    id: 264,
    name: "Enoch",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Walked with God for 300 years",
      "Father of Methuselah",
      "Never died",
      "God took him away",
      "One of only two who didn't die",
      "Man who walked with God and didn't die"
    ],
    books: ["Genesis", "Hebrews"],
    role: "Patriarch",
    famousFor: "Walked with God and taken to heaven without dying"
  },
  {
    id: 265,
    name: "Methuselah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Oldest person in the Bible",
      "Lived 969 years",
      "Son of Enoch",
      "Grandfather of Noah",
      "Died in year of the flood",
      "Longest-living person"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Lived longer than anyone else - 969 years"
  },
  {
    id: 266,
    name: "Lamech (Noah's father)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Son of Methuselah",
      "Father of Noah",
      "Prophesied his son would bring comfort",
      "Lived 777 years",
      "Named his son 'rest'",
      "Noah's father"
    ],
    books: ["Genesis"],
    role: "Patriarch",
    famousFor: "Father of Noah"
  },
  {
    id: 267,
    name: "Shem",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "One of Noah's three sons",
      "Entered ark with family",
      "Covered father's nakedness",
      "Ancestor of Abraham",
      "Semitic peoples descended from him",
      "Noah's son, Abraham's ancestor"
    ],
    books: ["Genesis"],
    role: "Son of Noah",
    famousFor: "Noah's righteous son, ancestor of Abraham"
  },
  {
    id: 268,
    name: "Ham",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "One of Noah's three sons",
      "Saw his father naked",
      "Told brothers about it",
      "Father of Canaan",
      "His descendants were cursed",
      "Noah's son who was cursed"
    ],
    books: ["Genesis"],
    role: "Son of Noah",
    famousFor: "Dishonored his father Noah"
  },
  {
    id: 269,
    name: "Japheth",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "One of Noah's three sons",
      "Helped cover father with Shem",
      "His descendants spread to coastlands",
      "Blessed by Noah",
      "Many nations descended from him",
      "Noah's son who helped cover him"
    ],
    books: ["Genesis"],
    role: "Son of Noah",
    famousFor: "Noah's son, blessed for honoring father"
  },
  {
    id: 270,
    name: "Nimrod",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A mighty hunter",
      "Great-grandson of Noah",
      "Built several cities",
      "Kingdom included Babylon",
      "First empire builder",
      "Mighty hunter and empire builder"
    ],
    books: ["Genesis"],
    role: "King/Hunter",
    famousFor: "Mighty hunter before the Lord, built Babylon"
  },
  {
    id: 271,
    name: "Lot",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Abraham's nephew",
      "Traveled with Abraham from Ur",
      "Chose to live near Sodom",
      "Rescued by Abraham from kings",
      "Escaped Sodom's destruction",
      "Abraham's nephew in Sodom"
    ],
    books: ["Genesis"],
    role: "Abraham's Nephew",
    famousFor: "Escaped Sodom, wife turned to salt"
  },
  {
    id: 272,
    name: "Lot's Wife",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Warned not to look back",
      "Fleeing from destroyed city",
      "Disobeyed angels' command",
      "Turned into a pillar",
      "Made of salt",
      "Woman who became salt pillar"
    ],
    books: ["Genesis", "Luke"],
    role: "Lot's Wife",
    famousFor: "Turned to salt for looking back at Sodom"
  },
  {
    id: 273,
    name: "Hagar",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Sarah's Egyptian servant",
      "Mother of Ishmael",
      "Ran away into desert twice",
      "Angel appeared to her at a well",
      "God heard her son crying",
      "Mother of Ishmael"
    ],
    books: ["Genesis"],
    role: "Servant/Mother",
    famousFor: "Mother of Ishmael, saw angel in desert"
  },
  {
    id: 274,
    name: "Ishmael",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Abraham's first son",
      "Born to Egyptian servant",
      "Name means 'God hears'",
      "Sent away with his mother",
      "Became an archer in desert",
      "Abraham's son by Hagar"
    ],
    books: ["Genesis"],
    role: "Son of Abraham",
    famousFor: "Abraham's son through Hagar"
  },
  {
    id: 275,
    name: "Rebekah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Found at a well by Abraham's servant",
      "Gave water to camels",
      "Isaac's wife",
      "Mother of twins",
      "Helped younger son deceive husband",
      "Isaac's wife, mother of Jacob and Esau"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Isaac's wife, helped Jacob deceive Isaac"
  },
  {
    id: 276,
    name: "Esau",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Isaac's firstborn son",
      "Twin brother",
      "Skilled hunter",
      "Sold his birthright for food",
      "Father deceived him",
      "Twin who sold birthright"
    ],
    books: ["Genesis"],
    role: "Son of Isaac",
    famousFor: "Sold birthright to Jacob for stew"
  },
  {
    id: 277,
    name: "Laban",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Rebekah's brother",
      "Had two daughters",
      "Jacob worked for him 14 years",
      "Deceived Jacob on wedding night",
      "Known for trickery",
      "Jacob's father-in-law"
    ],
    books: ["Genesis"],
    role: "Father-in-law",
    famousFor: "Deceived Jacob into marrying both daughters"
  },
  {
    id: 278,
    name: "Leah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Laban's older daughter",
      "Had weak eyes",
      "Given to Jacob instead of sister",
      "Not loved as much as sister",
      "Mother of six of Jacob's sons",
      "Jacob's first wife"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Jacob's first wife, unloved but fertile"
  },
  {
    id: 279,
    name: "Rachel",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Laban's younger daughter",
      "Beautiful and lovely",
      "Jacob worked 14 years for her",
      "Deeply loved by Jacob",
      "Mother of Joseph and Benjamin",
      "Jacob's beloved wife"
    ],
    books: ["Genesis"],
    role: "Matriarch",
    famousFor: "Jacob's beloved wife, mother of Joseph"
  },
  {
    id: 280,
    name: "Dinah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Jacob's only named daughter",
      "Went to visit women of the land",
      "Violated by a prince",
      "Her brothers took revenge",
      "Caused massacre of city",
      "Jacob's daughter who was violated"
    ],
    books: ["Genesis"],
    role: "Daughter of Jacob",
    famousFor: "Her violation led to her brothers' revenge"
  },
  {
    id: 281,
    name: "Reuben",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Jacob's firstborn son",
      "Tried to save Joseph from brothers",
      "Lost birthright due to sin",
      "Slept with father's concubine",
      "One of the twelve tribes named after him",
      "Jacob's firstborn who lost birthright"
    ],
    books: ["Genesis"],
    role: "Son of Jacob",
    famousFor: "Lost birthright for sleeping with father's concubine"
  },
  {
    id: 282,
    name: "Simeon",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Second son of Jacob and Leah",
      "Took revenge for sister's violation",
      "Held hostage in Egypt",
      "Father cursed him for violence",
      "Tribe scattered in Israel",
      "Jacob's son held in Egypt"
    ],
    books: ["Genesis"],
    role: "Son of Jacob",
    famousFor: "Avenged Dinah, held hostage by Joseph"
  },
  {
    id: 283,
    name: "Levi",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Third son of Jacob and Leah",
      "Took revenge for sister",
      "Father cursed him for violence",
      "His descendants became priests",
      "Tribe had no land inheritance",
      "Jacob's son whose tribe became priests"
    ],
    books: ["Genesis", "Exodus"],
    role: "Son of Jacob",
    famousFor: "Ancestor of priestly tribe"
  },
  {
    id: 284,
    name: "Judah",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Fourth son of Jacob and Leah",
      "Suggested selling Joseph",
      "Ancestor of kings",
      "Deceived by daughter-in-law",
      "Messiah's lineage came through him",
      "Jacob's son, ancestor of Jesus"
    ],
    books: ["Genesis"],
    role: "Son of Jacob",
    famousFor: "Ancestor of David and Jesus Christ"
  },
  {
    id: 285,
    name: "Tamar (Judah's daughter-in-law)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Married two of Judah's sons",
      "Both husbands died",
      "Disguised herself as prostitute",
      "Demanded pledge items",
      "Gave birth to twins",
      "Woman who deceived Judah"
    ],
    books: ["Genesis"],
    role: "Daughter-in-law",
    famousFor: "Tricked Judah, in Jesus's genealogy"
  },
  {
    id: 286,
    name: "Potiphar",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Captain of Pharaoh's guard",
      "Bought Joseph as slave",
      "Made Joseph overseer of house",
      "His wife accused Joseph falsely",
      "Imprisoned Joseph",
      "Egyptian who bought Joseph"
    ],
    books: ["Genesis"],
    role: "Egyptian Official",
    famousFor: "Joseph's master whose wife falsely accused Joseph"
  },
  {
    id: 287,
    name: "Potiphar's Wife",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Tried to seduce Joseph",
      "Joseph refused her advances",
      "She grabbed his cloak",
      "Falsely accused Joseph",
      "Joseph imprisoned because of her",
      "Woman who falsely accused Joseph"
    ],
    books: ["Genesis"],
    role: "Egyptian Woman",
    famousFor: "Tried to seduce Joseph, falsely accused him"
  },
  {
    id: 288,
    name: "The Cupbearer",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Imprisoned with Joseph",
      "Had dream about vine with branches",
      "Joseph interpreted his dream",
      "Restored to Pharaoh's service",
      "Forgot Joseph for two years",
      "Pharaoh's servant who forgot Joseph"
    ],
    books: ["Genesis"],
    role: "Palace Official",
    famousFor: "Forgot Joseph after being restored"
  },
  {
    id: 289,
    name: "The Baker",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Imprisoned with Joseph",
      "Dreamed about baskets on head",
      "Joseph interpreted his dream",
      "Birds ate from his basket",
      "Executed as Joseph predicted",
      "Pharaoh's baker who was executed"
    ],
    books: ["Genesis"],
    role: "Palace Official",
    famousFor: "Had dream interpreted by Joseph, executed"
  },
  {
    id: 290,
    name: "Asenath",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Daughter of Egyptian priest",
      "Given to Joseph as wife",
      "Mother of Manasseh and Ephraim",
      "Lived in Egypt",
      "Wife of second most powerful man",
      "Joseph's Egyptian wife"
    ],
    books: ["Genesis"],
    role: "Joseph's Wife",
    famousFor: "Joseph's wife, mother of Manasseh and Ephraim"
  },
  {
    id: 291,
    name: "Manasseh",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Joseph's firstborn son",
      "Born in Egypt",
      "Name means 'God has made me forget'",
      "Blessed by Jacob",
      "Received right hand blessing meant for younger",
      "Joseph's older son"
    ],
    books: ["Genesis"],
    role: "Joseph's Son",
    famousFor: "Joseph's firstborn, blessed by Jacob"
  },
  {
    id: 292,
    name: "Ephraim",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Joseph's second son",
      "Born in Egypt",
      "Name means 'God has made me fruitful'",
      "Received greater blessing from Jacob",
      "Put before his older brother",
      "Joseph's younger son given greater blessing"
    ],
    books: ["Genesis"],
    role: "Joseph's Son",
    famousFor: "Received Jacob's right hand blessing"
  },
  {
    id: 293,
    name: "Benjamin",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Jacob's youngest son",
      "Mother died giving birth to him",
      "Rachel's second son",
      "Father's favorite after Joseph",
      "Joseph's only full brother",
      "Jacob's youngest son"
    ],
    books: ["Genesis"],
    role: "Son of Jacob",
    famousFor: "Rachel's youngest son, Benjamin's tribe"
  },
  {
    id: 294,
    name: "Bilhah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Rachel's servant",
      "Given to Jacob as wife",
      "Mother of Dan and Naphtali",
      "Reuben sinned with her",
      "Concubine of Jacob",
      "Rachel's maidservant"
    ],
    books: ["Genesis"],
    role: "Concubine",
    famousFor: "Mother of Dan and Naphtali"
  },
  {
    id: 295,
    name: "Zilpah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Leah's servant",
      "Given to Jacob as wife",
      "Mother of Gad and Asher",
      "One of Jacob's four wives",
      "Concubine of Jacob",
      "Leah's maidservant"
    ],
    books: ["Genesis"],
    role: "Concubine",
    famousFor: "Mother of Gad and Asher"
  },
  {
    id: 296,
    name: "Jochebed",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A Levite woman",
      "Mother of three famous children",
      "Hid her baby for three months",
      "Put baby in basket in river",
      "Became her own son's nurse",
      "Moses's mother"
    ],
    books: ["Exodus"],
    role: "Mother",
    famousFor: "Moses, Aaron, and Miriam's mother"
  },
  {
    id: 297,
    name: "Amram",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A Levite man",
      "Married his aunt",
      "Father of Moses, Aaron, and Miriam",
      "Lived 137 years",
      "From tribe of Levi",
      "Moses's father"
    ],
    books: ["Exodus"],
    role: "Father",
    famousFor: "Father of Moses, Aaron, and Miriam"
  },
  {
    id: 298,
    name: "Pharaoh's Daughter",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Found baby in basket",
      "Had compassion on Hebrew baby",
      "Adopted him as her son",
      "Named him because she drew him out",
      "Raised him in palace",
      "Egyptian princess who found Moses"
    ],
    books: ["Exodus"],
    role: "Princess",
    famousFor: "Found and adopted baby Moses"
  },
  {
    id: 299,
    name: "Zipporah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Daughter of Midianite priest",
      "Met Moses at a well",
      "Moses defended her and sisters",
      "Became Moses's wife",
      "Circumcised their son",
      "Moses's wife"
    ],
    books: ["Exodus"],
    role: "Moses's Wife",
    famousFor: "Moses's wife who circumcised their son"
  },
  {
    id: 300,
    name: "Jethro",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Priest of Midian",
      "Also called Reuel",
      "Moses's father-in-law",
      "Gave Moses advice about delegation",
      "Suggested appointing judges",
      "Moses's father-in-law who gave advice"
    ],
    books: ["Exodus"],
    role: "Priest/Father-in-law",
    famousFor: "Advised Moses to delegate judging"
  },
  {
    id: 301,
    name: "Korah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A Levite who rebelled",
      "Led 250 leaders against Moses",
      "Questioned Moses's authority",
      "Earth opened up beneath him",
      "Swallowed by ground",
      "Man who rebelled and earth swallowed"
    ],
    books: ["Numbers"],
    role: "Rebel Leader",
    famousFor: "Led rebellion, swallowed by earth"
  },
  {
    id: 302,
    name: "Balaam",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A prophet hired to curse Israel",
      "His donkey spoke to him",
      "Angel blocked his path",
      "Could only speak God's words",
      "Blessed Israel instead of cursing",
      "Prophet whose donkey talked"
    ],
    books: ["Numbers"],
    role: "Prophet",
    famousFor: "Prophet whose donkey spoke, blessed Israel"
  },
  {
    id: 303,
    name: "Balak",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Moab",
      "Feared the Israelites",
      "Hired Balaam to curse Israel",
      "Built altars for sacrifices",
      "Failed to get Israel cursed",
      "King who hired Balaam"
    ],
    books: ["Numbers"],
    role: "King",
    famousFor: "Hired Balaam to curse Israel"
  },
  {
    id: 304,
    name: "Achan",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Took forbidden plunder from Jericho",
      "Hid items under his tent",
      "Caused Israel's defeat at Ai",
      "Discovered by casting lots",
      "Stoned with his family",
      "Man who took forbidden plunder"
    ],
    books: ["Joshua"],
    role: "Israelite",
    famousFor: "Stole from Jericho, caused defeat at Ai"
  },
  {
    id: 305,
    name: "Barak",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Military commander of Israel",
      "Called by Deborah to fight",
      "Would only go if she came too",
      "Defeated Sisera's army",
      "Victory went to a woman",
      "Commander who fought with Deborah"
    ],
    books: ["Judges"],
    role: "Military Commander",
    famousFor: "Led Israel's army under Deborah"
  },
  {
    id: 306,
    name: "Sisera",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Commander of Canaanite army",
      "Had 900 iron chariots",
      "Fled battle on foot",
      "Sought refuge in woman's tent",
      "Killed with tent peg through temple",
      "Commander killed by Jael"
    ],
    books: ["Judges"],
    role: "Enemy Commander",
    famousFor: "Killed by Jael with tent peg"
  },
  {
    id: 307,
    name: "Jael",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Wife of Heber the Kenite",
      "Invited fleeing commander into tent",
      "Gave him milk and covered him",
      "Used tent peg as weapon",
      "Killed Israel's enemy",
      "Woman who killed Sisera"
    ],
    books: ["Judges"],
    role: "Heroine",
    famousFor: "Killed Sisera with tent peg"
  },
  {
    id: 308,
    name: "Gideon's Fleece",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A piece of wool",
      "Used to test God's promise",
      "Wet while ground was dry",
      "Then dry while ground was wet",
      "Sign of confirmation",
      "Wool Gideon used to test God"
    ],
    books: ["Judges"],
    role: "Object/Sign",
    famousFor: "Sign God gave Gideon"
  },
  {
    id: 309,
    name: "The Three Hundred",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Gideon's final army size",
      "Selected by how they drank water",
      "Lapped water like dogs",
      "Carried torches and trumpets",
      "Defeated huge Midianite army",
      "Gideon's small army"
    ],
    books: ["Judges"],
    role: "Warriors",
    famousFor: "Gideon's 300 who defeated Midianites"
  },
  {
    id: 310,
    name: "Jephthah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Son of a prostitute",
      "Rejected by his brothers",
      "Became a mighty warrior",
      "Made a rash vow to God",
      "Sacrificed his only daughter",
      "Judge who made tragic vow"
    ],
    books: ["Judges"],
    role: "Judge",
    famousFor: "Made vow that cost his daughter"
  },
  {
    id: 311,
    name: "Manoah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "From tribe of Dan",
      "His wife was barren",
      "Angel appeared to announce son",
      "Father of famous strongman",
      "Offered sacrifice to angel",
      "Samson's father"
    ],
    books: ["Judges"],
    role: "Father",
    famousFor: "Father of Samson"
  },
  {
    id: 312,
    name: "The Levite's Concubine",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Fled to her father's house",
      "Stayed in Gibeah",
      "Abused by wicked men",
      "Died at doorstep",
      "Her death caused civil war",
      "Woman whose death caused war"
    ],
    books: ["Judges"],
    role: "Concubine",
    famousFor: "Her death led to war against Benjamin"
  },
  {
    id: 313,
    name: "Orpah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Ruth's sister-in-law",
      "Both married Naomi's sons",
      "Husband died in Moab",
      "Kissed Naomi goodbye",
      "Returned to her people",
      "Ruth's sister-in-law who stayed"
    ],
    books: ["Ruth"],
    role: "Daughter-in-law",
    famousFor: "Naomi's daughter-in-law who returned to Moab"
  },
  {
    id: 314,
    name: "Ichabod",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Born when ark was captured",
      "Mother died giving birth",
      "Name means 'no glory'",
      "Grandson of Eli",
      "Named for Israel's loss",
      "Baby named 'no glory'"
    ],
    books: ["1 Samuel"],
    role: "Child",
    famousFor: "Named 'no glory' when ark was captured"
  },
  {
    id: 315,
    name: "Abigail",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Married to foolish man",
      "Beautiful and intelligent",
      "Brought food to David",
      "Prevented David from revenge",
      "Became David's wife",
      "Wise woman who saved household"
    ],
    books: ["1 Samuel"],
    role: "Wife",
    famousFor: "Wisdom prevented David from sin"
  },
  {
    id: 316,
    name: "Nabal",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Rich man with many sheep",
      "Name means 'fool'",
      "Refused to help David",
      "His wife went behind his back",
      "Died after hearing what happened",
      "Foolish man married to Abigail"
    ],
    books: ["1 Samuel"],
    role: "Rich Fool",
    famousFor: "Foolishly insulted David, died suddenly"
  },
  {
    id: 317,
    name: "The Witch of Endor",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "A medium Saul consulted",
      "Saul came in disguise",
      "Brought up Samuel's spirit",
      "She was terrified by what happened",
      "Predicted Saul's death",
      "Medium who summoned Samuel"
    ],
    books: ["1 Samuel"],
    role: "Medium",
    famousFor: "Summoned Samuel's spirit for Saul"
  },
  {
    id: 318,
    name: "Ish-bosheth",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Son of Saul",
      "Made king over Israel",
      "Rival to David",
      "Accused Abner of wrong",
      "Assassinated in his bed",
      "Saul's son who rivaled David"
    ],
    books: ["2 Samuel"],
    role: "King",
    famousFor: "Saul's son, rival king to David"
  },
  {
    id: 319,
    name: "Abner",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Saul's cousin and commander",
      "Made Ish-bosheth king",
      "Killed Joab's brother Asahel",
      "Switched allegiance to David",
      "Murdered by Joab",
      "Saul's commander killed by Joab"
    ],
    books: ["1 Samuel", "2 Samuel"],
    role: "Commander",
    famousFor: "Saul's general, killed by Joab"
  },
  {
    id: 320,
    name: "Joab",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "David's nephew and commander",
      "Killed Abner for revenge",
      "Killed Absalom against orders",
      "Very loyal but ruthless",
      "Executed by Solomon",
      "David's ruthless commander"
    ],
    books: ["2 Samuel", "1 Kings"],
    role: "Commander",
    famousFor: "David's general who killed Abner and Absalom"
  },
  {
    id: 321,
    name: "Uriah the Hittite",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "One of David's mighty men",
      "Married to beautiful woman",
      "David sent him to front lines",
      "Refused to go home to his wife",
      "Killed in battle as planned",
      "Soldier David had killed"
    ],
    books: ["2 Samuel"],
    role: "Soldier",
    famousFor: "Loyal soldier David had killed for his wife"
  },
  {
    id: 322,
    name: "Amnon",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "David's firstborn son",
      "Pretended to be sick",
      "Violated his half-sister",
      "Hated her afterward",
      "Killed by Absalom",
      "David's son who violated Tamar"
    ],
    books: ["2 Samuel"],
    role: "Prince",
    famousFor: "Violated Tamar, killed by Absalom"
  },
  {
    id: 323,
    name: "Tamar (David's daughter)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Daughter of David",
      "Absalom's sister",
      "Made special bread for sick brother",
      "Violated by her half-brother",
      "Lived desolate in brother's house",
      "David's daughter violated by Amnon"
    ],
    books: ["2 Samuel"],
    role: "Princess",
    famousFor: "David's daughter violated by Amnon"
  },
  {
    id: 324,
    name: "Adonijah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "David's fourth son",
      "Very handsome",
      "Tried to make himself king",
      "Never been rebuked by father",
      "Executed by Solomon",
      "David's son who tried to be king"
    ],
    books: ["1 Kings"],
    role: "Prince",
    famousFor: "Tried to usurp throne from Solomon"
  },
  {
    id: 325,
    name: "Abishag",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Very beautiful young woman",
      "Cared for David in old age",
      "David's nurse and companion",
      "Adonijah requested to marry her",
      "Request cost Adonijah his life",
      "Young woman who cared for old David"
    ],
    books: ["1 Kings"],
    role: "Caregiver",
    famousFor: "Cared for elderly David"
  },
  {
    id: 326,
    name: "The Two Prostitutes",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Both had babies",
      "Lived in same house",
      "One baby died in the night",
      "Argued over living baby",
      "Solomon judged between them",
      "Two women Solomon judged"
    ],
    books: ["1 Kings"],
    role: "Mothers",
    famousFor: "Solomon's wise judgment about baby"
  },
  {
    id: 327,
    name: "Hiram of Tyre",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Tyre",
      "Friend of David and Solomon",
      "Provided cedar and craftsmen",
      "Helped build the temple",
      "Made trade agreements",
      "King who helped build temple"
    ],
    books: ["1 Kings"],
    role: "King",
    famousFor: "Provided materials for temple"
  },
  {
    id: 328,
    name: "The Queen of Sheba",
    testament: "Old",
    difficulty: "easy",
    clues: [
      "Heard of Solomon's fame",
      "Traveled from far away",
      "Came with many gifts",
      "Tested him with hard questions",
      "Amazed by his wisdom",
      "Queen who visited Solomon"
    ],
    books: ["1 Kings"],
    role: "Queen",
    famousFor: "Tested Solomon's wisdom"
  },
  {
    id: 329,
    name: "Jeroboam",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Solomon's servant",
      "Prophet tore cloak in 12 pieces",
      "Given 10 tribes to rule",
      "First king of northern Israel",
      "Made golden calves",
      "King who made golden calves"
    ],
    books: ["1 Kings"],
    role: "King",
    famousFor: "First king of Israel (north), made golden calves"
  },
  {
    id: 330,
    name: "Rehoboam",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Solomon's son",
      "Rejected elders' advice",
      "Followed advice of young men",
      "Said 'My little finger is thicker'",
      "Kingdom divided under him",
      "King whose foolishness split kingdom"
    ],
    books: ["1 Kings"],
    role: "King",
    famousFor: "Foolish king who caused kingdom to split"
  },
  {
    id: 331,
    name: "Ahab",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "King of Israel",
      "Married to wicked woman",
      "Allowed Baal worship",
      "Wanted Naboth's vineyard",
      "Killed in battle by arrow",
      "Wicked king married to Jezebel"
    ],
    books: ["1 Kings"],
    role: "King",
    famousFor: "Wicked king married to Jezebel"
  },
  {
    id: 332,
    name: "The Widow of Zarephath",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Making last meal for son",
      "Had only handful of flour",
      "Fed Elijah first",
      "Flour and oil never ran out",
      "Her son was raised from dead",
      "Widow whose flour never ran out"
    ],
    books: ["1 Kings"],
    role: "Widow",
    famousFor: "Fed Elijah, son raised from dead"
  },
  {
    id: 333,
    name: "The Prophets of Baal",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "450 of them on Mount Carmel",
      "Called on their god all day",
      "Cut themselves with swords",
      "Their sacrifice wasn't consumed",
      "All killed by Elijah's command",
      "False prophets on Mount Carmel"
    ],
    books: ["1 Kings"],
    role: "False Prophets",
    famousFor: "Defeated by Elijah on Mount Carmel"
  },
  {
    id: 334,
    name: "Obadiah (Ahab's servant)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Served wicked king",
      "Feared God greatly",
      "Hid 100 prophets in caves",
      "Fed them bread and water",
      "Helped arrange meeting with Elijah",
      "Servant who hid prophets in caves"
    ],
    books: ["1 Kings"],
    role: "Palace Official",
    famousFor: "Hid 100 prophets from Jezebel"
  },
  {
    id: 335,
    name: "Naboth",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Owned a vineyard",
      "Refused to sell to king",
      "Said it was ancestral land",
      "Falsely accused of blasphemy",
      "Stoned to death",
      "Man killed for his vineyard"
    ],
    books: ["1 Kings"],
    role: "Landowner",
    famousFor: "Murdered for vineyard Ahab wanted"
  },
  {
    id: 336,
    name: "Jehoshaphat",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "King of Judah",
      "Generally followed God",
      "Allied with Ahab",
      "Organized judicial system",
      "Won battle without fighting",
      "Good king who allied with Ahab"
    ],
    books: ["1 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Good king, won battle with worship"
  },
  {
    id: 337,
    name: "Ahaziah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Son of Ahab",
      "Fell through lattice",
      "Sent to inquire of Baal-zebub",
      "Elijah intercepted messengers",
      "Fire consumed his captains",
      "King who fell through lattice"
    ],
    books: ["2 Kings"],
    role: "King",
    famousFor: "Sought Baal-zebub, died as Elijah prophesied"
  },
  {
    id: 338,
    name: "Elisha's Servant",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Served prophet Elisha",
      "Saw mountains full of horses",
      "Went to Naaman for money",
      "Lied about receiving gifts",
      "Struck with leprosy",
      "Gehazi who became leprous"
    ],
    books: ["2 Kings"],
    role: "Servant",
    famousFor: "Lied and received Naaman's leprosy"
  },
  {
    id: 339,
    name: "The Shunammite Woman",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Built room for Elisha",
      "Was promised a son",
      "Her son died of head pain",
      "Traveled to find Elisha",
      "Son raised from dead",
      "Woman whose son Elisha raised"
    ],
    books: ["2 Kings"],
    role: "Hostess",
    famousFor: "Showed hospitality, son raised from dead"
  },
  {
    id: 340,
    name: "Jehu",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Anointed king by prophet's servant",
      "Drove chariot furiously",
      "Killed King Joram",
      "Had Jezebel thrown from window",
      "Destroyed Baal worship",
      "King who drove furiously"
    ],
    books: ["2 Kings"],
    role: "King",
    famousFor: "Drove furiously, destroyed Baal worship"
  },
  {
    id: 341,
    name: "Athaliah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Daughter of Ahab and Jezebel",
      "Only woman to rule Judah",
      "Killed all royal family",
      "Reigned for six years",
      "Executed in temple",
      "Queen who killed royal family"
    ],
    books: ["2 Kings"],
    role: "Queen",
    famousFor: "Only queen of Judah, killed heirs"
  },
  {
    id: 342,
    name: "Joash (boy king)",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Hidden in temple as baby",
      "Aunt saved him from massacre",
      "Became king at age seven",
      "Repaired the temple",
      "Later killed prophets",
      "Boy king raised in temple"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Became king at 7, repaired temple"
  },
  {
    id: 343,
    name: "Uzziah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Also called Azariah",
      "Became king at 16",
      "Did right in God's eyes",
      "Tried to burn incense in temple",
      "Struck with leprosy",
      "King who became leprous"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Good king struck with leprosy for pride"
  },
  {
    id: 344,
    name: "Manasseh",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Most wicked king of Judah",
      "Became king at age 12",
      "Practiced witchcraft and sorcery",
      "Sacrificed his own son",
      "Repented in captivity",
      "Most wicked king who repented"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Most wicked king who later repented"
  },
  {
    id: 345,
    name: "Josiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Became king at age 8",
      "Book of Law found during his reign",
      "Led greatest reformation",
      "Tore his clothes hearing Law",
      "Killed in battle at Megiddo",
      "Boy king who found Law book"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "King",
    famousFor: "Boy king who led great reformation"
  },
  {
    id: 346,
    name: "Huldah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A prophetess in Jerusalem",
      "Wife of Shallum",
      "Consulted about Law book",
      "Prophesied judgment on Judah",
      "Josiah sent priests to her",
      "Prophetess consulted by Josiah"
    ],
    books: ["2 Kings", "2 Chronicles"],
    role: "Prophetess",
    famousFor: "Prophesied about Book of Law"
  },
  {
    id: 347,
    name: "Zedekiah",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Last king of Judah",
      "Rebelled against Babylon",
      "Ignored Jeremiah's warnings",
      "Sons killed before his eyes",
      "Blinded and taken captive",
      "Last king of Judah"
    ],
    books: ["2 Kings", "Jeremiah"],
    role: "King",
    famousFor: "Last king, blinded by Babylonians"
  },
  {
    id: 348,
    name: "Zerubbabel",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Led exiles back to Jerusalem",
      "Governor of Judah",
      "Rebuilt the temple",
      "Descendant of David",
      "In Jesus's genealogy",
      "Leader who rebuilt temple"
    ],
    books: ["Ezra", "Haggai", "Zechariah"],
    role: "Governor",
    famousFor: "Led return from exile, rebuilt temple"
  },
  {
    id: 349,
    name: "Jeshua (high priest)",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "High priest after exile",
      "Also called Joshua",
      "Worked with Zerubbabel",
      "Helped rebuild temple",
      "Zechariah saw vision of him",
      "High priest who rebuilt temple"
    ],
    books: ["Ezra", "Haggai", "Zechariah"],
    role: "High Priest",
    famousFor: "High priest during temple rebuilding"
  },
  {
    id: 350,
    name: "Sanballat",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Governor of Samaria",
      "Opposed Nehemiah",
      "Mocked wall building",
      "Plotted to harm Nehemiah",
      "Failed to stop the work",
      "Enemy who opposed Nehemiah"
    ],
    books: ["Nehemiah"],
    role: "Opponent",
    famousFor: "Opposed rebuilding Jerusalem's wall"
  },
  {
    id: 351,
    name: "Tobiah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Ammonite official",
      "Partnered with Sanballat",
      "Mocked the builders",
      "Had room in temple",
      "Nehemiah threw out his stuff",
      "Official who opposed wall"
    ],
    books: ["Nehemiah"],
    role: "Opponent",
    famousFor: "Mocked wall builders with Sanballat"
  },
  {
    id: 352,
    name: "Vashti",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Queen of Persia",
      "Refused king's command",
      "Would not display beauty",
      "Deposed as queen",
      "Replaced by Esther",
      "Queen who refused to come"
    ],
    books: ["Esther"],
    role: "Queen",
    famousFor: "Deposed for refusing king's summons"
  },
  {
    id: 353,
    name: "Artaxerxes",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Persia",
      "Allowed Ezra to return",
      "Gave Nehemiah permission",
      "Provided resources for rebuilding",
      "Married to Esther in some traditions",
      "Persian king who helped Nehemiah"
    ],
    books: ["Ezra", "Nehemiah"],
    role: "King",
    famousFor: "Allowed Jews to rebuild Jerusalem"
  },
  {
    id: 354,
    name: "Elihu",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Young man in Job's story",
      "Waited to speak out of respect",
      "Angry at Job and three friends",
      "Made four speeches",
      "Not rebuked by God",
      "Young man who spoke to Job"
    ],
    books: ["Job"],
    role: "Friend",
    famousFor: "Fourth friend who spoke to Job"
  },
  {
    id: 355,
    name: "Job's Wife",
    testament: "Old",
    difficulty: "medium",
    clues: [
      "Lost all her children",
      "Saw husband's suffering",
      "Told husband to curse God",
      "Said 'Curse God and die'",
      "Job rebuked her",
      "Woman who told Job to curse God"
    ],
    books: ["Job"],
    role: "Wife",
    famousFor: "Told Job to curse God and die"
  },
  {
    id: 356,
    name: "The Leviathan",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Powerful sea creature in Job",
      "Cannot be caught with hook",
      "Breathes fire in description",
      "Symbol of God's power",
      "No one can tame it",
      "Mighty creature God describes"
    ],
    books: ["Job", "Psalms", "Isaiah"],
    role: "Creature",
    famousFor: "Mighty creature showing God's power"
  },
  {
    id: 357,
    name: "The Behemoth",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Mighty land creature",
      "Eats grass like ox",
      "Tail like cedar tree",
      "Bones like iron",
      "God describes to Job",
      "Powerful creature in Job"
    ],
    books: ["Job"],
    role: "Creature",
    famousFor: "Mighty land creature God describes"
  },
  {
    id: 358,
    name: "Pekah",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Israel",
      "Assassinated his predecessor",
      "Allied with Syria against Judah",
      "Threatened Jerusalem",
      "Assassinated by Hoshea",
      "King who allied with Syria"
    ],
    books: ["2 Kings"],
    role: "King",
    famousFor: "Allied with Syria against Judah"
  },
  {
    id: 359,
    name: "Shear-Jashub",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Isaiah's son",
      "Name means 'a remnant shall return'",
      "Went with Isaiah to meet Ahaz",
      "His name was a prophecy",
      "Sign to the king",
      "Isaiah's son with prophetic name"
    ],
    books: ["Isaiah"],
    role: "Son of Prophet",
    famousFor: "Isaiah's son, living prophetic sign"
  },
  {
    id: 360,
    name: "Maher-Shalal-Hash-Baz",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Isaiah's second son",
      "Longest name in Bible",
      "Means 'quick to plunder'",
      "Sign about Syria and Israel",
      "Prophetic name",
      "Isaiah's son with longest name"
    ],
    books: ["Isaiah"],
    role: "Son of Prophet",
    famousFor: "Longest name in Bible"
  },
  {
    id: 361,
    name: "Sennacherib",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Assyria",
      "Besieged Jerusalem",
      "His officer mocked God",
      "185,000 of his soldiers died",
      "Assassinated by his sons",
      "Assyrian king whose army died"
    ],
    books: ["2 Kings", "Isaiah"],
    role: "King",
    famousFor: "Assyrian king defeated by angel"
  },
  {
    id: 362,
    name: "Ebed-Melech",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Ethiopian eunuch",
      "Served King Zedekiah",
      "Rescued Jeremiah from cistern",
      "Used rags to pull him up",
      "God promised to save him",
      "Eunuch who saved Jeremiah"
    ],
    books: ["Jeremiah"],
    role: "Palace Official",
    famousFor: "Rescued Jeremiah from muddy cistern"
  },
  {
    id: 363,
    name: "Baruch",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "Jeremiah's scribe and friend",
      "Wrote down Jeremiah's prophecies",
      "Read scroll in temple",
      "King burned the scroll",
      "Rewrote it with more words",
      "Jeremiah's faithful scribe"
    ],
    books: ["Jeremiah"],
    role: "Scribe",
    famousFor: "Jeremiah's scribe who wrote prophecies"
  },
  {
    id: 364,
    name: "Jehoiakim",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "King of Judah",
      "Burned Jeremiah's scroll",
      "Cut it with knife piece by piece",
      "Threw it in fire",
      "Died in disgrace",
      "King who burned Jeremiah's scroll"
    ],
    books: ["2 Kings", "Jeremiah"],
    role: "King",
    famousFor: "Burned Jeremiah's scroll"
  },
  {
    id: 365,
    name: "The Rechabites",
    testament: "Old",
    difficulty: "hard",
    clues: [
      "A faithful family",
      "Obeyed ancestor's commands",
      "Never drank wine",
      "Never built houses",
      "God used them as example",
      "Family that never drank wine"
    ],
    books: ["Jeremiah"],
    role: "Family",
    famousFor: "Faithful family who obeyed ancestor"
  }
];

// Get daily challenge (deterministic based on date)
export function getDailyChallenge(date: Date = new Date()): ScriptureChallenge {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const seed = year * 10000 + month * 100 + day;
  const index = seed % SCRIPTURE_CHALLENGES.length;

  return SCRIPTURE_CHALLENGES[index];
}

// Get all challenge names for autocomplete
export function getAllChallengeNames(): string[] {
  return SCRIPTURE_CHALLENGES.map(c => c.name).sort();
}

