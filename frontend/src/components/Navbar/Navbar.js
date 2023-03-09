import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Navbar.css";
import DropDownList from "../DropDownList/DropDownList";
import { useNavigate  } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    
    const { setLogin, login } = useContext(UserContext);
    const { campaignPageShow, setCampaignPageShow } = useContext(UserContext);
    
    const Logout = () => {
        localStorage.clear();
        setLogin(false)
        
        setTimeout(()=>{
            navigate("/")
        },300)

    }

    const backToMain = () => {
        setCampaignPageShow(false)
    }

    return (
        <>
            <div className="NavMain">
                <Link to="/" onClick={backToMain}> Main </Link>

                {login ? <></> :<>
                <Link to="/Register"> Register </Link>
                <Link to="/Login"> Login </Link>
                </> 
                
                }

                {login ? (
                    <>
                        <Link onClick={Logout}> Logout </Link>
                        <Link to="/Campaign"> Campaign </Link>
                        <Link to="/Favorite"> Favorite </Link>
                        <div className="defiultStyle">
                            <DropDownList/>
                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Navbar;
