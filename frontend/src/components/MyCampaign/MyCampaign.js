import PopupMyCampaignShowAndDeleteTeamMamber from '../PopupMyCampaignShowAndDeleteTeamMamber/PopupMyCampaignShowAndDeleteTeamMamber';
import PopupMyCampaignAddTeamMamber from '../PopupMyCampaignAddTeamMamber/PopupMyCampaignAddTeamMamber';
import PopupMyCampaignEdite from '../PopupMyCampaignEdite/PopupMyCampaignEdite';
import React, { createContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./MyCampaign.css";

export const UserContext = createContext();

const MyCampaign = () => {
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
    pargraphesAboutCampaign:undefined,
    loaction: [undefined, undefined],
    catgory: [undefined],
    campaignDurationDays: undefined,
    urlVideoOrImage: undefined,
    campaignPerks: undefined,
    campaignAmounts: undefined,
    darftCampaignLink: undefined,
}


  const [userDataMyCampaign, setUserDataMyCampaign] = useState(userMyCampaign)

  const { bankAccount, campaignTitle, campaignCardImage,
    pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
    urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = userDataMyCampaign


  //   const [error, setError] = useState({})
  //   const validateData=()=>{

  //   }



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




  const deletethisCampaign = (e) => {
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
      <UserContext.Provider value={{
        setmodalShowEditeMyCampaign,
        campaignDoneAndRefresh, setCampaignDoneAndRefresh, elementHolder ,
        elementHolderTeams,setElementHolderTeams ,setModalShowAddTeamMamber,setModalShowTeamMamberAndDelete,
      }}>
        <div className="TitalMyCampaign"> <h3 className="notchTitalMyCampaign">MyCampaign</h3> </div>
        {allMyCampaign ? <>{allMyCampaign.map((element, index) => {
          return (<div key={element._id} className="CampaignListMainDiv">
            <div className='FirstColume'>
            <div className='FirstRowMyCampaign'>
            <img className="myCampaignPageImg" src={element.campaignCardImage} alt="no photo found" />
            </div>
            <div className='SecondColume'>
              
            <p>campaign Title : {element.campaignTitle}</p>
            <p>campaign Amounts: ${element.campaignAmounts} </p>
            <p>bankAccount: {element.bankAccount}</p>
            <p>catgory: {element.catgory}</p>
            <p>campaign Duration Days: {element?.campaignDurationDays?.split("T")[0]}</p>
            </div>
            </div>
            <p id="pargraphesAboutCampaign">pargraphesAboutCampaign: {element?.pargraphesAboutCampaign}</p>
            <>
              <div className='SecandRowMyCampaign'>
              <Button variant="primary" id={element._id} onClick={(e) => {
                setmodalShowEditeMyCampaign(true)
                setElementHolder(e.target.id)
              }
              }>edit</Button>

              <PopupMyCampaignEdite
                show={modalShowEditeMyCampaign}
                onHide={() => setmodalShowEditeMyCampaign(false)}
              />


              <Button variant="primary" id={element._id} onClick={(e) => {
              console.log(e.target.id)
                setElementHolderTeams(e.target.id)
                setModalShowTeamMamberAndDelete(true)
                
              }
              }>show team mamber</Button>

              <PopupMyCampaignShowAndDeleteTeamMamber
                show={modalShowTeamMamberAndDelete}
                onHide={() => setModalShowTeamMamberAndDelete(false)}
              />




              <Button variant="primary" id={element._id} onClick={(e) => {
                setModalShowAddTeamMamber(true)
                setElementHolder(e.target.id)
              }
              }>add team mamber</Button>

              <PopupMyCampaignAddTeamMamber
                show={modalShowAddTeamMamber}
                onHide={() => setModalShowAddTeamMamber(false)}
              />


              <Button id={element._id} onClick={deletethisCampaign}>delete</Button><br />

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