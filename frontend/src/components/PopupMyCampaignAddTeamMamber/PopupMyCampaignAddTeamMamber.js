import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyCampaignAddTeamMamber.css"
import Form from 'react-bootstrap/Form';
import validator from 'validator';
import axios from 'axios';


const PopupMyCampaignAddTeamMamber = (props) => {
  const { elementHolder, setCampaignDoneAndRefresh, campaignDoneAndRefresh } = useContext(UserContext)

  const userMyTeams = {
    firstName: "",
    lastName: "",
    phoneNumber: undefined,
    country: "",
  }
  const [errors, setErrors] = useState({})

  const validateData = () => {
    let errors = {};
    //console.log(5)


    if (!firstName) {

      errors.firstName = "firts Name is required";
    }
    if (!lastName) {

      errors.lastName = "last Name is required";
    }
    if (!country) {

      errors.country = "country is required";
    }
    if (isNaN(phoneNumber)) {
      errors.phoneNumber = "phoneNumber is required";
    }

    return errors
  }

  const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyTeams)
  const { firstName, lastName, phoneNumber, country } = userDataMyCampaign

  const submeteTeam = (e) => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/campaignTeams/add/${e.target.id}`, { firstName, lastName, phoneNumber, country },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setCampaignDoneAndRefresh(!campaignDoneAndRefresh)

      });

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
            Add Team Mamber
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="midInput">
            <Form.Label>firstName:</Form.Label>
            <Form.Control name="firstName" onChange={handle_Change_myTeam} placeholder="LastName" />
            <div style={{ color: "red" }}>{errors.firstName}</div>
            <Form.Label>lastName:</Form.Label>
            <Form.Control name="lastName" onChange={handle_Change_myTeam} placeholder="LastName" />
            <div style={{ color: "red" }}>{errors.lastName}</div>
            <Form.Label>phoneNumber:</Form.Label>
            <Form.Control name="phoneNumber" onChange={handle_Change_myTeam} placeholder="phoneNumber" />
            <div style={{ color: "red" }}>{errors.phoneNumber}</div>
            <Form.Label>country:</Form.Label>
            <Form.Control name="country" onChange={handle_Change_myTeam} placeholder="country" />
            <div style={{ color: "red" }}>{errors.country}</div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <div className="buttonChange">
            <Button className="shadowButton" id={elementHolder} onClick={submeteTeam}>submet</Button><br />
          </div>
          <Button className="shadowButton" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>




    </div>
  )
}

export default PopupMyCampaignAddTeamMamber