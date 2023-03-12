import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./MyProfile.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyProfile = () => {
  const [firstMyProfile, setFirstMyProfile] = useState(null)
  const [photoedit, setPhotoedit] = useState(false)
  const [profileEdite, setProfileEdite] = useState(false)
  const [editePasswordVlue, seteditePasswordVlue] = useState(false)

  const usertest = {
    name: undefined,
    age: undefined,
    phoneNumber: undefined,
    zipcode: undefined,
    country: undefined,
    urlMyPhoto: undefined,
  }
  const [userData, setUserData] = useState(usertest)
  const {  name, age, country, phoneNumber, zipcode, urlMyPhoto } = userData


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/user/getUserData/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setFirstMyProfile(res.data.result);
        // console.log(res.data.result[0],"res2")
      });
  }, [photoedit, profileEdite, editePasswordVlue]);



  const showButtonToEditePhoto = () => {
    setPhotoedit(!photoedit)
    seteditePasswordVlue(false)
    setProfileEdite(false)
  }
  const handleChamge = (e) => {
    const { name, value } = e.target
    setUserData((preData) => ({ ...preData, [name]: value }))
  }

  const submetNewData = () => {
    setPhotoedit(false)
    seteditePasswordVlue(false)
    setProfileEdite(false)
    console.log(userData)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`http://localhost:5000/user/update/${idUser}`, {name, age, country, phoneNumber, zipcode },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res)
      });
  }
  const submetNewPhtoto = () => {
    setPhotoedit(false)
    seteditePasswordVlue(false)
    setProfileEdite(false)
    console.log(userData)
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.put(`http://localhost:5000/user/update/${idUser}`, { urlMyPhoto: urlMyPhoto },
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        console.log(res)
      });
  }

  const editProfile = () => {
    setProfileEdite(!profileEdite)
    seteditePasswordVlue(false)
    setPhotoedit(false)
  }

  // const editPassword = () => {
  //   seteditePasswordVlue(!editePasswordVlue)
  //   setProfileEdite(false)
  //   setPhotoedit(false)
  // }


  return (
    <div>
      <div className="MyProfile">MyProfile</div>
      <div>

        {firstMyProfile ? <>

          <div className="flex">
            <div id="wrapper">
              <div id="image_div">

                <p className="img_wrapper">

                  <img className="MyProfileImg" src={firstMyProfile[0].urlMyPhoto} alt="no photo found" />
                  <span><input onClick={showButtonToEditePhoto} type="button" value="+" /></span>
                </p>

              </div>
            </div>
          
      

            <div className="f2">
              <p>name : {firstMyProfile[0].name}</p>
              <p>email: {firstMyProfile[0].email}</p>
              <p>age: {firstMyProfile[0].age}</p>
              <p>country: {firstMyProfile[0].country}</p>
              <p>zipcode : {firstMyProfile[0].zipcode}</p>
              <p>phoneNumber : {firstMyProfile[0].phoneNumber}</p>
            </div>
          </div>
        </> : <p>noData</p>}
      </div>
      {
        photoedit ? <>
          <label htmlFor="urlMyPhoto" >url my photo:</label><br />
          <input name="urlMyPhoto" type="url" placeholder="your url as link" onChange={handleChamge}></input><br />
          <button className='submetNewButton' onClick={submetNewPhtoto}>submet</button>
        </> : <></>
      }
      <br />
      <button className='submetNewButton' onClick={editProfile}>edit Profile</button>
      {/* <button className='submetNewButton' onClick={editPassword}>edit Password</button><br /> */}
      <Button variant="primary" >
        Launch static backdrop modal
      </Button>
      
      {
        profileEdite ? <>
          <form onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="name" >name: </label><br />
          <input name="name" required placeholder="your full name" onChange={handleChamge}></input><br />
          <label htmlFor="age" >age:</label><br />
          <input name="age" type="number" required placeholder="your age" onChange={handleChamge}></input><br />
          <label htmlFor="country" >country:</label><br />
          <input name="country" required placeholder="your country" onChange={handleChamge}></input><br />
          <label htmlFor="phoneNumber" >phone namber:</label><br />
          <input name="phoneNumber" required pattern="[1-9]{1}[0-9]{8,12}" placeholder="no leading zero" onChange={handleChamge}></input><br />
          <label htmlFor="zipcode" >zibcode:</label><br />
          <input name="zipcode" required placeholder="your zipcode" onChange={handleChamge}></input><br />
          <button className='submetNewButton' onClick={submetNewData}>submet</button>
        
          </form>
        </> : <></>
      }
      {/* {
        editePasswordVlue ? <>
          <label htmlFor="password" >new password enter:</label><br />
          <input name="password" type="url" placeholder="new password" onChange={handleChamge}></input><br />
          <button className='submetNewButton' onClick={submetNewData}>submet</button>
        </> : <></>
      } */}
    </div>
  )
}

export default MyProfile





