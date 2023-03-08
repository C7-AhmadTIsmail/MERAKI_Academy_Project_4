import React , {useContext ,useEffect , useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./Navbar.css";
const Navbar = () => {

    const {setLogin , login } = useContext(UserContext);

    const Logout=()=>{
        localStorage.clear();
        setLogin(false)
    }


    return (
        <>
            <div className="NavMain">
                <Link to="/"> Main </Link>
                <Link to="/Register"> Register </Link>
                
                {login ? <></> : <Link to="/Login"> Login </Link>}

                {login ? (
                    <>
                        <Link onClick={Logout}> Logout </Link>
                        <Link to="/Campaign"> Campaign </Link>
                        <Link to="/Favorite"> Favorite </Link>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
};

export default Navbar;
