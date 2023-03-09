import axios from 'axios';
import React , {useEffect , useState } from "react";
import "./Favorite.css"


const Favorite = () => {

    const [first, setFirst] = useState(null)
    const [deleteFormFavorite, setDeleteFormFavorite] = useState(false)

    useEffect(() => {
        const token =JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/favorite/${idUser}`,{ "headers": {"Authorization" : `Bearer ${token}`}}).then((res) => {
        setFirst(res.data.result);
        console.log(res.data.result)
    });
    }, [deleteFormFavorite]);

    const clickOnCampaignPage=(e)=>{
        const token =JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
        console.log(e.target.id)
        axios.delete(`http://localhost:5000/favorite/delete/${e.target.id}/${idUser}`
        ,{ "headers": {"Authorization" : `Bearer ${token}`} }).then((res) => {
            console.log(res)
            setDeleteFormFavorite(!deleteFormFavorite)
            });
        }

    const loopOnFavorite= Array.isArray(first)?first.map((element , index ) => {
        console.log(element)
        return <div key={element.favoriteCampaign._id} id={element.favoriteCampaign._id}>
        <p onClick={clickOnCampaignPage} id={element.favoriteCampaign._id}>{ element.favoriteCampaign.campaignTitle}</p>
        </div>
        
        }):null;


    return (
    <>
    <div>Favorite</div>
    <div>
        <><div className='grid-container-favorite '>{loopOnFavorite}</div></>
    </div>
    </>
    )
}

export default Favorite