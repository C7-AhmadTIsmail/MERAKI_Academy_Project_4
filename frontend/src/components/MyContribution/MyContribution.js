import PopupMyContrtibutionEdite from '../PopupMyContrtibutionEdite/PopupMyContrtibutionEdite';
import React, { createContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import "./MyContribution.css"
import axios from 'axios';


export const UserContext = createContext();

const MyContribution = () => {
  const [allMyContribution, setAllMyContribution] = useState(null)
  const [showThisSectionEditeArea, setshowThisSectionEditeArea] = useState(null)
  const [showContributionEditeArea, setShowContributionEditeArea] = useState(null)
  const [contributionEditeHolderData, setShowContributionHolderData] = useState(null)
  const [ContributionDoneAndRefresh, setContributionDoneAndRefresh] = useState(false)
  const [modalShowEditeMyContribution, setModalShowEditeMyContribution] = useState(false)

  const myContributionTest = {
    name: "",
    dateOfContribution: "",
    lastDateOfContributionCanRefund: "",
    ammount: "",
    visibility: ""
  }
  const [myContribution, setMyContribution] = useState(myContributionTest)
  const { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility } = myContribution


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/contribution/getcontributionUser/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyContribution(res.data.contribution);

      });
  }, [ContributionDoneAndRefresh]);



  const deletethisContribution = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`http://localhost:5000/contribution/delete/${e.target.id}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {

        setContributionDoneAndRefresh(!ContributionDoneAndRefresh)
      });

  }
  const sam = () => {


  }




  return (
    <div>
      <UserContext.Provider value={{
        setMyContribution, setContributionDoneAndRefresh,
        ContributionDoneAndRefresh, myContribution, contributionEditeHolderData
      }}>
        <div className="TitalMyContribution"><h3 className='notchTitalMyContribution'>MyContribution</h3></div>

        {allMyContribution ? <>{allMyContribution.map((element, index) => {

          let d1 = new Date(element?.lastDateOfContributionCanRefund?.split("T")[0]);
          let d2 = new Date();
          let diff = ((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
          // console.log(d1,d2,"D",diff)
          let trueOrFalseVisibilit = "false"
          element.visibility ? trueOrFalseVisibilit = "true" : trueOrFalseVisibilit = "false";
          return (<div key={element._id} className="ContributionListMainDiv">
            <div className='MyContributionfirst'>
            <img className="myCampaignPageImg" src={element.campaign.campaignCardImage} alt="no photo found" />
              <div>
              <p>campaignTitle: {element.campaign.campaignTitle}</p>
              <p>bankAccount: {element.campaign.bankAccount}</p>
              <p>catgory: {element.campaign.catgory}</p>
              </div>
            </div>
            <hr />
            <div className='MyContributionSacand'>
              <p>name: {element.name}</p>
              <p>ammount of my Contribution: {element.ammount}</p>
              <p>visibility:  {trueOrFalseVisibilit}</p>
              <p>lastDateOfContributionCanRefund: {element.lastDateOfContributionCanRefund.split("T")[0]}</p>
              <hr />
            </div>

            <div className='MyContributionThird'>

              {(diff <= 0) ? <><Button className="shadowButton" variant="primary" id={element._id} onClick={(e) => {
                setModalShowEditeMyContribution(true); setShowContributionHolderData(e.target.id)
              }}>edit</Button> </> : <></>}

              <PopupMyContrtibutionEdite
                show={modalShowEditeMyContribution}
                onHide={() => setModalShowEditeMyContribution(false)}
              />


              {(diff <= 0) ? <><Button className="shadowButton" id={element._id} onClick={deletethisContribution}>delete</Button><br /></> : <></>}
            </div>

          </div>
          )
        })}</> : <></>}
      </UserContext.Provider>
    </div>
  )
}

export default MyContribution