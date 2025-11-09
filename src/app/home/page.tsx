import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";
import { artists as artistsTable } from "@/db/schema";
import Artist from "../types/Artist";

const EventsPage = async ({}) => {
  const events = await db.select().from(eventsTable).orderBy(eventsTable.id);
  const artists = await db.select().from(artistsTable).orderBy(artistsTable.id);

  const artistsByEventId = artists.reduce((acc, artist) => {
  if (!acc[artist.eventId]) acc[artist.eventId] = [];
  acc[artist.eventId].push(artist);
  return acc;
},  {} as Record<number, Artist[]>);

  

  return (
    <div>
      <section>
        <h2>Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3 className="text-3xl">{event.title}</h3>
              {event.image ? (
                <img src={event.image} alt={event.title} width="400px" />
              ) : null}
              <p>{event.description}</p>
              <h4 className="text-2xl">Artists</h4>

              {artistsByEventId[event.id] ? (
                <ul>
                  {artistsByEventId[event.id].map((artist) => (
                    <li key={artist.id}>
                      <p>{artist.artistName}</p>
                      <p>{artist.instrumentRole}</p>
                      {artist.artistImage ? (
                        <img
                          src={artist.artistImage}
                          alt={artist.artistName}
                          width="300 px"
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EventsPage;
