import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./NavBar.css";
import DropDownList from "../DropDownList/DropDownList";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";


const NavBar = () => {
    const navigate = useNavigate();

    const { setLogin, login } = useContext(UserContext);
    const { campaignPageShow, setCampaignPageShow } = useContext(UserContext);
    const tokencheak = JSON.parse(localStorage.getItem('user'))?.token
    tokencheak?setLogin(true):setLogin(false);

    const Logout = () => {
        localStorage.clear();
        setLogin(false);

        setTimeout(() => {
            navigate("/");
        }, 300);
    };
    console.log(login)
    const backToMain = () => {
        setCampaignPageShow(false);
    };

    return (
        <>
            <div className="NavMain">
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
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

                                <Nav.Link eventKey={2} href="#memes">
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
