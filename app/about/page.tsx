import Link from 'next/link';

export const metadata = {
  title: 'About Divine Pilgrim',
  description: 'Learn about Divine Pilgrim - AI-guided Catholic virtual pilgrimages, daily spiritual tools, and immersive sacred experiences.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f5f0] via-white to-[#e8e8f5]">
      {/* Header */}
      <header className="text-center pt-12 pb-8 px-5">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#6e3a6c] to-[#8B4789] bg-clip-text text-transparent font-serif">
          About Divine Pilgrim
        </h1>
        <p className="text-lg text-gray-600">
          Virtual Sacred Journeys
        </p>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-5 pb-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 space-y-8">

          {/* What is Divine Pilgrim */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              What is Divine Pilgrim?
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Divine Pilgrim is an <strong>AI-guided Catholic pilgrimage platform</strong> that brings
                sacred sites and spiritual practices into your daily life. Whether you're seeking a
                contemplative walk through Jerusalem, daily encouragement from Scripture, or to witness
                miraculous evidence of Christ's presence, Divine Pilgrim offers immersive experiences
                that deepen faith and inspire wonder.
              </p>
              <p>
                We believe technology can be a powerful tool for evangelization and spiritual growth.
                By combining AI narration, Google Street View, contemplative music, and carefully curated
                Catholic content, we create virtual pilgrimages that feel real, reverent, and transformative.
              </p>
            </div>
          </section>

          {/* Our Experiences */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Our Sacred Experiences
            </h2>
            <div className="text-gray-700 space-y-4">
              <div>
                <h3 className="font-bold text-[#6e3a6c] mb-2">Sacred Pilgrimages</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Eucharistic Miracles:</strong> Journey through 136 documented miracles worldwide, based on Blessed Carlo Acutis's research</li>
                  <li><strong>Stations of the Cross:</strong> Walk the actual Via Dolorosa in Jerusalem with Google Street View, immersive Prayer Mode, and audio meditations</li>
                  <li><strong>Coming Soon:</strong> Marian Apparitions, Shrines of Saints, Sacred Architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#6e3a6c] mb-2">Daily Spiritual Tools</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Today's Promise:</strong> Daily Bible promises with AI-generated reflections and audio narration</li>
                  <li><strong>Daily Scripture Challenge:</strong> Test your biblical knowledge with daily 6-clue guessing games</li>
                  <li><strong>Jesus in the Old Testament:</strong> 365 daily entries revealing Christ throughout the Scriptures</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technology for Good */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Technology Meets Faith
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Divine Pilgrim uses cutting-edge technology to create deeply spiritual experiences:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>AI Narration:</strong> Natural, reverent voices bring stories to life (powered by Azure TTS)</li>
                <li><strong>Google Street View:</strong> Stand on the actual Via Dolorosa where Jesus walked</li>
                <li><strong>Prayer Mode:</strong> Full-screen immersive meditation with contemplative music</li>
                <li><strong>Background Music:</strong> Carefully selected ambient tracks create prayerful atmospheres</li>
                <li><strong>Progressive Web App:</strong> Works on any device, installable like a native app</li>
                <li><strong>Church-Approved Content:</strong> All spiritual content is based on Catholic teaching and approved sources</li>
              </ul>
            </div>
          </section>

          {/* Inspired by Blessed Carlo */}
          <section className="bg-gradient-to-r from-[#f5f5f0] to-[#e8e8f5] rounded-2xl p-6">
            <h3 className="text-xl font-serif text-[#2C5F87] mb-3">
              Inspired by Blessed Carlo Acutis
            </h3>
            <div className="text-gray-700 space-y-3">
              <p>
                Our Eucharistic Miracles pilgrimage is directly inspired by <strong>Blessed Carlo Acutis</strong>,
                who before his death at age 15 in 2006, created a comprehensive exhibition documenting
                Church-approved Eucharistic miracles worldwide. Carlo showed that technology and deep faith
                can work together beautifully.
              </p>
              <p className="italic">
                "The Eucharist is my highway to Heaven." — Blessed Carlo Acutis
              </p>
            </div>
          </section>

          {/* Credits */}
          <section className="border-t pt-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Credits & Attribution
            </h2>
            <div className="text-gray-700 space-y-3 text-sm">
              <p>
                <strong>Eucharistic Miracles:</strong> Images courtesy of{' '}
                <a
                  href="https://www.miracolieucaristici.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  miracolieucaristici.org
                </a>
                {' '}free downloadable web panels. Exhibition created by Blessed Carlo Acutis.
              </p>
              <p>
                <strong>Street View:</strong> Via Dolorosa imagery powered by Google Maps Street View
              </p>
              <p>
                <strong>Background Music:</strong> Contemplative tracks courtesy of Bensound
              </p>
            </div>
          </section>

          {/* Back to Tours */}
          <div className="text-center pt-4">
            <Link
              href="/"
              className="inline-block bg-[#D4AF37] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#c49d2f] transition-colors"
            >
              ← Back to Tours
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

