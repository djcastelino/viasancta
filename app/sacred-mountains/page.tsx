import SacredMountainClient from './SacredMountainClient';
import mountainsData from '@/public/sacred-mountains.json';

export const metadata = {
  title: 'Sacred Mountains of the Bible - Divine Pilgrim',
  description: 'Journey through the sacred mountains where God met humanity. From Mount Sinai to the Mount of Olives, experience the mountains of Scripture with immersive audio tours, stunning photography, and rich theological insight.',
};

export default function SacredMountainsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Sacred Mountains of the Bible
          </h1>
          <p className="text-xl md:text-2xl mb-3 text-slate-200">
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

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Mountains of Revelation
          </h2>
          <div className="text-gray-700 space-y-3">
            <p>
              Throughout Scripture, mountains are places of divine encounter. On mountaintops,
              God gave the Law, prophets received visions, and Christ revealed His glory.
              Mountains witnessed covenant, sacrifice, transfiguration, and ascension.
            </p>
            <p>
              This audio pilgrimage takes you to the most sacred peaks in biblical history.
              Each mountain tells a story of God's faithfulness, from Old Testament prophecy
              to New Testament fulfillment.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mt-4">
              <h3 className="font-bold text-slate-800 mb-2">🎧 Multi-Voice Audio Experience</h3>
              <p className="text-sm text-slate-600">
                Each mountain features 7 audio sections with different narrators:
                Introduction • Prophecy • Gospel Events • Scripture • Theology • Fun Facts • Prayer
              </p>
            </div>
          </div>
        </div>

        {/* Client Component */}
        <SacredMountainClient mountains={mountainsData} />
      </div>
    </div>
  );
}
