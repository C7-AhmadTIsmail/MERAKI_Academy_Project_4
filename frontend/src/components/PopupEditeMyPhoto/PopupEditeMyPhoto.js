import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { UserContext } from "../MyProfile/MyProfile";
import "./PopupEditeMyPhoto.css"



const PopupEditeMyPhoto = (props) => {
  const { setPhotoedit, seteditePasswordVlue, setModalShowPhoto,
    PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation } = useContext(UserContext);

  const usertest = {
    urlMyPhoto: undefined,
  }
  const [userData, setUserData] = useState(usertest)
  const { urlMyPhoto } = userData

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }


  const submetNewPhtoto = () => {
    setPhotoedit(false)
    seteditePasswordVlue(false)
    console.log(userData)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`http://localhost:5000/user/update/${idUser}`, { urlMyPhoto: urlMyPhoto },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res)
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
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>


          <label htmlFor="urlMyPhoto" >url my photo:</label><br />
          <input name="urlMyPhoto" type="url" placeholder="your url as link" onChange={handleChange}></input><br />
          <button className='submetNewButton' onClick={submetNewPhtoto}>submet</button>


        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>


    </div>

  )
}

export default PopupEditeMyPhoto