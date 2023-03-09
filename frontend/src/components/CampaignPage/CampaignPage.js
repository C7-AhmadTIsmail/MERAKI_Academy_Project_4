import axios from 'axios';
import React , { useState } from "react";
import "./CampaignPage.css"


const CampaignPage = (props) => {
    const idUser = JSON.parse(localStorage.getItem('user'))?.user?._id 

    const commentTest={
      comment :null
    }
    
    const [userComment, setUserComment] = useState(commentTest)
    const [commentholder, setCommentholder] = useState(null)
    const { comment }=userComment
    const [error, setError] = useState({})

      const validateData=()=>{
      
      }

      const handleChamge=(e)=>{
        const {name,value}=e.target
        setUserComment((preData)=>({...preData,[name]:value}))
      }

      const addComment=()=>{
      const token =JSON.parse(localStorage.getItem('user')).token
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
      axios.post(`http://localhost:5000/comment/add/${props.data._id}/${idUser}`,userComment,{ headers: {"Authorization" : `Bearer ${token}`}} )
      .then(function (response) {
      console.log(response.data)
      })
      .catch(function (error) {
      console.log(error);
      });
      }

        const getComment=()=>{
        axios.get(`http://localhost:5000/comment/getCommentCampaign/${props.data._id}` )
        .then(function (response) {
        console.log(response.data.Comment)
        setCommentholder(response.data.Comment)
        })
        .catch(function (error) {
          console.log(error);
        });
      }

  const addtofaverts=()=>{
    const token =JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.post(`http://localhost:5000/favorite/add/${props.data._id}/${idUser}`,"",{ headers: {"Authorization" : `Bearer ${token}`}} )
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    
  return (
    <>
    <div>CampaignPage</div>
    <div className='box0'>
    {idUser?<>
    <button onClick={addtofaverts}>add to faverts</button><br/>
    <label htmlFor="comment">comment:</label><br/>
    <input name="comment" onChange={handleChamge}></input><br/>
    <button onClick={addComment}>add Comment</button><br/>
    </> :<></>}
    <button onClick={getComment}>show comment</button><br/>
    {commentholder?<>{commentholder.map((element,index)=>{
      return (<div key={index} >
              <p>{element.comment}</p>
              {(element.commenter==idUser)?
              <>
              <button className={element._id}>remove comment</button>
              <button className={element._id}>edite comment</button></>
              :<></>}
              </div>
              )
      })}</>:<></>}
    </div>
    </>
  )
}

export default CampaignPage

