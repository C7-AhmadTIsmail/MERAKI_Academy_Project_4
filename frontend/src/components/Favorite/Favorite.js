import CampaignPage from "../CampaignPage/CampaignPage";
import React, { useEffect,useContext, useState } from "react";
import Percentage from "../Percentage/Percentage";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import "./Favorite.css";
import { UserContext } from "../../App";

const Favorite = () => {
    const {cardTheme} = useContext(UserContext);
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
            setValueAchievmentPercentage(res?.data.contribution);

        });



    }, [deleteFormFavorite]);

    const clickOnCampaignPage = (e) => {
        const token = JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        axios.delete(`http://localhost:5000/favorite/delete/${e.target.id}/${idUser}`
            , { "headers": { "Authorization": `Bearer ${token}` } }).then((res) => {
                setDeleteFormFavorite(!deleteFormFavorite)
            });
    }

    const clickOnCampaignPageInnerSide = (e) => {
        const searchIndex = first.findIndex((favert) => favert.favoriteCampaign._id == e.target.id);
        setcampaignPageData(first[searchIndex].favoriteCampaign)
        setShowCampaignPageFromFavorite(true)
    }





    const loopOnFavorite = Array.isArray(first) ? first.map((element, index) => {
        
        return (<div key={element.favoriteCampaign?._id} >

            <Card style={{ width: '20rem',height:'359px' }} id={cardTheme}>
                <Card.Img  variant="top" style={{ width: '20rem',height:'239px',cursor: "pointer" }} onClick={clickOnCampaignPageInnerSide} id={element?.favoriteCampaign?._id} src={element?.favoriteCampaign?.campaignCardImage} alt="no photo found" />
                <Card.Body>
                    <Card.Title onClick={clickOnCampaignPageInnerSide} style={{cursor: "pointer"}} id={element?.favoriteCampaign?._id}>{element?.favoriteCampaign?.campaignTitle}</Card.Title>

                    <div className='MainRow'>
                        <Percentage campaignPercentage={{ ID: element.favoriteCampaign?._id, ValueAchievmentPercentage, Amounts: element.favoriteCampaign?.campaignAmounts }} />
                        <Button onClick={clickOnCampaignPage} className="removefromFavirte" variant="danger" id={element.favoriteCampaign?._id} >-</Button>
                    </div>

                </Card.Body>
            </Card>
        </div>

        )

    }) : null;




    return (
        <>
            <div>
                {showCampaignPageFromFavorite ? <>
                    <CampaignPage data={campaignPageData} />
                </> : <>
                    <div className='TitalFavorite'><h3 className='notchTitalFavorite' >Favorite</h3></div>
                    <><div><div className='grid-Container-Favorite'>{loopOnFavorite}</div></div></>
                </>}
            </div>
        </>
    )
}

export default Favorite