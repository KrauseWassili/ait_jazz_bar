import Link from "next/link";
import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";
import { artists as artistsTable } from "@/db/schema";
import Artist from "../types/Artist";
import JazzBarEvent from "../types/Jazz-bar-event";
import { EventCard } from "@/components/EventCard/EventCard";


const EventsPage = async () => {
  const eventsRaw = await db.select().from(eventsTable).orderBy(eventsTable.id);
  const artists = await db.select().from(artistsTable).orderBy(artistsTable.id);

  const artistsByEventId = artists.reduce((acc, artist) => {
    if (!acc[artist.eventId]) acc[artist.eventId] = [];
    acc[artist.eventId].push(artist);
    return acc;
  }, {} as Record<number, Artist[]>);

  const events: JazzBarEvent[] = eventsRaw.map((eventRaw) => ({
    ...eventRaw,
    description: eventRaw.description ?? "",
    price: eventRaw.price ? Number(eventRaw.price) : 0,
    datetime: eventRaw.datetime ? new Date(eventRaw.datetime) : null,
  }));

  return (
    <div className="p-4 min-h-screen">
      <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Events</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-0.5 gap-y-8 place-items-center">
  {events.map((e: JazzBarEvent) => (
    <li key={e.id} className="flex justify-center items-center w-full">
      <Link
        href={`/events/${e.id}`}
        className="block group bg-white text-gray-800 ring-1 ring-gray-200 hover:shadow-lg transition-shadow p-8"
      >
        <EventCard event={e} />
      </Link>
    </li>
  ))}
  <li className="flex justify-center items-center w-full">
    <Link
      href="/events/new"
      className="
        block group 
        bg-white text-gray-800 
        ring-1 ring-gray-200 
        hover:shadow-lg transition-shadow 
        p-4
      "
    >
      <div className="flex flex-col items-center justify-center w-[320px] h-[450px] bg-amber-50">
        <span className="text-6xl text-red-700 group-hover:scale-110 transition-transform duration-300">
          +
        </span>
      </div>
    </Link>
  </li>
</ul>



      </section>
    </div>
  );
};

export default EventsPage;