import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyCampaignEdite.css"
import axios from 'axios';


const PopupMyCampaignEdite = (props) => {
  const {setmodalShowEditeMyCampaign ,
    campaignDoneAndRefresh , setCampaignDoneAndRefresh ,elementHolder } = useContext(UserContext);
    const userMyCampaign = {
      bankAccount: [0],
      campaignTitle: null,
      campaignCardImage: null,
      pargraphesAboutCampaign: null,
      loaction: [0, 0],
      catgory: [null],
      campaignDurationDays: 0,
      urlVideoOrImage: null,
      campaignPerks: [null, null],
      campaignAmounts: 0,
      darftCampaignLink: null
  }

  console.log(elementHolder)
  const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyCampaign)

  const { bankAccount, campaignTitle, campaignCardImage,
      pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
      urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = userDataMyCampaign


  const submetedite=(e)=>{
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.put(`http://localhost:5000/campaign/update/${e.target.id}`,{ campaignTitle , campaignAmounts , bankAccount ,  catgory ,  pargraphesAboutCampaign , campaignDurationDays, },
        { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
          console.log(res, "0")
          setCampaignDoneAndRefresh(!campaignDoneAndRefresh)
        });

  }

  const [error, setError] = useState({})
    const validateData=()=>{
    
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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>

          <label htmlFor="campaignTitle">campaign Title :</label><br  />
            <input name="campaignTitle" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="campaignAmounts">campaign Amounts:</label><br  />
            <input name="campaignAmounts" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="bankAccount">bank Account:</label><br  />
            <input name="bankAccount" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="catgory">catgory:</label><br  />
            <input name="catgory" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="pargraphesAboutCampaign">pargraphes About Campaign:</label><br  />
            <input name="pargraphesAboutCampaign" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="campaignDurationDays">campaign Duration Days:</label><br  />
            <input name="campaignDurationDays" onChange={handle_Change_myCampaign}></input><br />
            <button id={elementHolder} onClick={submetedite}>submet</button><br  />
        

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PopupMyCampaignEdite