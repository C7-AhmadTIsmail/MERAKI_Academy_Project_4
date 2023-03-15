import React, { useContext, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { UserContext } from "../../App";
import Nav from 'react-bootstrap/Nav';
import validator from 'validator';
import axios from 'axios';
import "./Campaign.css";

const Campaign = () => {
    const { setLogin } = useContext(UserContext);

    const userCampaign = {
        bankAccount: "",
        campaignTitle: "",
        campaignCardImage: "",
        pargraphesAboutCampaign: "",
        loaction: [0, 0],
        catgory: [""],
        campaignDurationDays: "",
        urlVideoOrImage: "",
        campaignPerks: [null, null],
        campaignAmounts: "",
        darftCampaignLink: ""
    }

    const [userData, setUserData] = useState(userCampaign)
    const { bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = userData
    const [error, setError] = useState({})

    // const validateData=()=>{
    //  
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData((preData) => ({ ...preData, [name]: value }))
    }

    const handleChangeArray = (e) => {
        const { name, value } = e.target
        const array = value.split(" ");
        setUserData((preData) => ({ ...preData, [name]: array }))
    }

    const [errors, setErrors] = useState({})

    const validateData = () => {
        let errors = {};
        console.log(0)
        if (isNaN(bankAccount)) {
            errors.bankAccount = "campaign Amounts is required";
        }
        console.log(2)
        if (!campaignTitle) {

            errors.campaignTitle = "campaign Title is required";
        }
        if (!validator.isURL(campaignCardImage)) {
            errors.campaignCardImage = "Url is required";
        }
        console.log(5)
        if (!pargraphesAboutCampaign) {

            errors.pargraphesAboutCampaign = "Date is required";
        }
        if (!validator.isDate(campaignDurationDays)) {

            errors.campaignDurationDays = "campaign Duration Days is required";
        }
        if (!validator.isURL(urlVideoOrImage)) {
            errors.urlVideoOrImage = "Url is required";
        }
        console.log(8)
        if (!validator.isURL(darftCampaignLink)) {
            errors.darftCampaignLink = "Url is required";
        }
        console.log(10)
        
        return errors
    }


    const submet = () => {

        const errors = validateData(); 
        if (Object.keys(errors).length) {
            setErrors(errors);
            //console.log(errors,"10")
            return;
        }
        console.log(userData)
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        console.log(token, idUser)
        axios.post(`http://localhost:5000/campaign/add/${idUser}`, userData, { headers: { "Authorization": `Bearer ${token}` } })
            .then(function (response) {
                console.log(response.data, response)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let first = "1"
    const [nextPage, setNextPage] = useState("1")
    return (
        <>

            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link onClick={() => { setNextPage("1") }}>Page 1</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => { setNextPage("2") }}>Page 2</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => { setNextPage("3") }} >Page 3</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
               
                    <Card.Title>Special title treatment</Card.Title>
                    <div>

                        {nextPage === "1" ? <>
                            
                        <div className="Page1">
                            <label htmlFor="bankAccount" >bankAccount:</label><br />
                            <Form.Control className="page1Input" name="bankAccount" onChange={handleChangeArray} placeholder="space bettwen account"></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.name}</div>
                            <label htmlFor="campaignTitle" >campaignTitle:</label><br />
                            <Form.Control className="page1Input" name="campaignTitle" onChange={handleChange}></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.campaignTitle}</div>
                            <label htmlFor="campaignCardImage" >campaignCardImage:</label><br />
                            <Form.Control className="page1Input" name="campaignCardImage" onChange={handleChange}></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.campaignCardImage}</div>
                        </div>

                        </> : <></>}

                        {nextPage === "2" ? <>

                        <div className="Page2">
                            <label htmlFor="loaction" >loaction:</label><br />
                            <Form.Control  className="page2Input"  name="loaction" onChange={handleChangeArray} placeholder="xx.xxxx xx.xxx"></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.bankAccount}</div>
                            <label htmlFor="catgory">catgory:</label><br />
                            <Form.Control className="page2Input"  name="catgory" onChange={handleChangeArray} placeholder="space between each catgores" ></Form.Control><br />
                            <label htmlFor="campaignDurationDays" >campaignDurationDays:</label><br />
                            <Form.Control  className="page2Input"  name="campaignDurationDays" onChange={handleChange}></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.campaignDurationDays}</div>
                            <label htmlFor="pargraphesAboutCampaign" >pargraphesAboutCampaign:</label><br />
                            <Form.Control className="page2Input"  name="pargraphesAboutCampaign" onChange={handleChange}as="textarea" rows={4} /><br />
                            <div style={{ color: "red" }}>{errors.pargraphesAboutCampaign}</div>
                        </div>

                        </> : <></>}

                        {nextPage === "3" ? <>

                        <div className="Page3">
                            <label htmlFor="urlVideoOrImage" >urlVideoOrImage:</label><br />
                            <Form.Control className="page3Input"  name="urlVideoOrImage" onChange={handleChange}></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.urlVideoOrImage}</div>
                            <label htmlFor="campaignPerks" >campaignPerks:</label><br />
                            <Form.Control className="page3Input"  name="campaignPerks" onChange={handleChangeArray} placeholder="space between each catgores"></Form.Control><br />
                            <label htmlFor="campaignAmounts" >campaignAmounts:</label><br />
                            <Form.Control className="page3Input"  name="campaignAmounts" onChange={handleChange}></Form.Control><br />
                            <label htmlFor="darftCampaignLink" >darftCampaignLink:</label><br />
                            <Form.Control className="page3Input" name="darftCampaignLink" onChange={handleChange}></Form.Control><br />
                            <div style={{ color: "red" }}>{errors.darftCampaignLink}</div>
                            <Button variant="primary" onClick={submet}>submet</Button>
                        </div>

                        </> : <></>}

                        </div>
            </Card>
        </>
    )
}

export default Campaign


