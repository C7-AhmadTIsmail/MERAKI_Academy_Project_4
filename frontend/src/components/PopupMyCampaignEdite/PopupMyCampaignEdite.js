import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyCampaignEdite.css"
import axios from 'axios';


const PopupMyCampaignEdite = (props) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { setmodalShowEditeMyCampaign,
    campaignDoneAndRefresh, setCampaignDoneAndRefresh, elementHolder } = useContext(UserContext);
  const userMyCampaign = {
    bankAccount: [0],
    campaignTitle: null,
    campaignCardImage: null,
    paragraphsAboutCampaign: null,
    location: [0, 0],
    category: [null],
    campaignDurationDays: 0,
    urlVideoOrImage: null,
    campaignPerks: [null, null],
    campaignAmounts: 0,
    draftCampaignLink: null
  }

  const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyCampaign)

  const { bankAccount, campaignTitle, campaignCardImage,
    paragraphsAboutCampaign, location, category, campaignDurationDays,
    urlVideoOrImage, campaignPerks, campaignAmounts, draftCampaignLink } = userDataMyCampaign


  const submitEdit = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`${BACKEND}/campaign/update/${e.target.id}`, { campaignTitle, campaignAmounts, bankAccount, category, paragraphsAboutCampaign, campaignDurationDays, },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setCampaignDoneAndRefresh(!campaignDoneAndRefresh)
      });

  }

  const [error, setError] = useState({})
  const validateData = () => {

  }

  const handle_Change_myCampaign = (e) => {
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
            edit campaign 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body  style={{ display: "flex", flexDirection: "column" }}>
        

          <label htmlFor="campaignTitle">campaign Title :</label>
          <input name="campaignTitle" onChange={handle_Change_myCampaign}></input>
          <label htmlFor="campaignAmounts">campaign Amounts:</label>
          <input name="campaignAmounts" onChange={handle_Change_myCampaign}></input>
          <label htmlFor="bankAccount">bank Account:</label>
          <input name="bankAccount" onChange={handle_Change_myCampaign}></input>
          <label htmlFor="category">category:</label>
          <input name="category" onChange={handle_Change_myCampaign}></input>
          <label htmlFor="paragraphsAboutCampaign">paragraph About Campaign:</label>
          <input name="paragraphsAboutCampaign" onChange={handle_Change_myCampaign}></input>
          <label htmlFor="campaignDurationDays">campaign Duration Days:</label>
          <input name="campaignDurationDays" onChange={handle_Change_myCampaign}></input>


        </Modal.Body>
        <Modal.Footer>
          <div >
            <Button className="shadowButton"  id={elementHolder} onClick={submitEdit}>submit</Button>
          </div>
          <Button className="shadowButton" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PopupMyCampaignEdite