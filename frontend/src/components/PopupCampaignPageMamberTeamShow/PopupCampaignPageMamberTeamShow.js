import React, { useContext, useEffect, useState, useMemo } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupCampaignPageMamberTeamShow.css";

const PopupCampaignPageMamberTeamShow = (props) => {
    
    const { elementHolderTeams, teamMamberHolder } = useContext(UserContextMain);


    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Team Member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {teamMamberHolder?.map((element, index) => {

                        return (
                            <div key={index}>
                                <>

                                    <h5>name: {element.firstName} {element.lastName}</h5>
                                    <p>phone number: {element.phoneNumber}</p>
                                    <p>country: {element.country}</p>


                                </>
                            </div>
                        )

                    })}

                </Modal.Body>
                <Modal.Footer>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>


        </div>
    )
}

export default PopupCampaignPageMamberTeamShow