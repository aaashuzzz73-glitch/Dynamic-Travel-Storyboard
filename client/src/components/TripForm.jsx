import { useState } from "react";

const TripForm = ({
  onSubmit,
  initialData = {},
  buttonText = "Create Trip",
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
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>{buttonText}</h2>

      <div className="form-group">
        <label>Trip Name</label>
        <input
          name="tripName"
          value={formData.tripName}
          onChange={handleChange}
          placeholder="Enter trip name"
          required
        />
      </div>

      <div className="form-group">
        <label>Destinations</label>
        <input
          name="destinations"
          value={formData.destinations}
          onChange={handleChange}
          placeholder="Munnar, Alleppey"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
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
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your trip..."
        />
      </div>

      <button type="submit" className="primary-btn">
        {buttonText}
      </button>
    </form>
  );
};

export default TripForm;