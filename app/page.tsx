import Link from 'next/link';
import miracles from '@/src/eucharistic-miracles.json';

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
                Curated Maps
              </h3>
              <p className="text-gray-600 text-sm">
                Explore sacred sites with curated photos, map pins, and external Google Maps links
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
                Authentic Content
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
          <Link href="/tours/eucharistic-miracles" className="block group">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* Hero Image Section */}
              <div className="h-60 relative overflow-hidden">
                {/* Placeholder: Use Unsplash URL or local image */}
                <img 
                  src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&q=80"
                  alt="Golden monstrance with Eucharist"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-6xl mb-2 drop-shadow-lg">⚪</div>
                  <h3 className="text-3xl font-bold drop-shadow-md">
                    Eucharistic Miracles
                  </h3>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-7">
                <div className="flex gap-6 mb-5">
                  <div>
                    <div className="text-3xl font-bold text-[#D4AF37]">{miracles.length}</div>
                    <div className="text-sm text-gray-500">Sacred Stops</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#D4AF37]">~6 hours</div>
                    <div className="text-sm text-gray-500">Estimated Time</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                  Journey through documented Eucharistic miracles from around the world, based on St. Carlo Acutis's research.
                </p>
                <span className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors">
                  Start Tour →
                </span>
              </div>
            </div>
          </Link>

          {/* Marian Apparitions */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-70 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Lourdes Grotto - actual apparition site */}
              <img 
                src="https://images.unsplash.com/photo-1583829893113-9e03c45fc7d9?w=800&q=80"
                alt="Lourdes Grotto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">⭐</div>
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Marian Apparitions
                </h3>
              </div>
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
                Visit sites of Church-approved Marian apparitions. From Lourdes to Fatima, discover where Our Lady appeared.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Stations of the Cross */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-70 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Via Dolorosa Jerusalem - actual path Jesus walked */}
              <img 
                src="https://images.unsplash.com/photo-1565552645632-d725f53511e2?w=800&q=80"
                alt="Via Dolorosa Jerusalem"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">✝️</div>
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Stations of the Cross
                </h3>
              </div>
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
                Walk the Way of the Cross with meditative reflections on Christ's Passion and AI-guided contemplation.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Shrines of Saints */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-70 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* St. Peter's Basilica - tomb of St. Peter */}
              <img 
                src="https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&q=80"
                alt="St. Peter's Basilica interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">😇</div>
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Shrines of Saints
                </h3>
              </div>
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
                Pilgrimage to the resting places of beloved saints. Visit the tombs and shrines of St. Peter, St. Francis, and more.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Sacred Architecture */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-70 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Sagrada Familia Barcelona - iconic sacred architecture */}
              <img 
                src="https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80"
                alt="Sagrada Familia Barcelona"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">⛪</div>
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
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 opacity-70 cursor-pointer">
            <div className="h-60 relative overflow-hidden">
              {/* Dome of the Rock Jerusalem - iconic Holy Land site */}
              <img 
                src="https://images.unsplash.com/photo-1564657878051-1bf0afde49ab?w=800&q=80"
                alt="Jerusalem Old City"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-6xl mb-2 drop-shadow-lg">📖</div>
                <h3 className="text-3xl font-bold drop-shadow-md">
                  Biblical Sites
                </h3>
              </div>
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
                Walk where Jesus walked in the Holy Land. Visit Jerusalem, Bethlehem, Nazareth, and more.
              </p>
              <span className="inline-block bg-gray-400 text-gray-100 px-8 py-3 rounded-full font-semibold">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-6 mb-4 text-sm">
            <Link href="/about" className="text-[#2C5F87] hover:text-[#D4AF37] transition-colors">
              About
            </Link>
            <a 
              href="https://www.miracolieucaristici.org" 
            target="_blank"
            rel="noopener noreferrer"
              className="text-[#2C5F87] hover:text-[#D4AF37] transition-colors"
            >
              Carlo Acutis Exhibition
          </a>
          <a
              href="mailto:info@divinepilgrim.com"
              className="text-[#2C5F87] hover:text-[#D4AF37] transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            Made with 🙏 for pilgrims worldwide
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Inspired by Blessed Carlo Acutis
          </p>
        </div>
      </footer>
      </main>
  )
}
