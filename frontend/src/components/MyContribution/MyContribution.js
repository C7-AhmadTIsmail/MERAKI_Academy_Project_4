import PopupMyContrtibutionEdite from '../PopupMyContrtibutionEdite/PopupMyContrtibutionEdite';
import React, { createContext, useEffect, useState } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./MyContribution.css"
import axios from 'axios';

export const UserContext = createContext();

const MyContribution = () => {
  const BACKEND = process.env.REACT_APP_BACKEND;
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
    amount: "",
    visibility: ""
  }
  const [myContribution, setMyContribution] = useState(myContributionTest)
  const { name, dateOfContribution, lastDateOfContributionCanRefund, amount, visibility } = myContribution


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`${BACKEND}/contribution/getContributionUser/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyContribution(res.data.contribution);

      });
  }, [ContributionDoneAndRefresh]);



  const deleteThisContribution = (e) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`${BACKEND}/contribution/delete/${e.target.id}`,
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
        <div className="TitleMyContribution"><h3 className='notchTitleMyContribution'>MyContribution</h3></div>

        {allMyContribution ? <>{allMyContribution.map((element, index) => {

          let d1 = new Date(element?.lastDateOfContributionCanRefund?.split("T")[0]);
          let d2 = new Date();
          let diff = ((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)).toFixed(0)
          // console.log(d1,d2,"D",diff)
          let trueOrFalseVisibilit = "false"
          element.visibility ? trueOrFalseVisibilit = "true" : trueOrFalseVisibilit = "false";
          return (<div key={element._id} className="ContributionListMainDiv">
            <div className='MyContributionFirst'>
            <img className="myCampaignPageImg" src={element.campaign.campaignCardImage} alt="no photo found" />
              <div>

              <Card style={{ width: '25rem', marginTop: "10vh" }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>campaignTitle: {element.campaign.campaignTitle}</ListGroup.Item>
                    <ListGroup.Item>bankAccount: {element.campaign.bankAccount}</ListGroup.Item>
                    <ListGroup.Item>category: {element.campaign.category}</ListGroup.Item>
                  </ListGroup>
                </Card>


              </div>
            </div>
            <hr />
            <div className='MyContributionSecond'>
              <p>name: {element.name}</p>
              <p>amount of my Contribution: {element.amount}</p>
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


              {(diff <= 0) ? <><Button className="shadowButton" id={element._id} onClick={deleteThisContribution}>delete</Button><br /></> : <></>}
            </div>

          </div>
          )
        })}</> : <></>}
      </UserContext.Provider>
    </div>
  )
}

export default MyContribution