import PilgrimageTile from "./PilgrimageTile";
interface MiracleCardProps {
  miracle: {
    id: string;
    name?: string;
    location: {
      city: string;
      country: string;
    };
    date: {
      year: number;
      displayDate?: string;
    };
    description: string;
    images?: Array<{
      url: string;
      alt: string;
    }>;
  };
}

export default function MiracleCard({ miracle }: MiracleCardProps) {
  return (
    <PilgrimageTile
      href={`/miracles/${miracle.id}`}
      title={miracle.name || `Miracle of ${miracle.location.city}`}
      eyebrow="EUCHARISTIC MIRACLE"
      meta={`${miracle.location.city}, ${miracle.location.country} · ${miracle.date.displayDate || miracle.date.year}`}
      description={miracle.description}
      image={miracle.images?.[0]?.url}
      fallback="/images/home/miracles.webp"
    />
  );
}
