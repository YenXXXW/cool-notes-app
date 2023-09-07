import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import AddEditNoteDialouge from "./AddEditNoteDialouge";
import { Note as NoteModel } from "../models/note";
import styleUtils from "../styles/utils.module.css";
import * as NotesApi from "../network/notes_api";
import styles from "../styles/NotePage.module.css";
import Note from "./Note";

const NotesPageLoggedInView = () => {
  const [showNoteDialog, setShowNoteDialog] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [notesLoading, setNotesLoading] = useState(true);

  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => note._id !== existingNote._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []);

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            onNoteClick={setNoteToEdit}
            note={note}
            className={styles.note}
            onDeleteNoteClick={deleteNote}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowNoteDialog(true)}
      >
        <FaPlus />
        Add a note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? notesGrid : <p>You don't have any note yet</p>}</>
      )}
      {showNoteDialog && (
        <AddEditNoteDialouge
          onDismiss={() => setShowNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowNoteDialog(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNoteDialouge
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === noteToEdit._id ? updatedNote : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;
