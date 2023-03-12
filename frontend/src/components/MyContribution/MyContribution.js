import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyContribution.css"
import axios from 'axios';


const MyContribution = () => {
  const [allMyContribution, setAllMyContribution] = useState(null)
  const [showThisSectionEditeArea, setshowThisSectionEditeArea] = useState(null)
  const [showContributionEditeArea, setShowContributionEditeArea] = useState(null)
  const [showContributionEditeAreaAndHide, setShowContributionEditeAreaAndHide] = useState(false)
  const [ContributionDoneAndRefresh, setContributionDoneAndRefresh] = useState(false)

  const myContributionTest = {
    name: null,
    dateOfContribution: 0,
    lastDateOfContributionCanRefund: 0,
    ammount: 0,
    visibility: false
  }
  const [myContribution, setMyContribution] = useState(myContributionTest)
  const {name, dateOfContribution,lastDateOfContributionCanRefund,ammount, visibility} = myContribution



  const handle_Change_myContribution = (e) => {
    const { name, value } = e.target
    setMyContribution((preData) => ({ ...preData, [name]: value }))
    //console.log(contribution)
  }



  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/contribution/getcontributionUser/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setAllMyContribution(res.data.contribution);
        console.log(res.data.contribution, "res1")
      });
  }, [ContributionDoneAndRefresh]);

const editeMyContribution=(e)=>{
  setShowContributionEditeArea(e.target.id)
  setShowContributionEditeAreaAndHide(!showContributionEditeAreaAndHide)

}



const submetEdite=(e)=>{
  const token = JSON.parse(localStorage.getItem('user')).token
  const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`http://localhost:5000/contribution/update/${e.target.id}`,{name, dateOfContribution,lastDateOfContributionCanRefund,ammount, visibility},
    { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res, "0")
        setContributionDoneAndRefresh(!ContributionDoneAndRefresh)
        });

}

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
          <button id={element._id} onClick={editeMyContribution}>edit</button><br  />
          <button id={element._id} onClick={deletethisContribution}>delete</button><br  />
          
          {showContributionEditeAreaAndHide&&showContributionEditeArea===element._id?<>
            <label htmlFor="name">name :</label><br  />
            <input name="name" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="dateOfContribution">date Of Contribution:</label><br  />
            <input name="dateOfContribution" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="lastDateOfContributionCanRefund">lastDateOfContributionCanRefund:</label><br  />
            <input name="lastDateOfContributionCanRefund" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="ammount">ammount:</label><br  />
            <input name="ammount" onChange={handle_Change_myContribution}></input><br />
            <label htmlFor="visibility">visibility:</label><br  />
            <input name="visibility" onChange={handle_Change_myContribution}></input><br />
            <button id={element._id} onClick={submetEdite}>submet</button><br  />
          
          </>:<></>} 

        </div>
        )
      })}</> : <></>}

    </div>
  )
}

export default MyContribution