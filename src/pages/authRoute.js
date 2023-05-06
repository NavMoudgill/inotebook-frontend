import React, { useContext, useEffect } from "react";
import userC from "../contexts/UsersContext";
import { useNavigate } from "react-router-dom";
const AuthRoute = (props) => {
  const { Children } = props;
  const { user } = useContext(userC);
  const nav = useNavigate();
  useEffect(() => {
    if (!user) {
      nav("/welcome");
      return;
    }
  }, [user, nav]);
  return <>{Children}</>;
};

export default AuthRoute;
