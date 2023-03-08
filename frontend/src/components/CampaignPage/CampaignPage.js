import axios from 'axios';
import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "../../App";



const CampaignPage = (props) => {

    const commentTest={
      comment :null
    }

    const [userComment, setUserComment] = useState(commentTest)
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
      console.log(token ,'******************',idUser,"*******",props.data._id,"aaaaaa",userComment)

      axios.post(`http://localhost:5000/comment/add/${props.data._id}/${idUser}`,userComment,{ headers: {"Authorization" : `Bearer ${token}`}} )
      .then(function (response) {
      console.log(response.data)
      })
      .catch(function (error) {
      console.log(error);
      });
      }

        const getComment=()=>{
        const token =JSON.parse(localStorage.getItem('user')).token
        console.log(token,props.data._id )
        axios.get(`http://localhost:5000/comment/getCommentCampaign/${props.data._id}`,{ headers: {"Authorization" : `Bearer ${token}`}} )
        .then(function (response) {
        console.log(response.data)
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
    <label htmlFor="comment">comment:</label><br/>
    <input name="comment" onChange={handleChamge}></input><br/>
    <button onClick={addComment}>add Comment</button><br/>
    <button onClick={getComment}>show comment</button><br/>
    <button onClick={addtofaverts}>add to faverts</button><br/>
    </>
  )
}

export default CampaignPage
