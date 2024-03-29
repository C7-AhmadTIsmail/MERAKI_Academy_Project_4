import { UserContextMain } from "../CampaignPage/CampaignPage";
import "./PopupEditeCampaignPageComment.css"
import Button from 'react-bootstrap/Button';
import React, { useContext } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const PopupCampaignPageAddComment = (props) => {
    const BACKEND = process.env.REACT_APP_BACKEND;
    const { holderAllData, userComment, setUserComment, editOnComment,
        setEditOnComment, setModalShowComment } = useContext(UserContextMain);

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserComment((preData) => ({ ...preData, [name]: value }))
    }

    const addComment = () => {

        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.post(`${BACKEND}/comment/add/${holderAllData.data._id}/${idUser}`, userComment, { headers: { "Authorization": `Bearer ${token}` } })
            .then(function (response) {

                setEditOnComment(!editOnComment)
                setModalShowComment(false)
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
                        Add Comment
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Label>comment:</Form.Label>
                    <Form.Control name="comment" onChange={handleChange} placeholder="comment" />
                </Modal.Body>

                <Modal.Footer>
                    <div className="addCommentSubmit">
                        <Button variant="primary" onClick={addComment}>submit</Button>
                    </div>
                    <Button className="shadowButton" onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default PopupCampaignPageAddComment