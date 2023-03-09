import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./MyProfile.css"


const MyProfile = () => {
  const [firstMyProfile, setFirstMyProfile] = useState(null)

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/user/getUserData/${idUser}`,
      { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
        setFirstMyProfile(res.data.result);
        // console.log(res.data.result[0],"res2")
      });
  }, []);



  return (
    <div>
      <div className="MyProfile">MyProfile</div>
      <div>

        {firstMyProfile ? <>

          <p>email: {firstMyProfile[0].email}</p>
          <p>city : {firstMyProfile[0].city}</p>
          <p>zipcode : {firstMyProfile[0].zipcode}</p>

        </> : <p>nodata</p>}

      </div>
    </div>
  )
}

export default MyProfile