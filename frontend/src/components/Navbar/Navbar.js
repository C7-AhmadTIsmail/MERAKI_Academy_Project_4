import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import DropDownList from "../DropDownList/DropDownList";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const NavBar = () => {
    const navigate = useNavigate();

    const { setLogin, login ,setTheme ,theme,cardTheme, setCardTheme } = useContext(UserContext);
    const { setCampaignPageShow } = useContext(UserContext);

    const Logout = () => {
        localStorage.clear();
        setLogin(false);

        setTimeout(() => {
            navigate("/");
        }, 300);
    };
    
    const backToMain = () => {
        setCampaignPageShow(false);
    };
    const ChangeTheme=()=>{

        if("light"===localStorage.getItem("Theme")){
            localStorage.setItem("Theme","dark")
            setTheme((curr)=>"dark") 
            setCardTheme((curr)=>"darkCard") 

        }else{
            localStorage.setItem("Theme","light")
            setTheme((curr)=>"light")
            setCardTheme((curr)=>"lightCard")  
    }
    }



    return (
        <>
            <div className="NavMain">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">fund-me</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/" onClick={backToMain}>
                                    Main
                                </Nav.Link>

                                {login ? (
                                    <>
                                        <Nav.Link onClick={Logout}>Logout</Nav.Link>
                                        <Nav.Link href="/Campaign">Campaign</Nav.Link>
                                        <Nav.Link href="/Favorite">Favorite</Nav.Link>
                                        <div className="defiultStyle">
                                            <DropDownList />
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Nav>
                            <Nav>
                                {login ? (
                                    <></>
                                ) : (
                                    <>
                                        <Nav.Link href="/Register">Register</Nav.Link>
                                        <Nav.Link href="/Login">Login</Nav.Link>
                                    </>
                                )}

                                <Nav.Link onClick={ChangeTheme}>
                                    dark mood
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
};

export default NavBar;
