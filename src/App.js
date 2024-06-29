import './App.css';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
   const [alert, setAlert] = useState(null);
   const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type       
  })
   setTimeout(() => {
     setAlert(null);
   }, 1500);
    
   }
  return (
  <> 
    <NoteState> 
     <Navbar/>
      {/* <Alert message="This is Amazing React Course"/> */}
       <Alert alert={alert}/>
       <Routes>    
         <Route path='/' Component={Home}showAlert={showAlert} />
       </Routes> 
          <Routes>    
           <Route path='/about' Component={About}/>
         </Routes>
         <Routes>    
           <Route path='/login' Component={Login}showAlert={showAlert} />
         </Routes>
         <Routes>    
           <Route path='/signup' Component={Signup}showAlert={showAlert} />
         </Routes> 
    </NoteState>  
  </>
  );
}

export default App;
