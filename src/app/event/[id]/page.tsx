import { notFound } from "next/navigation";
import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Jazz Night",
    date: "10 November 2025",
    place: "Berlin",
    description: "An incredible evening with live music and the atmosphere of the 60s.",
    image: "/images/jazz1.jpg",
    link: "https://www.eventportal.de/kuenstler/event-partysaxofonist-olli-r/",
  },
  {
    id: 2,
    title: "Soul & Blues Jam",
    date: "12 November 2025",
    place: "Bremen",
    description: "Warm blues rhythms and improvisation on the saxophone.",
    image: "/images/jazz2.jpg",
    link: "https://www.eventportal.de/kuenstler/funk-soul/bremen/",
  },
];

export default function EventDetail({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id === Number(params.id));

  if (!event) return notFound();

  return (
    <div className="flex flex-col lg:flex-row p-8 gap-8">
      <div className="lg:w-1/2">
        <Image src={event.image} alt={event.title} width={800} height={600} className="rounded-2xl" />
      </div>
      <div className="lg:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
        <p className="text-pink-400">{event.place}</p>
        <p className="text-gray-300 mt-4">{event.description}</p>
        <p className="text-yellow-400 mt-4">{event.date}</p>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          More Info
        </a>
      </div>
    </div>
  );
}
