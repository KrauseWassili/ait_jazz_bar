import Artist from "@/app/types/Artist";
import { useEffect, useState } from "react";



interface Props {
  value: Artist[];
  onChange: (artists: Artist[]) => void;
}

export default function NewArtist({ value, onChange }: Props) {
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
    <div>
      <h2>Artist</h2>
      <input
        placeholder="name"
        name="artistName"
        type="text"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <input
        placeholder="instrument_role"
        name="instrumentRole"
        type="text"
        value={instrumentRole}
        onChange={(e) => setInstrumentRole(e.target.value)}
      />
      <input
        placeholder="image"
        name="artistImage"
        type="text"
        value={artistImage}
        onChange={(e) => setArtistImage(e.target.value)}
      />
      <button type="button" onClick={addArtistToArray}>
        Save
      </button>
    </div>
  );
}
