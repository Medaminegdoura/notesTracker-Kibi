import { useState } from "react";
import "./App.css";
import NoteInput from "./components/noteInput";
import NoteItem from "./components/noteItem";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
function App() {
  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useLocalStorageState([], "notes");
  const submitHandler = (newNote) => {
    console.log(newNote);
    setNotes((prev) => [newNote, ...prev]);
  };
  const deleteHandler = (id) => {
    setNotes((prev) => {
      return prev.filter((note) => note.id != id);
    });
  };
  const editHandler = (note) => {
    setNotes((prev) => {
      return prev.map((el) => {
        if (el.id == note.id) {
          return note;
        }
        return el;
      });
    });
  };
  return (
    <>
      <div>
        <NoteInput onSubmit={submitHandler} />
      </div>
      <main>
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={deleteHandler}
            onEdit={editHandler}
          />
        ))}
      </main>
    </>
  );
}

export default App;
