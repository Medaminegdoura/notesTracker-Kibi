import { useRef, useState } from "react";
import st from "./NoteInput.module.css";

function NoteInput({ onSubmit }) {
  const title = useRef("");
  const description = useRef("");
  const image = useRef("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);
        const file = image.current.files[0];
        const reader = new FileReader();
        let imageData;
        const newNote = {
          id: Date.now(),
          title: title.current.value,
          description: description.current.value,
          //   img: image.current.files[0],
          createdAt: new Date(),
        };
        reader.onload = () => {
          imageData = reader.result;
          newNote.imageData = imageData;
          onSubmit(newNote);
          //   setImage(imageData);
        };
        image.current.value = "";

        title.current.value = "";

        description.current.value = "";

        if (file) {
          reader.readAsDataURL(file);
        } else {
          onSubmit(newNote);
        }
      }}
      className={`${st["form"]}`}
    >
      <input
        type="text"
        placeholder="Enter note title"
        className={`${st["title"]} ${st["border"]}`}
        ref={title}
      />

      <textarea
        wrap="hard"
        placeholder="Description"
        className={`${st["description"]} ${st["border"]}`}
        ref={description}
      />
      <div className={`${st["aligner"]}`}>
        <input type="file" accept="image/*" ref={image} />
        <button>Add Note</button>
      </div>
    </form>
  );
}

export default NoteInput;
