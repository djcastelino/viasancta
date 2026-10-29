import JourneyFrame from '@/app/components/JourneyFrame';
import { Suspense } from 'react';
import churches from '@/public/sacred-architecture.json';
import SacredArchitectureClient from './SacredArchitectureClient';

export const metadata = {
  title: 'Sacred Architecture - Divine Pilgrim',
  description: 'Discover one magnificent church daily with audio tours of history, architecture, and fascinating facts.',
}

export default async function SacredArchitecturePage() {
  // Count unique countries and architecture styles
  const countries = [...new Set(churches.map((c: any) => c.location.country))];
  const styles = [...new Set(churches.flatMap((c: any) => c.architectureStyle.split(', ')))];

  return <JourneyFrame kind="architecture"><Suspense fallback={<p className="journey-loading" role="status">Opening today’s sacred space…</p>}><SacredArchitectureClient churches={churches} countries={countries} styles={styles} /></Suspense></JourneyFrame>;
}
