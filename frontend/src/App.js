import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import NavBar from "./components/Navbar/Navbar"
import Main from "./components/Main/Main"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import Campaign from "./components/Campaign/Campaign"
import Favorite from "./components/Favorite/Favorite"
import MyCampaign from "./components/MyCampaign/MyCampaign"
import MyContribution from "./components/MyContribution/MyContribution"
import MyProfile from "./components/MyProfile/MyProfile"

export const UserContext = createContext();

function App() {
  const [login, setLogin] = useState(false)
  const [campaignPageShow, setCampaignPageShow] = useState(false)
  const [tokenFound, setTokenFound] = useState(JSON.parse(localStorage.getItem('user'))?.token)
  const [theme, setTheme] = useState("light")
  const [cardTheme, setCardTheme] = useState("light")

if(localStorage.getItem("Theme")!=theme){
  setTheme(localStorage.getItem("Theme"))
  setCardTheme(localStorage.getItem("Theme"))
}


  useEffect(() => {
    if (tokenFound) {
      setLogin(!login)
    }
  }, [tokenFound])

  return (
    <UserContext.Provider value={{ setLogin, login, setCampaignPageShow ,campaignPageShow ,setTheme ,theme ,cardTheme, setCardTheme}}>
      <div className="APP" id={theme} style={{height: '100vh'}}>
        <header className="App-header">
        </header>
        <NavBar />
        <div>
          <Routes >
            <Route path="/" element={<Main pass={theme} />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Campaign" element={<Campaign pass={theme}/>} />
            <Route path="/Favorite" element={<Favorite />} />
            <Route path="/MyCampaign" element={<MyCampaign pass={theme}/>} />
            <Route path="/MyContribution" element={<MyContribution pass={theme}/>} />
            <Route path="/MyProfile" element={<MyProfile />} />

          </Routes>
        </div>
      </div>

    </UserContext.Provider>
  );
}

export default App;





