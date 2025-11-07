import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";

const EventsPage = async ({}) => {
  const events = await db.select().from(eventsTable);
  return (
    <div className="p-8">
      <section className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Events</h2>
      <ul className="space-y-4">
        {events.map((event) => (
        <li key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{event.name}</h3>
          <p className="text-gray-600">{event.description}</p>
        </li>
        ))}
      </ul>
      </section>
    </div>
  );
};

export default EventsPage;