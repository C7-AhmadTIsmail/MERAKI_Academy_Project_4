import React from 'react'

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

    
  return (
    <div>
        <p  style={{ fontSize: "px" }}>%{campaignPercentage.Amounts}/{holder}</p>

    </div>
  )
}

export default Percentage