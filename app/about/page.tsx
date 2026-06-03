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
                  <li><strong>Eucharistic Miracles:</strong> Journey through 136 documented miracles worldwide, based on Saint Carlo Acutis's research</li>
                  <li><strong>Marian Apparitions:</strong> Visit 20 Church-approved apparition sites worldwide with AI-guided narrations and immersive experiences</li>
                  <li><strong>Stations of the Cross:</strong> Walk the actual Via Dolorosa in Jerusalem with Google Street View, immersive Prayer Mode, and audio meditations</li>
                  <li><strong>Sacred Mountains:</strong> Journey to 15 biblical peaks where God met humanity - from Sinai to Calvary - with multi-voice audio tours and rich theological depth</li>
                  <li><strong>Coming Soon:</strong> Sacred Architecture, Shrines of Saints</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#6e3a6c] mb-2">Salvation History</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Biblical Timeline:</strong> Journey through 12 key periods from Adam to the Church Age with audio narration, figure descriptions, and rich theological insights (based on Jeff Cavins' Bible Timeline framework)</li>
                  <li><strong>Jesus in the Old Testament:</strong> 365 daily entries revealing how Christ appears throughout the Hebrew Scriptures - from Genesis to Malachi</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#6e3a6c] mb-2">Daily Spiritual Tools</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Today's Promise:</strong> Daily Bible promises with AI-generated reflections and audio narration</li>
                  <li><strong>Daily Scripture Challenge:</strong> Test your biblical knowledge with daily 6-clue guessing games</li>
                  <li><strong>Scripture Memory Coach:</strong> Master 77 essential Bible verses through proven memorization techniques and spaced repetition</li>
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
              Inspired by Saint Carlo Acutis
            </h3>
            <div className="text-gray-700 space-y-3">
              <p>
                Our Eucharistic Miracles pilgrimage is directly inspired by <strong>Saint Carlo Acutis</strong>,
                who before his death at age 15 in 2006, created a comprehensive exhibition documenting
                Church-approved Eucharistic miracles worldwide. Carlo showed that technology and deep faith
                can work together beautifully.
              </p>
              <p className="italic">
                "The Eucharist is my highway to Heaven." — Saint Carlo Acutis
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
                <strong>Biblical Timeline:</strong> Structure and framework inspired by{' '}
                <a
                  href="https://biblestudyforcatholics.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Jeff Cavins' The Great Adventure Bible Timeline
                </a>
                {' '}— a groundbreaking system for understanding salvation history through 12 key periods
              </p>
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
                {' '}free downloadable web panels. Exhibition created by Saint Carlo Acutis.
              </p>
              <p>
                <strong>Street View:</strong> Via Dolorosa imagery powered by Google Maps Street View
              </p>
              <p>
                <strong>Background Music:</strong> Contemplative music by{' '}
                <a
                  href="https://incompetech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Kevin MacLeod
                </a>
                {' '}from incompetech.com. Licensed under{' '}
                <a
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Creative Commons: By Attribution 4.0 License
                </a>
              </p>
              <p>
                <strong>Eucharistic Miracles Music:</strong> "I Am the Bread of Life" by{' '}
                <a
                  href="https://sites.google.com/view/serafiremusic/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  SeraFire Christian Music
                </a>
                {' '}— Eucharistic hymn background for miracle narrations
              </p>
              <p>
                <strong>Marian Apparitions Music:</strong> "Hail Mary Gentle Woman" by{' '}
                <a
                  href="https://sites.google.com/view/serafiremusic/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  SeraFire Music
                </a>
                {' '}— beautiful instrumental music for Marian devotion
              </p>
              <p>
                <strong>Spiritual Warfare & Deliverance Ministry:</strong> Content inspired by the teaching of{' '}
                <a
                  href="https://www.youtube.com/@LogosVoiceTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Rev. Dr. John Jose Vettiyankal V.C.
                </a>
                , Logos Ministries, Bangalore. For healing, deliverance and anointing, visit{' '}
                <a
                  href="https://www.youtube.com/@LogosVoiceTV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  logosvoice.tv
                </a>.
              </p>
            </div>
          </section>

          {/* Contact Us */}
          <section className="border-t pt-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Contact Us
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="text-lg">
                We welcome your feedback, suggestions, and questions.
              </p>
              <div className="bg-gradient-to-r from-[#f5f5f0] to-[#e8e8f5] rounded-2xl p-6 text-center">
                <p className="text-2xl mb-2">📧</p>
                <a
                  href="mailto:feedback@divinepilgrim.com"
                  className="text-[#D4AF37] hover:text-[#c49d2f] font-bold text-xl hover:underline"
                >
                  feedback@divinepilgrim.com
                </a>
              </div>
              <p className="text-sm">
                Whether you've found an error, have ideas for new features, or simply want to share
                how these virtual pilgrimages have touched your faith journey—we'd love to hear from you.
              </p>
            </div>
          </section>

          {/* SUPPORT SECTION - Change false to true after 1-3 months when you have user traction
              Good triggers: 1000+ users, approaching Azure free tier, proven engagement
          */}
          {false && <section id="support" className="border-t pt-8 scroll-mt-20">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              💝 Support This Ministry
            </h2>
            <div className="text-gray-700 space-y-4">
              <p className="text-lg">
                Divine Pilgrim will always be <strong>free for everyone</strong>. Your donation helps cover
                infrastructure costs and allows us to scale as more people discover these sacred experiences.
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 my-6">
                <h3 className="font-bold text-[#2C5F87] mb-3">What Your Donation Supports:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">☁️</span>
                    <span><strong>Cloud Hosting:</strong> Server infrastructure and automation workflows (~$20-50/month)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">🎙️</span>
                    <span><strong>AI Voice Services:</strong> Premium neural voices from Azure (currently free tier, ~$10-30/month as we scale)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">🔧</span>
                    <span><strong>Ongoing Development:</strong> New tours, features, and content improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] font-bold">🌍</span>
                    <span><strong>Reaching More Souls:</strong> Marketing and outreach to share these sacred stories</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-600 mt-4 italic">
                  Estimated monthly costs at scale: $50-100
                </p>
              </div>

              <div className="bg-white border-2 border-[#D4AF37] rounded-xl p-6 text-center">
                <h3 className="font-bold text-xl text-[#2C5F87] mb-4">How to Donate</h3>

                <div className="space-y-4 mb-6">
                  <p className="text-gray-600">Every donation helps:</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] px-6 py-3 rounded-lg">
                      <div className="font-bold text-[#2C5F87]">$5</div>
                      <div className="text-xs text-gray-600">Support hosting</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] px-6 py-3 rounded-lg">
                      <div className="font-bold text-[#2C5F87]">$10</div>
                      <div className="text-xs text-gray-600">Cover weekly costs</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] px-6 py-3 rounded-lg">
                      <div className="font-bold text-[#2C5F87]">$25</div>
                      <div className="text-xs text-gray-600">Half month's costs</div>
                    </div>
                    <div className="bg-gradient-to-br from-[#f5f5f0] to-[#e8e8f5] px-6 py-3 rounded-lg">
                      <div className="font-bold text-[#2C5F87]">Any Amount</div>
                      <div className="text-xs text-gray-600">Every dollar helps!</div>
                    </div>
                  </div>
                </div>

                {/* PayPal Button - User needs to replace with their actual PayPal link */}
                <div className="space-y-3">
                  <a
                    href="YOUR_PAYPAL_DONATE_LINK_HERE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#0070ba] hover:bg-[#005a94] text-white px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    💳 Donate via PayPal
                  </a>
                  <p className="text-xs text-gray-500">
                    Secure payment through PayPal (no account required)
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 text-center">
                <p className="text-sm text-gray-700 italic">
                  "Help us bring Saint Carlo Acutis' vision of digital Catholic education to life.
                  Unlike subscription apps that charge $90/year, Divine Pilgrim will always be free.
                  Your donation helps us cover infrastructure costs and reach more people with these sacred stories."
                </p>
              </div>

              <p className="text-sm text-gray-600 text-center">
                <strong>Thank you for your generosity!</strong> Every donation, no matter the size,
                helps us reach more souls and share the beauty of our Catholic faith.
              </p>
            </div>
          </section>}

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

