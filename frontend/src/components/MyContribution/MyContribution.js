import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./MyContribution.css"
import axios from 'axios';


const MyContribution = () => {
  const [allMyContribution, setAllMyContribution] = useState(null)

  useEffect(() => {
    const token =JSON.parse(localStorage.getItem('user')).token
      const idUser = JSON.parse(localStorage.getItem('user')).user._id
    axios.get(`http://localhost:5000/contribution/getcontributionUser/${idUser}`,
    { headers: {"Authorization" : `Bearer ${token}`}}).then((res) => {
      setAllMyContribution(res.data.contribution);
      console.log(res.data.contribution,"res1")
    });
  }, []);




  return (
    <div>
      <div className="MyContribution">MyContribution</div>

      {allMyContribution?<>{allMyContribution.map((element,index)=>{
      return (<div key={element._id} className="ContributionListMainDiv">
              <p>campaignTitle: {element.campaign.campaignTitle}</p>
              <p>bankAccount: {element.campaign.bankAccount}</p>
              <p>catgory: {element.campaign.catgory}</p>
              <p>pargraphesAboutCampaign: {element.campaign.pargraphesAboutCampaign}</p>
              <p>ammount of my Contribution: {element.ammount}</p>
              </div>
              )
      })}</>:<></>}

    </div>
  )
}

export default MyContribution