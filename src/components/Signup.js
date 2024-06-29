import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  let history = useNavigate()

  const handleSubmit = async (e)=> {
     e.preventDefault();
    const {name, email, password} = credentials;     
    const response = await  fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YzhiMTYzM2FiYzE0OWM2NjRjNzQ5In0sImlhdCI6MTcwMzc4ODI0N30.JNOguhqtzuup-0GtdJN3I5qguyGWvBTEIm6vGV8J2tc" 
          
        },
        body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
        console.log(json);
       if (json.success) {
         // Save the auth token and redirect home page
           localStorage.setItem('token', json.authtoken);
           history('/');
           // new
        // props.showAlert("Account created Successfully" , "success")

       } else {
        // props.showAlert("Invalid Credentials" , "danger")
          alert("Invalid credentials")
        }
       
    }

    // "name": "ahmed11",
    // "email": "ahmed11@gmail.com",
    // "password": "12345678"

    const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
        
    }
  return (
    <div className='container' style={{height: "400px", width: "400px"}} >
      <form onSubmit={handleSubmit}>
        <h3 style={{textAlign: "center"}}>Sign Up</h3>
        <div className="mb-3">
          <label htmlFor='name'>Name</label>
          <input type="text" id='name'name='name' className="form-control"onChange={onChange} placeholder="First name"/>
        </div>
        <div className="mb-3">
          <label htmlFor='email'>Email address</label>
          <input type="email" id='email' name='email' className="form-control" onChange={onChange} placeholder="Enter email"/>
        </div>
        <div className="mb-3">
          <label htmlFor='password'>Password</label>
          <input type="password" id='password' name='password' className="form-control" onChange={onChange} minLength={5} required placeholder="Enter password"/>
        </div>
        {/* <div className="mb-3">
          <label htmlFor='cpassword'>Confirm Password</label>
          <input type="password" id='cpassword' name='cpassword' className="form-control" onChange={onChange} minLength={5} required placeholder="Enter Confirm password"/>
        </div> */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        {/* <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p> */}
      </form>
    
  

    </div>
  )
}

export default Signup
