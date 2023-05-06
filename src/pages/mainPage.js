import React, { useContext, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ModalUpdate from "../components/ModalUpdate";
import noteC from "../contexts/NotesContext";

function App() {
  const { isModal, handleUpdateClick, notes } = useContext(noteC);
  const bodyOpacity = useRef(null);
  useEffect(() => {
    if (isModal) {
      bodyOpacity.current.style.opacity = "0.5";
    } else {
      bodyOpacity.current.style.opacity = "1";
    }
  }, [isModal]);

  return (
    <>
      <div ref={bodyOpacity}>
        <Navbar />
        <Outlet />
      </div>
      {isModal && (
        <ModalUpdate notes={notes} handleUpdateClick={handleUpdateClick} />
      )}
    </>
  );
}

export default App;
