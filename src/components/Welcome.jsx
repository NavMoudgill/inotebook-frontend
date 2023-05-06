import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navLogin = useNavigate();
  return (
    <div className="backgroundHeight bg-gradient d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center welcomeModal">
        <h1>Welcome to iNotebook</h1>
        <p>Feel free to store your notes</p>
        <h3>Anywhere & Anytime</h3>
        <BsPencilSquare
          size="3rem"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navLogin("/login");
          }}
        />
      </div>
    </div>
  );
};

export default Welcome;
