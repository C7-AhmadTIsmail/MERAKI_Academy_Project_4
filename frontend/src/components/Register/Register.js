import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
import { useState } from "react";
import React from 'react';
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const usertest = {
    email: undefined,
    password: undefined,
    name: undefined ,
    age: undefined,
    phoneNumber: undefined,
    zipcode: undefined,
    country: undefined,
    role: "64047450f9276133c0753cfc",
    urlMyPhoto: "",
  }
  const [userData, setUserData] = useState(usertest)
  const { email, password, name, age, country, phoneNumber, zipcode, urlMyPhoto } = userData

  const [errors, setErrors] = useState({})

  const validateData = () => {
    let errors = {};
    //console.log(5)
    if (!validator.isEmail(email)) {
     

      errors.email = "A vailed email is required";
    }
    if (!validator.isStrongPassword(password)) {
    
      errors.password = "A vailed strong password is required";
    }
    if(!name){
      
      errors.name = "Name is required";
    }
    if(!validator.isDate(age)){
      
      errors.age = "Date is required";
    }
    if(isNaN(phoneNumber)){
      errors.phoneNumber = "Number is required";
    }
    if(!validator.isURL(urlMyPhoto)){
      errors.urlMyPhoto = "Url is required";
      //console.log(8)
    }
    return errors
  }


  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const submet = () => {

const errors = validateData();  
if (Object.keys(errors).length) {
  setErrors(errors);
  //console.log(errors,"10")
  return;
}
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
      <div className='RegisterStyle'>
        <div className='RegisterStyleInside'>
          <h3 className='RegisterWord'>Register</h3>
          <hr className='RegisterLine' />
          <div className='InnerSideOfRegister'>
            <label htmlFor="email"className='RegisterInputLabel' >Email: </label>
            <input name="email"  className='RegisterInputForm' placeholder="xxxxx@xxxx.com" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.email}</div>
            <label htmlFor="password"className='RegisterInputLabel' >Password: </label>
            <input name="password" type="password"  className='RegisterInputForm' placeholder="XXXXXXXX" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.password}</div>
            <label htmlFor="name" className='RegisterInputLabel'>name: </label>
            <input name="name"  className='RegisterInputForm' placeholder="your full name" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.name}</div>
            <label htmlFor="country" className='RegisterInputLabel'>country:</label>
            <input name="country" className='RegisterInputForm'  placeholder="your country" onChange={handleChamge}></input>
            <label htmlFor="phoneNumber" className='RegisterInputLabel'>phone namber:</label>
            <input name="phoneNumber" pattern="[1-9]{1}[0-9]{8,12}" className='RegisterInputForm'  placeholder="no leading zero" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.phoneNumber}</div>
            <label htmlFor="zipcode" className='RegisterInputLabel'>zibcode:</label>
            <input name="zipcode" className='RegisterInputForm'  placeholder="your zipcode" onChange={handleChamge}></input>
            <label htmlFor="urlMyPhoto" className='RegisterInputLabel'>url my photo:</label>
            <input name="urlMyPhoto" type="url"  className='RegisterInputForm' placeholder="your url as link" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.urlMyPhoto}</div>
            <label htmlFor="age" className='RegisterInputLabel' >age:</label>
            <input name="age"  type="date" className='RegisterInputForm'  placeholder="mm/dd/yyyy" onChange={handleChamge}></input>
            <div style={{ color: "red" }}>{errors.age}</div>
            <Button variant="primary" className='SubmetButtonRegister' onClick={submet}>submet</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register