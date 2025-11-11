"use client";

import { useState, useActionState } from "react";
import saveEvent, { EventFormState } from "@/app/actions/save-event";
import updateEvent from "@/app/actions/update-event";
import Artist from "@/app/types/Artist";
import AddedArtist from "./added-artist";
import EditedArtist from "./edited-artist";
import { Trash2 } from "lucide-react";

type Props = {
  mode: "create" | "edit";
  eventData?: any;
  artistsData?: Artist[];
};

export default function EventForm({
  mode,
  eventData,
  artistsData = [],
}: Props) {
  // 🎤 управление артистами
  const [artistArray, setArtistArray] = useState<Artist[]>(artistsData);
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

  // 🧠 контролируемая форма
  const [formValues, setFormValues] = useState({
    title: eventData?.title || "",
    image: eventData?.image || "",
    description: eventData?.description || "",
    place: eventData?.place || "",
    datetime: eventData?.datetime
      ? new Date(eventData.datetime).toISOString().slice(0, 16)
      : "",
    price: eventData?.price || "",
    email: eventData?.email || "",
    phone: eventData?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDeleteArtist = (index: number) => {
    setArtistArray((prev) => prev.filter((_, i) => i !== index));
  };

  const action = mode === "edit" ? updateEvent : saveEvent;
  const [state, formAction] = useActionState<EventFormState, FormData>(action, {
    errors: {},
  });

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          {mode === "edit" ? "Edit Event" : "Create New Event"}
        </h2>

        <form action={formAction} className="space-y-6">
          {mode === "edit" && (
            <input type="hidden" name="id" value={eventData?.id} />
          )}

          <input
            type="hidden"
            name="artistsArray"
            value={JSON.stringify(artistArray)}
          />

          {/* Title */}
          <div>
            <input
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Event title"
              type="text"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.title && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <input
              name="image"
              value={formValues.image}
              onChange={handleChange}
              placeholder="Image URL"
              type="text"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.image && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.image[0]}
              </p>
            )}
            {formValues.image && (
              <div className="flex justify-center mt-4">
                <img
                  src={formValues.image}
                  alt="Event preview"
                  className="w-72 h-72 object-cover rounded-md border"
                />
              </div>
            )}
          </div>

          {/* Artists */}
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
                  className="relative p-4 bg-amber-50 rounded-md transition group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => handleEditArtist(index)}
                      title="Edit artist"
                    >
                      <AddedArtist artist={a} />
                    </div>
                    <button
                      type="button"
                      className="ml-2 p-1 rounded hover:bg-red-100 transition"
                      title="Delete artist"
                      onClick={() => handleDeleteArtist(index)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500 group-hover:text-red-700 transition" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Description */}
          <div>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Describe your event"
              rows={4}
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.description && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.description[0]}
              </p>
            )}
          </div>

          {/* Place */}
          <div>
            <input
              name="place"
              value={formValues.place}
              onChange={handleChange}
              placeholder="Place"
              type="text"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.place && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.place[0]}
              </p>
            )}
          </div>

          {/* Datetime */}
          <div>
            <input
              name="datetime"
              type="datetime-local"
              value={formValues.datetime}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.datetime && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.datetime[0]}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <input
              name="price"
              value={formValues.price}
              onChange={handleChange}
              placeholder="Price"
              type="number"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.price && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.price[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              name="email"
              value={formValues.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              name="phone"
              value={formValues.phone}
              onChange={handleChange}
              placeholder="Phone"
              type="tel"
              className="w-full p-3 border rounded-md"
            />
            {state.errors?.phone && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.phone[0]}
              </p>
            )}
          </div>

          {/* Общая ошибка */}
          {state.errors?._form && (
            <p className="text-red-600 text-center">{state.errors._form[0]}</p>
          )}

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                if (mode === "edit") window.history.back();
                else window.location.href = "/events";
              }}
              className="w-1/2 bg-gray-200 text-gray-800 py-4 rounded-md hover:bg-gray-300 transition-colors font-semibold"
            >
              Cancel
            </button>

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
