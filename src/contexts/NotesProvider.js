import { getTokenLocal, getUserLocal } from "../Utils/authToken";
import NotesC from "./NotesContext";
import { useState } from "react";
const NotesProvider = (props) => {
  const host = "http://localhost:5001/app/";

  // controlling alert
  const [alert, setAlert] = useState({ message: "", type: "" });
  const abilitaAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  // get all notes from backend database
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    // api call
    const url = `${host}notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "auth-token": getTokenLocal("authT"),
      },
    });
    const json = await response.json();
    setNotes(json?.notes);
  };

  // add a note
  const addNote = async (title, description, tag) => {
    // api call
    const url = `${host}notes/createnotes`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getTokenLocal("authT"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newElem = {
      title: title,
      description: description,
      tag: tag,
      userid: getUserLocal("user")._id,
    };
    setNotes((previousValue) => {
      return [...previousValue, newElem];
    });
  };
  // delete a notee
  const deleteNote = async (id) => {
    // api call

    const url = `${host}notes/deletenote/${id}`;
    await fetch(url, {
      method: "DELETE",
      headers: {
        "auth-token": getTokenLocal("authT"),
      },
    });

    // console.log("deleteting the note with id", id);
    const newNotes = notes.filter((element) => {
      return element._id !== id;
    });
    setNotes(newNotes);
  };

  const [isModal, setIsModal] = useState(false);
  const handleUpdateClick = () => {
    setIsModal(!isModal);
  };
  const [currentId, setCurrentId] = useState("");
  //   first graffas for props,then value takes only one object so we pass object person
  const modifyCurrentId = (id) => {
    setCurrentId(id);
  };
  // edit a note
  const updateNote = async (index, tit, descr, tag, currentNoteId) => {
    // api call
    const url = `${host}notes/updatenote/${currentId}`;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": getTokenLocal("authT"),
      },

      body: JSON.stringify({ title: tit, description: descr, tag: tag }),
    });
    // console.log("update the note with id", currentId);
    notes[index].title = tit;
    notes[index].description = descr;
    notes[index].tag = tag;
  };
  const [searchWord, setSearchWord] = useState("");
  const [ids, setIds] = useState([]);
  const handleSearch = () => {
    // this for search
    const titlesSearched = notes.filter((elem) => {
      return elem.title?.includes(searchWord);
    });
    if (titlesSearched.length === 0) {
      alert("No note found");
    }
    // to have titles
    const ids = titlesSearched.map((elem) => {
      return elem._id;
    });
    const idsArray = ids.filter((elem) => {
      return notes.map((elem2) => {
        return elem2._id === elem;
      });
    });
    if (idsArray) {
      setIds(idsArray);
    }
  };
  // if key is matched with our keys then change the style so write in jsx fragment
  return (
    <NotesC.Provider
      value={{
        alert,
        abilitaAlert,
        notes,
        setNotes,
        addNote,
        deleteNote,
        updateNote,
        isModal,
        setIsModal,
        handleUpdateClick,
        currentId,
        modifyCurrentId,
        getNotes,
        setSearchWord,
        handleSearch,
        ids,
      }}
    >
      {props.children}
    </NotesC.Provider>
  );
};
export default NotesProvider;
