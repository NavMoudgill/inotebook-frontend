/* eslint-disable */
import React, { useEffect } from "react";
import NotesItem from "./NotesItem";
import notesC from "../contexts/NotesContext";
import { useContext } from "react";
import AddNote from "./AddNote";
import userContext from "../contexts/UsersContext";
const Notes = () => {
  const { user } = useContext(userContext);
  const context = useContext(notesC);
  const { notes, getNotes } = context;

  useEffect(() => {
    if (!user) return;
    getNotes();
  }, []);

  return (
    <div className="row">
      <AddNote />
      <hr />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2 style={{ padding: "16px 16px 0px 0px" }}>Your notes</h2>

        <div className="row justify-content-center">
          {notes.map((element) => {
            return <NotesItem key={element._id} notey={element} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
