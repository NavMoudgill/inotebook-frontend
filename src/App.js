import "./App.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing-config";
import NotesProvider from "./contexts/NotesProvider";
import UsersProvider from "./contexts/UsersProvider";
import "./index.css";
function App() {
  return (
    <NotesProvider>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </NotesProvider>
  );
}

export default App;
