import axios from 'axios';
import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "../../App";

const Login = () => {

  const {setLogin} = useContext(UserContext);
  const navigate = useNavigate();
  const usertest={
    email: null,
    password: null,
}
  const [userData, setUserData] = useState(usertest)
  const {email , password }=userData
  const [error, setError] = useState({})

  // const validateData=()=>{
  //  
  // }

  const handleChamge=(e)=>{
    const {name,value}=e.target
    setUserData((preData)=>({...preData,[name]:value}))
  }

  const login=()=>{
    
    axios.post('http://localhost:5000/user/logIn',userData)
    .then(function (response) {
      console.log(response.data.user)
      localStorage.setItem("user", JSON.stringify({token:response.data.token,user:response.data.user}))
      setLogin(true)
      navigate("/")
    })
    .catch(function (error) {
      console.log(error);
    });
  }





  return (
    
    <>

    <div style={{ marginTop: "8px" }}>Login</div>
    <div style={{ marginTop: "40px" }}>
    <label htmlFor="email">Email:</label><br/>
    <input name="email" onChange={handleChamge}></input><br/>
    <label htmlFor="password" >Password:</label><br/>
    <input name="password" onChange={handleChamge}></input><br/>
    <button onClick={login}>LogIn</button>
    </div>
    
    </>
  )
}

export default Login