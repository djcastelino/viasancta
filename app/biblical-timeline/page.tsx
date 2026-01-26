import { Metadata } from 'next';
import BiblicalTimelineClient from './BiblicalTimelineClient';

export const metadata: Metadata = {
  title: 'Biblical Timeline - From Adam to King of Kings | Via Sancta',
  description: 'Journey through salvation history with 12 key periods from Creation to the Church. Explore God\'s redemptive plan unfolding from Adam to Christ the King.',
  keywords: 'Biblical Timeline, Salvation History, Jeff Cavins, Bible Periods, Adam to Christ, Biblical History, Patriarchs, Exodus, Kingdom, Exile, Jesus, Church History',
};

export default function BiblicalTimelinePage() {
  return <BiblicalTimelineClient />;
}
