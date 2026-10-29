import PilgrimageTile from "./PilgrimageTile";
interface Church {
  name: string;
  location: { city: string; country: string };
  built: string;
  architectureStyle: string;
  images?: { url: string }[];
}
export default function ChurchCard({
  church,
  onClick,
}: {
  church: Church;
  onClick: () => void;
}) {
  return (
    <PilgrimageTile
      onClick={onClick}
      title={church.name}
      eyebrow="A SACRED SPACE"
      meta={`${church.location.city}, ${church.location.country}`}
      description={`Built ${church.built} · ${church.architectureStyle}`}
      image={church.images?.[0]?.url}
      fallback="/images/home/architecture.webp"
    />
  );
}
