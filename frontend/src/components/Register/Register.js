import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./Register.css";


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
    urlMyPhoto:null,
  }
  const [userData, setUserData] = useState(usertest)
  const { email, password, name, age, country, phoneNumber, zipcode , urlMyPhoto } = userData
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
        navigate("/Login")
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <>
      <div className='registerStyle'>
        <div className='registerStyleInside'>
          <div style={{ marginTop: "8px" }}>Register</div>
          <hr/>
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="email" >Email: </label><br />
            <input name="email" placeholder="xxxxx@xxxx.com" onChange={handleChamge}></input><br />
            <label htmlFor="password" >Password: </label><br />
            <input name="password" type="password" placeholder="XXXXXXXX" onChange={handleChamge}></input><br />
            <label htmlFor="name" >name: </label><br />
            <input name="name"  placeholder="your full name" onChange={handleChamge}></input><br />
            <label htmlFor="age" >age:</label><br />
            <input name="age"  type="number" placeholder="your age" onChange={handleChamge}></input><br />
            <label htmlFor="country" >country:</label><br />
            <input name="country" placeholder="your country"  onChange={handleChamge}></input><br />
            <label htmlFor="phoneNumber" >phone namber:</label><br />
            <input name="phoneNumber" pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChamge}></input><br />
            <label htmlFor="zipcode" >zibcode:</label><br />
            <input name="zipcode" placeholder="your zipcode" onChange={handleChamge}></input><br />
            <label htmlFor="urlMyPhoto" >url my photo:</label><br />
            <input name="urlMyPhoto"  type="url" placeholder="your url as link" onChange={handleChamge}></input><br />
            <button className='submetButton' onClick={submet}>submet</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register