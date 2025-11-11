"use server";

import { db } from "@/db";
import { events, artists } from "@/db/schema";
import { eq } from "drizzle-orm";
import z from "zod";
import Artist from "../types/Artist";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ⬇️ подтягиваем тип из save-event и ре-экспортим
export type { EventFormState } from "./save-event";
import type { EventFormState } from "./save-event";

const EventUpdateSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .trim()
    .min(3, "Min length must be more than 3")
    .max(250, "Name is too long, must be under 250"),
  image: z.string().trim().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().trim().optional().or(z.literal("")),
  place: z
    .string()
    .trim()
    .min(3, "Min length must be more than 3")
    .max(250, "Too long, must be under 250"),
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
  email: z.string().email("Invalid email address"),
  phone: z.string().trim().min(3, "Phone number is too short"),
});

export default async function updateEvent(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  try {
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
    revalidatePath(`/events/edit/${eventId}`);
    redirect(`/events/${eventId}`);
  } catch (err: any) {
    // пропускаем служебный редирект
    if (
      typeof err === "object" &&
      err !== null &&
      "digest" in err &&
      (err as any).digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw err;
    }

    if (err instanceof z.ZodError) {
      return { errors: err.flatten().fieldErrors };
    }

    return { errors: { _form: [err?.message || "Unexpected error occurred"] } };
  }
}
