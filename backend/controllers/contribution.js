
const contributionSchema =require("../models/contributionSchema");


const addcontribution=(req, res)=>{

    const  capagin =req.params.idCapagin;
    const  contributioner =req.params.idcontributioner;
    
    const {  contribution }=req.body
    
        const newcontribution = new contributionSchema({  })

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
    contributionSchema.find({}).populate(["contributioner", "capagin" ])
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success All contribution update",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const updatecontribution =(req, res)=>{
    id_=req.params.id
    const {  contribution }=req.body

    contributionSchema.findByIdAndUpdate(id_,{ contribution })
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
    id_=req.params.id
    contributionSchema.find({contributioner:id_})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success all Capagin for this user",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}

const getcontributionByCapagin =(req, res)=>{
    id_=req.params.id
    contributionSchema.find({contributioner:id_})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success all Capagin for this user",
            contribution: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}




module.exports = { addcontribution , getAllcontribution , updatecontribution , removecontribution , getcontributionByUser , getcontributionByCapagin};