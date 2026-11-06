import { MapPin, Clock, Trash2 } from "lucide-react";

const ActivityCard = ({ activity, onDelete, onEdit }) => {
  return (
    <div className="activity-card">
      <div className="activity-info">
        <span className="activity-category">
          {activity.category}
        </span>

        <h3>{activity.title}</h3>

        <p>{activity.description}</p>

        <div className="activity-details">
          <span>
            <MapPin size={15} />
            {activity.location || "Location not specified"}
          </span>

          <span>
            <Clock size={15} />
            {activity.time || "Time not specified"}
          </span>
        </div>
      </div>

      <div className="activity-actions">
        <button onClick={() => onEdit(activity)}>
          Edit
        </button>

        <button onClick={() => onDelete(activity._id)}>
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;