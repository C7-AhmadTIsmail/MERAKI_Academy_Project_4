import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { UserContext } from "../MyProfile/MyProfile";
import "./PopupEditeMyData.css"


const PopupEditeMyData = (props) => {

    const { setPhotoedit, seteditePasswordVlue,setModalShow,
        PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation } = useContext(UserContext);
    const usertest = {
        name: undefined,
        age: undefined,
        phoneNumber: undefined,
        zipcode: undefined,
        country: undefined,
    }
    const [userData, setUserData] = useState(usertest)
    const { name, age, country, phoneNumber, zipcode } = userData

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }

    console.log("aaa")
    const submetNewData = () => {
        setPhotoedit(false)
        seteditePasswordVlue(false)
        console.log(userData)
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.put(`http://localhost:5000/user/update/${idUser}`, { name, age, country, phoneNumber, zipcode },
            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                console.log(res)
                setPopupEditeMyDataAnotherLocation(!PopupEditeMyDataAnotherLocation)
                setModalShow(false)
            });
    }

    return (

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
                

                        <form onSubmit={(event) => event.preventDefault()} className="myProfileAreaEdite">
                            <label htmlFor="name" >name: </label>
                            <input name="name" required placeholder="your full name" onChange={handleChange}></input>
                            <label htmlFor="age" >age:</label>
                            <input name="age" type="number" required placeholder="your age" onChange={handleChange}></input>
                            <label htmlFor="country" >country:</label>
                            <input name="country" required placeholder="your country" onChange={handleChange}></input>
                            <label htmlFor="phoneNumber" >phone namber:</label>
                            <input name="phoneNumber" required pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChange}></input>
                            <label htmlFor="zipcode" >zibcode:</label>
                            <input name="zipcode" required placeholder="your zipcode" onChange={handleChange}></input>
                            <button className='submetNewButton' onClick={submetNewData}>submet</button>

                        </form>
                
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopupEditeMyData



