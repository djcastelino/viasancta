import JourneyFrame from '@/app/components/JourneyFrame';
import SacredMountainsClient from './SacredMountainsClient';

export const metadata = {
  title: 'Sacred Mountains of the Bible - Divine Pilgrim',
  description: 'Journey through the sacred mountains where God met humanity. From Mount Sinai to the Mount of Olives, experience the mountains of Scripture with immersive audio tours, stunning photography, and rich theological insight.',
};

export default function SacredMountainsPage() {
  return <JourneyFrame kind="mountains"><div className="journey-collection-intro"><p className="pilgrim-eyebrow">MOUNTAINS OF DIVINE ENCOUNTER</p><h2>Lift your eyes.<br /><em>Listen to His story.</em></h2><p>Explore each mountain’s significance, Scripture references, and guided audio sections.</p></div><SacredMountainsClient /></JourneyFrame>;
}
