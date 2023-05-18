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
  const BACKEND = process.env.REACT_APP_BACKEND;
  const holderAllData = props
  const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id

  const commentTest = {
    comment: null
  }
  const contributionTest = {
    name: "",
    dateOfContribution: "",
    lastDateOfContributionCanRefund: "",
    amount: "",
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
  const { name, dateOfContribution, lastDateOfContributionCanRefund, Amount, visibility } = contribution



  useEffect(() => {
    axios.get(`${BACKEND}/comment/getCommentCampaign/${props.data._id}`)
      .then(function (response) {
        setCommentholder(response.data.Comment)
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get(`${BACKEND}/contribution/getcontributionCampaign/${props.data._id}`)
      .then(function (response) {
        setValeAchievment(response.data.contribution)
      })
      .catch(function (error) {
        console.log(error);
      })



    const token = JSON.parse(localStorage.getItem('user'))?.token
    const idUser = JSON.parse(localStorage.getItem('user'))?.user._id
    axios.get(`${BACKEND}/campaignTeams/${props.data._id}`).then((res) => {
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

  const addToFavorte = () => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`${BACKEND}/favorite/add/${props.data._id}/${idUser}`, "", { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const removeFromFavorite = () => {

    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`${BACKEND}/favorite/delete/${props.data._id}/${idUser}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const removeComment = (e) => {
    const idOfComment = e.target.id
    const token = JSON.parse(localStorage.getItem('user')).token
    axios.delete(`${BACKEND}/comment/delete/${idOfComment}`, { headers: { "Authorization": `Bearer ${token}` } })
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
      return currentValue.Amount + accumulator
    }, initialValue);
    return (g)
  }



  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.token
    if (token) {
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.get(`${BACKEND}/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
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


  let longitude = props.data?.location[0]
  let latitude = props.data?.location[1]
  // console.log(props.data)
  return (
    <>
      <UserContextMain.Provider value={{
        holderAllData, userComment, setUserComment, editOnComment,
        setEditOnComment, setModalShowComment, setModalShowContribution, contribution, setContribution,
        addContributionShow, setAddContributionShow, holdBigContribtution, setHoldBigContribtution,
        elementHolderTeams, teamMamberHolder
      }}>

        <div className='CampaignPageInSideMain'>
          <div className='TitleCampaignPage'><h3 className='notchTitleCampaignPage'>CampaignPage</h3></div>
          <div className="newOne">
            <div className='ContentCampaignPage'>
              <div className="row1">
                <img className="CampaignPageImg" src={props.data?.campaignCardImage} alt="no photo found" />
              </div>
              <div className="row2">

                <Card style={{ width: '27rem', marginLeft: "127px" }}>
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
            <Card style={{ width: '88%', marginLeft: "20px", marginBottom: "20px" }}>
              <ListGroup>
                <ListGroup.Item> {props.data?.paragraphsAboutCampaign}</ListGroup.Item>
              </ListGroup>
            </Card>


            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <iframe
                className='Video'
                src={`https://www.youtube.com/embed/${props.data?.urlVideoOrImage?.split("v=")[1].substring(0, 11)}`}
                width="350" height="250"
              ></iframe>


              <Card style={{ width: '16.2rem', height: 280, margin: '0 0 40px 20px' }}>

                <Card.Body style={{ padding: '14px 16px 14px 6px' }}>

                  <Map style={{ width: '13.2rem', height: 240, margin: '0 0 40px 20px' }}
                    mapboxAccessToken={"pk.eyJ1IjoiYWhtYWRpc2FtaWwiLCJhIjoiY2xmYThtNThvMDE0NzN2cWdsMGFhaHZhdSJ9.hMUTU1E226JBVgx7YQm9ug"}

                    initialViewState={{
                      longitude,
                      latitude,
                      zoom: 11.2,
                      attributionControl: false,
                      Marker: 'center',

                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                  >
                  </Map>


                </Card.Body>
              </Card>
            </div>

          </div>
          
          <div className='OneRow'>

            {showcontribution ? <>
            </> : <>
              <Button className='shadowButton' variant="primary" onClick={() => { setmodalShowTeamMamber(true); setElementHolderTeams(props.data._id) }}>show team member</Button>
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
                {elementOnFavriteAlreudyShow ? <div  > <Button className='shadowButton' variant="danger" onClick={removeFromFavorite}>remove from favorite</Button></div> : <><div  ><Button className='shadowButton' variant="primary" onClick={addToFavorte}>add to favorite</Button></div></>}
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
                  <Card style={{ width: '90%', margin: '0px 0px 8px 20px' }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item><h5 style={{ margin: '0px 0px 0px 6px' }}>{element.comment}</h5></ListGroup.Item>
                    </ListGroup>
                  </Card>
                  <div className="RemoveCommentButton">
                    {(element.commenter == idUser) ? <><Button variant="danger" className='RemoveCommentButton shadowButton' id={element._id} onClick={removeComment}>Remove</Button></> : <></>}
                  </div>
                </div>
                )
              })}</> : <></>}
            </>}
          </div>
          <a href={props.data?.draftCampaignLink} className="linkcapimge">Reference website</a>
        </div>
      </UserContextMain.Provider>
    </>
  )
}

export default CampaignPage

