import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import {useContext ,useEffect , useState } from "react";
import Main from "./components/Main/Main"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Project 4 </h1>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Link to="/"> Main </Link>
      <Link to="/Register"> Register </Link>
      <Link to="/Login"> Login </Link>
    </div>
    <div>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
    </Routes>
    </div>
    </div>
  );
}

export default App;
