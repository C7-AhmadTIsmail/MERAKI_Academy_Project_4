import React, { useContext, useEffect, useState , useMemo  } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupCampaignPageMamberTeamShow.css"
import axios from 'axios';

const PopupCampaignPageMamberTeamShow = (props) => {
    const { elementHolderTeams ,teamMamberHolder } = useContext(UserContextMain);
    // const [teamMamberHolder, setTeamMamberHolder] = useState(null)
                console.log(elementHolderTeams)
                console.log(5)
    // useEffect(() => {
    //     console.log("holder")
    //     console.log(elementHolderTeams)

    //     console.log(6)
    //     if(elementHolderTeams){
    //         console.log(7)
    //         const token = JSON.parse(localStorage.getItem('user')).token
    //         const idUser = JSON.parse(localStorage.getItem('user')).user._id
    //         axios.get(`http://localhost:5000/campaignTeams/${elementHolderTeams}`,
    //             { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
    //             console.log(res.data.teamsMamber , "************************************************************0")
    //             setTeamMamberHolder(res?.data?.teamsMamber)
    //             console.log(8)
    
    //             });
    //         }
    // }, [])


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

                {teamMamberHolder?.map((element,index)=>{
                
                    return(
                        <div key={index}>
                        <>
                        
                        <h5>name: {element.firstName} {element.lastName}</h5>
                        <p>phone number: {element.phoneNumber}</p>
                        <p>country: {element.country}</p>
                        
                        
                        </>
                        </div>
                    )

                })}

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>


    </div>
  )
}

export default PopupCampaignPageMamberTeamShow