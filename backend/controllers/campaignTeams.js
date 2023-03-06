
const teamsCampaignSchema =require("../models/teamsCampaignSchema");


const addteamsMamber=(req, res)=>{
    
    const  campaign  =req.params.idCampaign;
    const  {firtsName,lastName,phoneNumber,country,streetAddress} =req.body;
    
    const newCampaign = new teamsCampaignSchema(
        { campaign , teamsMember:[{firtsName,lastName,phoneNumber,country,streetAddress}] })


    teamsCampaignSchema.findOneAndUpdate(campaign,{
        $addToSet: {  teamsMember:[{firtsName,lastName,phoneNumber,country,streetAddress}] } })
    .then((result) => {
        console.log(result)
        if(!result){
        newCampaign.save().then((resultSave) => {
            console.log("1")
        res.status(201).json(
            {success: true,
            message: "Success add to team ",
            result: resultSave })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
        }else{
            console.log("2")
            res.status(201).json(
                {success: true,
                message: "Success add to team ",
                result: result })
        }
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}



const removeteamsMamber =(req, res)=>{
    const  campaign  =req.params.idCampaign;
    const {firtsName,lastName,phoneNumber,country,streetAddress} =req.body
    teamsCampaignSchema.findOneAndUpdate(campaign,{ $pull: { teamsMember:{firtsName,lastName,phoneNumber,country,streetAddress} } })
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success remove member from this campaign",
            teamsMamber: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const getAllteamsMamberForThisCampaign =(req, res)=>{
    const  campaign  =req.params.idCampaign;
    teamsCampaignSchema.find({campaign})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get all mamber for this campaign",
            teamsMamber: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}




module.exports = {  addteamsMamber , removeteamsMamber , getAllteamsMamberForThisCampaign };