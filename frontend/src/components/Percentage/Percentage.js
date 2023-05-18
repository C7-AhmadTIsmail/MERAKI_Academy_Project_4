import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react'
import "./Percentage.css"
const Percentage = ({ campaignPercentage }) => {

  let IDHolder = campaignPercentage.ID

  let holder = 0

  campaignPercentage?.ValueAchievmentPercentage?.forEach(elementArray => {

    if (IDHolder === elementArray.campaign) {

      holder += elementArray.amount
    };

  });


  return (

    <div style={{ width: 40, height: 40 }} className="Circular">
      <CircularProgressbar text={`${Math.floor((holder / campaignPercentage.Amounts) * 100)}%`}  value={(holder / campaignPercentage.Amounts) * 100} />
    </div>


  )
}

export default Percentage