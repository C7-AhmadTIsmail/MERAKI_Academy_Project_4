import React, { useContext, useEffect, useState } from "react";
import CampaignPage from "../CampaignPage/CampaignPage";
import Percentage from "../Percentage/Percentage";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../../App";
import Card from 'react-bootstrap/Card';
import Footer from "../Footer/Footer";
import axios from 'axios';
import "./Main.css";


const Main = () => {

  
  const [first, setFirst] = useState(null)
  const [campaignPageData, setcampaignPageData] = useState(null)
  const { campaignPageShow, setCampaignPageShow ,cardTheme} = useContext(UserContext);
  const [favoriteHolder, setFavoriteHolder] = useState(null)
  const [showPlusButton, setShowPlusButton] = useState(false)
  const [ValueAchievmentPercentage, setValueAchievmentPercentage] = useState(null)

  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  useEffect(() => {
    axios.get(`http://localhost:5000/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
    });

    axios.get(`http://localhost:5000/contribution/get/`).then((res) => {
      setValueAchievmentPercentage(res?.data.contribution);

    });
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
        setFavoriteHolder(res.data.result);
      });
    }

  }, [showPlusButton]);



  const clickOnCampaignPage = (e) => {
    const searchIndex = first.findIndex((campaign) => campaign._id == e.target.id);
    setcampaignPageData(first[searchIndex])
    setCampaignPageShow(true)
  }


  const addTOfaverteFromMain = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/favorite/add/${e.target.id}/${idUser}`, "",
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setShowPlusButton(!showPlusButton)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const mainGenration = first ? first.map((element, index) => {
    let checker = false
    favoriteHolder?.map((e) => {
      if (e.favoriteCampaign?._id === element?._id) {
        checker = true
      }

    })
    return <div key={element._id} >

      <Card style={{ width: '20rem',height:'379px' }} id={cardTheme}>
        <Card.Img variant="top" style={{ width: '20rem',height:'239px',cursor: "pointer" }} id={element._id} onClick={clickOnCampaignPage} src={element.campaignCardImage} alt="no photo found" />
        <Card.Body>
          <Card.Title id={element._id} onClick={clickOnCampaignPage} style={{cursor: "pointer"}}  >{element.campaignTitle}</Card.Title>
          <Card.Text>
            <div className="CirculerMain">
              <Percentage campaignPercentage={{ ID: element._id, ValueAchievmentPercentage, Amounts: element.campaignAmounts }} />
              {checker ? <></> : <>{idUser ? <Button onClick={addTOfaverteFromMain} id={element._id} >+</Button> : <></>}</>}
            </div>
          </Card.Text>

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