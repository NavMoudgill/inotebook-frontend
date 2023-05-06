import React, { useState, useContext } from "react";
import notesC from "../contexts/NotesContext";
const AddNote = () => {
  const context = useContext(notesC);
  const { addNote, abilitaAlert } = context;
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleAddNote = (e) => {
    let type, message;
    e.preventDefault();
    addNote(newNote.title, newNote.description, newNote.tag)
      .then(() => {
        type = "success";
        message = "Note added successfully";
        abilitaAlert(message, type);
        setNewNote({
          title: "",
          description: "",
          tag: "",
        });
      })
      .catch(() => {
        type = "danger";
        message = "Note not added successfully";
        abilitaAlert(message, type);
      });
  };

  const onChangeF = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <h2>Add a note</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onChangeF}
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onChangeF}
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={newNote.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Tag
          </label>
          <input
            onChange={onChangeF}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={newNote.tag}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-3"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
