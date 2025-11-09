"use client";
import { useState } from "react";
import JazzBarEvent from "@/app/types/Jazz-bar-event";
import Artist from "@/app/types/Artist";
import changeEvent from "@/app/actions/change-event";


interface Props {
  event: JazzBarEvent;
  artists: Artist[];
}

export default function EditEvent({ event, artists }: Props) {

    const id = 1;


  const [artistArray, setArtistArray] = useState<Artist[]>([]);
  const [edit, setEdit] = useState(false);


  //   const [event] = await db
  //     .select()
  //     .from(eventsTable)
  //     .where(eq(eventsTable.id, id));

  //   const artists = await db.select().from(artistsTable).orderBy(artistsTable.id);

  //   const artistsByEventId = artists.reduce((acc, artist) => {
  //     if (!acc[artist.eventId]) acc[artist.eventId] = [];
  //     acc[artist.eventId].push(artist);
  //     return acc;
  //   }, {} as Record<number, Artist[]>);

  function toDatetimeLocal(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    return date.toISOString().slice(0, 16);
  }

if (!event) {
  return <div>Loading...</div>
}


  return (
    
    <div>
      <h2 className="text-2xl font-semibold">Create new event</h2>

      <form action={changeEvent}>
        <input type="hidden" name="id" value={id} />
        <input
          type="hidden"
          name="artistsArray"
          value={JSON.stringify(artistArray)}
        />

        <input
          name="title"
          defaultValue={event.title ?? ""}
          placeholder="Event title"
          type="text"
        />
        
        <input
          name="image"
          defaultValue={event.image ?? ""}
          placeholder="Image"
          type="text"
        />

        {/* <NewArtist value={artistArray} onChange={setArtistArray} /> */}

        {/* <ul>
            {artistArray.map((artist, idx) => (
              <li key={idx}>
                {artist.artistName} — {artist.instrumentRole}
                {artist.artistImage ? (
                  <img
                    src={artist.artistImage}
                    alt={artist.artistName}
                    style={{ width: 300, verticalAlign: "middle" }}
                  />
                ) : null}
              </li>
            ))}
          </ul> */}

        <textarea
          name="description"
          defaultValue={event.description ?? ""}
          placeholder="Describe your event"
          rows={4}
        />
        <input
          name="place"
          defaultValue={event.place ?? ""}
          placeholder="Place"
          type="text"
        />

        <input
          type="datetime-local"
          defaultValue={event.datetime ? toDatetimeLocal(event.datetime) : ""}
          name="datetime"
        />

        <input
          name="price"
          defaultValue={event.price}
          placeholder="Price"
          type="number"
        />
        <input
          name="email"
          defaultValue={event.email ?? ""}
          placeholder="Email"
          type="text"
        />
        <input
          name="phone"
          defaultValue={event.phone ?? ""}
          placeholder="Phone"
          type="tel"
        />

        <button type="submit">Create event</button>
      </form>
    </div>
  );
};

