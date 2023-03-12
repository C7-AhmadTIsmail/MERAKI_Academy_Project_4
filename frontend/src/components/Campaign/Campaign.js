import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from 'axios';
import "./Campaign.css";



const Campaign = () => {
    const { setLogin } = useContext(UserContext);

    const userCampaign = {
        bankAccount: [0],
        campaignTitle: null,
        campaignCardImage: null,
        pargraphesAboutCampaign: null,
        loaction: [0, 0],
        catgory: [null],
        campaignDurationDays: 0,
        urlVideoOrImage: null,
        campaignPerks: [null, null],
        campaignAmounts: 0,
        darftCampaignLink: null
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


    const submet = () => {
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


    return (
        <> 
            <div className="MainAddCampaign">
            <div>campaign</div>
            <div className='AddCampaignStyleInside' style={{ marginTop: "40px" }}>
            <div className="AddCampaignInside">
                <label htmlFor="bankAccount" >bankAccount:</label>
                <input name="bankAccount" onChange={handleChangeArray} placeholder="space bettwen account"></input>
                <label htmlFor="campaignTitle" >campaignTitle:</label>
                <input name="campaignTitle" onChange={handleChange}></input>
                <label htmlFor="campaignCardImage" >campaignCardImage:</label>
                <input name="campaignCardImage" onChange={handleChange}></input>
                <label htmlFor="pargraphesAboutCampaign" >pargraphesAboutCampaign:</label>
                <input name="pargraphesAboutCampaign" onChange={handleChange}></input>
                <label htmlFor="loaction" >loaction:</label>
                <input name="loaction" onChange={handleChangeArray} placeholder="xx,xxxx xx,xxx"></input>
                <label htmlFor="catgory">catgory:</label>
                <input name="catgory" onChange={handleChangeArray} placeholder="space between each catgores" ></input>
                <label htmlFor="campaignDurationDays" >campaignDurationDays:</label>
                <input name="campaignDurationDays" onChange={handleChange}></input>
                <label htmlFor="urlVideoOrImage" >urlVideoOrImage:</label>
                <input name="urlVideoOrImage" onChange={handleChange}></input>
                <label htmlFor="campaignPerks" >campaignPerks:</label>
                <input name="campaignPerks" onChange={handleChangeArray} placeholder="space between each catgores"></input>
                <label htmlFor="campaignAmounts" >campaignAmounts:</label>
                <input name="campaignAmounts" onChange={handleChange}></input>
                <label htmlFor="darftCampaignLink" >darftCampaignLink:</label>
                <input name="darftCampaignLink" onChange={handleChange}></input>
                <button onClick={submet}>submet</button>
                </div>
            </div>
            </div>
        </>
    )
}

export default Campaign