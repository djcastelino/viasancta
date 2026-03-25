'use client';

import sundayGospels from '@/src/sunday-gospels.json';

export default function GospelInOnePicture() {
  // Get current or upcoming Sunday's gospel
  const getSundayGospel = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0=Sunday, 1=Monday, etc.

    // If today is Sunday (0), use today's date
    // Otherwise, find the most recent Sunday
    let targetDate = new Date(today);
    if (dayOfWeek !== 0) {
      // Go back to most recent Sunday
      targetDate.setDate(today.getDate() - dayOfWeek);
    }

    // Format as YYYY-MM-DD
    const dateStr = targetDate.toISOString().split('T')[0];

    // Find matching Sunday in our data
    const sundayData = sundayGospels.sundays.find(s => s.id === dateStr);

    // Fallback to first entry if not found
    return sundayData || sundayGospels.sundays[0];
  };

  const getTitle = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    if (dayOfWeek === 0) {
      return "Today's Sunday Gospel";
    } else {
      return "This Week's Sunday Gospel";
    }
  };

  const gospel = getSundayGospel();
  const title = getTitle();

  return (
    <section className="max-w-7xl mx-auto px-5 py-8">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Gospel Image */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-br from-amber-900 to-slate-900">
          <img
            src={`/images/gospel/${gospel.image}`}
            alt={gospel.gospel}
            className="w-full h-full object-contain md:object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Title overlay */}
          <div className="absolute top-6 left-6 right-6">
            <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl inline-block">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Gospel in One Picture
              </h2>
              <p className="text-[#D4AF37] text-sm md:text-base mt-1">
                {title}
              </p>
              <p className="text-white/80 text-xs mt-1">
                {gospel.liturgicalName}
              </p>
            </div>
          </div>

          {/* Gospel reference at bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-black/70 backdrop-blur-md p-6 rounded-xl">
              <p className="text-[#D4AF37] text-sm font-semibold mb-2">
                {gospel.gospel}
              </p>
              <p className="text-white text-xl md:text-2xl font-serif italic leading-relaxed">
                "{gospel.keyVerse}"
              </p>
            </div>
          </div>
        </div>

        {/* Meditation text */}
        <div className="p-8 md:p-10 bg-gradient-to-br from-slate-50 to-white">
          <h3 className="text-lg font-bold text-[#2C5F87] mb-3">Meditation</h3>
          <p className="text-gray-700 leading-relaxed text-base md:text-lg">
            {gospel.meditation}
          </p>
        </div>
      </div>
    </section>
  );
}
