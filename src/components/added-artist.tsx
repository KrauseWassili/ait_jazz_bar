import Artist from "@/app/types/Artist";

interface Props {
    artist: Artist;
}

export default function AddedArtist({artist} : Props) {
  return (
    <div className="flex items-center gap-4">
                      {artist.artistImage && (
                        <img
                          src={artist.artistImage}
                          alt={artist.artistName}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{artist.artistName}</p>
                        <p className="text-gray-600">{artist.instrumentRole}</p>
                      </div>
                    </div>
  )
}
