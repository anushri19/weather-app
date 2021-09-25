import React, { useReducer, useState } from 'react';
import { Router, Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";
import './Login.css';
import App from './App';
import logo from './images/logo.png';
import people from './images/hero-img.png';


const formReducer = (state, event) => {
 return {
   ...state,
   [event.name]: event.value
 }
}

function Login() {
  let history = useHistory();
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  }

  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
    console.log(setFormData.name);
  }

  const submitHandler = () => {
    localStorage.setItem("users",JSON.stringify(formData))
    history.push("/weather-report")
  }


  return(
    <div className="wrapper">
      <header>
       <img src={logo} alt="Logo" className="logo"/><span className="title">Weather App</span>
      </header>
       
      {submitting &&
        <div>{formData}.</div>
      }
      <div><img src={people} alt="people" className="people"/></div>
      <form onSubmit={handleSubmit} className='form-control'>
        <input name="name" onChange={handleChange} placeholder="Username" className = "input-fields"/><br></br><br></br>
        <input name="password" onChange={handleChange} placeholder="Password" className = "input-fields"/>
        <br></br>
        <button type="submit" onClick = {submitHandler}>Submit</button>
      </form>
    </div>
  )
}

export default Login;