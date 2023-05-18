import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import validator from 'validator';
import { useState } from "react";
import React from 'react';
import axios from 'axios';
import "./Register.css";

const Register = () => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const navigate = useNavigate();
  const userTest = {
    email: undefined,
    password: undefined,
    name: undefined ,
    age: undefined,
    phoneNumber: undefined,
    zipCode: undefined,
    country: undefined,
    role: "64047450f9276133c0753cfc",
    urlMyPhoto: "",
  }
  const [userData, setUserData] = useState(userTest)
  const { email, password, name, age, country, phoneNumber, zipCode, urlMyPhoto } = userData

  const [errors, setErrors] = useState({})

  const validateData = () => {
    let errors = {};
    if (!validator.isEmail(email)) {
    

      errors.email = "A vialed email is required";
    }
    if (!validator.isStrongPassword(password)) {
    
      errors.password = "A vialed strong password is required";
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
    }
    return errors
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const submit = () => {

const errors = validateData();  
if (Object.keys(errors).length) {
  setErrors(errors);
  return;
}
    axios.post(`${BACKEND}/user/signUp`, userData)
      .then(function (response) {
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
            <input name="email"  className='RegisterInputForm' placeholder="xxxxx@xxxx.com" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.email}</div>
            <label htmlFor="password"className='RegisterInputLabel' >Password: </label>
            <input name="password" type="password"  className='RegisterInputForm' placeholder="XXXXXXXX" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.password}</div>
            <label htmlFor="name" className='RegisterInputLabel'>name: </label>
            <input name="name"  className='RegisterInputForm' placeholder="your full name" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.name}</div>
            <label htmlFor="country" className='RegisterInputLabel'>country:</label>
            <input name="country" className='RegisterInputForm'  placeholder="your country" onChange={handleChange}></input>
            <label htmlFor="phoneNumber" className='RegisterInputLabel'>phone number:</label>
            <input name="phoneNumber" pattern="[1-9]{1}[0-9]{8,12}" className='RegisterInputForm'  placeholder="no leading zero" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.phoneNumber}</div>
            <label htmlFor="zipCode" className='RegisterInputLabel'>zibCode:</label>
            <input name="zipCode" className='RegisterInputForm'  placeholder="your zipCode" onChange={handleChange}></input>
            <label htmlFor="urlMyPhoto" className='RegisterInputLabel'>url my photo:</label>
            <input name="urlMyPhoto" type="url"  className='RegisterInputForm' placeholder="your url as link" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.urlMyPhoto}</div>
            <label htmlFor="age" className='RegisterInputLabel' >age:</label>
            <input name="age"  type="date" className='RegisterInputForm'  placeholder="mm/dd/yyyy" onChange={handleChange}></input>
            <div style={{ color: "red" }}>{errors.age}</div>
            <Button variant="primary" className='submitButtonRegister shadowButton' onClick={submit}>submit</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register