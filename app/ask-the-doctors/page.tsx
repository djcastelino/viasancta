import type { Metadata } from 'next';
import AskDoctorsClient from './AskDoctorsClient';

export const metadata: Metadata = {
  title: 'Ask the Doctors of the Church — Guided by Andrew | Divine Pilgrim',
  description:
    'Explore the timeless teachings of St. Augustine, St. Thomas Aquinas, St. Jerome, St. John Chrysostom, St. Francis de Sales, St. Teresa of Ávila, St. Thérèse of Lisieux, St. Ignatius of Antioch, St. Irenaeus, and more—strictly grounded in 17 pre-1929 public-domain PDFs.',
};

export default function AskTheDoctorsPage() {
  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f4efe6]">
      <main className="pt-4 pb-24">
        <AskDoctorsClient />
      </main>
    </div>
  );
}
