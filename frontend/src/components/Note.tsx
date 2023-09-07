import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";

interface NoteProps {
  onNoteClick: (note: NoteModel) => void;
  note: NoteModel;
  className?: string;
  onDeleteNoteClick: (note: NoteModel) => void;
}

const Note = ({
  note,
  className,
  onDeleteNoteClick,
  onNoteClick,
}: NoteProps) => {
  const { text, title, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "updatedAt " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "CreatedAt " + formatDate(createdAt);
  }
  return (
    <Card
      className={`${styles.noteCard} ${className}`}
      onClick={() => onNoteClick(note)}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e: React.MouseEvent) => {
              onDeleteNoteClick(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Note;
