import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
   const context = useContext(noteContext);
   const { deleteNote } = context
    const { note, updateNote } = props;
    return ( 
    
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">{note.tag}</p>
                    <i className="fa fa-trash mx-2" style={{fontSize:"18px"}} onClick={()=>deleteNote(note._id)}></i>
                    {/* <i className="fa fa-trash mx-2" style={{fontSize:"18px"}} onClick={()=>{deleteNote(note._id)}}></i> */}
                    <i className="fa fa-edit mx-2" style={{fontSize:"18px"}} onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>   
    )
}

export default NoteItem

