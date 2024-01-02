import React, { useContext } from 'react'
// import React, { useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
const a = useContext(noteContext)
 
//  useEffect(()=> {
//     a.update();
//     // eslint-disable-next-line 
// }, [])

  return (
    <div>
      This is a About {a.name} and he is class {a.class}
    
    </div>
  )
}

export default About
