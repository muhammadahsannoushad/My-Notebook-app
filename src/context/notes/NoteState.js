import noteContext from "./NoteContext";

const NoteState = (props)=>{
    const state1 = {
        "name": "Ahmed",
        "class": "web Development"
    }
   
     
   return(
    <noteContext.Provider value={state1}>
       { props.children}
    </noteContext.Provider>
   )
}

export default NoteState;