"use server";

import { db } from "@/db";
import { events, artists } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import Artist from "../types/Artist";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const EventUpdateSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(3).max(250),
  image: z.string().trim().optional(),
  description: z.string().trim().optional(),
  place: z.string().trim().optional(),
  datetime: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), "Must be valid date")
    .transform((s) => new Date(s)),
  price: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Must be positive number"),
  email: z.string().trim(),
  phone: z.string().trim(),
});

export default async function updateEvent(formData: FormData) {
  const data = Object.fromEntries(
    Array.from(formData.entries()).map(([k, v]) => [k, v.toString()])
  );

  const updatedEvent = EventUpdateSchema.parse(data);
  const eventId = Number(updatedEvent.id);

  await db
    .update(events)
    .set({
      title: updatedEvent.title,
      image: updatedEvent.image,
      description: updatedEvent.description,
      place: updatedEvent.place,
      datetime: updatedEvent.datetime,
      price: updatedEvent.price,
      email: updatedEvent.email,
      phone: updatedEvent.phone,
    })
    .where(eq(events.id, eventId));

  const artistsRaw = formData.get("artistsArray");
  let artistsArray: Artist[] = [];
  if (typeof artistsRaw === "string" && artistsRaw.length > 0) {
    artistsArray = JSON.parse(artistsRaw);
  }

  // Удалим старых артистов и вставим новых
  await db.delete(artists).where(eq(artists.eventId, eventId));

  if (artistsArray.length > 0) {
    await db.insert(artists).values(
      artistsArray.map((a) => ({
        artistName: a.artistName,
        instrumentRole: a.instrumentRole,
        artistImage: a.artistImage,
        eventId,
      }))
    );
  }

  revalidatePath(`/events/${eventId}`);
  redirect(`/events/${eventId}`);
}
