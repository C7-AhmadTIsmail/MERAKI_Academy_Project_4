import React, { createContext, useEffect, useState } from "react";
import PopupEditeMyPhoto from '../PopupEditeMyPhoto/PopupEditeMyPhoto'
import PopupEditeMyData from '../PopupEditeMyData/PopupEditeMyData'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "./MyProfile.css"


export const UserContext = createContext();

const MyProfile = () => {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const [firstMyProfile, setFirstMyProfile] = useState(null)
  const [editePasswordVlue, seteditePasswordVlue] = useState(false)
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowPhoto, setModalShowPhoto] = React.useState(false);

  const [PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation] = useState(false)

  const userTest = {
    name: undefined,
    age: undefined,
    phoneNumber: undefined,
    zipCode: undefined,
    country: undefined,
    urlMyPhoto: undefined,
  }
  const [userData, setUserData] = useState(userTest)
  const { name, age, country, phoneNumber, zipCode, urlMyPhoto } = userData


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user?._id
    axios.get(`${BACKEND}/user/getUserData/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setFirstMyProfile(res.data.result);

      });
  }, [editePasswordVlue, PopupEditeMyDataAnotherLocation]);



  const showButtonToEditePhoto = () => {

    seteditePasswordVlue(false)
  }


  const editProfile = () => {
    seteditePasswordVlue(false)

  }



  return (
    <UserContext.Provider value={{
      seteditePasswordVlue, setModalShow, setModalShowPhoto,
      PopupEditeMyDataAnotherLocation, setPopupEditeMyDataAnotherLocation
    }}>
      <div className="MyPage">
        <div className="TitleMyProfile"><h3 className="notchTitleMyCampaign">MyProfile</h3></div>
        <div>

          {firstMyProfile ? <>

            <div className="flex">
              <div id="wrapper">
                <div id="image_div">

                  <p className="img_wrapper">

                    <img className="MyProfileImg" src={firstMyProfile[0].urlMyPhoto} alt="no photo found" />
                    <span><input onClick={() => {
                      showButtonToEditePhoto()
                      setModalShowPhoto(true)
                    }} type="button" value="+" /></span>
                  </p>

                </div>
              </div>



              <div className="f2">
                <p>name : {firstMyProfile[0].name}</p>
                <p>email: {firstMyProfile[0].email}</p>
                <p>age: {firstMyProfile[0].age.split("T")[0]}</p>
                <p>country: {firstMyProfile[0].country}</p>
                <p>zipCode : {firstMyProfile[0].zipCode}</p>
                <p>phoneNumber : {firstMyProfile[0].phoneNumber}</p>
              </div>
            </div>
          </> : <p>noData</p>}
        </div>
        <div className="ButtonEitProfile" >
          <Button variant="primary" className="ButtonEditProfile" onClick={() => {
            editProfile()
            setModalShow(true)
          }}>edit Profile</Button>
        </div>
        <PopupEditeMyData
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <PopupEditeMyPhoto show={modalShowPhoto}
          onHide={() => setModalShowPhoto(false)} />
      </div>
    </UserContext.Provider>
  )
}

export default MyProfile





