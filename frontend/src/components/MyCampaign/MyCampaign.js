import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./MyCampaign.css"
import axios from 'axios';


const MyCampaign = () => {
  const [allMyCampaign, setAllMyCampaign] = useState(null)

  useEffect(() => {
    const token =JSON.parse(localStorage.getItem('user')).token
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/campaign/getCampaign/${idUser}`,
    { headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
      setAllMyCampaign(res.data.campaign);
      console.log(res.data.campaign,"res0")
    });
  }, []);




  return (
    <div>
      <div className="MyCampaign">MyCampaign</div>
      {allMyCampaign?<>{allMyCampaign.map((element,index)=>{
      return (<div key={element._id} className="CampaignListMainDiv">
              
              <p>{element.campaignTitle}</p>
              <p>{element.bankAccount}</p>
              <p>{element.catgory}</p>
              <p>{element.pargraphesAboutCampaign}</p>
              
              </div>
              )
      })}</>:<></>}

    </div>
  )
}

export default MyCampaign