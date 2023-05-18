import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { UserContext } from "../MyProfile/MyProfile";
import "./PopupEditeMyPhoto.css"
import Form from 'react-bootstrap/Form';



const PopupEditeMyPhoto = (props) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { setPhotoedit, seteditePasswordVlue, setModalShowPhoto,
    PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation } = useContext(UserContext);

  const userTest = {
    urlMyPhoto: undefined,
  }
  const [userData, setUserData] = useState(userTest)
  const { urlMyPhoto } = userData

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }


  const submItNewPhoto = () => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`${BACKEND}/user/update/${idUser}`, { urlMyPhoto: urlMyPhoto },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setPopupEditeMyDataAnotherLocation(!PopupEditeMyDataAnotherLocation)
        setModalShowPhoto(false)
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
          Edite photo:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New Url :</h4>
          
          <Form.Control name="urlMyPhoto" type="url" placeholder="your url as link" onChange={handleChange} />

        </Modal.Body>
        <Modal.Footer>
          <Button className='submitNewButton shadowButton' onClick={()=>{
            
            submItNewPhoto()
            props.onHide()
            }}>submit</Button>
        </Modal.Footer>
      </Modal>


    </div>

  )
}

export default PopupEditeMyPhoto