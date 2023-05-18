import React, { useContext, useEffect, useState, useMemo } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import "./PopupMyCampaignShowAndDeleteTeamMamber.css";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PopupMyCampaignShowAndDeleteTeamMamber = (props) => {
    const BACKEND = process.env.REACT_APP_BACKEND;
    const { elementHolderTeams, setElementHolderTeams, setModalShowTeamMemberAndDelete } = useContext(UserContext);
    const [teamMemberHolder, setTeamMemberHolder] = useState(null)
    const [teamMemberRefresh, setTeamMemberRefresh] = useState(false)


    useEffect(() => {
        if (elementHolderTeams) {
            const token = JSON.parse(localStorage.getItem('user')).token
            const idUser = JSON.parse(localStorage.getItem('user')).user._id
            axios.get(`${BACKEND}/campaignTeams/${elementHolderTeams}`,
                { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                    setTeamMemberHolder(res?.data?.teamsMember)
                });
        }
    }, [teamMemberRefresh, elementHolderTeams])


    const deleteMemberOfTeam = (e) => {
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.put(`${BACKEND}/campaignTeams/delete/${elementHolderTeams}`, { teamMemberHolder: teamMemberHolder[e.target.id] },
            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                setElementHolderTeams(null)
                setModalShowTeamMemberAndDelete(false)
            });
    }


    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>

                    {teamMemberHolder?.map((element, index) => {

                        return (
                            <div key={index} className="FlexTeamMember">
                                <>
                                    <div>
                                        <h5>name: {element.firstName} {element.lastName}</h5>
                                        <p>phone number: {element.phoneNumber}</p>
                                        <p>country: {element.country}</p>
                                    </div>
                                    <div>

                                        <Button className="shadowButton" id={index} variant="danger" onClick={deleteMemberOfTeam}>X</Button>
                                    </div>
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

export default PopupMyCampaignShowAndDeleteTeamMamber