import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';
import TodaysPromise from './components/TodaysPromise';
import JesusInOT from './components/JesusInOT';

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

      {/* Today's Promise Section */}
      <TodaysPromise />

      {/* Jesus in the OT Section */}
      <JesusInOT />

      {/* Memory Verses Section */}
      <section className="max-w-7xl mx-auto px-5 py-8">
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

      {/* Daily Scripture Challenge Section */}
      <section className="max-w-7xl mx-auto px-5 py-8">
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

      {/* Tours Section */}
      <section id="tours" className="max-w-7xl mx-auto px-5 pb-20">
        <h2 className="text-3xl font-serif text-[#2C5F87] mb-8">
          Sacred Pilgrimage Tours
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Eucharistic Miracles */}
          <Link href="/tours/eucharistic-miracles" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative">
              {/* Hero Image Section */}
              <div className="h-60 relative overflow-hidden">
                {/* Gemini-generated Sacred Heart image */}
                <img 
                  src="/images/tours/eucharistic-hero.png"
                  alt="Sacred Heart with rays of light over landscape"
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
                {/* Lourdes Grotto from Wikimedia Commons */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Creevaghbaun_Lourdes_Grotto.jpg/800px-Creevaghbaun_Lourdes_Grotto.jpg"
                  alt="Lourdes Grotto"
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
                {/* Calvary at Burzet from Wikimedia Commons */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Le_calvaire_%C3%A0_Burzet.jpg/800px-Le_calvaire_%C3%A0_Burzet.jpg"
                  alt="Calvary at Burzet"
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
                {/* Mount Sinai from Wikimedia Commons */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Mount_Sinai_from_the_south.jpg/800px-Mount_Sinai_from_the_south.jpg"
                  alt="Mount Sinai"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-sm text-[#D4AF37] font-semibold mb-1 flex items-center gap-2">
                    <span>🏔️</span>
                    <span>5 Mountains of Scripture</span>
                  </div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Sacred Mountains
                  </h3>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Journey to biblical peaks where God met humanity. From Sinai to the Mount of Olives, experience <span className="font-semibold text-[#2C5F87]">multi-voice audio tours</span>, stunning photography, and rich theological depth.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Shrines of Saints */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* St. Stephen's Basilica Budapest from Wikimedia Commons */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Saint_Andrew%2C_Saint_Peter_and_Jesus_Christ_blessing%2C_St._Stephen%27s_Basilica%2C_2016_Budapest.jpg/800px-Saint_Andrew%2C_Saint_Peter_and_Jesus_Christ_blessing%2C_St._Stephen%27s_Basilica%2C_2016_Budapest.jpg"
                alt="Saints in St. Stephen's Basilica Budapest"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Shrines of Saints
                </h3>
              </div>
            </div>
            <div className="p-7">
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Pilgrimage to the resting places of beloved saints. Visit the tombs and shrines of St. Peter, St. Francis, and more.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Sacred Architecture */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Sagrada Familia from Wikimedia Commons */}
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basilica_de_la_Sagrada_Familia_%2850441441743%29.jpg/800px-Basilica_de_la_Sagrada_Familia_%2850441441743%29.jpg"
                alt="Sagrada Familia Barcelona"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Sacred Architecture
                </h3>
              </div>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">30</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~6 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Tour the world's most magnificent churches and basilicas. From St. Peter's to Sagrada Família.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Biblical Sites */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Jerusalem Dome of the Rock from Wikimedia Commons */}
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
          </div>
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
