import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Button from 'react-bootstrap/Button';

const Register = () => {
  const navigate = useNavigate();
  const usertest = {
    email: null,
    password: null,
    name: null,
    age: null,
    phoneNumber: null,
    zipcode: null,
    country: null,
    role: "64047450f9276133c0753cfc",
    urlMyPhoto: null,
  }
  const [userData, setUserData] = useState(usertest)
  const { email, password, name, age, country, phoneNumber, zipcode, urlMyPhoto } = userData

  // const [error, setError] = useState({})
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
        // console.log(response);
        navigate("/Login")
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <>
      <div className='RegisterStyle'>
        <div className='RegisterStyleInside'>
          <h3 className='RegisterWord'>Register</h3>
          <hr className='RegisterLine' />
          <div className='InnerSideOfRegister'>
            <label htmlFor="email" >Email: </label>
            <input name="email" placeholder="xxxxx@xxxx.com" onChange={handleChamge}></input>
            <label htmlFor="password" >Password: </label>
            <input name="password" type="password" placeholder="XXXXXXXX" onChange={handleChamge}></input>
            <label htmlFor="name" >name: </label>
            <input name="name" placeholder="your full name" onChange={handleChamge}></input>
            <label htmlFor="age" >age:</label>
            <input name="age" type="number" placeholder="your age" onChange={handleChamge}></input>
            <label htmlFor="country" >country:</label>
            <input name="country" placeholder="your country" onChange={handleChamge}></input>
            <label htmlFor="phoneNumber" >phone namber:</label>
            <input name="phoneNumber" pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChamge}></input>
            <label htmlFor="zipcode" >zibcode:</label>
            <input name="zipcode" placeholder="your zipcode" onChange={handleChamge}></input>
            <label htmlFor="urlMyPhoto" >url my photo:</label>
            <input name="urlMyPhoto" type="url" placeholder="your url as link" onChange={handleChamge}></input>
            <Button variant="primary" className='SubmetButtonRegister' onClick={submet}>submet</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register