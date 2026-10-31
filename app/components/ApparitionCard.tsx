import PilgrimageTile from "./PilgrimageTile";
interface Apparition {
  name: string;
  location: { city: string; country: string };
  year: string | number;
  apparitionCount: string | number;
  statusSource?: { title: string; url: string };
  images?: string[];
}
export default function ApparitionCard({
  apparition,
  onClick,
}: {
  apparition: Apparition;
  onClick: () => void;
}) {
  return (
    <PilgrimageTile
      onClick={onClick}
      title={apparition.name}
      eyebrow="MARIAN DEVOTION"
      meta={`${apparition.location.city}, ${apparition.location.country} · ${apparition.year}`}
      description={apparition.statusSource ? 'Devotion permitted; supernatural origin not established' : `${apparition.apparitionCount} reported apparition${apparition.apparitionCount === 1 ? "" : "s"}`}
      image={apparition.images?.[0]}
      fallback="/images/home/marian.webp"
    />
  );
}
