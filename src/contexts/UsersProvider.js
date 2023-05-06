import {
  storeUserLocal,
  getUserLocal,
  getTokenLocal,
} from "../Utils/authToken";
import UserC from "./UsersContext";
import { useState } from "react";
import React from "react";

const UsersProvider = (props) => {
  const host = "http://localhost:5001/app/";
  // controlling user login and logout
  const [user, setUser] = useState(() => {
    return getUserLocal("user") ? JSON.parse(getUserLocal("user")) : null;
  });

  const getUser = async () => {
    const url = `${host}auth/getuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": getTokenLocal("authT"),
      },
    });
    const json = await response.json();
    setUser(json);
    // store user in localStorage
    storeUserLocal(json);
  };

  return (
    <UserC.Provider
      value={{
        user,
        setUser,
        getUser,
      }}
    >
      {props.children}
    </UserC.Provider>
  );
};

export default UsersProvider;
