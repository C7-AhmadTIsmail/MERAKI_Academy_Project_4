import React, { useContext } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupCampaignPageBestContribution.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PopupCampaignPageBestContribution = (props) => {

    const { holderAllData, userComment, setUserComment, editOnComment, 
        setEditOnComment, setModalShowContribution,contribution, setContribution
        ,setAddContributionShow,holdBigContribtution,
         setHoldBigContribtution,} = useContext(UserContextMain);

        const showTheBigestContribution = () => {
            axios.get(`http://localhost:5000/contribution/getcontributionCampaignMaximum/${holderAllData.data._id}`)
              .then(function (response) {
                console.log(response)
                setHoldBigContribtution(response.data.contribution)
               
              })
              .catch(function (error) {
                console.log(error);
              });
        
          }

        //   showTheBigestContribution()
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
                    {holdBigContribtution?"":showTheBigestContribution()}
                    { holdBigContribtution ? <>
                {holdBigContribtution.map((element, index) => {
                  return (<div key={index} >
                    <br />
                    <p >{element.name}</p>
                    <p>{element.ammount}</p>
                  </div>
                  )
                })}


              </> : <></>}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default PopupCampaignPageBestContribution


