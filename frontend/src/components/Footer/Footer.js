import "./Footer.css";
import Button from 'react-bootstrap/Button';
import { MDBFooter, MDBContainer, } from 'mdb-react-ui-kit';
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../../App";

const Footer = () => {
    const navigate = useNavigate();
    const { setLogin, login  } = useContext(UserContext);
    const year = new Date().getFullYear();


    return (

        <MDBFooter className='text-center text-white' style={{ backgroundColor: '#0a4275' }}>
            <MDBContainer className='p-4 pb-0'>
                <section className=''>
                    <p className='d-flex justify-content-center align-items-center'>
                       {login?<><h5>Welcome to our website </h5></> : 
                       <>
                       <span className='me-3'>Register for free</span>
                       <Link to="/Register">
                            <Button className='ButtonFooter' type='button' >
                                Register !
                            </Button>
                        </Link></>}
                    </p>
                </section>
            </MDBContainer>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                {`Copyright © Upbeat Code ${year}`}
            </div>
        </MDBFooter>
    )
}
export default Footer