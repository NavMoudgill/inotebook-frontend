import React, { useContext } from "react";
import notesC from "../contexts/NotesContext";
const Alert = () => {
  const context = useContext(notesC);

  const {
    alert = {
      type: "danger",
      message: "Something went wrong",
    },
  } = context;
  return (
    <div>
      <div
        className={`alert  py-0 my-0 alert-${alert?.type}  d-flex align-items-center`}
        role="alert"
        style={{
          height: "45px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="m-0">{alert?.message}</p>
      </div>
    </div>
  );
};

export default Alert;
