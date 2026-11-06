import { BookOpen, CalendarDays, Trash2 } from "lucide-react";
import { formatDate } from "../utils/dateUtils";

const JournalCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="journal-card">
      <div className="journal-icon">
        <BookOpen size={20} />
      </div>

      <div className="journal-content">
        <span className="journal-date">
          <CalendarDays size={14} />
          {formatDate(note.date)}
        </span>

        <h3>{note.title}</h3>

        <p>{note.content}</p>
      </div>

      <div className="journal-actions">
        <button onClick={() => onEdit(note)}>
          Edit
        </button>

        <button onClick={() => onDelete(note._id)}>
          <Trash2 size={15} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default JournalCard;