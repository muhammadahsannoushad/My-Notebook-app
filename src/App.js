import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
  <> 
    <NoteState> 
     <Navbar/>
      <Alert message="This is Amazing React Course"/>
       <Routes>    
         <Route path='/' Component={Home}/>
       </Routes> 
          <Routes>    
           <Route path='/about' Component={About}/>
         </Routes> 
    </NoteState>  
  </>
  );
}

export default App;
