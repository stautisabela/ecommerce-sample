import React, { useState } from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state,setState] = useState("Login");

  const[formData,setFormData] = useState({
    username:"",
    email:"",
    password:""
  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login = async ()=>{
    console.log("Login function executed", formData)
  }

  const signup = async ()=>{
    console.log("Sign up function executed", formData)
    let responseData;
    
    await fetch('http://localhost:4000/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }).then((res)=>res.json()).then((data)=>{responseData=data});

    if (!responseData.success) {
      alert(responseData.error);
      return;
    }
  localStorage.setItem('auth-token',responseData.token);
  window.location.replace('/');
  }

  return (
    <div className='login-signup'>
      <div className="login-signup-container">
        <h1>{state}</h1>
        <div className="login-signup-fields">
          {state==="Sign up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign up"
        ?<p className="login-signup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here</span></p>
        :<p className="login-signup-login">New here? <span onClick={()=>{setState("Sign up")}}>Create an account</span></p>}
        <div className="login-signup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup