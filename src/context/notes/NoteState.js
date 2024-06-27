import { useState } from "react";
import noteContext from "./NoteContext";

// import { json } from "react-router-dom";

const NoteState = (props)=>{
    // const state1 = {
    //     "name": "Ahmed",
    //     "class": "web Development"
    // }
    const host = "http://localhost:5000"
    const notesInitial = [
        // {
        //   "_id": "659064f6673a24a8d5a733bc1",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": "my title",
        //   "description": "please wake up early",
        //   "tag": "personal",
        //   "date": "2023-12-30T18:44:06.894Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "659072dcebea84235850ef223",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": "my title",
        //   "description": "please wake up early",
        //   "tag": "personal",
        //   "date": "2023-12-30T19:43:24.303Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "6590737aebea84235850ef242",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": "my title",
        //   "description": "please wake up early",
        //   "tag": "personal",
        //   "date": "2023-12-30T19:46:02.931Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "659073a9ebea84235850ef264",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": "my title",
        //   "description": "please wake up early",
        //   "tag": "personal",
        //   "date": "2023-12-30T19:46:49.125Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "6596e9323b96d9ff770974d05",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": "my Name is Ahsan khan",
        //   "description": "please wake up early good",
        //   "tag": "personal",
        //   "date": "2024-01-04T17:21:54.221Z",
        //   "__v": 0
        // }
      ]
     const [notes, setNotes] = useState(notesInitial)

      // Get all Notes
      const getAllNotes = async ()=>{
        
         // API Call fetch all Notes
         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json()
         console.log(json);
         setNotes(json)
      }

    // Add a Note
      const addNote = async (title, description, tag)=>{
        // TODO: api call
         // API Call
         const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        // promise error solve

       // const json = await response.json();
       // console.log(json);

        console.log("addig a new note");
        // const note = {
        //   "_id": "6596e9323b96d9ff770974d05",
        //   "user": "658c8b1633abc149c664c749",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2024-01-04T17:21:54.221Z",
        //   "__v": 0
        // };
        const note = await response.json();
         setNotes(notes.concat(note))
         console.log(note);
      }
    // Delete a Note
    const deleteNote = async (id)=>{
       // TODO: api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          }
          });
        const json = await response.json();
        console.log(json);
 
      console.log("deleting the note with id" + id);    
      const newNotes = notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes); 
    }
    // Edit a Note
    const editNote = async (id, title, description, tag)=>{
      // TODO api Call
      // API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      const json = await response.json(); 
      console.log(json);
       
      let newNotes = JSON.parse(JSON.stringify(notes))
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
      console.log(newNotes);
    }

   return(
    <noteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes }}>
       { props.children}
    </noteContext.Provider>
   )
}

export default NoteState;