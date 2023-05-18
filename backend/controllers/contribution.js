
const contributionSchema = require("../models/contributionSchema");


const addContribution = (req, res) => {

    const campaign = req.params.idCampaign;
    const contributor = req.params.idContributor;

    const { dateOfContribution, lastDateOfContributionCanRefund, name,
        amount, visibility } = req.body

    const newContribution = new contributionSchema({
        dateOfContribution, lastDateOfContributionCanRefund, name, amount,
        visibility, campaign, contributor
    })

    newContribution.save().then((result) => {
        res.status(201).json(
            {
                success: true,
                message: "Success contribution created",
                contribution: result
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


const getAllContribution = (req, res) => {
    contributionSchema.find({}).select({ _id: 0, name: 0, lastDateOfContributionCanRefund: 0, visibility: 0, contributor: 0, __v: 0, dateOfContribution: 0 })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get All contribution ",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const updateContribution = (req, res) => {
    id_ = req.params.id
    const { dateOfContribution, lastDateOfContributionCanRefund,
        name, amount, visibility, campaign } = req.body

    contributionSchema.findByIdAndUpdate(id_, {
        dateOfContribution, lastDateOfContributionCanRefund, name, ammount, visibility, campaign
    })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success contribution update",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const removeContribution = (req, res) => {
    id_ = req.params.id

    contributionSchema.findByIdAndDelete(id_)
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success contribution remove",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}


const getContributionByUser = (req, res) => {
    id_ = req.params.idUser
    contributionSchema.find({ contributor: id_ }).populate("campaign")
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get all contribution for this user",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}

const getContributionByCampaign = (req, res) => {
    id_ = req.params.idCampaign
    contributionSchema.find({ campaign: id_ })
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get all contribution for this campaign",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}

const getContributionByCampaignMaximum = (req, res) => {
    id_ = req.params.idCampaign
    contributionSchema.find({ campaign: id_, visibility: true }).sort({ amount: -1 }).limit(3)
        .then((result) => {
            res.status(200).json(
                {
                    success: true,
                    message: "Success get all contribution for this campaign",
                    contribution: result
                })
        }).catch((err) => {
            res.status(500).json(
                {
                    success: false,
                    message: err
                })
        });
}



module.exports = {
    addContribution, getAllContribution, updateContribution
    , removeContribution, getContributionByUser,
    getContributionByCampaign, getContributionByCampaignMaximum
};