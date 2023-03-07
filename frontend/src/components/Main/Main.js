import axios from 'axios';
import React , {useContext ,useEffect , useState } from "react";
import { useNavigate  } from "react-router-dom";
import { UserContext } from "../../App";




const Main = () => {

  const [first, setFirst] = useState(null)
const [campaignPage, setCampaignPage] = useState(false)
  useEffect(() => {
    axios.get(`http://localhost:5000/campaign/get`).then((res) => {
      setFirst(res.data.campaign);
      // console.log(res.data.campaign)
    });
  }, []);
  
  const clickOnCampaignPage=(e)=>{
  
  }

    const mainGenration=first?first.map((element , index ) => {
    return <div key={element._id}>
      <p onClick={clickOnCampaignPage} key={element._id}>{ element.campaignTitle}</p>
    </div>
    
    }):null;

  return (
    <>
    <div style={{ marginTop: "8px" }}>Main</div>
    <div>
    {mainGenration}
    </div>
    </>
  )
}

export default Main