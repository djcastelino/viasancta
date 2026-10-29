import JourneyFrame from '@/app/components/JourneyFrame';
import apparitions from '@/public/marian-apparitions.json';
import MarianApparitionsClient from './MarianApparitionsClient';

export const metadata = {
  title: 'Marian Apparitions Tour - Divine Pilgrim',
  description: 'Journey through 20 Church-approved Marian apparitions worldwide with AI-guided narrations.',
}

export default async function MarianApparitionsPage() {
  // Count unique countries
  const countries = [...new Set(apparitions.map((a: any) => a.location.country))];

  return <JourneyFrame kind="marian"><div className="journey-collection-intro"><p className="pilgrim-eyebrow">PLACES OF MARIAN DEVOTION</p><h2>A message of hope.<br /><em>A place for prayer.</em></h2><p>Explore the documented accounts and their individual histories.</p></div><MarianApparitionsClient apparitions={apparitions} countries={countries} /></JourneyFrame>;
}
