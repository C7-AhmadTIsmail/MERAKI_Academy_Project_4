import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
import validator from 'validator';
import axios from 'axios';
import "./Login.css";


const Login = () => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const userTest = {
    email: "ahmad@gmail.com",
    password: "qweasd123A@",
  }
  const [userData, setUserData] = useState(userTest)
  const { email, password } = userData

  const [errors, setErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState(null)


  const validateData = () => {
    let errors = {};
    if (!validator.isEmail(email)) {
      errors.email = "A vialed email is required";
    }
    if (!validator.isStrongPassword(password)) {
      errors.password = "A vialed strong password is required";
    }
    return errors

  }

  const handleChange = (e) => {
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
    axios.post(`${BACKEND}/user/logIn`, userData)
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
          <h6 className="pleaseWord">please enter your name email & password</h6>
          <div className="InsideLoginDiv">
            <label className="LoginContainer" htmlFor="email">Email:</label>
            <input className="LoginContainer InputCorner" name="email"  onChange={handleChange} placeholder="ahmad@gmail.com"></input>
            <div style={{ color: "red" }}>{errors.email}</div>
            <label className="LoginContainer" htmlFor="password" >Password:</label>
            <input className="LoginContainer InputCorner" name="password"  type="password"  onChange={handleChange}  placeholder="qweasd123A@"></input>
            <div style={{ color: "red" }}>{errors.password}</div>
            <Button variant="primary" className='LoginButton shadowButton' onClick={login}>LogIn</Button>
            <div style={{ color: "red" }}>{loginErrors?.message}</div>
            <p>don't have account <a href="/Register">Register</a></p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login