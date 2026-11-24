import type { Metadata } from 'next';
import AskDoctorsClient from './AskDoctorsClient';

export const metadata: Metadata = {
  title: 'Ask the Doctors of the Church — Guided by Andrew | Divine Pilgrim',
  description:
    'Explore the timeless teachings of St. Augustine, St. Thomas Aquinas, St. Jerome, St. John Chrysostom, St. Francis de Sales, St. Teresa of Ávila, St. Thérèse of Lisieux, St. Ignatius of Antioch, St. Irenaeus, and more—strictly grounded in 17 pre-1929 public-domain PDFs.',
};

export default function AskTheDoctorsPage() {
  return (
    <div className="min-h-screen bg-[#F3EDE2] text-[#221E1A] selection:bg-[#4F6348]/20">
      <main className="pt-4 pb-24">
        <AskDoctorsClient />
      </main>
    </div>
  );
}
