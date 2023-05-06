import React, { useContext, useState } from "react";
import noteC from "../contexts/NotesContext";
const ModalUpdate = ({ handleUpdateClick }) => {
  const { notes, updateNote, currentId, abilitaAlert, setIsModal } =
    useContext(noteC);

  const indexOfElement = notes.findIndex((elem) => elem._id === currentId);
  const [tit, setTit] = useState(notes[indexOfElement].title);
  const [descr, setDescr] = useState(notes[indexOfElement].description);
  const [tag, setTag] = useState(notes[indexOfElement].tag);

  const onChangeT = (e) => {
    setTit(e.target.value);
  };
  const onChangeD = (e) => {
    setDescr(e.target.value);
  };
  const onChangeTag = (e) => {
    setTag(e.target.value);
  };
  const handleUpdateChange = () => {
    let type, message;
    const currentNoteId = notes[indexOfElement]?._id;
    updateNote(indexOfElement, tit, descr, tag, currentNoteId)
      .then(() => {
        setIsModal(false);
        type = "success";
        message = "Update successfully";
        abilitaAlert(message, type);
      })
      .catch(() => {
        type = "danger";
        message = "Updated not successfully";
        abilitaAlert(message, type);
      });
  };
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="position-absolute z-index-1  top-0 left-0  d-flex justify-content-center align-items-center"
    >
      <div
        style={{
          backgroundColor: "whitesmoke",
        }}
        className="border-dark w-50 px-4 py-4 rounded-4"
      >
        <h1 className="modal-title fs-5">Update a note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            onChange={onChangeT}
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={tit}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            onChange={onChangeD}
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={descr}
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            onChange={onChangeTag}
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={tag}
          />
        </div>
        <button
          onClick={handleUpdateClick}
          type="button"
          className="btn btn-secondary"
        >
          Close
        </button>
        <button
          className="btn btn-primary my-3 mx-2"
          onClick={handleUpdateChange}
        >
          Update
        </button>{" "}
      </div>
    </div>
  );
};

export default ModalUpdate;
