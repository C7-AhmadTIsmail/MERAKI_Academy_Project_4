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
  const BACKEND = process.env.REACT_APP_BACKEND;
  const [first, setFirst] = useState(null)
  const [campaignPageData, setcampaignPageData] = useState(null)
  const { campaignPageShow, setCampaignPageShow ,cardTheme} = useContext(UserContext);
  const [favoriteHolder, setFavoriteHolder] = useState(null)
  const [showPlusButton, setShowPlusButton] = useState(false)
  const [ValueAchievmentPercentage, setValueAchievmentPercentage] = useState(null)
  const [theme, setTheme] = useState("light")

  if(localStorage.getItem("Theme")!=theme){
    setTheme(localStorage.getItem("Theme"))
  }
  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  useEffect(() => {
    axios.get(`${BACKEND}/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
    });

    axios.get(`${BACKEND}/contribution/get/`).then((res) => {
      setValueAchievmentPercentage(res?.data.contribution);

    });
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.get(`${BACKEND}/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
        setFavoriteHolder(res.data.result);
      });
    }

  }, [showPlusButton]);



  const clickOnCampaignPage = (e) => {
    const searchIndex = first.findIndex((campaign) => campaign._id == e.target.id);
    setcampaignPageData(first[searchIndex])
    setCampaignPageShow(true)
  }


  const addTOFavoriteFromMain = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`${BACKEND}/favorite/add/${e.target.id}/${idUser}`, "",
      { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setShowPlusButton(!showPlusButton)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const mainGeneration = first ? first.map((element, index) => {
    let checker = false
    favoriteHolder?.map((e) => {
      if (e.favoriteCampaign?._id === element?._id) {
        checker = true
      }

    })
    return <div key={element._id} className="cardStyle" >

      <Card style={{ width: '20rem',height:'379px' }} id={cardTheme}>
        <Card.Img variant="top" style={{ width: '100%',height:'239px',cursor: "pointer" }} id={element._id} onClick={clickOnCampaignPage} src={element.campaignCardImage} alt="no photo found" />
        <Card.Body>
          <Card.Title id={element._id} onClick={clickOnCampaignPage} style={{cursor: "pointer"}}  >{element.campaignTitle}</Card.Title>
          <div>
            <div className="CircularMain">
              <Percentage campaignPercentage={{ ID: element._id, ValueAchievmentPercentage, Amounts: element.campaignAmounts }} />
              {checker ? <></> : <>{idUser ? <Button onClick={addTOFavoriteFromMain} id={element._id} >+</Button> : <></>}</>}
            </div>
          </div>

        </Card.Body>
      </Card>

    </div>

  }) : null;

  return (
    <>


      <div id={theme} >
        {campaignPageShow ? <CampaignPage data={campaignPageData} /> :
          <>
            <div className="TitleMain"><h3 className="notchTitleMain">Main</h3></div>
            <div className='grid-container-main'>{mainGeneration}
            </div>
          </>}
      </div>
      <Footer />
    </>
  )
}

export default Main