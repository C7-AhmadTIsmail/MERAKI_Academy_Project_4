
 const likeSchema =require("../models/likeSchema");


const addLike=(req, res)=>{
    
    const  campaign =req.params.idCampaign;
    const  user =req.params.idUser;
    
        const newCampaign = new likeSchema({  user , campaign })

        newCampaign.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success like add",
            Comment: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getAllLike =(req, res)=>{
    likeSchema.find({})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success All comment update",
            Comment: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}



const removeLike =(req, res)=>{
    const  campaign =req.params.idCampaign;
    const  user =req.params.idUser;
    likeSchema.findOneAndDelete({campaign,user})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success comment remove",
            Comment: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const getLikeByUser =(req, res)=>{
    user=req.params.idUser
    likeSchema.find({user:user})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success all Comment for this user",
            Comment: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}

const getLikeByCampaign =(req, res)=>{
    campaign=req.params.idCampaign
    likeSchema.find({campaign:campaign})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success all Comment for this campaign",
            Comment: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}




module.exports = { addLike , getAllLike  , removeLike , getLikeByUser ,getLikeByCampaign  };