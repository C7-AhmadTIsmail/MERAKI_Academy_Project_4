
const contributionSchema =require("../models/contributionSchema");


const addcontribution=(req, res)=>{

    const  campaign =req.params.idCampaign;
    const  contributor =req.params.idcontributor;
    
    const {  dateOfContribution ,lastDateOfContributionCanRefund , name ,
        ammount , visibility }=req.body
    
        const newcontribution = new contributionSchema({ 
            dateOfContribution,lastDateOfContributionCanRefund,name,ammount,
            visibility,campaign , contributor})

        newcontribution.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success contribution created",
            contribution: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getAllcontribution =(req, res)=>{
    contributionSchema.find({}).select({_id: 0,name:0 ,lastDateOfContributionCanRefund:0, visibility:0 ,contributor:0 ,__v:0,dateOfContribution:0})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get All contribution ",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const updatecontribution =(req, res)=>{
    id_=req.params.id
    const {  dateOfContribution,lastDateOfContributionCanRefund,
        name ,ammount,visibility,campaign  }=req.body

    contributionSchema.findByIdAndUpdate(id_,{
        dateOfContribution,lastDateOfContributionCanRefund, name ,ammount,visibility,campaign  })
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success contribution update",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const removecontribution =(req, res)=>{
    id_=req.params.id

    contributionSchema.findByIdAndDelete(id_)
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success contribution remove",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const getcontributionByUser =(req, res)=>{
    id_=req.params.idUser
    contributionSchema.find({contributor:id_}).populate("campaign")
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get all contribution for this user",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}

const getcontributionByCampaign =(req, res)=>{
    id_=req.params.idCampaign
    contributionSchema.find({campaign:id_})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get all contribution for this campaign",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}

const getcontributionByCampaignMaximum =(req, res)=>{
    id_=req.params.idCampaign
    contributionSchema.find({campaign:id_ , visibility : true }).sort({ ammount: -1 }).limit( 3 )
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get all contribution for this campaign",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}



module.exports = { addcontribution , getAllcontribution , updatecontribution 
    , removecontribution , getcontributionByUser ,
    getcontributionByCampaign ,getcontributionByCampaignMaximum};