import { Trash2 } from "lucide-react";
import { SERVER_ROOT } from "../services/api";

const PhotoGallery = ({ media = [], onDelete }) => {
  if (media.length === 0) {
    return <p>No travel photos uploaded yet.</p>;
  }

  return (
    <div className="photo-gallery">
      {media.map((photo) => (
        <div className="photo-card" key={photo._id}>
          <img
            src={`${SERVER_ROOT}${photo.url}`}
            alt={photo.originalName}
          />

          <div className="photo-info">
            <p>{photo.originalName}</p>

            <button onClick={() => onDelete(photo._id)}>
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