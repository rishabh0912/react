import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const Noteitem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const delNote = (e) => {
    console.log("Deleting the note with id " + note._id);
    e.preventDefault();
    deleteNote(note._id);
  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <span onClick={delNote}>
            <i className="fa-solid fa-trash-can mx-2"></i>
          </span>
          <span onClick={() => {updateNote(note)}}>
            <i className="fa-solid fa-pen-to-square mx-2"></i>          
          </span>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
