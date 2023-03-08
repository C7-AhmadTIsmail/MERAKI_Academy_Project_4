import axios from 'axios';
import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "../../App";
import CampaignPage from "../CampaignPage/CampaignPage"
import "./Main.css"


const Main = () => {

  const [first, setFirst] = useState(null)
  const [campaignPageData, setcampaignPageData] = useState(null)
  const {campaignPageShow, setCampaignPageShow} = useContext(UserContext);
  

  useEffect(() => {
    axios.get(`http://localhost:5000/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
      // console.log(res.data.campaign)
    });
  }, []);
  
  const clickOnCampaignPage=(e)=>{
    const searchIndex = first.findIndex((campaign) => campaign._id==e.target.id);
    setcampaignPageData(first[searchIndex])
    console.log(campaignPageData)
    setCampaignPageShow(true)
  }

    const mainGenration=first?first.map((element , index ) => {
    return <div key={element._id} id={element._id}>
      <p onClick={clickOnCampaignPage} id={element._id}>{ element.campaignTitle}</p>
    </div>
    
    }):null;

  return (
    <>
    <div style={{ marginTop: "20px" }}>Main</div>
    <div > 
    {campaignPageShow?  <CampaignPage data={campaignPageData}/>:<div className='grid-container-main'>{mainGenration}</div>}
    </div>
    </>
  )
}

export default Main