
const teamsCampaignSchema = require("../models/teamsCampaignSchema");


const addTeamsMember = (req, res) => {

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


const removeTeamsMember = (req, res) => {
    const campaign = req.params.idCampaign;
    const { firstName, lastName, phoneNumber, country } = req.body.teamMemberHolder

    teamsCampaignSchema.findOneAndDelete({ campaign, firstName, lastName, phoneNumber, country })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success remove member from this campaign",
                    teamsMember: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getAllTeamsMemberForThisCampaign = (req, res) => {
    const campaign = req.params.idCampaign;
    teamsCampaignSchema.find({ campaign })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get all member for this campaign",
                    teamsMember: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}




module.exports = { addTeamsMember, removeTeamsMember, getAllTeamsMemberForThisCampaign };