import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage";
import Home from "../components/Home";
import Login from "../components/Login";
import Welcome from "../components/Welcome";

import SignUp from "../components/SignUp";
import AuthRoute from "../pages/authRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        path: "/",
        element: <AuthRoute Children={<Home />} />,
      },
      {
        path: "/welcome",
        element: <Welcome />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
    ],
  },
]);
