export const metadata = {
  title: 'Divine Pilgrim - Virtual Sacred Pilgrimages',
  description: 'Experience AI-guided virtual pilgrimage tours through Eucharistic miracles, Marian apparitions, and sacred sites worldwide.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Header */}
      <header className="text-center pt-16 pb-12 px-5">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent font-serif">
          Divine Pilgrim
        </h1>
        <p className="text-2xl text-[#D4AF37] italic mb-3">Virtual Sacred Journeys</p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience divine encounters through AI-guided virtual pilgrimages
        </p>
      </header>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-5 mb-16">
        <div className="bg-white rounded-3xl shadow-lg p-10">
          <h2 className="text-3xl font-serif text-[#2C5F87] mb-8 text-center">
            Experience Sacred Journeys
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🎧</div>
              <h3 className="text-xl text-[#2C5F87] font-semibold mb-2">
                AI Narrations
              </h3>
              <p className="text-gray-600 text-sm">
                Hear the stories brought to life with professional AI-generated audio tours
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl text-[#2C5F87] font-semibold mb-2">
                Street View Tours
              </h3>
              <p className="text-gray-600 text-sm">
                Virtually visit sacred sites with Google Street View integration
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl text-[#2C5F87] font-semibold mb-2">
                Rich History
              </h3>
              <p className="text-gray-600 text-sm">
                Explore 2,000+ years of documented miracles and sacred sites
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">✝️</div>
              <h3 className="text-xl text-[#2C5F87] font-semibold mb-2">
                Curated Content
              </h3>
              <p className="text-gray-600 text-sm">
                Based on St. Carlo Acutis's research and official Church sources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <h2 className="text-3xl font-serif text-[#2C5F87] mb-8">
          Sacred Pilgrimage Tours
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Eucharistic Miracles */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
            <div className="h-60 bg-gradient-to-br from-[#193d52] to-[#325847] flex flex-col items-center justify-center gap-4 relative overflow-hidden">
              <div className="text-7xl relative z-10 drop-shadow-lg">⚪</div>
              <h3 className="text-3xl text-white font-semibold relative z-10 drop-shadow-md">
                Eucharistic Miracles
              </h3>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">11</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~6 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Journey through documented Eucharistic miracles from around the world, based on St. Carlo Acutis's research. Explore scientific evidence and profound testimonies of faith.
              </p>
              <a
                href="/tours/eucharistic-miracles"
                className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors"
              >
                Start Tour →
              </a>
            </div>
          </div>

          {/* Marian Apparitions */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-70">
            <div className="h-60 bg-gradient-to-br from-[#2d5fa8] to-[#524aaa] flex flex-col items-center justify-center gap-4">
              <div className="text-7xl drop-shadow-lg">⭐</div>
              <h3 className="text-3xl text-white font-semibold drop-shadow-md">
                Marian Apparitions
              </h3>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">25</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~4 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Visit sites of Church-approved Marian apparitions. From Lourdes to Fatima, discover where Our Lady appeared with messages of peace and prayer.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Stations of the Cross */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-70">
            <div className="h-60 bg-gradient-to-br from-[#5e3159] to-[#692f15] flex flex-col items-center justify-center gap-4">
              <div className="text-7xl drop-shadow-lg">✝️</div>
              <h3 className="text-3xl text-white font-semibold drop-shadow-md">
                Stations of the Cross
              </h3>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">14</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~2 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Walk the Way of the Cross with meditative reflections on Christ's Passion. Experience the 14 traditional stations with AI-guided contemplation.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Shrines of Saints */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-70">
            <div className="h-60 bg-gradient-to-br from-[#b8921c] to-[#9e7d18] flex flex-col items-center justify-center gap-4">
              <div className="text-7xl drop-shadow-lg">😇</div>
              <h3 className="text-3xl text-white font-semibold drop-shadow-md">
                Shrines of Saints
              </h3>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">40</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~8 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Pilgrimage to the resting places of beloved saints. Visit the tombs and shrines of St. Peter, St. Francis, St. Therese, and many more.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Sacred Architecture */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-70">
            <div className="h-60 bg-gradient-to-br from-[#56442f] to-[#6a5540] flex flex-col items-center justify-center gap-4">
              <div className="text-7xl drop-shadow-lg">⛪</div>
              <h3 className="text-3xl text-white font-semibold drop-shadow-md">
                Sacred Architecture
              </h3>
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
                Tour the world's most magnificent churches and basilicas. From St. Peter's in Rome to Sagrada Família in Barcelona, explore stunning sacred spaces.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Biblical Sites */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer opacity-70">
            <div className="h-60 bg-gradient-to-br from-[#3e6d7e] to-[#4d8a96] flex flex-col items-center justify-center gap-4">
              <div className="text-7xl drop-shadow-lg">📖</div>
              <h3 className="text-3xl text-white font-semibold drop-shadow-md">
                Biblical Sites
              </h3>
            </div>
            <div className="p-7">
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">50</div>
                  <div className="text-sm text-gray-500">Sacred Stops</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">~10 hours</div>
                  <div className="text-sm text-gray-500">Estimated Time</div>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Walk where Jesus walked in the Holy Land. Visit Jerusalem, Bethlehem, Nazareth, and other sacred biblical locations with rich historical context.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
