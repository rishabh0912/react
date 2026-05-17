import React, { useState } from "react";
import noteContext from "./noteContext";

// const NoteState = (props) => {
//     const s1 = {
//         "name": "Rishabh Tandon",
//         "class": "B.Tech CSE 2021-2025"
//     }
//     const [state, setState] = useState(s1);
//     const update = () => {
//         setTimeout(() => {
//             setState({
//                 "name": "Shubhanshi Dhawan",
//                 "class": "B.Com Hons 2021-2024"
//             })
//         }, 1000);
//     }
const NoteState = (props) => {
    const host = "http://localhost:5001";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        console.log("Fetching all notes with token " + localStorage.getItem('token'));
        const json = await response.json();
        setNotes(json);
    };    
    
    // add a note
    const addNote = async (title, description, tag) => {
        // TODO - API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // const json = await response.json();

        //
        console.log("Adding a new note");
        const savedNote = await response.json();
        setNotes(notes.concat(savedNote))
    }

    // delete a note
    const deleteNote = async (id) => {
        // TODO - API Call
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });        
        console.log("Deleting the note with id " + id);
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {

        await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // const json = await response.json();
        
        const newNotes = JSON.parse(JSON.stringify(notes));
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{notes, getNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;