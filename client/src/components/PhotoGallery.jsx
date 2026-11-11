
import { Trash2, Camera } from "lucide-react";
import { SERVER_ROOT } from "../services/api";

const PhotoGallery = ({ media = [], onDelete }) => {
  if (media.length === 0) {
    return (
      <div className="empty-photo-gallery">
        <Camera size={35} />
        <h3>Your memories start here</h3>
        <p>Upload your first travel photo to create your album.</p>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
      {media.map((photo, index) => (
        <div
          className={`photo-card ${index === 0 ? "featured-photo" : ""}`}
          key={photo._id}
        >
          <img
            src={`${SERVER_ROOT}${photo.url}`}
            alt={photo.originalName || "Travel memory"}
          />

          <div className="photo-info">
            <p>{photo.originalName}</p>

            <button
              type="button"
              onClick={() => onDelete(photo._id)}
              aria-label="Delete photo"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;

