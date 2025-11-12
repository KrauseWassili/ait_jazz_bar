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
        bg-secondary/10
        backdrop-blur-sm
        border border-[#de7b13]
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
        <div className="absolute inset-0 bg-accent/20 mix-blend-multiply"></div>
      </div>

      <div className="flex flex-col justify-between flex-1 w-full text-center p-1">
        <h2 className="text-lg font-bold text-accent">{title}</h2>
        
        <p className="text-sm italic text-foreground line-clamp-2">
          {description}
        </p>
        <p className="font-semibold text-foreground">{place}</p>
        <p className="text-xs text-other">
          {datetime?.toLocaleString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
