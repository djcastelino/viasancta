import MountainDetail from './MountainDetail';
import mountainsData from '@/public/sacred-mountains.json';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return mountainsData.map((mountain) => ({
    id: mountain.id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const mountain = mountainsData.find(m => m.id === parseInt(id));

  if (!mountain) {
    return {
      title: 'Mountain Not Found - Divine Pilgrim',
    };
  }

  return {
    title: `${mountain.name} - Sacred Mountains - Divine Pilgrim`,
    description: mountain.significance,
  };
}

export default async function MountainPage({ params }: PageProps) {
  const { id } = await params;
  const mountain = mountainsData.find(m => m.id === parseInt(id));

  if (!mountain) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <MountainDetail mountains={[mountain]} />
    </div>
  );
}
