import React, { useContext, useMemo, useState } from "react";
import notesC from "../contexts/NotesContext";
const NotesItem = (props) => {
  const { notey } = props;
  const context = useContext(notesC);
  const { deleteNote, handleUpdateClick, modifyCurrentId, abilitaAlert, ids } =
    context;
  const [count, setcount] = useState(0);
  const handleDeleteClick = () => {
    let type, message;
    setcount(count + 1);
    deleteNote(notey._id)
      .then(() => {
        type = "success";
        message = "Deleted successfully";
        abilitaAlert(message, type);
      })
      .catch(() => {
        type = "danger";
        message = "Deleted not successfully";
        abilitaAlert(message, type);
      });
  };
  const isItemsSelected = useMemo(() => {
    return ids?.includes(notey._id);
  }, [ids, notey._id]);

  return (
    // to do-giving width and height fixed to the cards
    <div className=" my-2 col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 col-xxl-3">
      <div
        className="card "
        style={{ height: "13rem", minWidth: "13rem", minHeight: "13rem" }}
      >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5
              className={`card-title me-3 ${
                isItemsSelected ? "bg-warning" : ""
              }`}
            >
              {notey?.title?.slice(0, 20)}
            </h5>
            <i
              id="delete"
              onClick={handleDeleteClick}
              className="fa-sharp fa-solid fa-trash me-3"
              style={{ color: "#060b13" }}
            ></i>
            <i
              onClick={() => {
                handleUpdateClick();
                modifyCurrentId(notey._id);
              }}
              className="fa-solid fa-pen-to-square"
              style={{ color: "#060b13" }}
            ></i>
          </div>
          <p className="card-text">{notey?.description?.slice(0, 100)}</p>
          <p className="card-text">{notey?.tag}</p>

          <a href="/" className="btn btn-primary">
            More Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
