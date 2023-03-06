
const contributionSchema =require("../models/contributionSchema");


const addcontribution=(req, res)=>{

    const  capagin =req.params.idCapagin;
    const  contributor =req.params.idcontributor;
    
    const {  dateOfContribution ,lastDateOfContributionCanRefund , name ,
        ammount , park , visibility }=req.body
    
        const newcontribution = new contributionSchema({ 
            dateOfContribution,lastDateOfContributionCanRefund,name,ammount,
            park,visibility,capagin , contributor})

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
    contributionSchema.find({})
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
        name ,ammount,park,visibility,capagin  }=req.body

    contributionSchema.findByIdAndUpdate(id_,{
        dateOfContribution,lastDateOfContributionCanRefund, name ,ammount,park,visibility,capagin  })
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
    contributionSchema.find({contributor:id_})
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

const getcontributionByCapagin =(req, res)=>{
    id_=req.params.idCapagin
    contributionSchema.find({capagin:id_})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success get all contribution for this Capagin",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}




module.exports = { addcontribution , getAllcontribution , updatecontribution 
    , removecontribution , getcontributionByUser , getcontributionByCapagin};