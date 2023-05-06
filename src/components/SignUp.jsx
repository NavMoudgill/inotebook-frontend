import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { storeTokenLocal } from "../Utils/authToken";
import userC from "../contexts/UsersContext";
import notesC from "../contexts/NotesContext";

const SignUp = () => {
  const { getUser } = useContext(userC);
  const { abilitaAlert } = useContext(notesC);

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  let navi = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5001/app/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const backendResponse = await response.json();
    let type = "",
      message = "";
    if (backendResponse.statusCode === 400) {
      if (backendResponse.newErrors) {
        let index = 0;
        backendResponse.newErrors.forEach((err) => {
          index++;
          type = "danger";
          message +=
            err.message +
            `${index < backendResponse.newErrors.length ? "," : ""}`;
        });
        abilitaAlert(message, type);
      } else {
        type = "danger";
        message = backendResponse.message;
        abilitaAlert(message, type);
      }
    } else {
      abilitaAlert((message = "Logged Successfull"), (type = "success"));
      storeTokenLocal(backendResponse.authToken);
      getUser();
      setTimeout(() => {
        navi("/");
      }, 1000);
    }
  };
  const onChangeF = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="backgroundHeight">
      <div className="container loginSignUpModal">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Username
            </label>
            <input
              onChange={onChangeF}
              autoComplete="current-username"
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={onChangeF}
              autoComplete="current-email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
            />
            <div className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={onChangeF}
              autoComplete="current-password"
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
