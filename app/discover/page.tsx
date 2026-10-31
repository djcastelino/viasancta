import Discovery from './Discovery';
const isPreview = process.env.VERCEL_ENV !== 'production';
export const metadata = {
  title: isPreview ? 'Sacred Discovery — Divine Pilgrim Preview' : 'Sacred Discovery — Divine Pilgrim',
  description: 'Explore sacred places on the map, discover architectural details, and try the daily sacred-place photo challenge.',
  robots: { index: !isPreview, follow: !isPreview },
};
export default function Page() { return <Discovery isPreview={isPreview}/>; }
