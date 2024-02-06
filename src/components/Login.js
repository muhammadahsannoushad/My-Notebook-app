import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({email: "", password: ""})
  let history = useNavigate()

  const handleSubmit = async (e)=> {
     e.preventDefault();
    //  history('/'); 
    const response = await  fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzhiMTYzM2FiYzE0OWM2NjRjNzQ5In0sImlhdCI6MTcwMzc4ODI0N30.JNOguhqtzuup-0GtdJN3I5qguyGWvBTEIm6vGV8J2tc" 
          
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
        console.log(json);
       if (json.success) {
         // Save the auth token and redirect home page
           localStorage.setItem('token', json.authtoken);
           history('/');
       } else {
          alert("Invalid credentials")
       }
       
    }

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
        
    }

   return (
     
    <div className='container' style={{height: "400px", width: "400px"}} >
     <div> 
     <form onSubmit={handleSubmit}>
      <h3 style={{textAlign: "center"}}>Sign In</h3>
      <div className="mb-3">
        <label htmlFor="email">Email address</label>
        <input type="email" id='email' name='email' value={credentials.email} className="form-control" onChange={onChange} placeholder="Enter email"/>
      </div>
      <div className="mb-3">
        <label htmlFor='password'>Password</label>
        <input type="current-password" id='password' name='password' value={credentials.password} className="form-control" onChange={onChange} placeholder="Enter password"/>
      </div>
      
      <button type="submit" className="btn btn-primary">Submit</button>
       {/* <p className="forgot-password text-right">
         Forgot <a href="#">password?</a>
       </p> */}
    </form>
    </div> 
  </div>    

  )
}

export default Login
