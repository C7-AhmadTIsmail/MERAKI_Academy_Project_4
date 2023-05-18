import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyContribution/MyContribution";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyContrtibutionEdite.css";
import validator from 'validator';
import axios from 'axios';

const PopupMyContrtibutionEdite = (props) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { setMyContribution, setContributionDoneAndRefresh, ContributionDoneAndRefresh
    , myContribution, contributionEditHolderData } = useContext(UserContext);

  const { name, dateOfContribution, lastDateOfContributionCanRefund, amount, visibility } = myContribution


  const handle_Change_myContribution = (e) => {
    const { name, value } = e.target
    setMyContribution((preData) => ({ ...preData, [name]: value }))
  }


  const [errors, setErrors] = useState({})

  const validateData = () => {
    let errors = {};
    if (!name) {

      errors.name = "Name is required";
    }
    if (!validator.isDate(dateOfContribution)) {

      errors.dateOfContribution = "date Of Contribution is required";
    }
    if (!validator.isDate(lastDateOfContributionCanRefund)) {

      errors.lastDateOfContributionCanRefund = "last Can Refund is required";
    }
    if (isNaN(amount)) {
      errors.amount = "Number is required";
    }
    if (!validator.isBoolean(visibility)) {
      errors.urlMyPhoto = "visibility is required";
    }
    return errors
  }







  const submitEdit = (e) => {
    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`${BACKEND}/contribution/update/${e.target.id}`, { name, dateOfContribution, lastDateOfContributionCanRefund, amount, visibility },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
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
            edit Contribution
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="name">name :</label>
          <input name="name" onChange={handle_Change_myContribution}></input>
          <div style={{ color: "red" }}>{errors.name}</div>
          <label htmlFor="amount">amount:</label>
          <input name="amount" onChange={handle_Change_myContribution}></input>
          <div style={{ color: "red" }}>{errors.amount}</div>
          <label htmlFor="visibility">visibility:</label>
          <input name="visibility" onChange={handle_Change_myContribution}></input>
          <div style={{ color: "red" }}>{errors.visibility}</div>
          <label htmlFor="dateOfContribution">date Of Contribution:</label>
          <input name="dateOfContribution" type="date" onChange={handle_Change_myContribution}></input>
          <div style={{ color: "red" }}>{errors.dateOfContribution}</div>
          <label htmlFor="lastDateOfContributionCanRefund">lastDateOfContributionCanRefund:</label>
          <input name="lastDateOfContributionCanRefund" type="date" onChange={handle_Change_myContribution}></input>
          <div style={{ color: "red" }}>{errors.lastDateOfContributionCanRefund}</div>

        </Modal.Body>
        <Modal.Footer>
          <div>
            <Button id={contributionEditHolderData} onClick={submitEdit}>submit</Button>
          </div>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>




    </div>
  )
}

export default PopupMyContrtibutionEdite