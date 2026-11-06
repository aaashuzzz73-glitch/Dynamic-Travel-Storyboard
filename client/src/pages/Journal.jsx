
import { useEffect, useState } from "react";

import { getAllTrips } from "../services/tripService";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../services/noteService";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JournalCard from "../components/JournalCard";

const Journal = () => {
  const [notes, setNotes] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    tripId: "",
    date: "",
    title: "",
    content: "",
  });

  const fetchNotes = async () => {
    try {
      const tripData = await getAllTrips();
      const tripList = tripData.trips || tripData;

      setTrips(tripList);

      const results = await Promise.all(
        tripList.map(async (trip) => {
          const data = await getNotes(trip._id);
          const list = data.notes || data;

          return list.map((note) => ({
            ...note,
            tripId: trip._id,
            tripName: trip.tripName,
          }));
        })
      );

      setNotes(results.flat());
    } catch (err) {
      setError("Unable to load journal entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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

      await createNote(tripId, noteData);

      setForm({
        tripId: "",
        date: "",
        title: "",
        content: "",
      });

      await fetchNotes();
    } catch (err) {
      setError("Unable to save journal entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (note) => {
    if (!window.confirm("Delete this journal entry?")) return;

    try {
      await deleteNote(note.tripId, note._id);

      setNotes((prev) =>
        prev.filter((item) => item._id !== note._id)
      );
    } catch (err) {
      setError("Unable to delete journal entry.");
    }
  };

  return (
    <div className="app-layout">
      <Navbar />

      <div className="dashboard-layout">
        <Sidebar />

        <main className="dashboard-content">
          <h1>My Travel Journal</h1>
          <p>Your memories, reflections and special moments.</p>

          <section className="trip-section">
            <h2>Add Journal Entry</h2>

            <form className="trip-form" onSubmit={handleSubmit}>
              <div className="form-group">
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
                      {trip.tripName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Eg: A beautiful day in Munnar"
                  required
                />
              </div>

              <div className="form-group">
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

              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Journal"}
              </button>
            </form>
          </section>

          {error && <p className="error-message">{error}</p>}

          <section className="trip-section">
            <h2>My Memories</h2>

            {loading ? (
              <p>Loading journal entries...</p>
            ) : notes.length === 0 ? (
              <div className="empty-state">
                <h3>No journal entries yet!</h3>
                <p>Your travel reflections will appear here.</p>
              </div>
            ) : (
              <div className="journal-list">
                {notes.map((note) => (
                  <div key={note._id}>
                    <p>Trip: {note.tripName}</p>
                    <JournalCard note={note} />
                    <button
                      type="button"
                      onClick={() => handleDelete(note)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Journal;
