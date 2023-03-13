import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
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
  // const {email , password }=userData
  // const [error, setError] = useState({})

  // const validateData=()=>{
  //  
  // }

  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const login = () => {

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
            <label htmlFor="password" >Password:</label>
            <input name="password" onChange={handleChamge}></input>
            <Button variant="primary" className='LoginButton' onClick={login}>LogIn</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login