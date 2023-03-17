import PopupCampaignPageBestContribution from '../PopupCampaignPageBestContribution/PopupCampaignPageBestContribution'
import PopupCampaignPageAddContribution from '../PopupCampaignPageAddContribution/PopupCampaignPageAddContribution'
import PopupCampaignPageMamberTeamShow from '../PopupCampaignPageMamberTeamShow/PopupCampaignPageMamberTeamShow'
import PopupCampaignPageAddComment from '../PopupCampaignPageAddComment/PopupCampaignPageAddComment'
import React, { useContext, createContext, useEffect, useState } from "react";
import Map, { Marker, GeolocateControl } from 'react-map-gl';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./CampaignPage.css";
import axios from 'axios';



export const UserContextMain = createContext();

const CampaignPage = (props) => {
  const holderAllData = props
  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  const commentTest = {
    comment: null
  }
  const contributionTest = {
    name: "",
    dateOfContribution: "",
    lastDateOfContributionCanRefund: "",
    ammount: "",
    visibility: ""
  }
  const [userComment, setUserComment] = useState(commentTest)
  const [modalShowComment, setModalShowComment] = useState(false)
  const [modalShowContribution, setModalShowContribution] = useState(false)
  const [modalShowBestContribution, setModalShowBestContribution] = useState(false)
  const [commentholder, setCommentholder] = useState(null)
  const [showComment, setShowComment] = useState(false)
  const [showCommentWord, setShowCommentWord] = useState("show Comment")
  const [editOnComment, setEditOnComment] = useState(false)
  const [contribution, setContribution] = useState(contributionTest)
  const [showcontribution, setShowcontribution] = useState(false)
  const [valeAchievment, setValeAchievment] = useState(null)
  const [addContributionShow, setAddContributionShow] = useState(false)
  const [elementOnFavriteAlreudy, setElementOnFavriteAlreudy] = useState(false)
  const [elementOnFavriteAlreudyShow, setElementOnFavriteAlreudyShow] = useState(false)
  const [modalShowTeamMamber, setmodalShowTeamMamber] = useState(false)
  const [elementHolderTeams, setElementHolderTeams] = useState(null)
  const [teamMamberHolder, setTeamMamberHolder] = useState(null)

  const [changeOnAmmount, setChangeOnAmmount] = useState(false)

  const { comment } = userComment
  const { name, dateOfContribution, lastDateOfContributionCanRefund, ammount, visibility } = contribution



  useEffect(() => {
    axios.get(`http://localhost:5000/comment/getCommentCampaign/${props.data._id}`)
      .then(function (response) {
        setCommentholder(response.data.Comment)
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`http://localhost:5000/contribution/getcontributionCampaign/${props.data._id}`)
      .then(function (response) {
        setValeAchievment(response.data.contribution)
      })
      .catch(function (error) {
        console.log(error);
      })



    const token = JSON.parse(localStorage.getItem('user'))?.token
    const idUser = JSON.parse(localStorage.getItem('user'))?.user._id
    axios.get(`http://localhost:5000/campaignTeams/${props.data._id}`).then((res) => {
      setTeamMamberHolder(res?.data?.teamsMamber)

    });

  }, [editOnComment, addContributionShow]);

  const getComment = () => {
    setShowComment(!showComment)
    if (showCommentWord === "show Comment") {
      setShowCommentWord("hide Comment")
    } else {
      setShowCommentWord("show Comment")
    }
  }

  const addtofaverts = () => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/favorite/add/${props.data._id}/${idUser}`, "", { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const removieFromFavorite = () => {

    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`http://localhost:5000/favorite/delete/${props.data._id}/${idUser}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const removecomment = (e) => {
    const idOfComment = e.target.id
    const token = JSON.parse(localStorage.getItem('user')).token
    axios.delete(`http://localhost:5000/comment/delete/${idOfComment}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        console.log(response.data)
        setEditOnComment(!editOnComment)
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  const totalDone = () => {
    const initialValue = 0;
    let g = 0
    g = valeAchievment?.reduce((accumulator, currentValue) => {
      return currentValue.ammount + accumulator
    }, initialValue);
    return (g)
  }



  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
        let holder = false
        res?.data?.result?.forEach(element => {
          if (element.favoriteCampaign?._id === props.data?._id) {
            holder = true
          }
        })
        setElementOnFavriteAlreudyShow(holder);
      });
    }
  }, [elementOnFavriteAlreudy]);

  const [holdBigContribtution, setHoldBigContribtution] = useState(null)


  let longitude = props.data?.loaction[0]
  let latitude = props.data?.loaction[1]
  // console.log(`https://www.youtube.com/embed/${props.data?.urlVideoOrImage.split('https://www.youtube.com/watch?v=')[0]}`,"sss")
  // console.log(props.data?.urlVideoOrImage.split("v=")[1].substring(0, 11),"id")

  return (
    <>
      <UserContextMain.Provider value={{
        holderAllData, userComment, setUserComment, editOnComment,
        setEditOnComment, setModalShowComment, setModalShowContribution, contribution, setContribution,
        addContributionShow, setAddContributionShow, holdBigContribtution, setHoldBigContribtution,
        elementHolderTeams, teamMamberHolder
      }}>

        <div className='CampaignPageInSideMain'>
          <div className='TitalCampaignPage'><h3 className='notchTitalCampaignPage'>CampaignPage</h3></div>
          <div className="newOne">
            <div className='ContentCampaignPage'>
              <div className="row1">
                <img className="CampaignPageImg" src={props.data?.campaignCardImage} alt="no photo found" />
              </div>
              <div className="row2">

                <Card style={{ width: '27rem' }}>
                  <ListGroup>
                    <ListGroup.Item>campaign Title: {props.data?.campaignTitle}</ListGroup.Item>
                    <ListGroup.Item>campaign Amounts: ${props.data?.campaignAmounts} /{totalDone()}</ListGroup.Item>
                    <ListGroup.Item>campaign Duration Days: {props.data?.campaignDurationDays?.split("T")[0]}</ListGroup.Item>
                    <ListGroup.Item>bank Account: {props.data?.bankAccount}</ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>

          </div>

          <div>
            {/* <iframe
            className='Video'
              src={`https://www.youtube.com/embed/${props.data?.urlVideoOrImage?.split("v=")[1].substring(0, 11)}`}
              width="350" height="250"
            ></iframe> */}


            <Card style={{ width: '17.2rem', height: 280, margin: '0 0 40px 20px' }}>

              <Card.Body style={{ padding: '14px 16px 14px 6px' }}>

                <Map style={{ width: '14.2rem', height: 240, margin: '0 0 40px 20px' }}
                  mapboxAccessToken={"pk.eyJ1IjoiYWhtYWRpc2FtaWwiLCJhIjoiY2xmYThtNThvMDE0NzN2cWdsMGFhaHZhdSJ9.hMUTU1E226JBVgx7YQm9ug"}

                  initialViewState={{
                    longitude,
                    latitude,
                    zoom: 8,
                    attributionControl: false,
                    Marker: 'center',

                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                </Map>


              </Card.Body>
            </Card>
          </div>

          <div className='OneRow'>

            {showcontribution ? <>
            </> : <>
              <Button className='shadowButton' variant="primary" onClick={() => { setmodalShowTeamMamber(true); setElementHolderTeams(props.data._id) }}>show team mamber</Button>
              <PopupCampaignPageMamberTeamShow show={modalShowTeamMamber} onHide={() => setmodalShowTeamMamber(false)} />

            </>}

            {showcontribution ? <>
            </> : <>

              <Button className='shadowButton' variant="primary" onClick={() => { setModalShowBestContribution(true) }}>best Contribution</Button>
              <PopupCampaignPageBestContribution show={modalShowBestContribution} onHide={() => setModalShowBestContribution(false)} />
            </>}



            {showcontribution ? <>
            </> : <>

              {idUser ? <>
                <Button className='shadowButton' variant="primary" onClick={() => { setModalShowContribution(true) }}>add Contribution</Button>
                <PopupCampaignPageAddContribution show={modalShowContribution} onHide={() => setModalShowContribution(false)} />
              </> : <></>}

            </>}
            {showcontribution ? <>
            </> : <>

              {idUser ? <>
                <Button variant="primary" className='shadowButton' onClick={() => { setModalShowComment(true) }}>add Comment</Button>
                <PopupCampaignPageAddComment show={modalShowComment} onHide={() => setModalShowComment(false)} />
                {elementOnFavriteAlreudyShow ? <div  > <Button className='shadowButton' variant="danger" onClick={removieFromFavorite}>removie from favorite</Button></div> : <><div  ><Button className='shadowButton' variant="primary" onClick={addtofaverts}>add to favorite</Button></div></>}
              </> : <></>}
            </>}
          </div>

          <div className='box1'>
            {showcontribution ? <>

            </> : <>
              <div className='showCommentWordButton'>
                <Button className='shadowButton' onClick={getComment}>{showCommentWord}</Button>
              </div>
              {showComment ? <>{commentholder.map((element, index) => {
                return (<div key={index} >
                  <Card style={{ width: '90%' , margin: '0px 0px 8px 20px'  }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item><h5 style={{ margin: '0px 0px 0px 6px' }}>{element.comment}</h5></ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <div className="RemoveCommentButton">
                    {(element.commenter == idUser) ? <><Button variant="danger" className='RemoveCommentButton shadowButton' id={element._id} onClick={removecomment}>Remove</Button></> : <></>}
                  </div>
                </div>
                )
              })}</> : <></>}
            </>}
          </div>
        </div>
      </UserContextMain.Provider>
    </>
  )
}

export default CampaignPage

