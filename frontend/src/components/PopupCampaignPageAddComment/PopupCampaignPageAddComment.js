import React, { useContext } from "react";
import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupEditeCampaignPageComment.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const PopupCampaignPageAddComment = (props) => {
    const { holderAllData, userComment, setUserComment, editOnComment, 
        setEditOnComment, setModalShowComment } = useContext(UserContextMain);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserComment((preData) => ({ ...preData, [name]: value }))
    }

    const addComment = () => {
        console.log(1)
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.post(`http://localhost:5000/comment/add/${holderAllData.data._id}/${idUser}`, userComment, { headers: { "Authorization": `Bearer ${token}` } })
            .then(function (response) {
                console.log(response.data)
                setEditOnComment(!editOnComment)
                setModalShowComment(false)
            })
            .catch(function (error) {
                // console.log(error);
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

                    <label htmlFor="comment">comment:</label><br />
                    <input name="comment" onChange={handleChange}></input><br />
                    <Button variant="primary" onClick={addComment}>submet</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PopupCampaignPageAddComment