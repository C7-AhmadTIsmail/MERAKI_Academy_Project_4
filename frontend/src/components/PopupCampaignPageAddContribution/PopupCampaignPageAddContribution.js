import React, { useContext , useState } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupCampaignPageAddContribution.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator';
import axios from 'axios';

const PopupCampaignPageAddContribution = (props) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { holderAllData, userComment, setUserComment, editOnComment,
    setEditOnComment, setModalShowContribution, contribution, setContribution ,addContributionShow, setAddContributionShow,
  } = useContext(UserContextMain);

  const { name, dateOfContribution, lastDateOfContributionCanRefund, amount, visibility } = contribution


  const handle_Change = (e) => {
    const { name, value } = e.target
    setContribution((preData) => ({ ...preData, [name]: value }))
    
  }

  const [errors, setErrors] = useState({})
const [done, setDone] = useState(undefined)
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


  const submitContribution = () => {

    const errors = validateData();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    const token = JSON.parse(localStorage.getItem('user')).token
    axios.post(`${BACKEND}/contribution/add/${holderAllData.data._id}/${idUser}`,
      { name, dateOfContribution, lastDateOfContributionCanRefund, amount, visibility, }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setAddContributionShow(!addContributionShow)
        setDone("Add Contribution is Done")
        setTimeout(() => {
          setDone(undefined)
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
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
            Add Contribution
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>

          <label htmlFor="name">name:</label>
          <input name="name" onChange={handle_Change}></input>
          <div style={{ color: "red" }}>{errors.name}</div>
          <label htmlFor="amount">amount:</label>
          <input name="amount" onChange={handle_Change}></input>
          <div style={{ color: "red" }}>{errors.amount}</div>
          <label htmlFor="visibility">visibility:</label>
          <input name="visibility" onChange={handle_Change}></input>
          <div style={{ color: "red" }}>{errors.visibility}</div>
          <label htmlFor="dateOfContribution">date Of Contribution:</label>
          <input name="dateOfContribution" type="date" onChange={handle_Change}></input>
          <div style={{ color: "red" }}>{errors.dateOfContribution}</div>
          <label htmlFor="lastDateOfContributionCanRefund">last Date Of Contribution Can Refund:</label>
          <input name="lastDateOfContributionCanRefund"  type="date"  onChange={handle_Change}></input>
          <div style={{ color: "red" }}>{errors.lastDateOfContributionCanRefund}</div>
          <div style={{ color: "green" }}>{done}</div>
        </Modal.Body>

        <Modal.Footer>
          <div>
            <Button className="shadowButton" onClick={submitContribution}>submit</Button>
          </div>
          <Button  className="shadowButton" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default PopupCampaignPageAddContribution