import React, { useState, useContext } from "react";
import { storeTokenLocal } from "../Utils/authToken";
import userC from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";

import notesC from "../contexts/NotesContext";
const Login = () => {
  const { getUser } = useContext(userC);
  const { abilitaAlert } = useContext(notesC);

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navi = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `http://localhost:5001/app/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const backendResponse = await response.json();
    let type, message;
    if (backendResponse.statusCode === 400) {
      backendResponse.newErrors.forEach((err) => {
        type = "danger";
        message = err.message;

        abilitaAlert(message, type);
      });

      /* else {
        type = "danger";
        message = backendResponse.message;
        abilitaAlert(message, type);
      } */
    } else {
      abilitaAlert((message = "SignUp Successfull"), (type = "success"));
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
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              onChange={onChangeF}
              type="email"
              autoComplete="current-email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              onChange={onChangeF}
              type="password"
              autoComplete="current-password"
              className="form-control"
              id="exampleInputPassword1"
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

export default Login;
