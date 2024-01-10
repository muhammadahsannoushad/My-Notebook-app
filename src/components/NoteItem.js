import React from 'react'

const NoteItem = (props) => {
    const { note } = props;
    return ( 
    
        <div className='col-md-3 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa fa-trash mx-2" style={{fontSize:"20px"}}></i>
                    <i className="fa fa-edit mx-2" style={{fontSize:"20px"}}></i>
                </div>
            </div>
        </div>   
    )
}

export default NoteItem

