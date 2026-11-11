
import { useEffect, useState } from "react";

import { getAllTrips } from "../services/tripService";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../services/noteservice";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JournalCard from "../components/JournalCard";

const emptyForm = {
  tripId: "",
  date: "",
  title: "",
  content: "",
};

const Journal = () => {
  const [notes, setNotes] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [editingNote, setEditingNote] = useState(null);

  const [form, setForm] = useState(emptyForm);

  // FETCH TRIPS AND JOURNAL ENTRIES
  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError("");

      const tripData = await getAllTrips();

      const tripList = Array.isArray(tripData)
        ? tripData
        : Array.isArray(tripData?.trips)
        ? tripData.trips
        : Array.isArray(tripData?.data?.trips)
        ? tripData.data.trips
        : Array.isArray(tripData?.data)
        ? tripData.data
        : [];

      setTrips(tripList);

      const results = await Promise.all(
        tripList.map(async (trip) => {
          const data = await getNotes(trip._id);

          const list = Array.isArray(data)
            ? data
            : Array.isArray(data?.notes)
            ? data.notes
            : Array.isArray(data?.data?.notes)
            ? data.data.notes
            : [];

          return list.map((note) => ({
            ...note,
            tripId: trip._id,
            tripName: trip.tripName,
          }));
        })
      );

      setNotes(results.flat());
    } catch (err) {
      console.error("Journal loading error:", err);
      setError(
        err.response?.data?.message ||
        "Unable to load journal entries."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // FORM INPUT CHANGE
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // EDIT JOURNAL ENTRY
  const handleEdit = (note) => {
    setEditingNote(note);

    setForm({
      tripId: note.tripId,
      date: note.date
        ? new Date(note.date).toISOString().slice(0, 10)
        : "",
      title: note.title || "",
      content: note.content || "",
    });

    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingNote(null);
    setForm({ ...emptyForm });
    setError("");
  };

  // ADD OR UPDATE JOURNAL ENTRY
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.tripId) {
      setError("Please select a trip.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const { tripId, ...noteData } = form;

      if (editingNote) {
        await updateNote(
          editingNote.tripId,
          editingNote._id,
          noteData
        );
      } else {
        await createNote(tripId, noteData);
      }

      setEditingNote(null);
      setForm({ ...emptyForm });

      await fetchNotes();
    } catch (err) {
      console.error("Save journal error:", err);
      setError(
        err.response?.data?.message ||
        "Unable to save journal entry."
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE JOURNAL ENTRY
  const handleDelete = async (note) => {
    if (!window.confirm("Delete this journal entry?")) return;

    try {
      await deleteNote(note.tripId, note._id);

      setNotes((prev) =>
        prev.filter((item) => item._id !== note._id)
      );

      if (editingNote?._id === note._id) {
        handleCancelEdit();
      }
    } catch (err) {
      console.error("Delete journal error:", err);
      setError("Unable to delete journal entry.");
    }
  };

  return (
    <div className="app-layout travel-dashboard journal-page">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content premium-dashboard journal-content">

          {/* JOURNAL HERO */}
          <section className="journal-hero">
            <div>
              <span className="eyebrow">YOUR PERSONAL DIARY</span>
              <h1>My Travel Journal</h1>
              <p>
                Every destination leaves a memory.
                Capture your experiences, thoughts and special moments.
              </p>
            </div>

            <span className="journal-hero-icon">📖</span>
          </section>

          {error && (
            <p className="error-message">{error}</p>
          )}

          {/* ADD / EDIT JOURNAL */}
          <section className="journal-form-section">
            <div className="journal-section-heading">
              <div>
                <span className="eyebrow">
                  {editingNote ? "UPDATE YOUR MEMORY" : "PRESERVE YOUR MOMENTS"}
                </span>

                <h2>
                  {editingNote ? "Edit Journal Entry" : "Write a New Memory"}
                </h2>

                <p>
                  {editingNote
                    ? "Make changes to your saved travel memory."
                    : "Save the little moments that made your journey special."}
                </p>
              </div>

              <span className="journal-heading-icon">
                {editingNote ? "📝" : "✍️"}
              </span>
            </div>

            <form className="journal-form" onSubmit={handleSubmit}>
              <div className="journal-form-grid">

                <div className="journal-field">
                  <label>Select Trip</label>

                  <select
                    name="tripId"
                    value={form.tripId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a trip</option>

                    {trips.map((trip) => (
                      <option key={trip._id} value={trip._id}>
                        {trip.tripName || trip.destination || "Untitled Trip"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="journal-field">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="journal-field journal-full-width">
                  <label>Memory Title</label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Eg: A beautiful day in Munnar"
                    required
                  />
                </div>

                <div className="journal-field journal-full-width">
                  <label>Your Experience</label>

                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Write about your travel memories..."
                    rows="5"
                    required
                  />
                </div>

              </div>

              <div className="journal-form-actions">
                <button
                  type="submit"
                  className="journal-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingNote
                    ? "✦ Update Journal Entry"
                    : "✦ Save Journal Entry"}
                </button>

                {editingNote && (
                  <button
                    type="button"
                    className="journal-cancel-btn"
                    onClick={handleCancelEdit}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* SAVED MEMORIES */}
          <section className="journal-memories-section">
            <div className="journal-section-heading">
              <div>
                <span className="eyebrow">YOUR COLLECTION</span>
                <h2>My Memories</h2>
                <p>
                  All the beautiful moments from your journeys.
                </p>
              </div>

              <span className="journal-heading-icon">🌿</span>
            </div>

            {loading ? (
              <div className="journal-empty">
                <span>📖</span>
                <p>Loading your memories...</p>
              </div>
            ) : notes.length === 0 ? (
              <div className="journal-empty">
                <span>🌄</span>
                <h3>Your story begins here!</h3>
                <p>
                  Your saved travel memories will appear here.
                </p>
              </div>
            ) : (
              <div className="journal-list">
                {notes.map((note) => (
                  <article
                    className="journal-entry"
                    key={note._id}
                  >
                    <div className="journal-entry-trip">
                      <span>✈</span>
                      {note.tripName}
                    </div>

                    <JournalCard
                      note={note}
                      onEdit={handleEdit}
                      onDelete={() => handleDelete(note)}
                    />
                  </article>
                ))}
              </div>
            )}
          </section>

          <footer className="travel-footer">
            Every journey deserves to be remembered ✨
          </footer>

        </main>
      </div>
    </div>
  );
};

export default Journal;
