
import { useState } from "react";
import { uploadMedia } from "../services/mediaService";
import { Camera, CalendarDays, MapPin, Upload } from "lucide-react";

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
      <div className="photo-upload-heading">
        <Camera size={22} />
        <h3>Upload Travel Photo</h3>
      </div>

      <div className="photo-upload-grid">
        <div className="photo-field">
          <label>Choose Photo</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          {file && <small>{file.name}</small>}
        </div>

        <div className="photo-field">
          <label>
            <CalendarDays size={15} /> Travel Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="photo-field">
          <label>
            <MapPin size={15} /> Related Activity
          </label>
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
        </div>

        <button
          type="submit"
          className="photo-upload-btn"
          disabled={loading}
        >
          <Upload size={17} />
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default PhotoUpload;
