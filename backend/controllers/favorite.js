
const favoriteSchema =require("../models/favoriteSchema");


const addfavorite=(req, res)=>{
    
    const  campaign =req.params.idCampaign;
    const  commenter =req.params.idCommenter;
    const {  comment }=req.body
    
        const newCampaign = new favoriteSchema({ comment , commenter , campaign })

        newCampaign.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success comment created",
            Comment: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const removefavorite =(req, res)=>{
    id_=req.params.id

    favoriteSchema.findByIdAndDelete(id_)
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


const getfavoriteByUser =(req, res)=>{
    id_=req.params.idUser
    favoriteSchema.find({commenter:id_})
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




module.exports = { addfavorite , removefavorite , getfavoriteByUser };