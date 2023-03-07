import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { createContext , useEffect , useState } from "react";

import Main from "./components/Main/Main"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Campaign from "./components/Campaign/Campaign"


export const UserContext = createContext();

function App() {
  const [login, setLogin] = useState(false)

  const Logout=()=>{
    localStorage.clear();
    setLogin(false)
  }


  return (
    <UserContext.Provider value={{setLogin}}>
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Project 4 </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link to="/"> Main </Link>
      <Link to="/Register"> Register </Link>
      {login?<></>:<Link to="/Login"> Login </Link>}
      
      {login?<>
      <Link onClick={Logout}> Logout </Link>
      <Link to="/Campaign"> Campaign </Link>
      </>:<></>}
    </div>
    <div>
    <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Campaign" element={<Campaign />} />
    </Routes>
    </div>
    </div>

    </UserContext.Provider>
  );
}

export default App;

