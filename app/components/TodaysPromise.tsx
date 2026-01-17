import { parseStringPromise } from 'xml2js';

interface VideoData {
  title: string;
  link: string;
  published: string;
  thumbnail: string;
}

async function getLatestVideo(): Promise<VideoData | null> {
  try {
    const channelId = 'UCUowAl7_QcVP1tcqduONENQ'; // Logos Voice TV
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      console.error('Failed to fetch RSS feed:', response.statusText);
      return null;
    }

    const xmlText = await response.text();
    const parsed = await parseStringPromise(xmlText);

    // YouTube RSS feed structure: feed.entry[0] is latest video
    const latestEntry = parsed.feed.entry?.[0];

    if (!latestEntry) {
      return null;
    }

    return {
      title: latestEntry.title?.[0] || 'Latest Message',
      link: latestEntry.link?.[0]?.$.href || '',
      published: latestEntry.published?.[0] || '',
      thumbnail: latestEntry['media:group']?.[0]?.['media:thumbnail']?.[0]?.$.url || ''
    };
  } catch (error) {
    console.error('Error fetching YouTube RSS:', error);
    return null;
  }
}

export default async function TodaysPromise() {
  const video = await getLatestVideo();

  if (!video) {
    return null; // Don't show section if fetch fails
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-12 -mt-8 relative z-20">
      <div className="bg-gradient-to-br from-[#6e3a6c]/10 via-[#2C5F87]/10 to-[#325847]/10 rounded-3xl shadow-xl p-8 border border-[#D4AF37]/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Video Thumbnail */}
          <div className="flex-shrink-0">
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-48 h-36 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <span className="text-3xl">📖</span>
              <h2 className="text-2xl font-serif font-bold text-[#2C5F87]">
                Today's Message
              </h2>
            </div>

            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#6e3a6c] transition-colors mb-3"
            >
              <p className="text-lg text-gray-800 font-medium leading-relaxed">
                {video.title}
              </p>
            </a>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>🙏</span>
                <span>From <span className="font-semibold text-[#2C5F87]">Fr. Jose, Logos Ministries</span></span>
              </div>
              <span className="hidden sm:inline">•</span>
              <a
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D4AF37] hover:bg-[#c49d2f] text-white px-6 py-2 rounded-full font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
