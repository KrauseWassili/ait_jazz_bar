"use client";
import Artist from "@/app/types/Artist";
import { useEffect, useState } from "react";

interface Props {
  artist: Artist | null;
  onSave: (artist: Artist) => void;
  onCancel: () => void;
}

export default function EditedArtist({ artist, onSave, onCancel }: Props) {
  const [artistName, setArtistName] = useState("");
  const [instrumentRole, setInstrumentRole] = useState("");
  const [artistImage, setArtistImage] = useState("");

  useEffect(() => {
    setArtistName(artist?.artistName || "");
    setInstrumentRole(artist?.instrumentRole || "");
    setArtistImage(artist?.artistImage || "");
  }, [artist]);

  function handleSave() {
    onSave({
      artistName,
      instrumentRole,
      artistImage,
    });
  }

  return (
    <div className="bg-amber-50 p-6 rounded-lg shadow-inner space-y-6 mb-4">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        {artist ? "Edit Artist" : "Add Artist"}
      </h3>

      <div className="space-y-4">
        <input
          placeholder="Artist name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          placeholder="Instrument or role"
          value={instrumentRole}
          onChange={(e) => setInstrumentRole(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          placeholder="Artist image URL"
          value={artistImage}
          onChange={(e) => setArtistImage(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        {artistImage && (
          <div className="flex justify-center">
            <img
              src={artistImage}
              alt="Artist preview"
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: "0.5rem",
                border: "1px solid #e2e8f0",
              }}
            />
          </div>
        )}

        <div className="flex justify-between gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!artistName || !instrumentRole}
            className={`flex-1 py-3 rounded-md font-semibold transition-colors ${
              !artistName || !instrumentRole
                ? "bg-amber-200 text-white cursor-not-allowed"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            {artist ? "Save Changes" : "Save Artist"}
          </button>
        </div>
      </div>
    </div>
  );
}
