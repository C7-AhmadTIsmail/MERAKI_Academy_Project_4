import React, { useContext } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupCampaignPageAddContribution.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PopupCampaignPageAddContribution = (props) => {

    const { holderAllData, userComment, setUserComment, editOnComment, 
        setEditOnComment, setModalShowContribution,contribution, setContribution
        } = useContext(UserContextMain);

        const { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility } = contribution

        const handle_Chamge = (e) => {
          const { name, value } = e.target
          setContribution((preData) => ({ ...preData, [name]: value }))
          //console.log(contribution)
        }
        console.log("01111110")
        const submetContribution = () => {
            const idUser = JSON.parse(localStorage.getItem('user')).user._id
            const token = JSON.parse(localStorage.getItem('user')).token
            axios.post(`http://localhost:5000/contribution/add/${holderAllData.data._id}/${idUser}`,
              { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility, }, { headers: { "Authorization": `Bearer ${token}` } })
              .then(function (response) {
                console.log(response)
                // setEditOnComment(!editOnComment)
                
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
                        Modal heading
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>

                    
              <label htmlFor="name">name:</label><br />
              <input name="name" onChange={handle_Chamge}></input><br />
              <label htmlFor="ammount">ammount:</label><br />
              <input name="ammount" onChange={handle_Chamge}></input><br />
              <label htmlFor="dateOfContribution">date Of Contribution:</label><br />
              <input name="dateOfContribution" onChange={handle_Chamge}></input><br />
              <label htmlFor="lastDateOfContributionCanRefund">last Date Of Contribution Can Refund:</label><br />
              <input name="lastDateOfContributionCanRefund" onChange={handle_Chamge}></input><br />
              <label htmlFor="visibility">visibility:</label><br />
              <input name="visibility" onChange={handle_Chamge}></input><br />
              <button onClick={submetContribution}>submet</button><br />

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>


    </div>
  )
}

export default PopupCampaignPageAddContribution