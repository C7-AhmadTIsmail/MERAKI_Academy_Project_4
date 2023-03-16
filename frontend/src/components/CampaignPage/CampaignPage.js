import PopupCampaignPageBestContribution from '../PopupCampaignPageBestContribution/PopupCampaignPageBestContribution'
import PopupCampaignPageAddContribution from '../PopupCampaignPageAddContribution/PopupCampaignPageAddContribution'
import PopupCampaignPageMamberTeamShow from '../PopupCampaignPageMamberTeamShow/PopupCampaignPageMamberTeamShow'
import PopupCampaignPageAddComment from '../PopupCampaignPageAddComment/PopupCampaignPageAddComment'
import React, { useContext, createContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./CampaignPage.css";
import axios from 'axios';
import Map , {Marker ,GeolocateControl}  from 'react-map-gl';
import Card from 'react-bootstrap/Card';




export const UserContextMain = createContext();

const CampaignPage = (props) => {
  const holderAllData = props
  console.log(props.data, "data")
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
        // console.log(response.data.Comment)
        setCommentholder(response.data.Comment)
      })
      .catch(function (error) {
        // console.log(error);
      });

    axios.get(`http://localhost:5000/contribution/getcontributionCampaign/${props.data._id}`)
      .then(function (response) {
        //console.log(response)
        setValeAchievment(response.data.contribution)
      })
      .catch(function (error) {
        //console.log(error );
      })


    console.log(7)
    const token = JSON.parse(localStorage.getItem('user'))?.token
    const idUser = JSON.parse(localStorage.getItem('user'))?.user._id
    axios.get(`http://localhost:5000/campaignTeams/${props.data._id}`).then((res) => {
      console.log(res.data.teamsMamber, "************************************************************0")
      setTeamMamberHolder(res?.data?.teamsMamber)
      console.log(8)

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
  const removieFromFavorite = () => {
    //console.log(2)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.delete(`http://localhost:5000/favorite/delete/${props.data._id}/${idUser}`, { headers: { "Authorization": `Bearer ${token}` } })
      .then(function (response) {
        //console.log(response.data)
        setElementOnFavriteAlreudy(!elementOnFavriteAlreudy)


      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  const removecomment = (e) => {
    //console.log(3)
    const idOfComment = e.target.id
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


  const totalDone = () => {
    const initialValue = 0;
    let g = 0
    g = valeAchievment?.reduce((accumulator, currentValue) => {
      return currentValue.ammount + accumulator
    }, initialValue);
    //console.log(g)
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
            //console.log("************-**************")
            holder = true
          }
        })
        setElementOnFavriteAlreudyShow(holder);
        //console.log(holder, "11111111111111111111111")
        // elmentfaverteshow()
      });
    }
  }, [elementOnFavriteAlreudy]);

  const [holdBigContribtution, setHoldBigContribtution] = useState(null)



// console.log(props.data.loaction[0] )
let longitude =props.data?.loaction[0]
let latitude =props.data?.loaction[1]
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
                <p>campaign Title: {props.data?.campaignTitle}</p>
                <p>campaign Amounts: ${props.data?.campaignAmounts} /{totalDone()}</p>

                <p>campaign Duration Days: {props.data?.campaignDurationDays?.split("T")[0]}</p>
                <p>bank Account: {props.data?.bankAccount}</p>
              </div>
            </div>

            </div>

            <div>
              {/* <iframe
            className='Video'
              src={`https://www.youtube.com/embed/${props.data?.urlVideoOrImage?.split("v=")[1].substring(0, 11)}`}
              width="350" height="250"
            ></iframe> */}


<Card style={{ width: '17.2rem' , height: 280 ,margin: '0 0 40px 20px'}}>
      
      <Card.Body style={{  padding:'14px 16px 14px 6px' }}>
      
      <Map style={{ width: '14.2rem' , height: 240 ,margin: '0 0 40px 20px'}}
              mapboxAccessToken={"pk.eyJ1IjoiYWhtYWRpc2FtaWwiLCJhIjoiY2xmYThtNThvMDE0NzN2cWdsMGFhaHZhdSJ9.hMUTU1E226JBVgx7YQm9ug"}

              initialViewState={{
              longitude ,
              latitude ,
              zoom: 8,
              attributionControl: false,
              Marker:'center',
              
              }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
               {/* <Marker longitude={longitude} latitude={latitude}  anchor='top'  >

                </Marker>
                <GeolocateControl/> */}
               </Map>
     
           
      </Card.Body>
    </Card>



    

    </div>











         
          <div className='OneRow'>
         
                {showcontribution ? <>
                </> : <>
                  <Button variant="primary" onClick={() => { setmodalShowTeamMamber(true); setElementHolderTeams(props.data._id) }}>show team mamber</Button>
                  <PopupCampaignPageMamberTeamShow show={modalShowTeamMamber} onHide={() => setmodalShowTeamMamber(false)} />

                </>}
             
                {showcontribution ? <>
                </> : <>

                  <Button variant="primary" onClick={() => { setModalShowBestContribution(true) }}>best Contribution</Button>
                  <PopupCampaignPageBestContribution show={modalShowBestContribution} onHide={() => setModalShowBestContribution(false)} />
                </>}
           
                {showcontribution ? <>
                </> : <>

                  {idUser ? <>
                    {elementOnFavriteAlreudyShow ? <div  > <Button variant="primary" onClick={removieFromFavorite}>removie from favorite</Button></div> : <><div  ><Button variant="primary" onClick={addtofaverts}>add to favorite</Button></div></>}
                    <Button  variant="primary" onClick={() => { setModalShowComment(true) }}>add Comment</Button>
                    <PopupCampaignPageAddComment show={modalShowComment} onHide={() => setModalShowComment(false)} />
                  </> : <></>}
                </>}

             

                {showcontribution ? <>
                </> : <>

                  {idUser ? <>
                    <Button  variant="primary" onClick={() => { setModalShowContribution(true) }}>add Contribution</Button>
                    <PopupCampaignPageAddContribution show={modalShowContribution} onHide={() => setModalShowContribution(false)} />
                  </> : <></>}

                </>}

             
           
          </div>

          <div className='box1'>
            {showcontribution ? <>

            </> : <>
              <div className='showCommentWordButton'>
                <Button onClick={getComment}>{showCommentWord}</Button>
              </div>
              {showComment ? <>{commentholder.map((element, index) => {
                return (<div key={index} >

                  <h4>{element.comment}</h4>
                  <div className="RemoveCommentButton">
                    {(element.commenter == idUser) ? <><Button className='RemoveCommentButton' id={element._id} onClick={removecomment}>remove comment</Button></> : <></>}
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

