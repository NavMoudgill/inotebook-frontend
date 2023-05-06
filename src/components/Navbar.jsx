import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import userC from "../contexts/UsersContext";
import notesC from "../contexts/NotesContext";
import { IoHome } from "react-icons/io5";
const Navbar = () => {
  const { user, setUser } = useContext(userC);
  const context = useContext(notesC);
  const { handleSearch, setSearchWord } = context;
  const setChangeSearchWord = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <div
      className="position-sticky top-0 left-0 navbarHeight"
      style={{
        width: "100%",
        zIndex: "1",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbarHeight">
        <div className="container-fluid twoDivsOfNavbar">
          <div className="d-flex justify-content-center align-items-center marginBottomFirstDivNavabr">
            <li className="nav-item">
              <Link className="navbar-brand" to="/">
                iNotebook
              </Link>
            </li>
            <Link to="/">
              <IoHome size="1.5rem" color="white" />
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            {user ? (
              <>
                <input
                  className="me-2 p-1 rounded"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={setChangeSearchWord}
                />
                <button
                  className="btn btn-outline-success"
                  type="submit"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <Link
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    setUser(null);
                    localStorage.clear();
                  }}
                  role="button"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link className="btn btn-primary " to="/signUp" role="button">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <Alert />
    </div>
  );
};

export default Navbar;
