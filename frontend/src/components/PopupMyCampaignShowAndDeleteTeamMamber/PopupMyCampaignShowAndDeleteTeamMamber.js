import React, { useContext, useEffect, useState , useMemo  } from "react";
import { UserContext } from "../MyCampaign/MyCampaign";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./PopupMyCampaignShowAndDeleteTeamMamber.css"
import axios from 'axios';

const PopupMyCampaignShowAndDeleteTeamMamber = (props) => {
    const { elementHolderTeams ,setElementHolderTeams , setModalShowTeamMamberAndDelete } = useContext(UserContext);
    const [teamMamberHolder, setTeamMamberHolder] = useState(null)
    const [teamMamberRefresh, setTeamMamberRefresh] = useState(false)


console.log(elementHolderTeams)
    useEffect(() => {
    console.log(elementHolderTeams,"holder")
    if(elementHolderTeams){
        console.log(0)
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.get(`http://localhost:5000/campaignTeams/${elementHolderTeams}`,
            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
            console.log(res.data.teamsMamber , "0")
            setTeamMamberHolder(res?.data?.teamsMamber)
            console.log(2)

            });
        }
}, [teamMamberRefresh,elementHolderTeams])


const deleteMamberOfteam=(e)=>{
    console.log(teamMamberHolder[e.target.id])
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`http://localhost:5000/campaignTeams/delete/${elementHolderTeams}`,{teamMamberHolder:teamMamberHolder[e.target.id]},
        { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res.data)
        // console.log(3)
        setElementHolderTeams(null)
        setModalShowTeamMamberAndDelete(false)
        // setTeamMamberRefresh(!teamMamberRefresh)
        
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

                {teamMamberHolder?.map((element,index)=>{
                
                    return(
                        <div key={index}>
                        <>
                        
                        <h5>name: {element.firtsName} {element.lastName}</h5>
                        <p>phone number: {element.phoneNumber}</p>
                        <p>country: {element.country}</p>
                        <Button id={index} variant="danger" onClick={deleteMamberOfteam}>X</Button> 
                        
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

export default PopupMyCampaignShowAndDeleteTeamMamber