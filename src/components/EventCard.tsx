import Image from "next/image";
import { Event } from "../types"; // создадим тип ниже

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <div
      onClick={() => onSelect(event)}
      className="cursor-pointer rounded-2xl overflow-hidden bg-gray-900 shadow-lg hover:scale-[1.02] transition-transform"
    >
      <Image
        src={event.image}
        alt={event.title}
        width={400}
        height={250}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{event.title}</h3>
        <p className="text-pink-500 text-sm">{event.place}</p>
        <p className="text-sm text-gray-300 mt-1">{event.description}</p>
        <p className="text-yellow-400 text-xs mt-2">{event.date}</p>
      </div>
    </div>
  );
}
