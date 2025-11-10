"use server";

import { db } from "@/db";
import { events, artists } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function deleteEvent(eventId: number) {
  await db.delete(artists).where(eq(artists.eventId, eventId));
  await db.delete(events).where(eq(events.id, eventId));  
}
