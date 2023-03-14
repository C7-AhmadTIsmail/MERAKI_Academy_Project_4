import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React from 'react'
import "./Percentage.css"
const Percentage = ( {campaignPercentage}) => {

let IDHolder=campaignPercentage.ID
console.log(campaignPercentage.element,"aaaaaaaaaa")
let holder=0

campaignPercentage?.ValueAchievmentPercentage?.forEach(elementArray =>
    { 
    //   console.log(IDHolder,elementArray.campaign,"aaaaaaaaaa")
        if(IDHolder===elementArray.campaign){
            // console.log(elementArray.ammount)
            holder+=elementArray.ammount
        };
    
    });
    console.log(holder/campaignPercentage.Amounts)
    
  return (
   
    <div style={{ width: 35, height: 35 }} className="Circuler">
          {/* <p  >%{holder/campaignPercentage.Amounts}%</p> */}
          <CircularProgressbar value={(holder/campaignPercentage.Amounts)*100} />
    </div>


  )
}

export default Percentage