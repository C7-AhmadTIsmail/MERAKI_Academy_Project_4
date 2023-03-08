import React from 'react';
import axios from 'axios';
import "./Register.css";
import { useContext, useEffect, useState } from "react";
import { useRef } from 'react';
import "./Register.css";

const Register = () => {
  const usertest = {
    email: null,
    password: null,
    name: null,
    age: null,
    phoneNumber: null,
    zipcode: null,
    city: null,
    role: "64047450f9276133c0753cfc"
  }
  const [userData, setUserData] = useState(usertest)
  const { email, password, name, age, city, phoneNumber, zipcode } = userData
  const [error, setError] = useState({})

  // const validateData=()=>{
  //  
  // }

  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const submet = () => {

    axios.post('http://localhost:5000/user/signUp', userData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <>
      <div className='LoginStyle'>
        <div className='LoginStyleInside'>
          <div style={{ marginTop: "8px" }}>Register</div>
          <hr/>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="email" >Email: </label><br />
            <input name="email" onChange={handleChamge}></input><br />
            <label htmlFor="password" >Password: </label><br />
            <input name="password" onChange={handleChamge}></input><br />
            <label htmlFor="name" >name: </label><br />
            <input name="name" onChange={handleChamge}></input><br />
            <label htmlFor="age" >age:</label><br />
            <input name="age" onChange={handleChamge}></input><br />
            <label htmlFor="city" >city:</label><br />
            <input name="city" onChange={handleChamge}></input><br />
            <label htmlFor="phoneNumber" >phone namber:</label><br />
            <input name="phoneNumber" onChange={handleChamge}></input><br />
            <label htmlFor="zipcode" >zibcode:</label><br />
            <input name="zipcode" onChange={handleChamge}></input><br />
            <button className='submetButton' onClick={submet}>submet</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register