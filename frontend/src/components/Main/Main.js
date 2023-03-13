import React, { useContext, useEffect, useState } from "react";
import CampaignPage from "../CampaignPage/CampaignPage"
import { UserContext } from "../../App";
import Footer from "../Footer/Footer"
import axios from 'axios';
import "./Main.css"


const Main = () => {

  const [first, setFirst] = useState(null)
  const [campaignPageData, setcampaignPageData] = useState(null)
  const { campaignPageShow, setCampaignPageShow } = useContext(UserContext);
  const [favoriteHolder, setFavoriteHolder] = useState(null)
  const [showPlusButton, setShowPlusButton] = useState(false)

  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  useEffect(() => {
    axios.get(`http://localhost:5000/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
      // console.log(res.data.campaign)
    });

    const token = JSON.parse(localStorage.getItem('user'))?.token
    if(token){
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
      setFavoriteHolder(res.data.result);
    });
  }}, [showPlusButton]);
  


  const clickOnCampaignPage = (e) => {
    const searchIndex = first.findIndex((campaign) => campaign._id == e.target.id);
    setcampaignPageData(first[searchIndex])
    console.log(campaignPageData)
    setCampaignPageShow(true)
    // console.log(campaignPageShow)
  }
  console.log(campaignPageShow)

  const addTOfaverteFromMain = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/favorite/add/${e.target.id}/${idUser}`, "",
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        // console.log(response.data)
        setShowPlusButton(!showPlusButton)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  const mainGenration = first ? first.map((element, index) => {
  // console.log(element)
    let checker=false
    favoriteHolder?.map((e)=>{
        // console.log(e.favoriteCampaign._id)
        if(e.favoriteCampaign._id===element._id){
          checker=true
        }

      })
    return <div key={element._id} id={element._id}>
      <div onClick={clickOnCampaignPage} id={element._id} >
        <p className="titleMain"  id={element._id}>{element.campaignTitle}</p>
        <img className="mainImg"   id={element._id} src={element.campaignCardImage} alt="no photo found" /><br />
      </div>
        {checker?<></>:<>
        
      {idUser ? <input className="addToFavirte" onClick={addTOfaverteFromMain} id={element._id} type="button" value="+" /> : <></>}
        </>}

    </div>

  }) : null;

  return (
    <>
      <div className="TitalMain">Main</div>

      <div >
        {campaignPageShow ? <CampaignPage data={campaignPageData} /> :
         <div className='grid-container-main'>{mainGenration}</div>}
      </div>
      <Footer />
    </>
  )
}

export default Main