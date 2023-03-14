import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
import validator from 'validator';
import axios from 'axios';
import "./Login.css";


const Login = () => {

  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const usertest = {
    email: null,
    password: null,
  }
  const [userData, setUserData] = useState(usertest)
  const {email,password}=userData

  const [errors, setErrors] = useState({})

  const validateData=()=>{
   let errors ={};
   if(!validator.isEmail(email)){
    errors.email="A vailed email is required";
   }
   if(!validator.isStrongPassword(password)){
    errors.password="A vailed strong password is required";
   }
   return errors
   
  }

  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const login = () => {
    const errors=validateData();
    if(Object.keys(errors).length){
      setErrors(errors);
      return;
    }
    setErrors({});
    axios.post('http://localhost:5000/user/logIn', userData)
      .then(function (response) {
        // console.log(response.data.user)
        localStorage.setItem("user", JSON.stringify({ token: response.data.token, user: response.data.user }))
        setLogin(true)
        navigate("/")
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  return (

    <>
      <div className='LoginStyle'>
        <div className='LoginStyleInside'>
          <h3 className='LoginWord'>Login</h3>
          <hr className='LoginHr' />
          <div className="InsideLoginDiv">
            <label htmlFor="email">Email:</label>
            <input name="email" onChange={handleChamge}></input>
            <div style={{color:"red"}}>{errors.email}</div>
            <label htmlFor="password" >Password:</label>
            <input name="password" onChange={handleChamge}></input>
            <div style={{color:"red"}}>{errors.password}</div>
            <Button variant="primary" className='LoginButton' onClick={login}>LogIn</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login