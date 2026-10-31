import JourneyFrame from '@/app/components/JourneyFrame';
import apparitions from '@/public/marian-apparitions.json';
import MarianApparitionsClient from './MarianApparitionsClient';

export const metadata = {
  title: 'Marian Apparitions Tour - Divine Pilgrim',
  description: 'Explore Marian pilgrimage sites, reported apparitions, and their individual Church status with guided narrations.',
}

export default async function MarianApparitionsPage() {
  // Count unique countries
  const countries = [...new Set(apparitions.map((a: any) => a.location.country))];

  return <JourneyFrame kind="marian"><div className="journey-collection-intro"><p className="pilgrim-eyebrow">PLACES OF MARIAN DEVOTION</p><h2>A message of hope.<br /><em>A place for prayer.</em></h2><p>Explore Marian pilgrimage sites and their individual histories. Church recognition varies by account; inclusion here does not imply approval of an apparition.</p></div><MarianApparitionsClient apparitions={apparitions} countries={countries} /></JourneyFrame>;
}
