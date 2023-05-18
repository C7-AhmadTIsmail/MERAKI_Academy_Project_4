import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyProfile/MyProfile";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator';
import "./PopupEditeMyData.css";
import axios from 'axios';


const PopupEditeMyData = (props) => {
    const BACKEND = process.env.REACT_APP_BACKEND;
    const { setPhotoedit, seteditePasswordVlue, setModalShow,
        PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation } = useContext(UserContext);
    const userTest = {
        name: undefined,
        age: undefined,
        phoneNumber: undefined,
        zipCode: undefined,
        country: undefined,
    }
    const [userData, setUserData] = useState(userTest)
    const { name, age, country, phoneNumber, zipCode } = userData
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }

    const validateData = () => {
        let errors = {};
        if (!name) {

            errors.name = "Name is required";
        }
        if (!country) {

            errors.country = "country is required";
        }
        if (!validator.isDate(age)) {

            errors.age = "Date is required";
        }
        if (isNaN(phoneNumber)) {
            errors.phoneNumber = "Number is required";
        }
        if (isNaN(zipCode)) {
            errors.zipCode = "zipCode is required";
        }
        return errors
    }


    const submitNewData = () => {

        const errors = validateData();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.put(`${BACKEND}/user/update/${idUser}`, { name, age, country, phoneNumber, zipCode },
            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
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
                    Edite My profile Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>


                <form onSubmit={(event) => event.preventDefault()} className="myProfileAreaEdit">
                    <label htmlFor="name" >name: </label>
                    <input name="name" required placeholder="your full name" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.name}</div>
                    <label htmlFor="country" >country:</label>
                    <input name="country" required placeholder="your country" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.country}</div>
                    <label htmlFor="phoneNumber" >phone number:</label>
                    <input name="phoneNumber" required pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                    <label htmlFor="zipCode" >zibCode:</label>
                    <input name="zipCode" required placeholder="your zipCode" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.zipCode}</div>
                    <label htmlFor="age" >age:</label>
                    <input name="age" type="date" required placeholder="your age" onChange={handleChange}></input>
                    <div style={{ color: "red" }}>{errors.age}</div>
                </form>


            </Modal.Body>
            <Modal.Footer>
                <div className='submitNewButton' >
                    <Button className="shadowButton" onClick={submitNewData}>submit</Button>
                </div>
                <Button className="shadowButton" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopupEditeMyData



