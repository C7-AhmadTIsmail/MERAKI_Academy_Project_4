import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyCampaignAddTeamMamber.css"
import axios from 'axios';

const PopupMyCampaignAddTeamMamber = (props) => {
    const { elementHolder } = useContext(UserContext);

    const userMyTeams = {
        firtsName: null,
        lastName: null,
        phoneNumber: null,
        country: null,
    }
    


    const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyTeams)

    const { firtsName , lastName , phoneNumber , country} = userDataMyCampaign

    const submeteTeam=(e)=>{
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.post(`http://localhost:5000/campaignTeams/add/${e.target.id}`,{firtsName , lastName , phoneNumber , country },
            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            console.log(res, "0")
            
            });
    
    }


    const [error, setError] = useState({})
    const validateData=()=>{
    
    }


    const handle_Change_myTeam = (e) => {
        const { name, value } = e.target
        setUserDataMyCampaign((preData) => ({ ...preData, [name]: value }))
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

                    <label htmlFor="firtsName">firtsName:</label><br />
                    <input name="firtsName" onChange={handle_Change_myTeam}></input><br />
                    <label htmlFor="lastName">lastName:</label><br />
                    <input name="lastName" onChange={handle_Change_myTeam}></input><br />
                    <label htmlFor="phoneNumber">phoneNumber:</label><br />
                    <input name="phoneNumber" onChange={handle_Change_myTeam}></input><br />
                    <label htmlFor="country">country:</label><br />
                    <input name="country" onChange={handle_Change_myTeam}></input><br />
                    <Button id={elementHolder} onClick={submeteTeam}>submet</Button><br />


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>




        </div>
    )
}

export default PopupMyCampaignAddTeamMamber