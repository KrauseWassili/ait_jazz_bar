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
    <div className="px-4 sm:px-6 lg:px-8 ">

      {/* Кнопки справа сверху */}
  <div className="absolute top-3 right-3 flex gap-2">
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
      {/* <button type="button" name="edit" onClick={()=>setEdit(!edit)}>Edit event</button> */}

      {/* <section>
        <h3 className="text-3xl">{event.title}</h3>

        <div className="mt-4 flex flex-col md:flex-row items-center md:items-center gap-6">
          {event.image && (
            <img
              src={event.image}
              alt={event.title}
              className="w-[350px] rounded-2xl border"
              style={{ borderColor: "var(--border)" }}
            />
          )}

          <p className="text-lg leading-relaxed md:self-center md:max-w-[600px]">
            {event.description}
          </p>
        </div>
      </section> */}
      <div
        className="mt-6 border rounded-xl shadow-md p-4 flex flex-col gap-4 max-w-xl mx-auto"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
          color: "var(--foreground)",
        }}
      >
        <h4 className="text-xl font-semibold text-center">{event.title}</h4>

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-60 object-cover rounded-md border"
            style={{ borderColor: "var(--accent)" }}
          />
        )}

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm mt-2">
          <p>
            📍 <span style={{ color: "var(--secondary)" }}>{event.place}</span>
          </p>
          {event.datetime && (
            <p>
              🕙{" "}
              <span style={{ color: "var(--secondary)" }}>
                {new Date(event.datetime).toLocaleString()}
              </span>
            </p>
          )}
          <p className="font-medium">
            💶 <span style={{ color: "var(--other)" }}>{event.price}€</span>
          </p>
        </div>
      </div>
      {/* <p className="text-base text-center">{event.description}</p> */}
      <h4 className="text-2xl">Artists</h4>
      <section>
        {artistsByEventId[event.id] ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
              {artistsByEventId[event.id].map((artist) => (
                <li
                  key={artist.id}
                  style={{
                    backgroundColor: "var(--background)",
                    borderColor: "var(--border)",
                    color: "var(--foreground)",
                  }}
                  className="border p-4 rounded-2xl shadow-sm flex flex-col justify-between h-80"
                >
                  <p className="font-semibold text-center">
                    {artist.artistName}
                  </p>
                  <p className="text-gray-600 text-center">
                    {artist.instrumentRole}
                  </p>
                  {artist.artistImage && (
                    <div className="flex justify-center mt-auto">
                      <img
                        src={artist.artistImage}
                        alt={artist.artistName}
                        className="mt-0.5 h-60 w-full object-contain rounded border"
                        style={{ borderColor: "var(--accent)" }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <p className="text-gray-600">☎️ {event.phone}</p>
              <p> 📩 {event.email}</p>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No artists listed for this event.</p>
        )}
      </section>
    </div>
  );
}
