import EventForm from "@/components/event-form";
import { db } from "@/db";
import { events as eventsTable, artists as artistsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function EditEventPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number((await params).id);


  const [eventRaw] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, id));

  const event = {
    ...eventRaw,
    price: eventRaw.price ? Number(eventRaw.price) : 0,
  };

  const eventArtists = await db
    .select()
    .from(artistsTable)
    .where(eq(artistsTable.eventId, id));

  return <EventForm mode="edit" eventData={event} artistsData={eventArtists} />;
}
