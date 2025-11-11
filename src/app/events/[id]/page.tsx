import { db } from "@/db";
import { events as eventsTable } from "@/db/schema";
import { artists as artistsTable } from "@/db/schema";
import Artist from "../../types/Artist";
import { eq } from "drizzle-orm";
import JazzBarEvent from "../../types/Jazz-bar-event";
import Link from "next/link";
import deleteEvent from "@/app/actions/delete-event";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  async function handleDelete() {
    "use server";
    await deleteEvent(id);
    revalidatePath("/events");
    redirect("/events");
  }

  return (
    <div className="p-4 flex-1 flex flex-col sm:px-6 lg:px-8">
      {/* Кнопки Edit/Delete */}
      <div className="absolute top-3 right-52 flex gap-2">
        <Link
          href={`/events/edit/${id}`}
          className="bg-amber-500 hover:bg-amber-600 text-white text-sm px-3 py-1.5 rounded-md transition"
        >
          ✏️ Edit
        </Link>
        <form action={handleDelete}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded-md transition"
          >
            🗑 Delete
          </button>
        </form>
      </div>

      {/* --- Основной контент --- */}
      <main className="flex-1">
        <div
          className="mt-6 border shadow-md p-4 flex flex-col gap-4 max-w-xl mx-auto"
          style={{
            backgroundColor: "var(--border)",
            borderColor: "var(--border)",
            color: "var(--foreground)",
          }}
        >
          <h4 className="text-xl font-semibold text-center">{event.title}</h4>

          {/* Блок с изображением и описанием */}
          {event.image && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div
                className="p-2 border flex-shrink-0 flex items-center justify-center"
                style={{
                  backgroundColor: "var(--other)",
                  borderColor: "var(--accent)",
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-60 w-60 object-cover"
                />
              </div>
              <div className="flex-1 flex items-center">
                <p className="text-xl text-accent px-2">{event.description}</p>
              </div>
            </div>
          )}

          <div className="font-bold flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm mt-2">
            <p>
              📍 <span style={{ color: "var(--accent)" }}>{event.place}</span>
            </p>
            {event.datetime && (
              <p>
                🕙{" "}
                <span style={{ color: "var(--accent)" }}>
                  {new Date(event.datetime).toLocaleString(undefined, {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            )}
            <p className="font-bold">
              <span className="text-other text-xl">💸{event.price}€</span>
            </p>
          </div>
        </div>

        <h4 className="text-2xl text-center m-4">Artists</h4>
        <section>
          {artistsByEventId[event.id] && artistsByEventId[event.id].length > 0 ? (
            <div className="w-full flex justify-center">
              <ul className="flex flex-row justify-center gap-4">
                {artistsByEventId[event.id].map((artist) => (
                  <li
                    key={artist.id}
                    style={{
                      backgroundColor: "var(--border)",
                      borderColor: "var(--border)",
                      color: "var(--foreground)",
                    }}
                    className="border p-4 shadow-sm flex flex-col justify-between h-80 w-70"
                  >
                    <p className="font-semibold text-center">
                      {artist.artistName}
                    </p>
                    <p className="text-gray-600 text-center">
                      {artist.instrumentRole}
                    </p>
                    {artist.artistImage && (
                      <div
                        className="flex justify-center mt-auto border"
                        style={{
                          backgroundColor: "var(--other)",
                          borderColor: "var(--accent)",
                        }}
                      >
                        <img
                          src={artist.artistImage}
                          alt={artist.artistName}
                          className="h-60 w-full object-contain border"
                          style={{ borderColor: "var(--accent)" }}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-black/60 text-center">
              No artists listed for this event.
            </p>
          )}
        </section>
      </main>

      {/* --- Футер, всегда внизу --- */}
      <footer className="flex justify-center gap-4 mt-5 pb-8">
        <p
          className="inline-flex flex-col items-center px-3 py-1 border text-sm font-bold w-70"
          style={{
            backgroundColor: "var(--border)",
            borderColor: "var(--accent)",
            color: "var(--foreground)",
          }}
        >
          ☎️ {event.phone}
        </p>
        <p
          className="inline-flex flex-col items-center px-3 py-1 border text-sm font-bold w-70"
          style={{
            backgroundColor: "var(--border)",
            borderColor: "var(--accent)",
            color: "var(--foreground)",
          }}
        >
          📩 {event.email}
        </p>
      </footer>
    </div>
  );
}
