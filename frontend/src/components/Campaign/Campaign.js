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
    const BACKEND = process.env.REACT_APP_BACKEND;

    const { setLogin } = useContext(UserContext);

    const userCampaign = {
        bankAccount: undefined,
        campaignTitle: "",
        campaignCardImage: "",
        paragraphsAboutCampaign: "",
        location: [0, 0],
        category: [""],
        campaignDurationDays: "",
        urlVideoOrImage: "",
        campaignPerks: "",
        campaignAmounts: undefined,
        draftCampaignLink: ""
    }

    const [userData, setUserData] = useState(userCampaign)
    const { bankAccount, campaignTitle, campaignCardImage,
        paragraphsAboutCampaign, location, category, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, draftCampaignLink } = userData
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
  
        if (isNaN(bankAccount)) {
            errors.bankAccount = "bank Account is required";
        }
    
        if (!campaignTitle) {

            errors.campaignTitle = "campaign Title is required";
        }
      
        if (!validator.isURL(campaignCardImage)) {
            errors.campaignCardImage = "Url is required";
        }
       
        if (!paragraphsAboutCampaign) {

            errors.paragraphsAboutCampaign = "paragraphs About Campaign is required";
        }
        if (!validator.isDate(campaignDurationDays)) {

            errors.campaignDurationDays = "campaign Duration Days is required";
        }
        if (!validator.isURL(urlVideoOrImage)) {
            errors.urlVideoOrImage = "Url is required";
            
        }
        if (!campaignPerks) {

            errors.campaignPerks = "campaign Perks is required";
        }
        
        if (isNaN(campaignAmounts)) {
            errors.campaignAmounts = "campaign Amounts is required";
        }
    
        if (!validator.isURL(draftCampaignLink)) {
            errors.draftCampaignLink = "Url is required";
        }
        
        return errors
    }

    const [submetDone, setSubmetDone] = useState()

    const submit = () => {

        const errors = validateData(); 
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }

        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.post(`${BACKEND}/campaign/add/${idUser}`, userData, { headers: { "Authorization": `Bearer ${token}` } })
            .then(function (response) {
                setSubmetDone('Add Campaign is Done')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    let first = "1"
    const [nextPage, setNextPage] = useState("1")
    return (
        <>

            <Card id="Card" >
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
                    <Card.Title>Create Campaign </Card.Title>
                
                    <div className="mainCamp">

                        {nextPage === "1" ? <>
                            
                        <div className="Page1">
                            <label htmlFor="bankAccount" >bankAccount:</label>
                            <Form.Control className="page1Input" name="bankAccount" onChange={handleChange} placeholder="space bettwen account"></Form.Control>
                            <div style={{ color: "red"  , marginBottom: "10px" }}>{errors.bankAccount}</div>
                            <label htmlFor="campaignTitle" >campaignTitle:</label>
                            <Form.Control className="page1Input" name="campaignTitle" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.campaignTitle}</div>
                            <label htmlFor="campaignCardImage" >campaignCardImage:</label>
                            <Form.Control className="page1Input" name="campaignCardImage" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.campaignCardImage}</div>
                        </div>

                        </> : <></>}

                        {nextPage === "2" ? <>

                        <div className="Page2">
                            <label htmlFor="location" >location:</label>
                            <Form.Control  className="page2Input"  name="location" onChange={handleChangeArray} placeholder="xx.xxxx xx.xxx"></Form.Control>
                            <label htmlFor="category">category:</label>
                            <Form.Control className="page2Input"  name="category" onChange={handleChangeArray} placeholder="space between each catgores" ></Form.Control>
                            <label htmlFor="campaignDurationDays" >campaignDurationDays:</label>
                            <Form.Control  className="page2Input" type="date" name="campaignDurationDays" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.campaignDurationDays}</div>
                            <label htmlFor="paragraphsAboutCampaign" >paragraphsAboutCampaign:</label>
                            <Form.Control className="page2Input"  name="paragraphsAboutCampaign" onChange={handleChange}as="textarea" rows={4} />
                            <div style={{ color: "red", marginBottom: "10px"  }}>{errors.paragraphsAboutCampaign}</div>
                        </div>

                        </> : <></>}

                        {nextPage === "3" ? <>

                        <div className="Page3">
                            <label htmlFor="urlVideoOrImage" >urlVideoOrImage:</label>
                            <Form.Control className="page3Input"  name="urlVideoOrImage" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.urlVideoOrImage}</div>
                            <label htmlFor="campaignPerks" >campaignPerks:</label>
                            <Form.Control className="page3Input"  name="campaignPerks" onChange={handleChange} placeholder="space between each catgores"></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.campaignPerks}</div>
                            <label htmlFor="campaignAmounts" >campaignAmounts:</label>
                            <Form.Control className="page3Input"  name="campaignAmounts" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px" }}>{errors.campaignAmounts}</div>
                            <label htmlFor="draftCampaignLink" >draftCampaignLink:</label>
                            <Form.Control className="page3Input" name="draftCampaignLink" onChange={handleChange}></Form.Control>
                            <div style={{ color: "red" , marginBottom: "10px"  }}>{errors.draftCampaignLink}</div>
                            <p style={{ color: "green" , marginBottom: "10px"  }}>{submetDone}</p>
                            <Button className="ButtonCampaignSubmit" variant="primary" onClick={submit}>submit</Button>
                        </div>

                        </> : <></>}

                        </div>
            </Card>
        </>
    )
}

export default Campaign


