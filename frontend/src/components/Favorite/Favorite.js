import axios from 'axios';
import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "../../App";
import "./Favorite.css"


const Favorite = () => {

    const [first, setFirst] = useState(null)
    const [deleteFormFavorite, setDeleteFormFavorite] = useState(false)

    useEffect(() => {
        const token =JSON.parse(localStorage.getItem('user')).token
        const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/favorite/${idUser}`,{ "headers": {"Authorization" : `Bearer ${token}`}}).then((res) => {
        setFirst(res.data.result[0].favoriteCampaign);
        console.log(res.data.result[0].favoriteCampaign)
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

    const loopOnFavorite=first?first.map((element , index ) => {
        return <div key={element._id} id={element._id}>
        <p onClick={clickOnCampaignPage} id={element._id}>{ element.campaignTitle}</p>
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