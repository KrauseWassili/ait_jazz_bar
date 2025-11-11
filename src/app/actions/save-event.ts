"use server";

import { db } from "@/db";
import { artists, events } from "@/db/schema";
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

export type EventFormState = {
  errors?: Record<string, string[]>;
};

export default async function saveEvent(
  prevState: EventFormState,
  formData: FormData
): Promise<EventFormState> {
  try {
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

    if (artistsArray.length > 0) {
      await db.insert(artists).values(
        artistsArray.map((artist) => ({
          artistName: artist.artistName,
          instrumentRole: artist.instrumentRole,
          artistImage: artist.artistImage,
          eventId: postedEvent.id,
        }))
      );
    }

    revalidatePath(`/events/${postedEvent.id}`);

    redirect(`/events/${postedEvent.id}`);
    return { errors: {} };
  } catch (err) {
  
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

  return { errors: { _form: [err instanceof Error ? err.message : "Unexpected error occurred"] } };
}

}
