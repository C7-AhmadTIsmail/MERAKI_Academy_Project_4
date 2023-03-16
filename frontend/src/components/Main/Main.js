import React, { useContext, useEffect, useState } from "react";
import CampaignPage from "../CampaignPage/CampaignPage"
import Percentage from "../Percentage/Percentage"
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
import Card from 'react-bootstrap/Card';
import Footer from "../Footer/Footer"
import axios from 'axios';
import "./Main.css"


const Main = () => {

  const [first, setFirst] = useState(null)
  const [campaignPageData, setcampaignPageData] = useState(null)
  const { campaignPageShow, setCampaignPageShow } = useContext(UserContext);
  const [favoriteHolder, setFavoriteHolder] = useState(null)
  const [showPlusButton, setShowPlusButton] = useState(false)
  const [ValueAchievmentPercentage, setValueAchievmentPercentage] = useState(null)

  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  useEffect(() => {
    axios.get(`http://localhost:5000/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
      // console.log(res.data.campaign)
    });

    axios.get(`http://localhost:5000/contribution/get/`).then((res) => {
    //  console.log("her mr roko",res?.data.contribution)
     setValueAchievmentPercentage(res?.data.contribution);
   
   });
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if(token){
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
      setFavoriteHolder(res.data.result);
    });
  }

}, [showPlusButton]);
  


  const clickOnCampaignPage = (e) => {
    const searchIndex = first.findIndex((campaign) => campaign._id == e.target.id);
    setcampaignPageData(first[searchIndex])
    //console.log(campaignPageData)
    setCampaignPageShow(true)
    // console.log(campaignPageShow)
  }
  //console.log(campaignPageShow)

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
    let checker=false
    favoriteHolder?.map((e)=>{
        if(e.favoriteCampaign?._id===element?._id){
          checker=true
        }

      })
    return <div key={element._id} >

{/* key={element._id} id={element._id} */}
      {/* <div onClick={clickOnCampaignPage} id={element._id} >

      <p className="titleMain"  id={element._id}>{element.campaignTitle}</p>
      <div className="ImgStyle">
      <img className="mainImg"  id={element._id} src={element.campaignCardImage} alt="no photo found" />
      </div>
      </div>
      
      <div className="CirculerMain">
      <Percentage campaignPercentage={{ID:element._id,ValueAchievmentPercentage,Amounts:element.campaignAmounts}} />
      
      </div>
      {checker?<></>:<>{idUser ? <input className="addToFavirte" onClick={addTOfaverteFromMain} id={element._id} type="button" value="+" /> : <></>}</>}
    
     */}
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" id={element._id} onClick={clickOnCampaignPage}  src={element.campaignCardImage} alt="no photo found" />
      <Card.Body>
        <Card.Title  id={element._id} onClick={clickOnCampaignPage}  >{element.campaignTitle}</Card.Title>
        <Card.Text>
          <div className="CirculerMain">
        <Percentage campaignPercentage={{ID:element._id,ValueAchievmentPercentage,Amounts:element.campaignAmounts}} />
        </div>
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
        
      {checker?<></>:<>{idUser ? <Button  onClick={addTOfaverteFromMain} id={element._id} >+</Button> : <></>}</>}
      </Card.Body>
    </Card>
    
    </div>

  }) : null;

  return (
    <>
    

      <div >
        {campaignPageShow ? <CampaignPage data={campaignPageData} /> :
        <>
        <div className="TitalMain"><h3 className="notchTitalMain">Main</h3></div>
        <div className='grid-container-main'>{mainGenration}
        </div>
        </>}
      </div>
      <Footer />
    </>
  )
}

export default Main