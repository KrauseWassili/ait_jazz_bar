import Link from "next/link";
import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";
import { artists as artistsTable } from "@/db/schema";
import Artist from "../types/Artist";
import { EventCard } from "@/components/EventCard/EventCard";
import JazzBarEvent from "../types/Jazz-bar-event";

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
    <div className="p-4 bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-lg shadow-md">
      <section>
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Events</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((e: JazzBarEvent) => (
        <li key={e.id} className="col-span-1">
          <Link
          href={`/events/${e.id}`}
          className="block group rounded-lg bg-white text-gray-800 ring-1 ring-gray-200 hover:shadow-lg transition-shadow p-4 border-l-4 border-transparent hover:border-indigo-400"
          >
          <EventCard event={e} />
          </Link>
        </li>
        ))}
      </ul>
      </section>
    </div>
  );
};

export default EventsPage;