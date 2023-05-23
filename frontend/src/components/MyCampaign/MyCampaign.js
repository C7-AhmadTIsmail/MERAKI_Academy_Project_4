import PopupMyCampaignShowAndDeleteTeamMamber from '../PopupMyCampaignShowAndDeleteTeamMamber/PopupMyCampaignShowAndDeleteTeamMamber';
import PopupMyCampaignAddTeamMamber from '../PopupMyCampaignAddTeamMamber/PopupMyCampaignAddTeamMamber';
import PopupMyCampaignEdite from '../PopupMyCampaignEdite/PopupMyCampaignEdite';
import React, { createContext, useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import "./MyCampaign.css";

export const UserContext = createContext();

const MyCampaign = ({pass}) => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const [allMyCampaign, setAllMyCampaign] = useState(null)
  const [showThisSectionEditeArea, setshowThisSectionEditeArea] = useState(null)
  const [modalShowEditeMyCampaign, setmodalShowEditeMyCampaign] = useState(false)
  const [modalShowAddTeamMamber, setModalShowAddTeamMamber] = useState(false)
  const [modalShowTeamMamberAndDelete, setModalShowTeamMamberAndDelete] = useState(false)
  const [elementHolder, setElementHolder] = useState(null)
  const [elementHolderTeams, setElementHolderTeams] = useState(null)


  const userMyCampaign = {
    bankAccount: undefined,
    campaignTitle: undefined,
    campaignCardImage: undefined,
    paragraphsAboutCampaign: undefined,
    location: [undefined, undefined],
    category: [undefined],
    campaignDurationDays: undefined,
    urlVideoOrImage: undefined,
    campaignPerks: undefined,
    campaignAmounts: undefined,
    draftCampaignLink: undefined,
  }


  const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyCampaign)

  const { bankAccount, campaignTitle, campaignCardImage,
    paragraphsAboutCampaign, location, category, campaignDurationDays,
    urlVideoOrImage, campaignPerks, campaignAmounts, draftCampaignLink } = userDataMyCampaign


  //   const [error, setError] = useState({})
  //   const validateData=()=>{

  //   }



  const [campaignDoneAndRefresh, setCampaignDoneAndRefresh] = useState(false)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`${BACKEND}/campaign/getCampaign/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyCampaign(res.data.campaign);
        console.log(res.data.campaign, "res0")
      });
  }, [campaignDoneAndRefresh]);




  const deleteThisCampaign = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`${BACKEND}/campaign/delete/${e.target.id}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res, "0")
        setCampaignDoneAndRefresh(!campaignDoneAndRefresh)
      });

  }



  return (
    <div id={pass}>
      <UserContext.Provider value={{
        setmodalShowEditeMyCampaign,
        campaignDoneAndRefresh, setCampaignDoneAndRefresh, elementHolder,
        elementHolderTeams, setElementHolderTeams, setModalShowAddTeamMamber, setModalShowTeamMamberAndDelete,
      }}>
        <div className="TitleMyCampaign"> <h3 className="notchTitleMyCampaign">MyCampaign</h3> </div>
        {allMyCampaign ? <>{allMyCampaign.map((element, index) => {
          let d1 = new Date(element?.campaignDurationDays?.split("T")[0]);
          let d2 = new Date();
          let diff = ((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
          // console.log(d1,d2,"D",diff)

          return (<div key={element._id} className="CampaignListMainDiv">
            <div className='FirstColumn'>
              <div className='FirstRowMyCampaign'>
                <img className="myCampaignPageImg" src={element.campaignCardImage} alt="no photo found" />
              </div>
              <div className='SecondColumn'>


                <Card style={{ width: '25rem', marginTop: "10vh" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>campaign Title : {element.campaignTitle}</ListGroup.Item>
                    <ListGroup.Item>campaign Amounts: ${element.campaignAmounts} </ListGroup.Item>
                    <ListGroup.Item>bankAccount: {element.bankAccount}</ListGroup.Item>
                    <ListGroup.Item>campaign Duration Days: {element?.campaignDurationDays?.split("T")[0]}</ListGroup.Item>

                  </ListGroup>
                </Card>
              </div>
              <div className='thirdColumn'>


                <Card style={{ width: '25rem', marginTop: "1vh" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>campaign Title : {element.campaignTitle}</ListGroup.Item>
                    <ListGroup.Item>campaign Amounts: ${element.campaignAmounts} </ListGroup.Item>
                    <ListGroup.Item>bankAccount: {element.bankAccount}</ListGroup.Item>
                    <ListGroup.Item>campaign Duration Days: {element?.campaignDurationDays?.split("T")[0]}</ListGroup.Item>

                  </ListGroup>
                </Card>



              </div>
            </div>
            <p id="paragraphsAboutCampaign">paragraph About Campaign: {element?.paragraphsAboutCampaign}</p>
            <>
              <div className='SecondRowMyCampaign'>
                {(diff <= 0) ? <>   <Button variant="primary" className="shadowButton" id={element._id} onClick={(e) => {
                  setmodalShowEditeMyCampaign(true)
                  setElementHolder(e.target.id)
                }
                }>edit</Button></> : <></>}

                <PopupMyCampaignEdite
                  show={modalShowEditeMyCampaign}
                  onHide={() => setmodalShowEditeMyCampaign(false)}
                />


                <Button variant="primary" className="shadowButton" id={element._id} onClick={(e) => {
                  console.log(e.target.id)
                  setElementHolderTeams(e.target.id)
                  setModalShowTeamMamberAndDelete(true)

                }
                }>show team member</Button>

                <PopupMyCampaignShowAndDeleteTeamMamber
                  show={modalShowTeamMamberAndDelete}
                  onHide={() => setModalShowTeamMamberAndDelete(false)}
                />




                <Button variant="primary" className="shadowButton" id={element._id} onClick={(e) => {
                  setModalShowAddTeamMamber(true)
                  setElementHolder(e.target.id)
                }
                }>add team member</Button>

                <PopupMyCampaignAddTeamMamber
                  show={modalShowAddTeamMamber}
                  onHide={() => setModalShowAddTeamMamber(false)}
                />


                {(diff <= 0) ? <> <Button className="shadowButton" id={element._id} onClick={deleteThisCampaign}>delete</Button><br /></> : <></>}

              </div>
            </>
          </div>
          )
        })}</> : <></>}
      </UserContext.Provider>
    </div>
  )
}

export default MyCampaign