import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host ="http://localhost:5000";
const notesInitial =[]

const [notes , setNotes ]  = useState(notesInitial)

//Get all Notes 
const getNotes = async ()=>{
   //API Call 

   const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = await response.json();
  console.log (json)
  setNotes(json);
}
//Add a Note
const addNote = async (title , description , tag)=>{
  //TODO: API Call
   //API Call 

   const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    },
    body: JSON.stringify({title , description ,tag}), 
  });
const note = await response.json();
setNotes(notes.concat(note))
}
//Delete a Note 
const deleteNote = async (id)=>{
  // const deleteNote = async (id , title , description , tag)=>{
    //API Call 
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json(); 
    console.log(json)
  const newNotes = notes.filter((note)=>{return note._id!==id})
 setNotes(newNotes)
}
// Edit a Note
const editNote = async (id, title, description, tag) => {
  // API Call
  const authToken = localStorage.getItem('token')
  

  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authToken,
    },
    body: JSON.stringify({ title, description, tag }),
  });

  const json = await response.json();
  console.log(json);

  // Logic to edit in client
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note._id === id
        ? {
            ...note,
            title: title,
            description: description,
            tag: tag,
          }
        : note
    )
  );
};


  return (
    <NoteContext.Provider value={{notes , addNote , deleteNote , editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
  };
export default NoteState;
