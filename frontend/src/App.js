import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { createContext , useEffect , useState } from "react";

import NavBar from "./components/NavBar/NavBar"
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



  return (
    <UserContext.Provider value={{setLogin , login , campaignPageShow , setCampaignPageShow }}>
    <div className="App">
      <header className="App-header">
      </header>
      <NavBar/>
    <div>
    <Routes >
        <Route path="/" element={<Main />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Campaign" element={<Campaign />} />
        <Route path="/Favorite" element={<Favorite />} />
        <Route path="/MyCampaign" element={<MyCampaign />} />
        <Route path="/MyContribution" element={<MyContribution />} />
        <Route path="/MyProfile" element={<MyProfile />} />

    </Routes>
    </div>
    </div>

    </UserContext.Provider>
  );
}

export default App;





