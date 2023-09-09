import { ConflictError, UnAuthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnAuthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(
        `request failed with status:` +
          response.status +
          "message:" +
          errorMessage
      );
    }
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    "https://cool-notes-app-lwl7.onrender.com/api/notes",
    {
      method: "Get",
      credentials: "include",
    }
  );
  return response.json();
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    "https://cool-notes-app-lwl7.onrender.com/api/notes",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `https://cool-notes-app-lwl7.onrender.com/api/notes/${noteId}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData(`https://cool-notes-app-lwl7.onrender.com/notes/${noteId}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export default fetchData;
