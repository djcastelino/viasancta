import promises from '@/src/daily-promises.json';

interface Promise {
  id: number;
  date: string;
  promise: string;
  reference: string;
  category: string;
}

function getTodaysPromise(): Promise | null {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format

  // Try to find promise for today's exact date
  let todaysPromise = promises.find((p: Promise) => p.date === todayString);

  // If no promise for today, use day-of-year to cycle through promises
  if (!todaysPromise) {
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const index = dayOfYear % promises.length;
    todaysPromise = promises[index];
  }

  return todaysPromise || null;
}

export default function TodaysPromise() {
  const promise = getTodaysPromise();

  if (!promise) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-16 relative z-20">
      <div className="bg-gradient-to-br from-[#6e3a6c]/10 via-[#2C5F87]/10 to-[#325847]/10 rounded-3xl shadow-xl p-8 md:p-12 border border-[#D4AF37]/20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-4xl">📖</span>
            <h2 className="text-3xl font-serif font-bold text-[#2C5F87]">
              Today's Promise
            </h2>
          </div>

          {/* Promise Text */}
          <blockquote className="mb-6">
            <p className="text-2xl md:text-3xl text-gray-800 font-serif leading-relaxed italic">
              "{promise.promise}"
            </p>
          </blockquote>

          {/* Reference */}
          <div className="flex flex-col items-center gap-3">
            <div className="inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full font-semibold shadow-md">
              {promise.reference}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
