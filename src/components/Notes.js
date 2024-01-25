import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  useEffect(() => {
    getAllNotes()
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
  }

  const handleClick = (e)=>{
    console.log("Updating a new notes...", note);
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();

   
}
const onChange = (e)=>{
  setNote({...note, [e.target.name]: e.target.value})
    
}
   
  return (
    <>
      <AddNote />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Launch static backdrop modal
      </button>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* new modal for edit Note */}
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title :</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description :</label>
                  <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag :</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
                  {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      < div className='container'>
        <div className='row my-3'>
          <h2>your Notes </h2>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
