import Link from 'next/link';
import SacredMountainsClient from './SacredMountainsClient';

export const metadata = {
  title: 'Sacred Mountains of the Bible - Divine Pilgrim',
  description: 'Journey through the sacred mountains where God met humanity. From Mount Sinai to the Mount of Olives, experience the mountains of Scripture with immersive audio tours, stunning photography, and rich theological insight.',
};

export default function SacredMountainsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Back Link */}
      <div className="max-w-7xl mx-auto px-5 pt-8 pb-4">
        <Link href="/" className="text-gray-600 hover:text-[#D4AF37] text-sm font-semibold">
          ← Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Mount_Sinai_morning_02.jpg/1920px-Mount_Sinai_morning_02.jpg"
          alt="Sacred Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Sacred Mountains of the Bible
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-3">
              Where Heaven Met Earth on Holy Ground
            </p>
            <p className="text-lg text-slate-300 italic">
              "I lift up my eyes to the mountains—where does my help come from?"
            </p>
            <p className="text-sm text-slate-400 mt-1">
              — Psalm 121:1
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mountains of Divine Encounter
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              Throughout Scripture, mountains are places of divine revelation. On mountaintops,
              God gave the Law, prophets received visions, and Christ revealed His glory.
              Mountains witnessed covenant, sacrifice, transfiguration, and ascension.
            </p>
            <p>
              This pilgrimage takes you to 5 sacred peaks in biblical history. Each mountain
              tells a story of God's faithfulness, from Old Testament prophecy to New Testament
              fulfillment.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <h3 className="font-bold text-slate-800 mb-2">🎧 Multi-Voice Audio Experience</h3>
              <p className="text-sm text-slate-600">
                Each mountain features audio sections with different narrators, stunning photography,
                fun facts, and full Catholic references.
              </p>
            </div>
          </div>
        </div>

        {/* Mountain Cards with Modal */}
        <SacredMountainsClient />
      </div>
    </div>
  );
}
