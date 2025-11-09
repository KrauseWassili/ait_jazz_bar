import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";
import { artists as artistsTable } from "@/db/schema";
import Artist from "../../types/Artist";
import { eq } from "drizzle-orm";
import JazzBarEvent from "../../types/Jazz-bar-event";

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number((await params).id);
  
  const [eventRaw] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, id));

  const event: JazzBarEvent = {
    ...eventRaw,
    description: eventRaw.description ?? "",
    price: eventRaw.price ? Number(eventRaw.price) : 0,
  };

  const artists = await db.select().from(artistsTable).orderBy(artistsTable.id);

  const artistsByEventId = artists.reduce((acc, artist) => {
    if (!acc[artist.eventId]) acc[artist.eventId] = [];
    acc[artist.eventId].push(artist);
    return acc;
  }, {} as Record<number, Artist[]>);

  // if(false)
  // return <EditEvent event={event} artists={artists} />

  return (
    <div>
      {/* <button type="button" name="edit" onClick={()=>setEdit(!edit)}>Edit event</button> */}
      <section>
        <h3 className="text-3xl">{event.title}</h3>
        {event.image ? (
          <img src={event.image} alt={event.title} width="400px" />
        ) : null}
        <p>{event.description}</p>
        <h4 className="text-2xl">Artists</h4>

        {/* {artistsByEventId[event.id] ? (
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
        ) : null} */}
      </section>
    </div>
  );
}
