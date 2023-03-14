import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../MyProfile/MyProfile";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import validator from 'validator';
import "./PopupEditeMyData.css";
import axios from 'axios';


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
    const [errors, setErrors] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }

    const validateData = () => {
        let errors = {};
        if(!name){
          
          errors.name = "Name is required";
        }
        if(!validator.isDate(age)){
          
          errors.age = "Date is required";
        }
        if(isNaN(phoneNumber)){
          errors.phoneNumber = "Number is required";
        }
        if(isNaN(zipcode)){
            errors.zipcode = "zipcode is required";
          }
        return errors
      }
    


    
    
  
    const submetNewData = () => {

        const errors = validateData();  
        if (Object.keys(errors).length) {
        setErrors(errors);
          //console.log(errors,"10")
        return;
        }
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
                    Edite My profile Data
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                

                        <form onSubmit={(event) => event.preventDefault()} className="myProfileAreaEdite">
                            <label htmlFor="name" >name: </label>
                            <input name="name" required placeholder="your full name" onChange={handleChange}></input>
                            <div style={{ color: "red" }}>{errors.name}</div>
                            <label htmlFor="country" >country:</label>
                            <input name="country" required placeholder="your country" onChange={handleChange}></input>
                            <label htmlFor="phoneNumber" >phone namber:</label>
                            <input name="phoneNumber" required pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChange}></input>
                            <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                            <label htmlFor="zipcode" >zibcode:</label>
                            <input name="zipcode" required placeholder="your zipcode" onChange={handleChange}></input>
                            <div style={{ color: "red" }}>{errors.zibcode}</div>
                            <label htmlFor="age" >age:</label>
                            <input name="age" type="date" required placeholder="your age" onChange={handleChange}></input>
                            <div style={{ color: "red" }}>{errors.age}</div>
                        </form>
                
                
            </Modal.Body>
            <Modal.Footer>
                <div className='submetNewButton' >
                <Button  onClick={submetNewData}>submet</Button>
                </div>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default PopupEditeMyData



