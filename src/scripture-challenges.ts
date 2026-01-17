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

