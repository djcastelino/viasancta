import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';
import TodaysPromise from './components/TodaysPromise';
import JesusInOT from './components/JesusInOT';
import GospelInOnePicture from './components/GospelInOnePicture';

export const metadata = {
  title: 'Divine Pilgrim - AI-Guided Catholic Virtual Pilgrimages',
  description: 'Experience AI-guided Catholic virtual pilgrimage tours. Explore Eucharistic miracles, Stations of the Cross, Marian apparitions, and sacred sites worldwide.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Enhanced Hero Section */}
      <section className="max-w-7xl mx-auto px-5 py-16">
        <div className="relative min-h-[40vh] flex items-center justify-center overflow-hidden rounded-3xl shadow-2xl">
          {/* Background with overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6e3a6c]/95 via-[#8B4789]/90 to-[#6e3a6c]/95 rounded-3xl" />
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10 rounded-3xl">
              <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-5 text-white max-w-5xl mx-auto py-16">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 drop-shadow-2xl font-serif animate-fade-in">
            Divine Pilgrim
          </h1>
          <p className="text-3xl md:text-4xl text-[#D4AF37] italic mb-6 drop-shadow-lg">
            AI-Guided Catholic Virtual Pilgrimages
          </p>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Experience divine encounters through AI-guided audio tours of sacred sites, miracles, and holy places worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/tours/eucharistic-miracles"
              className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all"
            >
              Start Your Journey →
            </Link>
            <Link
              href="/about"
              className="inline-block bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/30 px-12 py-5 rounded-full font-bold text-xl shadow-2xl hover:scale-105 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Gospel in One Picture - HIDDEN FOR PHASE 2 */}
      {/* <GospelInOnePicture /> */}

      {/* Today's Promise Section */}
      <div id="promise">
        <TodaysPromise />
      </div>

      {/* Daily Scripture Challenge Section */}
      <section id="challenge" className="max-w-7xl mx-auto px-5 py-8">
        <Link href="/challenge" className="block group">
          <div className="bg-gradient-to-br from-[#6e3a6c]/95 via-[#8B4789]/90 to-[#6e3a6c]/95 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="p-8 md:p-12 text-white relative">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <span className="bg-[#D4AF37] px-4 py-1 rounded-full text-sm font-bold">
                        DAILY CHALLENGE
                      </span>
                      <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                        NEW TODAY
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
                      Daily Scripture Challenge
                    </h2>
                    <p className="text-white/90 text-lg mb-4 leading-relaxed">
                      Test your biblical knowledge with 6 clues! Can you guess today's biblical character, event, or miracle?
                      Build your streak and compete with yourself!
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🔥</span>
                        <span>Daily Streaks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📊</span>
                        <span>Track Stats</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🎮</span>
                        <span>6 Clues/Day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✝️</span>
                        <span>365 Questions</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <div className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] px-8 py-4 rounded-full font-bold text-xl shadow-xl group-hover:scale-105 transition-transform">
                      Play Today →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Scripture Memory Coach Section */}
      <section id="memory-verses" className="max-w-7xl mx-auto px-5 py-8">
        <Link href="/memory-verses" className="block group">
          <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <div className="p-8 md:p-12 text-white relative">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold">
                        SCRIPTURE MEMORY
                      </span>
                      <span className="bg-white/30 px-4 py-1 rounded-full text-sm font-semibold">
                        77 VERSES
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-3 font-serif">
                      Scripture Memory Coach
                    </h2>
                    <p className="text-white/90 text-lg mb-4 leading-relaxed">
                      Memorize 77 essential Bible verses through progressive learning, spaced repetition, and proven techniques. Take God's Word to heaven!
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📖</span>
                        <span>One Verse/Day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🧠</span>
                        <span>Proven Methods</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">✍️</span>
                        <span>Write to Remember</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🔄</span>
                        <span>Spaced Repetition</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center">
                    <div className="inline-block bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 rounded-full font-bold text-xl shadow-xl group-hover:scale-105 transition-transform">
                      Start Learning →
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Sacred Pilgrimages Section */}
      <section id="tours" className="max-w-7xl mx-auto px-5 py-8">
        <h2 className="text-4xl font-serif text-[#2C5F87] mb-8 text-center">
          Sacred Pilgrimages
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Eucharistic Miracles */}
          <Link href="/tours/eucharistic-miracles" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              {/* Hero Image Section */}
              <div className="h-60 relative overflow-hidden">
                {/* AI-generated Renaissance Eucharistic art */}
                <img
                  src="/images/eucharistic miralces/buenos_aires.png"
                  alt="Renaissance depiction of Eucharistic miracle - golden chalice with divine light"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Lighter gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>Curated by St. Carlo Acutis</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Eucharistic Miracles
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Journey through 136 documented Eucharistic miracles worldwide, meticulously researched and curated by <span className="font-semibold text-[#2C5F87]">St. Carlo Acutis</span>. Experience his legacy through AI-guided narrations.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Marian Apparitions */}
          <Link href="/tours/marian-apparitions" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="/images/tours/marian-apparitions.png"
                  alt="Renaissance depiction of Marian apparition - Blessed Virgin Mary in divine light"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Marian Apparitions
                  </h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Journey through 20 Church-approved Marian apparitions worldwide. From Guadalupe to Lourdes to Fatima, experience where Our Lady appeared with AI-guided narrations.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Stations of the Cross */}
          <Link href="/stations-of-the-cross" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              <div className="h-60 relative overflow-hidden">
                {/* AI-generated Renaissance art */}
                <img
                  src="/images/tours/stations-of-cross.png"
                  alt="Renaissance depiction of Jesus carrying the cross - Via Dolorosa"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>✝️</span>
                    <span>The Via Dolorosa</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Stations of the Cross
                  </h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Walk the Via Dolorosa in Jerusalem with <span className="font-semibold text-[#2C5F87]">Google Street View</span>. Experience the actual path Jesus walked with immersive prayer mode and audio meditations.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Sacred Mountains */}
          <Link href="/sacred-mountains" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Mount_Sinai_morning_02.jpg/1920px-Mount_Sinai_morning_02.jpg"
                  alt="Mount Sinai"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Sacred Mountains
                  </h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Journey to biblical peaks where God met humanity. From Sinai to Calvary, experience <span className="font-semibold text-[#2C5F87]">multi-voice audio tours</span>, stunning photography, and rich theological depth.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Sacred Architecture */}
          <Link href="/sacred-architecture" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="/images/architecture/cover-image.png"
                  alt="Sacred Architecture - Daily Featured Church"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>🏛️</span>
                    <span>Daily Featured Church</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Sacred Architecture
                  </h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Discover one magnificent church each day. From St. Peter's to Sagrada Família, explore <span className="font-semibold text-[#2C5F87]">architecture, history, and divine artistry</span> with detailed audio tours.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Biblical Sites - HIDDEN FOR PHASE 2 */}
          {/* <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Jerusalem-2013%282%29-View_of_the_Dome_of_the_Rock_%26_Temple_Mount_02.jpg/800px-Jerusalem-2013%282%29-View_of_the_Dome_of_the_Rock_%26_Temple_Mount_02.jpg"
                alt="Jerusalem Dome of the Rock"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Biblical Sites
                </h3>
              </div>
            </div>
            <div className="p-7">
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Walk where Jesus walked in the Holy Land. Visit Jerusalem, Bethlehem, Nazareth, and more.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div> */}
        </div>
      </section>

      {/* Spiritual Warfare Section */}
      <section id="spiritual-warfare" className="max-w-7xl mx-auto px-5 py-8">
        <h2 className="text-4xl font-serif text-[#2C5F87] mb-8 text-center">
          Spiritual Warfare
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Seven Swords */}
          <Link href="/seven-swords" className="block group h-full">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="/images/armor/sword.png"
                  alt="Seven Striking Swords"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>⚔️</span>
                    <span>Logos Ministries Inspired</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Seven Striking Swords
                  </h3>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-1">
                  Biblical prayers of transformation based on moments when God struck to convert, not destroy. Experience <span className="font-semibold text-[#2C5F87]">immersive Prayer Mode</span> with all 7 swords.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Pray Now →
                </span>
              </div>
            </div>
          </Link>

          {/* Armor of God */}
          <Link href="/armor-of-god" className="block group h-full">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="/images/armor/shield.png"
                  alt="Armor of God"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Ephesians 6:10-18</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Armor of God
                  </h3>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-1">
                  Put on the full armor of God daily. Interactive experience to equip yourself with Truth, Righteousness, Peace, Faith, Salvation, and the Word.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Armor Up →
                </span>
              </div>
            </div>
          </Link>

          {/* Psalm 91 */}
          <Link href="/psalm91" className="block group h-full">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
              <div className="h-60 relative overflow-hidden">
                <img
                  src="/images/psalm91/psalm91_cover.png"
                  alt="Psalm 91"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>🛡️</span>
                    <span>Divine Protection</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Psalm 91
                  </h3>
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed flex-1">
                  Experience God's promises of protection through a continuous scrolling meditation with angelic wings, soothing music, and the timeless words of Psalm 91.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Declare Now →
                </span>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* Salvation History Section */}
      <section id="salvation-history" className="max-w-7xl mx-auto px-5 py-8">
        <h2 className="text-4xl font-serif text-[#2C5F87] mb-8 text-center">
          Salvation History
        </h2>
        <div className="grid md:grid-cols-2 gap-8">

          {/* Biblical Timeline */}
          <Link href="/biblical-timeline" className="block group">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full">
              <div className="p-8 text-white relative h-full flex flex-col">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                  <div className="absolute bottom-10 left-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#D4AF37] px-4 py-1 rounded-full text-sm font-bold">
                      12 PERIODS
                    </span>
                    <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-semibold">
                      AUDIO NARRATION
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-2 font-serif">
                    Biblical Timeline
                  </h3>
                  <p className="text-xl text-purple-200 italic mb-4">
                    From Adam to King of Kings
                  </p>
                  <p className="text-white/90 mb-4 leading-relaxed flex-1">
                    Journey through 12 key periods from Creation to the Church. Experience God's redemptive plan with audio narration and figure descriptions.
                  </p>

                  <div className="flex flex-wrap gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📖</span>
                      <span>12 Periods</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎧</span>
                      <span>Audio Tours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">✝️</span>
                      <span>Key Scriptures</span>
                    </div>
                  </div>

                  <span className="inline-block bg-white text-indigo-600 hover:bg-purple-50 px-6 py-3 rounded-full font-semibold transition-colors text-center">
                    Explore Timeline →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Jesus in OT */}
          <JesusInOT />
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-[#193d52] to-[#325847] text-white py-16 px-5 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Divine Pilgrim */}
            <div>
              <h3 className="text-3xl font-bold mb-4 font-serif">
                Divine Pilgrim
              </h3>
              <p className="text-white/80 mb-4">
                Virtual Sacred Journeys and Daily Spiritual Tools
              </p>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>• Eucharistic Miracles</li>
                <li>• Stations of the Cross</li>
                <li>• Today's Promise</li>
                <li>• Daily Scripture Challenge</li>
                <li>• Jesus in the Old Testament</li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4 text-[#D4AF37]">Resources</h4>
              <ul className="space-y-3 text-white/80">
                <li>
                  <Link href="/about" className="hover:text-white hover:underline transition-colors">
                    About Divine Pilgrim
                  </Link>
                </li>
                {/* DONATE LINK - Uncomment after 1-3 months when you have traction */}
                {/* <li>
                  <Link href="/about#support" className="hover:text-white hover:underline transition-colors flex items-center gap-2">
                    <span>💝</span>
                    <span>Support This Ministry</span>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Divine Pilgrim. Virtual Sacred Journeys and Daily Spiritual Tools for all.
            </p>
          </div>
        </div>
      </footer>
      </main>
  )
}
