
const campaignSchema = require("../models/campaignSchema");
const favoriteSchema = require("../models/favoriteSchema");
const contributionSchema = require("../models/contributionSchema");

const addCampaign = (req, res) => {


    const campaigner = req.token._id

    const { bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = req.body

    const newCampaign = new campaignSchema({
        bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink, campaigner
    })

    newCampaign.save().then((result) => {
        res.status(201).json(
            {
                success: true,
                message: "Success Campaign created",
                role: result
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


const getAllCampaign = (req, res) => {

    campaignSchema.find({})
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success role update",
                    campaign: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const updateCampaign = (req, res) => {
    id_ = req.params.id
    const { bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink } = req.body


    campaignSchema.findByIdAndUpdate(id_, {
        bankAccount, campaignTitle, campaignCardImage,
        pargraphesAboutCampaign, loaction, catgory, campaignDurationDays,
        urlVideoOrImage, campaignPerks, campaignAmounts, darftCampaignLink
    })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success campaign update",
                    campaign: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const removeCampaign = (req, res) => {
    const id_ = req.params.id

    campaignSchema.findByIdAndDelete(id_)
        .then((result_0) => {
            favoriteSchema.deleteMany({ favoriteCampaign: id_ })
                .then((result_1) => {
                    contributionSchema.deleteMany({ campaign: id_ })
                        .then((result_2) => {
                            res.status(200).json(
                                {
                                    success: true,
                                    message: "Success campaign remove & Success remove favorite all user and delete all contribution",
                                    result_0: result_0,
                                    result_1: result_1,
                                    result_2: result_2,
                                })
                        }).catch((err) => {
                            res.status(500).json(
                                {
                                    success: false,
                                    message: err
                                })
                        });
                }).catch((err) => {
                    res.status(500).json(
                        {
                            success: false,
                            message: err
                        })
                });
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}

//
const getCampaignByOriginter = (req, res) => {
    id_ = req.params.id

    campaignSchema.find({ campaigner: id_ })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success all campaign for this user",
                    campaign: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


module.exports = { addCampaign, getAllCampaign, updateCampaign, removeCampaign, getCampaignByOriginter };