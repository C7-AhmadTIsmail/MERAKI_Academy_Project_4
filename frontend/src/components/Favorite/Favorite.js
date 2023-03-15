import axios from 'axios';
import React, { useEffect, useState } from "react";
import CampaignPage from "../CampaignPage/CampaignPage"
import Percentage from "../Percentage/Percentage"
import "./Favorite.css"


const Favorite = () => {

    const [first, setFirst] = useState(null)
    const [deleteFormFavorite, setDeleteFormFavorite] = useState(false)
    const [showCampaignPageFromFavorite, setShowCampaignPageFromFavorite] = useState(false)
    const [campaignPageData, setcampaignPageData] = useState(null)
    const [ValueAchievmentPercentage, setValueAchievmentPercentage] = useState(null)
   
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.get(`http://localhost:5000/favorite/${idUser}`, { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
            setFirst(res.data.result);
        });
        axios.get(`http://localhost:5000/contribution/get/`).then((res) => {
            //  console.log("her mr roko",res?.data.contribution)
             setValueAchievmentPercentage(res?.data.contribution);
           
           });



    }, [deleteFormFavorite]);

    const clickOnCampaignPage = (e) => {
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.delete(`http://localhost:5000/favorite/delete/${e.target.id}/${idUser}`
            , { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
                console.log(res)
                setDeleteFormFavorite(!deleteFormFavorite)
            });
    }

    const clickOnCampaignPageInnerSide = (e) => {
        const searchIndex = first.findIndex((favert) => favert.favoriteCampaign._id == e.target.id);
        setcampaignPageData(first[searchIndex].favoriteCampaign)
        //console.log(first[searchIndex].favoriteCampaign,"xxxxxxxxxxxxxxxxxxxx")
        setShowCampaignPageFromFavorite(true)
        // console.log(campaignPageShow)
    }





    const loopOnFavorite = Array.isArray(first) ? first.map((element, index) => {
        console.log("mytarget all data campane" , element)
        return <div key={element.favoriteCampaign?._id} id={element.favoriteCampaign?._id}>
            <div onClick={clickOnCampaignPageInnerSide} key={element.favoriteCampaign._id}>
            <p className='titlefaverte' id={element?.favoriteCampaign?._id}>{element?.favoriteCampaign?.campaignTitle}</p>
            <img className="faverteImg" id={element?.favoriteCampaign?._id} src={element?.favoriteCampaign?.campaignCardImage} alt="no photo found" /><br />
            </div>
        <div className='MainRow'>
            <Percentage campaignPercentage={{ID:element.favoriteCampaign?._id,ValueAchievmentPercentage,Amounts:element.favoriteCampaign?.campaignAmounts}} />
            <input onClick={clickOnCampaignPage} className="removefromFavirte"  id={element.favoriteCampaign?._id} type="button" value="-" />
        </div>
       
        </div>

    }) : null;




    return (
        <>
            <div>
                {showCampaignPageFromFavorite?<>
                <CampaignPage data={campaignPageData} />
                </>:<>
                <div className='TitalFavorite'><h3 className='notchTitalFavorite' >Favorite</h3></div>
                <><div className='grid-container-favorite '>{loopOnFavorite}</div></>
                </>}
            </div>
        </>
    )
}

export default Favorite