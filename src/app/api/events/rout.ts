import { NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";

export async function GET() {
  const data = await db.select().from(events);
  return NextResponse.json(data);
}
