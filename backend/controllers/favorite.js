
const favoriteSchema = require("../models/favoriteSchema");


const addFavorite = (req, res) => {

    const favoriteCampaign = req.params.idCampaign;
    const user = req.params.idUser;

    const newCampaign = new favoriteSchema({ user, favoriteCampaign })

    newCampaign.save().then((resultSave) => {
        res.status(201).json(
            {
                success: true,
                message: "Success add to favorite created",
                result: resultSave
            })
    })
        .catch((err) => {
            res.status(400).json(
                {
                    success: false,
                    message: err
                })
        });
}




const removeFavorite = (req, res) => {
    const user = req.params.idUser
    const favoriteCampaign = req.params.idCampaign
    favoriteSchema.deleteMany({ user, favoriteCampaign })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success remove favorite",
                    result: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getFavoriteByUser = (req, res) => {
    const user = req.params.idUser
    favoriteSchema.find({ user }).populate("favoriteCampaign")
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success all favorite for this user",
                    result: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}




module.exports = { addFavorite, removeFavorite, getFavoriteByUser };