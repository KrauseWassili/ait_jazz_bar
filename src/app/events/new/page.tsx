"use client";
import createEvent from "../../actions/create-event";
import { useState } from "react";
import NewArtist from "@/components/new-artist";
import Artist from "../../types/Artist";

const NewEvent = () => {
  const [artistArray, setArtistArray] = useState<Artist[]>([]);

  return (
    <div>
      <h2 className="text-2xl font-semibold">Create new event</h2>

      <form action={createEvent}>
        <input
          type="hidden"
          name="artistsArray"
          value={JSON.stringify(artistArray)}
        />

        <input name="title" placeholder="Event title" type="text" />
        <input name="image" placeholder="Image" type="text" />

        <NewArtist value={artistArray} onChange={setArtistArray} />

        <ul>
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
        </ul>

        <textarea
          name="description"
          placeholder="Describe your event"
          rows={4}
        />
        <input name="place" placeholder="Place" type="text" />

        <input type="datetime-local" name="datetime" />

        <input name="price" placeholder="Price" type="number" />
        <input name="email" placeholder="Email" type="text" />
        <input name="phone" placeholder="Phone" type="tel" />

        <button type="submit">Create event</button>
      </form>
    </div>
  );
};

export default NewEvent;
