import { useState } from "react";
import { uploadMedia } from "../services/mediaService";

const PhotoUpload = ({ tripId, activities = [], onUpload }) => {
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a photo.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("photo", file);
      formData.append("date", date);

      if (activity) {
        formData.append("activity", activity);
      }

      await uploadMedia(tripId, formData);

      setFile(null);
      setDate("");
      setActivity("");

      e.target.reset();
      onUpload?.();
    } catch (err) {
      setError(err.response?.data?.message || "Photo upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="photo-upload">
      <h3>Upload Travel Photo</h3>

      <label>Choose Photo</label>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />

      <label>Travel Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <label>Related Activity</label>
      <select
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      >
        <option value="">No specific activity</option>

        {activities.map((item) => (
          <option key={item._id} value={item._id}>
            {item.title}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload Photo"}
      </button>
    </form>
  );
};

export default PhotoUpload;