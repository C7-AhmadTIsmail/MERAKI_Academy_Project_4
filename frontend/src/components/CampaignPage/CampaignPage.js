import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import "./CampaignPage.css"


const CampaignPage = (props) => {
  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  const commentTest = {
    comment: null
  }
  const contributionTest = {
    name: null,
    dateOfContribution: 0,
    lastDateOfContributionCanRefund: 0,
    ammount: 0,
    visibility: false
  }
  const [userComment, setUserComment] = useState(commentTest)
  const [commentholder, setCommentholder] = useState(null)
  const [showComment, setShowComment] = useState(false)
  const [editOnComment, setEditOnComment] = useState(false)
  const [contribution, setContribution] = useState(contributionTest)
  const [showcontribution, setShowcontribution] = useState(false)
  const [valeAchievment, setValeAchievment] = useState(null)
  const [addContributionShow, setAddContributionShow] = useState(false)
  const [elementOnFavriteAlreudy, setElementOnFavriteAlreudy] = useState(false)
  const [elementOnFavriteAlreudyShow, setElementOnFavriteAlreudyShow] = useState(false)
  const { comment } = userComment
  const { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility } = contribution


  const handle_Chamge = (e) => {
    const { name, value } = e.target
    setContribution((preData) => ({ ...preData, [name]: value }))
    //console.log(contribution)
  }


  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserComment((preData) => ({ ...preData, [name]: value }))
  }

  const addComment = () => {
    //console.log(1)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/comment/add/${props.data._id}/${idUser}`, userComment, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        // console.log(response.data)
        setEditOnComment(!editOnComment)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:5000/comment/getCommentCampaign/${props.data._id}`)
      .then(function (response) {
        // console.log(response.data.Comment)
        setCommentholder(response.data.Comment)
      })
      .catch(function (error) {
        // console.log(error);
      });
  
      axios.get(`http://localhost:5000/contribution/getcontributionCampaign/${props.data._id}` )
      .then(function (response) {
        //console.log(response)
        setValeAchievment(response.data.contribution)
      })
      .catch(function (error) {
        //console.log(error );
      })
    
  
  }, [editOnComment , addContributionShow ]);


  const getComment = () => {
    setShowComment(!showComment)

  }


  const addtofaverts = () => {
    //console.log(2)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/favorite/add/${props.data._id}/${idUser}`, "", { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
         //console.log(response.data)
         setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        // console.log(error);
      });
  }


  const removecomment = (e) => {
    console.log(3)
    const idOfComment = e.target.className
    const token = JSON.parse(localStorage.getItem('user')).token
    // console.log(idOfComment)
    axios.delete(`http://localhost:5000/comment/delete/${idOfComment}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        // console.log(response.data)
        setEditOnComment(!editOnComment)
      })
      .catch(function (error) {
        // console.log(error);
      });

  }

  const addContribution = () => {
    setShowcontribution(!showcontribution)
  }

  const submetContribution=()=>{
    console.log(4)
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    const token = JSON.parse(localStorage.getItem('user')).token
    axios.post(`http://localhost:5000/contribution/add/${props.data._id}/${idUser}`,
    { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility , }, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        console.log(response)
        // setEditOnComment(!editOnComment)
        setAddContributionShow(!addContributionShow)
        setShowcontribution(!showcontribution)    
      })
      .catch(function (error) {
        console.log(error);
      });
  }

const totalDone=()=>{
  const initialValue = 0;
    let g=0
    g=valeAchievment?.reduce((accumulator,currentValue)=>{
    return  currentValue.ammount+accumulator
  },initialValue);
  //console.log(g)
  return (g)
}

const hide=()=>{
  setShowcontribution(!showcontribution)    
}
//const [elementOnFavriteAlreudyShow, setElementOnFavriteAlreudyShow] = useState(false)
// const elmentfaverteshow=()=>{
//   console.log("------------------------------")
//   elementOnFavriteAlreudy?.forEach(element => {
//   if(element.favoriteCampaign._id===props.data._id){
//     console.log("************-**************")
//     true
//   }
// });}

useEffect(() => {
  //const [elementOnFavriteAlreudy, setElementOnFavriteAlreudy] = useState(null)
  const token = JSON.parse(localStorage.getItem('user'))?.token
  if(token){
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
  axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
  let holder=false  
  res?.data?.result?.forEach(element => {
    if(element.favoriteCampaign._id===props.data._id){
      console.log("************-**************")
      holder=true
    }
  })
  setElementOnFavriteAlreudyShow(holder);
    console.log(holder,"11111111111111111111111")
    // elmentfaverteshow()
  });
}
}, [elementOnFavriteAlreudy]);


  return (
    <>
      <div className='CampaignPageInSideMain'>
        <div>CampaignPage</div>
        <div>
          <img className="CampaignPageImg" src={props.data.campaignCardImage} alt="no photo found" />
        </div>
        <div>
          <p>campaign Title: {props.data.campaignTitle}</p>
          <p>campaign Amounts: ${props.data.campaignAmounts} /{totalDone()}</p>
          
          <p>campaign Duration Days: {props.data.campaignDurationDays}</p>
          <p>bank Account: {props.data.bankAccount[0]}</p>
          


        </div>
        <div className='box0'>
          {showcontribution?<>
            <button onClick={hide}>hide</button><br />
            <label htmlFor="name">name:</label><br />
            <input name="name" onChange={handle_Chamge}></input><br />
            <label htmlFor="ammount">ammount:</label><br />
            <input name="ammount" onChange={handle_Chamge}></input><br />
            <label htmlFor="dateOfContribution">date Of Contribution:</label><br />
            <input name="dateOfContribution" onChange={handle_Chamge}></input><br />
            <label htmlFor="lastDateOfContributionCanRefund">last Date Of Contribution Can Refund:</label><br />
            <input name="lastDateOfContributionCanRefund" onChange={handle_Chamge}></input><br />
            <label htmlFor="visibility">visibility:</label><br />
            <input name="visibility" onChange={handle_Chamge}></input><br />
            <button onClick={submetContribution}>submet</button><br />
          </>:<>
          {idUser ? <>
            {elementOnFavriteAlreudyShow?<></>:<><button onClick={addtofaverts}>add to faverts</button><br /></>}
            <label htmlFor="comment">comment:</label><br />
            <input name="comment" onChange={handleChamge}></input><br />
            <button onClick={addComment}>add Comment</button><br />
            <button onClick={addContribution}> add Contribution</button><br />
          </> : <></>}
          <button onClick={getComment}>show comment</button><br />
          {showComment ? <>{commentholder.map((element, index) => {
            return (<div key={index} >
              <br />
              <p>{element.comment}</p>
              {(element.commenter == idUser) ?
                <>
                  <button className={element._id} onClick={removecomment}>remove comment</button>
                  <button className={element._id}>edite comment</button></>
                : <></>}
            </div>
            )
          })}</> : <></>}

          
          </>}
        </div>
      </div>
    </>
  )
}

export default CampaignPage

