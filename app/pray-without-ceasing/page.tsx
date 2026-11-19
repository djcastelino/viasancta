import PrayWithoutCeasingClient from "./PrayWithoutCeasingClient";

export const metadata = {
  title: "Pray Without Ceasing — 1-Minute Thanksgiving Chain | Divine Pilgrim",
  description:
    "Created to declare His praise (Isaiah 43:21 · 1 Thess 5:17). Join the 60-second spoken thanksgiving chain to our Lord and God Jesus Christ and pass the flame.",
};

export default function PrayWithoutCeasingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#f4efe6]">
      <main className="pt-4">
        <PrayWithoutCeasingClient />
      </main>
    </div>
  );
}
