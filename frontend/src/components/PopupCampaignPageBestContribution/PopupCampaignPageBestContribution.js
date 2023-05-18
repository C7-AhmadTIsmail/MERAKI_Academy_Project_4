import React, { useContext } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupCampaignPageBestContribution.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PopupCampaignPageBestContribution = (props) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { holderAllData, userComment, setUserComment, editOnComment,
    setEditOnComment, setModalShowContribution, contribution, setContribution
    , setAddContributionShow, holdBigContribtution,
    setHoldBigContribtution, } = useContext(UserContextMain);

  const showTheBiggestContribution = () => {
    axios.get(`${BACKEND}/contribution/getContributionCampaignMaximum/${holderAllData.data?._id}`)
      .then(function (response) {
        setHoldBigContribtution(response.data.contribution)

      })
      .catch(function (error) {
        console.log(error);
        setHoldBigContribtution(null)
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
            Big Contribution
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {holdBigContribtution ? "" : showTheBiggestContribution()}
          {holdBigContribtution ? <>
            {holdBigContribtution?.map((element, index) => {
              return (<div key={index}  className="bestAmount">
                <br />
                <h5> name: {element.name}</h5>
                <h5>amount: ${element.amount}</h5>
              </div>
              )
            })}


          </> : <></>}

        </Modal.Body>
        <Modal.Footer>
          <Button className="shadowButton" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default PopupCampaignPageBestContribution


