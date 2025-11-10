"use client";
import Artist from "@/app/types/Artist";
import { useState } from "react";

interface Props {
  value: Artist[];
  onChange: (artists: Artist[]) => void;
}

export default function EditedArtist({ value, onChange }: Props) {
  const [artistName, setArtistName] = useState("");
  const [instrumentRole, setInstrumentRole] = useState("");
  const [artistImage, setArtistImage] = useState("");

  function addArtistToArray() {
    const newArtist = { artistName, instrumentRole, artistImage };
    onChange([...value, newArtist]);
    setArtistName("");
    setInstrumentRole("");
    setArtistImage("");
  }

  return (
    <div className="bg-amber-50 p-6 rounded-lg shadow-inner space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800 text-center">
        Add Artist
      </h3>

      <div className="space-y-4">
        <input
          name="artistName"
          placeholder="Artist name"
          type="text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          name="instrumentRole"
          placeholder="Instrument or role"
          type="text"
          value={instrumentRole}
          onChange={(e) => setInstrumentRole(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <input
          name="artistImage"
          placeholder="Artist image URL"
          type="text"
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
                width: 300,
                height: 300,
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
            onClick={() => onChange(value)}
            className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={addArtistToArray}
            disabled={!artistName || !instrumentRole}
            className={`flex-1 py-3 rounded-md font-semibold transition-colors ${
              !artistName || !instrumentRole
                ? "bg-amber-200 text-white cursor-not-allowed"
                : "bg-amber-600 text-white hover:bg-amber-700"
            }`}
          >
            Save Artist
          </button>
        </div>
      </div>
    </div>
  );
}
