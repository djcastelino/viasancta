import Link from 'next/link';

export const metadata = {
  title: 'About Divine Pilgrim',
  description: 'Learn about Divine Pilgrim and our mission to spread Eucharistic devotion through virtual sacred journeys.',
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
          
          {/* Inspired by Carlo */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Inspired by Blessed Carlo Acutis
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Divine Pilgrim is directly inspired by <strong>Blessed Carlo Acutis's</strong> incredible 
                work cataloging Eucharistic miracles around the world. Before his death at age 15 in 2006, 
                Carlo created a comprehensive exhibition documenting Church-approved Eucharistic miracles, 
                driven by his profound love for the Real Presence of Jesus in the Eucharist.
              </p>
              <p>
                Carlo's passion for technology and his deep faith showed that computers and the internet 
                could be powerful tools for evangelization. He famously said: <em>"The Eucharist is my 
                highway to Heaven."</em>
              </p>
              <p>
                This app continues Carlo's mission by bringing his beautiful research to life through 
                immersive audio tours, making these miraculous testimonies of faith accessible to anyone, 
                anywhere, at any time.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Our Mission
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Divine Pilgrim provides AI-narrated virtual pilgrimage tours of sacred sites and miracles 
                worldwide. Our goal is to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Deepen devotion to the Real Presence of Christ in the Eucharist</li>
                <li>Make sacred sites accessible to those who cannot physically visit them</li>
                <li>Educate people about the historical evidence for Eucharistic miracles</li>
                <li>Inspire faith through beautiful storytelling and technology</li>
                <li>Continue Blessed Carlo Acutis's legacy of digital evangelization</li>
              </ul>
            </div>
          </section>

          {/* Image Credits */}
          <section className="border-t pt-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Image Credits & Attribution
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                All Eucharistic miracle images and historical information are courtesy of the{' '}
                <a 
                  href="https://www.miracolieucaristici.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Carlo Acutis Eucharistic Miracles Exhibition
                </a>
                {' '}and the{' '}
                <a 
                  href="https://www.carloacutis.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline font-semibold"
                >
                  Associazione Amici di Carlo Acutis
                </a>.
              </p>
              <p>
                We are deeply grateful for their permission to use these materials for Catholic 
                education and evangelization. The exhibition panels were designed and created by 
                Carlo Acutis himself as a gift to the Church.
              </p>
              <p className="text-sm italic text-gray-600">
                "The more Eucharist we receive, the more we will become like Jesus, 
                so that on this earth we will have a foretaste of Heaven." 
                <br />— Blessed Carlo Acutis
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              How It Works
            </h2>
            <div className="text-gray-700 space-y-4">
              <p>
                Divine Pilgrim uses advanced AI technology to create immersive audio experiences:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>AI Narration:</strong> Each miracle story is narrated using Google Cloud Text-to-Speech with natural, reverent voices</li>
                <li><strong>Background Music:</strong> Soft sacred music creates a prayerful atmosphere</li>
                <li><strong>Curated Content:</strong> All information is based on Church-approved sources</li>
                <li><strong>Progressive Web App:</strong> Works on any device, installable like a native app</li>
              </ul>
            </div>
          </section>

          {/* Free & Non-Commercial */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Free & Non-Commercial
            </h2>
            <div className="text-gray-700">
              <p>
                Divine Pilgrim is completely free and will always remain so. There are no ads, 
                no subscriptions, and no hidden costs. This is a labor of love created to spread 
                Eucharistic devotion and continue Carlo Acutis's mission of using technology for 
                evangelization.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C5F87] mb-4">
              Contact Us
            </h2>
            <div className="text-gray-700">
              <p>
                Questions, suggestions, or just want to share how Divine Pilgrim has blessed you? 
                We'd love to hear from you at:{' '}
                <a href="mailto:info@divinepilgrim.com" className="text-[#D4AF37] hover:underline">
                  info@divinepilgrim.com
                </a>
              </p>
            </div>
          </section>

          {/* Blessed Carlo Prayer */}
          <section className="bg-gradient-to-r from-[#f5f5f0] to-[#e8e8f5] rounded-2xl p-6">
            <h3 className="text-xl font-serif text-[#2C5F87] mb-3 text-center">
              Prayer for Carlo Acutis's Intercession
            </h3>
            <p className="text-gray-700 italic text-center">
              Blessed Carlo Acutis, you loved the Eucharist with all your heart. 
              Intercede for us, that we too may grow in love for Jesus present 
              in the Blessed Sacrament. Help us to use technology to spread the 
              faith and bring souls closer to Christ. Amen.
            </p>
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

