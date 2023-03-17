
const teamsCampaignSchema = require("../models/teamsCampaignSchema");


const addteamsMamber = (req, res) => {

    const campaign = req.params.idCampaign;
    const { firstName, lastName, phoneNumber, country } = req.body;

    const newCampaign = new teamsCampaignSchema(
        { campaign, firstName, lastName, phoneNumber, country })

    newCampaign.save().then((resultSave) => {
        res.status(201).json(
            {
                success: true,
                message: "Success add to team ",
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


const removeteamsMamber = (req, res) => {
    const campaign = req.params.idCampaign;
    const { firstName, lastName, phoneNumber, country } = req.body.teamMamberHolder

    teamsCampaignSchema.findOneAndDelete({ campaign, firstName, lastName, phoneNumber, country })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success remove member from this campaign",
                    teamsMamber: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getAllteamsMamberForThisCampaign = (req, res) => {
    const campaign = req.params.idCampaign;
    teamsCampaignSchema.find({ campaign })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get all mamber for this campaign",
                    teamsMamber: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}




module.exports = { addteamsMamber, removeteamsMamber, getAllteamsMamberForThisCampaign };