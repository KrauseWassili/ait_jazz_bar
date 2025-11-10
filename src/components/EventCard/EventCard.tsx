import Artist from "@/app/types/Artist";
import JazzBarEvent from "@/app/types/Jazz-bar-event";

interface Props {
  event: JazzBarEvent;
}

interface Props {
  event: JazzBarEvent;
  variant?: "default" | "with-back-btn";
}

export const EventCard = ({ event }: Props) => {
  const {
    id,
    title,
    image,
    description,
    place,
    datetime,
    price,
    email,
    phone,
    createdAt,
  } = event;

  return (
    <div
      className="
        w-72 h-[420px]
        bg-[var(--secondary)]/10
        backdrop-blur-sm
        border: #de7b13;
        hover:shadow-8x4
        overflow-hidden flex flex-col items-center 
        transition-transform duration-300 hover:-translate-y-2
        rounded-none
      "
    >
     
      <div className="relative w-full aspect-square">
        <img
          src={image ?? ""}
          alt={title}
          className="w-full h-full object-cover rounded-none"
        />
        <div className="absolute inset-0 bg-[var(--accent)]/20 mix-blend-multiply"></div>
      </div>

      <div className="flex flex-col justify-between flex-1 w-full text-center p-2">
        <h3 className="text-lg font-semibold text-[var(--accent)]">{place}</h3>
        <p className="text-sm text-[var(--foreground)] mt-2 line-clamp-2">
          {description}
        </p>
        <p className="text-xs text-[var(--other)] mt-auto">
          {datetime?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
