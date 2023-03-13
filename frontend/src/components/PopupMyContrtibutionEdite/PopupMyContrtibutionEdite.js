import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyContribution/MyContribution";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyContrtibutionEdite.css"
import axios from 'axios';

const PopupMyContrtibutionEdite = (props) => {

    const {setMyContribution ,setContributionDoneAndRefresh ,ContributionDoneAndRefresh
        ,myContribution,contributionEditeHolderData } = useContext(UserContext);

    const {name, dateOfContribution,lastDateOfContributionCanRefund,ammount, visibility} = myContribution


    const handle_Change_myContribution = (e) => {
        const { name, value } = e.target
        setMyContribution((preData) => ({ ...preData, [name]: value }))
        //console.log(contribution)
      }

      console.log(contributionEditeHolderData)

    const submetEdite=(e)=>{
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
          axios.put(`http://localhost:5000/contribution/update/${e.target.id}`,{name, dateOfContribution,lastDateOfContributionCanRefund,ammount, visibility},
          { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
              console.log(res, "0")
              setContributionDoneAndRefresh(!ContributionDoneAndRefresh)
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
          <label htmlFor="name">name :</label><br  />
            <input name="name" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="dateOfContribution">date Of Contribution:</label><br  />
            <input name="dateOfContribution" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="lastDateOfContributionCanRefund">lastDateOfContributionCanRefund:</label><br  />
            <input name="lastDateOfContributionCanRefund" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="ammount">ammount:</label><br  />
            <input name="ammount" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="visibility">visibility:</label><br  />
            <input name="visibility" onChange={handle_Change_myContribution}></input><br />
            <button id={contributionEditeHolderData} onClick={submetEdite}>submet</button><br  />

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>




    </div>
  )
}

export default PopupMyContrtibutionEdite