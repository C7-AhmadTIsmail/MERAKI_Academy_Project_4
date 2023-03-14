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
  const { email, password } = userData

  const [errors, setErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState(null)


  const validateData = () => {
    let errors = {};
    if (!validator.isEmail(email)) {
      errors.email = "A vailed email is required";
    }
    if (!validator.isStrongPassword(password)) {
      errors.password = "A vailed strong password is required";
    }
    return errors

  }

  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const login = () => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    setErrors({});
    axios.post('http://localhost:5000/user/logIn', userData)
      .then(function (response) {
        setLoginErrors(null)
        localStorage.setItem("user", JSON.stringify({ token: response.data.token, user: response.data.user }))
        setLogin(true)
        navigate("/")
      })
      .catch(function (error) {
        setLoginErrors({ message: error?.response?.data?.message })
      });
  }


  return (

    <>
      <div className='LoginStyle'>
        <div className='LoginStyleInside'>
          <h3 className='LoginWord'>Login</h3>
          <hr className='LoginHr' />
          <h6 className="PlaseWord">please enter your name email & password</h6>
          <div className="InsideLoginDiv">
            <label className="LoginContainte" htmlFor="email">Email:</label>
            <input className="LoginContainte InputCorner" name="email"  onChange={handleChamge} placeholder="Username"></input>
            <div style={{ color: "red" }}>{errors.email}</div>
            <label className="LoginContainte" htmlFor="password" >Password:</label>
            <input className="LoginContainte InputCorner" name="password"  type="password"  onChange={handleChamge}  placeholder="Password"></input>
            <div style={{ color: "red" }}>{errors.password}</div>
            <Button variant="primary" className='LoginButton' onClick={login}>LogIn</Button>
            <div style={{ color: "red" }}>{loginErrors?.message}</div>
            <p>don't have account <a href="/Register">Register</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login