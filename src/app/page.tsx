"use client";

import { useState } from "react";
import EventCard from "../components/EventCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Event } from "../types";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: "Soul & Blues Jam",
      date: "12 November 2025",
      place: "Bremen",
      description: "Warm blues rhythms and improvisation on the saxophone.",
      image: "/images/jazz2.jpg",
      link: "https://www.eventportal.de/kuenstler/funk-soul/bremen/",
    },
    {
      id: 2,
      title: "Jazz Night",
      date: "10 November 2025",
      place: "Berlin",
      description: "An incredible evening with live music and the atmosphere of the 60s.",
      image: "/images/jazz1.jpg",
      link: "https://example.com/jazz-night",
    },
  ];

  return (
    <main className="p-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
      ))}

      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent side="right" className="w-full sm:max-w-lg bg-gray-900 text-white">
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">{selectedEvent.title}</SheetTitle>
                <SheetDescription className="text-pink-400">{selectedEvent.place}</SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  width={600}
                  height={400}
                  className="rounded-xl"
                />
                <p className="mt-4 text-gray-300">{selectedEvent.description}</p>
                <p className="mt-2 text-yellow-400">{selectedEvent.date}</p>
                <Button
                  asChild
                  className="mt-6 bg-pink-600 hover:bg-pink-700 text-white"
                >
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    More Info
                  </a>
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
