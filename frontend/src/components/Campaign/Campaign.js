import axios from 'axios';
import React , {useContext , useState } from "react";
import { UserContext } from "../../App";




const Campaign = () => {
    const {setLogin} = useContext(UserContext);

    const userCampaign={
        bankAccount:[0],
        campaignTitle:null,
        campaignCardImage:null ,
        pargraphesAboutCampaign:null ,
        loaction:[0,0],
        catgory:[ null ],
        campaignDurationDays:0 ,
        urlVideoOrImage:null ,
        campaignPerks:[ null , null ],
        campaignAmounts:0,
        darftCampaignLink:null
        }
    
    const [userData, setUserData] = useState(userCampaign)
    const {bankAccount , campaignTitle , campaignCardImage ,
        pargraphesAboutCampaign , loaction , catgory , campaignDurationDays ,
        urlVideoOrImage , campaignPerks , campaignAmounts , darftCampaignLink}=userData
    const [error, setError] = useState({})
    
    // const validateData=()=>{
    //  
    // }
    
    const handleChange=(e)=>{
    const {name,value}=e.target
    setUserData((preData)=>({...preData,[name]:value}))
    }
    
    const handleChangeArray=(e)=>{
        const {name,value}=e.target
        const array = value.split(" ");
        setUserData((preData)=>({...preData,[name]:array}))
        }


    const submet=()=>{
            console.log(userData)
            const token =JSON.parse(localStorage.getItem('user')).token
            const idUser = JSON.parse(localStorage.getItem('user')).user._id
            console.log(token,idUser)
    axios.post(`http://localhost:5000/campaign/add/${idUser}`,userData,{ headers: {"Authorization" : `Bearer ${token}`}} )
    .then(function (response) {
    console.log(response.data,response)
    })
    .catch(function (error) {
        console.log(error);
    });
    }


return (
    <>
    <div>campaign</div>
    <div  className='addCampaign' style={{ marginTop: "40px" }}>
    <label htmlFor="bankAccount" >bankAccount:</label><br/>
    <input name="bankAccount" onChange={handleChangeArray}  placeholder="space bettwen account"></input><br/>
    <label htmlFor="campaignTitle" >campaignTitle:</label><br/>
    <input name="campaignTitle" onChange={handleChange}></input><br/>
    <label htmlFor="campaignCardImage" >campaignCardImage:</label><br/>
    <input name="campaignCardImage" onChange={handleChange}></input><br/>
    <label htmlFor="pargraphesAboutCampaign" >pargraphesAboutCampaign:</label><br/>
    <input name="pargraphesAboutCampaign" onChange={handleChange}></input><br/>
    <label htmlFor="loaction" >loaction:</label><br/>
    <input name="loaction" onChange={handleChangeArray} placeholder="xx,xxxx xx,xxx"></input><br/>
    <label htmlFor="catgory">catgory:</label><br/>
    <input name="catgory" onChange={handleChangeArray}  placeholder="space between each catgores" ></input><br/>
    <label htmlFor="campaignDurationDays" >campaignDurationDays:</label><br/>
    <input name="campaignDurationDays" onChange={handleChange}></input><br/>
    <label htmlFor="urlVideoOrImage" >urlVideoOrImage:</label><br/>
    <input name="urlVideoOrImage" onChange={handleChange}></input><br/>
    <label htmlFor="campaignPerks" >campaignPerks:</label><br/>
    <input name="campaignPerks"  onChange={handleChangeArray} placeholder="space between each catgores"></input><br/>
    <label htmlFor="campaignAmounts" >campaignAmounts:</label><br/>
    <input name="campaignAmounts" onChange={handleChange}></input><br/>
    <label htmlFor="darftCampaignLink" >darftCampaignLink:</label><br/>
    <input name="darftCampaignLink" onChange={handleChange}></input><br/>
    <button onClick={submet}>submet</button>
    </div>
    </>
)
}

export default Campaign