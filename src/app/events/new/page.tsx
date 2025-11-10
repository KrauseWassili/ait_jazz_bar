"use client";
import createEvent from "../../actions/create-event";
import { useState } from "react";
import EditedArtist from "@/components/edited-artist";
import Artist from "../../types/Artist";
import AddedArtist from "@/components/added-artist";

const NewEvent = () => {
  const [artistArray, setArtistArray] = useState<Artist[]>([]);
  const [showArtistForm, setShowArtistForm] = useState(false);
  const [eventImageUrl, setEventImageUrl] = useState("");
  const [editingArtistIndex, setEditingArtistIndex] = useState<number | null>(
    null
  );

  const handleEditArtist = (index: number) => {
    setEditingArtistIndex(index);
    setShowArtistForm(true);
  };

  const handleSaveEditedArtist = (updatedArtist: Artist) => {
    if (editingArtistIndex !== null) {
      const updatedArray = [...artistArray];
      updatedArray[editingArtistIndex] = updatedArtist;
      setArtistArray(updatedArray);
      setEditingArtistIndex(null);
      setShowArtistForm(false);
    }
  };

  const handleAddNewArtist = (newArray: Artist[]) => {
    setArtistArray(newArray);
    setShowArtistForm(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create New Event
        </h2>

        <form action={createEvent} className="space-y-6">
          <input
            type="hidden"
            name="artistsArray"
            value={JSON.stringify(artistArray)}
          />

          <div className="space-y-4">
            <input
              name="title"
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

            {!showArtistForm ? (
              <button
                type="button"
                onClick={() => setShowArtistForm(true)}
                className="w-full bg-amber-600 text-white py-3 rounded-md hover:bg-amber-700 transition-colors"
              >
                Add Artist
              </button>
            ) : (
              <EditedArtist
                value={artistArray}
                onChange={(newArray) => {
                  setArtistArray(newArray);
                  setShowArtistForm(false);
                }}
              />
            )}

            {artistArray.length > 0 && (
              <ul className="space-y-4">
                {artistArray.map((a) => (
                  <li
                    key={a.id}
                    className="p-4 bg-amber-50 rounded-md"
                    onClick={() => handleEditArtist(a.id)}
                  >
                    <AddedArtist artist={a} />
                  </li>
                ))}
              </ul>
            )}

            <textarea
              name="description"
              placeholder="Describe your event"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="place"
              placeholder="Place"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              type="datetime-local"
              name="datetime"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="price"
              placeholder="Price"
              type="number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="email"
              placeholder="Email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />

            <input
              name="phone"
              placeholder="Phone"
              type="tel"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-4 rounded-md hover:bg-amber-700 transition-colors font-semibold"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
