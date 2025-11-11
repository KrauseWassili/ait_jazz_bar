"use client";
import { useActionState } from "react";
import changeEvent, { EventFormState } from "@/app/actions/update-event";
import { useState } from "react";
import Artist from "@/app/types/Artist";
import JazzBarEvent from "@/app/types/Jazz-bar-event";

interface Props {
  event: JazzBarEvent;
  artists: Artist[];
}

export default function EditEvent({ event, artists }: Props) {
  const [artistArray, setArtistArray] = useState<Artist[]>(artists);
  const [state, formAction] = useActionState<EventFormState, FormData>(
    changeEvent,
    { errors: {} }
  );

  function toDatetimeLocal(value: string | Date): string {
    const date = value instanceof Date ? value : new Date(value);
    return date.toISOString().slice(0, 16);
  }

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Edit event</h2>

      <form action={formAction}>
        <input type="hidden" name="id" value={event.id} />
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

        <ul>
          {artistArray.map((artist, idx) => (
            <li key={idx}>
              {artist.artistName} — {artist.instrumentRole}
              {artist.artistImage && (
                <img
                  src={artist.artistImage}
                  alt={artist.artistName}
                  style={{ width: 300, verticalAlign: "middle" }}
                />
              )}
            </li>
          ))}
        </ul>

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

        {state.errors?._form && (
          <p className="text-red-600">{state.errors._form[0]}</p>
        )}

        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
