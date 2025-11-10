"use server";

import { db } from "@/db";
import { artists, events } from "@/db/schema";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { redirect } from "next/navigation";
import z from "zod";
import Artist from "../types/Artist";
import { revalidatePath } from "next/cache";

const EventInsertSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Min length must be more than 3")
    .max(250, "Name is too long, must be under 250"),
  image: z.string().trim(),
  //.min(3, "Min length must be more than 3")
  //.max(250, "Too long, must be under 250"),
  description: z.string().trim(),
  //.min(3, "Min length must be more than 3")
  //.max(250, "Too long, must be under 250"),
  place: z.string(),
  // .trim()
  // .min(3, "Min length must be more than 3")
  // .max(250, "Too long, must be under 250"),
  datetime: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), "Must be a valid date")
    .transform((s) => new Date(s)),
  price: z
    .string()
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Must be positive number"
    ),
  email: z.string().trim(),
  //.min(3, "Min length must be more than 3")
  //.max(250, "Name is too long, must be under 250"),
  phone: z.string().trim(),
  // .min(3, "Min length must be more than 3")
  // .max(250, "Too long, must be under 250"),
});

export default async function saveEvent(formData: FormData) {
  const data = Object.fromEntries(
    Array.from(formData.entries()).map(([k, v]) => [k, v.toString()])
  );

  const newEvent = EventInsertSchema.parse(data);

  const [postedEvent] = await db
    .insert(events)
    .values(newEvent)
    .returning({ id: events.id });

  const artistsRaw = formData.get("artistsArray");
  let artistsArray: Artist[] = [];
  if (typeof artistsRaw === "string" && artistsRaw.length > 0) {
    artistsArray = JSON.parse(artistsRaw);
  }

  const artistsToInsert = artistsArray.map((artist) => ({
    artistName: artist.artistName,
    instrumentRole: artist.instrumentRole,
    artistImage: artist.artistImage,
    eventId: postedEvent.id,
  }));

  if (artistsToInsert.length > 0) {
    await db.insert(artists).values(artistsToInsert);
  }
  revalidatePath(`/events/${postedEvent.id}`);
  redirect(`/events/${postedEvent.id}`);
}
