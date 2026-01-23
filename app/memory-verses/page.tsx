import MemoryVerseClient from './MemoryVerseClient';
import memoryVersesData from '@/public/memory-verses.json';

export const metadata = {
  title: 'Memory Verses - Divine Pilgrim',
  description: 'Out of 31,000+ Bible verses, memorize 77 handpicked treasures with your personal AI coach. Carry God\'s Word in your heart forever through proven techniques and spaced repetition.',
};

export default function MemoryVersesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Scripture Memory Coach
          </h1>
          <p className="text-xl md:text-2xl mb-3 text-amber-100">
            The Bible contains over 31,000 verses. Memorizing just 77 of these treasures means you'll carry God's Word in your heart forever.
          </p>
          <p className="text-lg text-amber-50 italic">
            "Heaven and earth will pass away, but my words will never pass away."
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your AI Memory Coach
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              📖 <strong>One verse per day</strong> - Master Scripture systematically
            </p>
            <p>
              🧠 <strong>Proven techniques</strong> - Chunking, repetition, spaced review
            </p>
            <p>
              ✍️ <strong>Write to remember</strong> - Typing reinforces memory
            </p>
            <p>
              🎯 <strong>Reference mastery</strong> - Memorize book:chapter:verse (bonus!)
            </p>
            <p>
              🔄 <strong>Never forget</strong> - Reviews at 1 day, 7 days, 30 days
            </p>
            <p className="text-amber-700 font-semibold pt-2">
              Out of 31,000+ verses, these 77 are handpicked treasures. Even mastering just 7 gives you 7 eternal weapons for spiritual warfare! 🗡️
            </p>
          </div>
        </div>

        {/* Client Component */}
        <MemoryVerseClient verses={memoryVersesData} />
      </div>
    </div>
  );
}
