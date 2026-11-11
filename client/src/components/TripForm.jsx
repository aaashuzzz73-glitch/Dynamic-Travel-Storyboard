
import { useState } from "react";
import { MapPin, CalendarDays, FileText, Plane } from "lucide-react";

const TripForm = ({
  onSubmit,
  initialData = {},
  buttonText = "Create Trip",
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    tripName: initialData.tripName || "",
    destinations: initialData.destinations?.join(", ") || "",
    startDate: initialData.startDate?.slice(0, 10) || "",
    endDate: initialData.endDate?.slice(0, 10) || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      destinations: formData.destinations
        .split(",")
        .map((place) => place.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="trip-form premium-trip-form">

      <div className="form-group">
        <label>
          <Plane size={16} /> Trip Name
        </label>
        <input
          name="tripName"
          value={formData.tripName}
          onChange={handleChange}
          placeholder="Eg: My Kerala Vacation"
          required
        />
      </div>

      <div className="form-group">
        <label>
          <MapPin size={16} /> Destinations
        </label>
        <input
          name="destinations"
          value={formData.destinations}
          onChange={handleChange}
          placeholder="Munnar, Alleppey, Wayanad"
          required
        />
        <small>Separate multiple destinations using commas.</small>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            <CalendarDays size={16} /> Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <CalendarDays size={16} /> End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            min={formData.startDate}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>
          <FileText size={16} /> Trip Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="What are you planning for this journey?"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="travel-create-btn"
        disabled={loading}
      >
        {loading ? "Creating your trip..." : `✈ ${buttonText}`}
      </button>
    </form>
  );
};

export default TripForm;
