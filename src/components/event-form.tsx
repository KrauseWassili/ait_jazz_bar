"use client";

import { useState } from "react";
import EditedArtist from "./edited-artist";
import Artist from "@/app/types/Artist";
import AddedArtist from "./added-artist";
import updateEvent from "@/app/actions/update-event";
import saveEvent from "@/app/actions/save-event";

type Props = {
  mode: "create" | "edit";
  eventData?: any; // данные события для режима edit
  artistsData?: Artist[];
};

export default function EventForm({
  mode,
  eventData,
  artistsData = [],
}: Props) {
  const [artistArray, setArtistArray] = useState<Artist[]>(artistsData);
  const [eventImageUrl, setEventImageUrl] = useState(eventData?.image || "");
  const [editingArtistIndex, setEditingArtistIndex] = useState<number | null>(
    null
  );
  const [showArtistForm, setShowArtistForm] = useState(false);

  const handleAddArtistClick = () => {
    setEditingArtistIndex(null);
    setShowArtistForm(true);
  };

  const handleEditArtist = (index: number) => {
    setEditingArtistIndex(index);
    setShowArtistForm(true);
  };

  const handleSaveArtist = (artist: Artist) => {
    if (editingArtistIndex === null) {
      setArtistArray([...artistArray, artist]);
    } else {
      const updated = [...artistArray];
      updated[editingArtistIndex] = artist;
      setArtistArray(updated);
    }
    setEditingArtistIndex(null);
    setShowArtistForm(false);
  };

  const handleCancelArtist = () => {
    setEditingArtistIndex(null);
    setShowArtistForm(false);
  };

  const action = mode === "edit" ? updateEvent : saveEvent;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {mode === "edit" ? "Edit Event" : "Create New Event"}
        </h2>

        <form action={action} className="space-y-6">
          <input
            type="hidden"
            name="artistsArray"
            value={JSON.stringify(artistArray)}
          />
          {mode === "edit" && (
            <input type="hidden" name="id" value={eventData?.id} />
          )}

          <div className="space-y-4">
            <input
              name="title"
              defaultValue={eventData?.title}
              placeholder="Event title"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="image"
              placeholder="Image URL"
              type="text"
              value={eventImageUrl}
              onChange={(e) => setEventImageUrl(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            {eventImageUrl && (
              <div className="flex justify-center">
                <img
                  src={eventImageUrl}
                  alt="Event preview"
                  style={{
                    width: 300,
                    height: 300,
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                    border: "1px solid #e2e8f0",
                  }}
                />
              </div>
            )}

            {showArtistForm ? (
              <EditedArtist
                artist={
                  editingArtistIndex !== null
                    ? artistArray[editingArtistIndex]
                    : null
                }
                onSave={handleSaveArtist}
                onCancel={handleCancelArtist}
              />
            ) : (
              <button
                type="button"
                onClick={handleAddArtistClick}
                className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors"
              >
                Add Artist
              </button>
            )}

            {artistArray.length > 0 && (
              <ul className="space-y-4">
                {artistArray.map((a, index) => (
                  <li
                    key={index}
                    className="p-4 bg-amber-50 rounded-md cursor-pointer hover:bg-amber-100 transition"
                    onClick={() => handleEditArtist(index)}
                  >
                    <AddedArtist artist={a} />
                  </li>
                ))}
              </ul>
            )}

            <textarea
              name="description"
              defaultValue={eventData?.description}
              placeholder="Describe your event"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="place"
              defaultValue={eventData?.place}
              placeholder="Place"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              type="datetime-local"
              name="datetime"
              defaultValue={
                eventData?.datetime
                  ? new Date(eventData.datetime).toISOString().slice(0, 16)
                  : ""
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="price"
              defaultValue={eventData?.price}
              placeholder="Price"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="email"
              defaultValue={eventData?.email}
              placeholder="Email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="phone"
              defaultValue={eventData?.phone}
              placeholder="Phone"
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex justify-between gap-4 pt-4">
            {/* Cancel */}
            <button
              type="button"
              onClick={() => {
                if (mode === "edit") {
                  window.history.back();
                } else {
                  
                  window.location.href = "/events";
                }
              }}
              className="w-1/2 bg-gray-200 text-gray-800 py-4 rounded-md hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>

            {/* Save */}
            <button
              type="submit"
              className="w-1/2 bg-amber-600 text-white py-4 rounded-md hover:bg-amber-700 transition-colors font-semibold"
            >
              {mode === "edit" ? "Save Changes" : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
