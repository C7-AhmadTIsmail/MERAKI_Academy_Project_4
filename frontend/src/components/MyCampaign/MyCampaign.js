import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyCampaign.css"
import axios from 'axios';


const MyCampaign = () => {
  const [allMyCampaign, setAllMyCampaign] = useState(null)
  const [showThisSectionEditeAreaHideAndShow, setshowThisSectionEditeAreaHideAndShow] = useState(false)
  const [showThisSectionEditeArea, setshowThisSectionEditeArea] = useState(null)
  const [changeOnCampaign, setChangeOnCampaign] = useState(false)

    const userMyCampaign = {
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


    const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyCampaign)

    const { bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = userDataMyCampaign

  
    const [error, setError] = useState({})
    const validateData=()=>{
    
    }

  const handle_Change_myCampaign = (e) => {
    const { name, value } = e.target
    setUserDataMyCampaign((preData) => ({ ...preData, [name]: value }))
    }



    const [campaignDoneAndRefresh, setCampaignDoneAndRefresh] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/campaign/getCampaign/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyCampaign(res.data.campaign);
        console.log(res.data.campaign, "res0")
      });
  }, [campaignDoneAndRefresh]);



  const editeMyCampaign=(e)=>{
    setshowThisSectionEditeArea(e.target.id)
    setshowThisSectionEditeAreaHideAndShow(!showThisSectionEditeAreaHideAndShow)
  }

  const submetedite=(e)=>{
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.put(`http://localhost:5000/campaign/update/${e.target.id}`,{ campaignTitle , campaignAmounts , bankAccount ,  catgory ,  pargraphesAboutCampaign , campaignDurationDays, },
        { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
          console.log(res, "0")
          setCampaignDoneAndRefresh(!campaignDoneAndRefresh)
        });

  }

const deletethisCampaign=(e)=>{
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
  axios.delete(`http://localhost:5000/campaign/delete/${e.target.id}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res, "0")
        setCampaignDoneAndRefresh(!campaignDoneAndRefresh)
      });

}



  return (
    <div>
      <div className="MyCampaign">MyCampaign</div>
      {allMyCampaign ? <>{allMyCampaign.map((element, index) => {
        return (<div key={element._id} className="CampaignListMainDiv">
          <img className="myCampaignPageImg" src={element.campaignCardImage} alt="no photo found" />
          <p>campaign Title : {element.campaignTitle}</p>
          <p>campaign Amounts: ${element.campaignAmounts} </p>
          <p>bankAccount: {element.bankAccount}</p>
          <p>catgory: {element.catgory}</p>
          <p>pargraphesAboutCampaign: {element.pargraphesAboutCampaign}</p>
          <p>campaign Duration Days: {element.campaignDurationDays}</p>
          <>
          <button id={element._id} onClick={editeMyCampaign}>edit</button><br  />
          <button id={element._id} onClick={deletethisCampaign}>delete</button><br  />
          <>
          
          {showThisSectionEditeAreaHideAndShow&&showThisSectionEditeArea===element._id?<>
            <label htmlFor="campaignTitle">campaign Title :</label><br  />
            <input name="campaignTitle" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="campaignAmounts">campaign Amounts:</label><br  />
            <input name="campaignAmounts" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="bankAccount">bank Account:</label><br  />
            <input name="bankAccount" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="catgory">catgory:</label><br  />
            <input name="catgory" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="pargraphesAboutCampaign">pargraphes About Campaign:</label><br  />
            <input name="pargraphesAboutCampaign" onChange={handle_Change_myCampaign}></input><br />
            <label htmlFor="campaignDurationDays">campaign Duration Days:</label><br  />
            <input name="campaignDurationDays" onChange={handle_Change_myCampaign}></input><br />
            <button id={element._id} onClick={submetedite}>submet</button><br  />
          </>:<></>}
          </>

          </>
        </div>
        )
      })}</> : <></>}

    </div>
  )
}

export default MyCampaign