import PopupCampaignPageBestContribution from '../PopupCampaignPageBestContribution/PopupCampaignPageBestContribution'
import PopupCampaignPageAddContribution from '../PopupCampaignPageAddContribution/PopupCampaignPageAddContribution'
import PopupCampaignPageAddComment from '../PopupCampaignPageAddComment/PopupCampaignPageAddComment'
import React, { useContext, createContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import "./CampaignPage.css"
import axios from 'axios';


export const UserContextMain = createContext();

const CampaignPage = (props) => {
  const holderAllData = props
  console.log(props.data, "data")
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
  const [modalShowComment, setModalShowComment] = useState(false)
  const [modalShowContribution, setModalShowContribution] = useState(false)
  const [modalShowBestContribution, setModalShowBestContribution] = useState(false)
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


  }, [editOnComment, addContributionShow]);

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
          if (element.favoriteCampaign._id === props.data._id) {
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



  return (
    <>
      <UserContextMain.Provider value={{
        holderAllData, userComment, setUserComment, editOnComment,
        setEditOnComment, setModalShowComment, setModalShowContribution, contribution, setContribution,
        addContributionShow, setAddContributionShow, holdBigContribtution, setHoldBigContribtution
      }}>
        <div className='CampaignPageInSideMain'>
          <div className='TitalCampaignPage'><h3 className='notchTitalCampaignPage'>CampaignPage</h3></div>
          <div className='ContentCampaignPage'>
          <div>
            <img className="CampaignPageImg" src={props.data?.campaignCardImage} alt="no photo found" />
          </div>
          <div>
            <p>campaign Title: {props.data?.campaignTitle}</p>
            <p>campaign Amounts: ${props.data?.campaignAmounts} /{totalDone()}</p>

            <p>campaign Duration Days: {props.data?.campaignDurationDays}</p>
            <p>bank Account: {props.data?.bankAccount[0]}</p>



          </div>
          </div>
          <div className='box0'>
            {showcontribution ? <>
            </> : <>
            <div className='FirstRow'>
              {idUser ? <>
                {elementOnFavriteAlreudyShow ? <><Button variant="primary" onClick={removieFromFavorite}>removie from favorite</Button></> : <><Button variant="primary" onClick={addtofaverts}>add to favorite</Button></>}

                <Button variant="primary" onClick={() => {
                  // addComment()
                  setModalShowComment(true)
                }}>add Comment</Button>
                <PopupCampaignPageAddComment
                  show={modalShowComment}
                  onHide={() => setModalShowComment(false)} />

                <Button variant="primary" onClick={() => { setModalShowContribution(true) }}>add Contribution</Button>
                <PopupCampaignPageAddContribution
                  show={modalShowContribution}
                  onHide={() => setModalShowContribution(false)}
                />

              </> : <></>}
              </div>
              <div className='SecandRow'>
              <Button variant="primary" onClick={() => { setModalShowBestContribution(true) }}>best Contribution</Button>
              <PopupCampaignPageBestContribution
                show={modalShowBestContribution}
                onHide={() => setModalShowBestContribution(false)}
              />

              <Button onClick={getComment}>show comment</Button>
              {showComment ? <>{commentholder.map((element, index) => {
                return (<div key={index} >

                  <p>{element.comment}</p>
                  {(element.commenter == idUser) ?
                    <>
                      <Button className={element._id} onClick={removecomment}>remove comment</Button>
                      {/* <Button className={element._id}>edite comment</Button> */}

                    </> : <></>}
                </div>
                )
              })}</> : <></>}

</div>
            </>}
          </div>
        </div>
      </UserContextMain.Provider>
    </>
  )
}

export default CampaignPage

