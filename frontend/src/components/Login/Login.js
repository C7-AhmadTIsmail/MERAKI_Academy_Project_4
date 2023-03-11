import axios from 'axios';
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
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
        console.log(response.data.user)
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
          <div style={{ marginTop: "8px" }}>Login</div>
          <hr />
          <div style={{ marginTop: "40px" }}>
            <label htmlFor="email">Email:</label><br className='loginHr' />
            <input name="email" onChange={handleChamge}></input><br />
            <label htmlFor="password" >Password:</label><br />
            <input name="password" onChange={handleChamge}></input><br />
            <button className='LoginButton' onClick={login}>LogIn</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login