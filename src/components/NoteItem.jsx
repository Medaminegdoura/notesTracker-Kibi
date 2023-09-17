import st from "./NoteItem.module.css";
import logo from "./../assets/react.svg";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import TextExpander from "./TextExpander";
import { useRef, useState } from "react";
function NoteItem({ note, onDelete, onEdit }) {
  const [edit, setEdit] = useState(false);
  const title = useRef(null);
  const description = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      ...note,
      title: title.current.value,
      description: description.current.value,
    };
    setEdit(false);
    onEdit(newNote);
  };

  return (
    <div className={`${st["wrapper"]} ${edit ? st["edit"] : ""}`}>
      <div className={`${st["content"]}`}>
        {!edit ? (
          <>
            <h2>{note.title}</h2>
            <TextExpander
              className={"break-all"}
              withChar={true}
              expandButtonText="Read more"
              collapsedNumChars={50}
              buttonColor="#76b5c5"
            >
              {note.description}
            </TextExpander>{" "}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              ref={title}
              defaultValue={note.title}
              className={`${st["title"]} ${st["border"]}`}
            />
            <textarea
              wrap="hard"
              ref={description}
              defaultValue={note.description}
              className={`${st["description"]} ${st["border"]}`}
            />
            <button>Save</button>
          </form>
        )}
        <p>{note.createdAt.toLocaleString()}</p>
        <div>
          <PencilSquareIcon
            className={`${st["icon"]}`}
            onClick={() => {
              setEdit((prev) => !prev);
              //   onEdit(note);
            }}
          />
          <TrashIcon
            className={`${st["icon"]}`}
            onClick={() => {
              onDelete(note.id);
            }}
          />
        </div>
      </div>
      {note?.imageData && (
        <img src={note.imageData} className={`${st["img"]}`} alt="Uploaded" />
      )}
    </div>
  );
}

export default NoteItem;
