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
    name: null,
    dateOfContribution: 0,
    lastDateOfContributionCanRefund: 0,
    ammount: 0,
    visibility: false
  }
  const [myContribution, setMyContribution] = useState(myContributionTest)
  const {name, dateOfContribution,lastDateOfContributionCanRefund,ammount, visibility} = myContribution


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/contribution/getcontributionUser/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyContribution(res.data.contribution);
        console.log(res.data.contribution, "res1")
      });
  }, [ContributionDoneAndRefresh]);



const deletethisContribution=(e)=>{
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
  axios.delete(`http://localhost:5000/contribution/delete/${e.target.id}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res, "0")
      setContributionDoneAndRefresh(!ContributionDoneAndRefresh)
      });

}


  return (
    <div>
      <UserContext.Provider value={{setMyContribution ,setContributionDoneAndRefresh ,
        ContributionDoneAndRefresh ,myContribution ,contributionEditeHolderData}}>
      <div className="MyContribution">MyContribution</div>

      {allMyContribution ? <>{allMyContribution.map((element, index) => {
        let trueOrFalseVisibilit="false"
        element.visibility?trueOrFalseVisibilit="true":trueOrFalseVisibilit="false";
        return (<div key={element._id} className="ContributionListMainDiv">
          <p>campaignTitle: {element.campaign.campaignTitle}</p>
          <p>bankAccount: {element.campaign.bankAccount}</p>
          <p>catgory: {element.campaign.catgory}</p>
          <p>pargraphesAboutCampaign: {element.campaign.pargraphesAboutCampaign}</p>
          <hr/>
          <p>name: {element.name}</p>
          <p>ammount of my Contribution: {element.ammount}</p>
          <p>visibility:  {trueOrFalseVisibilit}</p>
          <p>lastDateOfContributionCanRefund: {element.lastDateOfContributionCanRefund}</p>
          <hr/>

          <Button variant="primary" id={element._id} onClick={(e) => {
                setModalShowEditeMyContribution(true)
                setShowContributionHolderData(e.target.id)
              }
              }>edit</Button>

              <PopupMyContrtibutionEdite
                show={modalShowEditeMyContribution}
                onHide={() => setModalShowEditeMyContribution(false)}
              />


          <button id={element._id} onClick={deletethisContribution}>delete</button><br  />
          

        </div>
        )
      })}</> : <></>}
</UserContext.Provider>
    </div>
  )
}

export default MyContribution