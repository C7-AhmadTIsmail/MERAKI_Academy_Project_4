
const capaginSchema =require("../models/capaginSchema");



const addCapagin=(req, res)=>{
    
    const  campaigner=req.params.id;
    const {  bankAccount , capaginTitle , capaginCardimage , 
        pargraphesAboutCapagin , loaction , catgory , capagindurationdays , 
        UrlVideoOrimage , campaignPerks , campaignamounts,darftcampaignlink  }=req.body
    
        const newCapagin = new capaginSchema({ bankAccount , capaginTitle , capaginCardimage , 
        pargraphesAboutCapagin , loaction , catgory , capagindurationdays , 
        UrlVideoOrimage , campaignPerks , campaignamounts,darftcampaignlink ,campaigner})

        newCapagin.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success Capagin created",
            role: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getAllCapagin =(req, res)=>{
    capaginSchema.find({})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success role update",
            capagin: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const updateCapagin =(req, res)=>{
    id_=req.params.id
    const {  bankAccount , capaginTitle , capaginCardimage , 
        pargraphesAboutCapagin , loaction , catgory , capagindurationdays , 
        UrlVideoOrimage , campaignPerks , campaignamounts,darftcampaignlink  }=req.body

    capaginSchema.findByIdAndUpdate(id_,{ bankAccount , capaginTitle , capaginCardimage , 
        pargraphesAboutCapagin , loaction , catgory , capagindurationdays , 
        UrlVideoOrimage , campaignPerks , campaignamounts,darftcampaignlink})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success Capagin update",
            capagin: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const removeCapagin =(req, res)=>{
    id_=req.params.id

    capaginSchema.findByIdAndDelete(id_)
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success Capagin remove",
            capagin: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const getCapaginbyOriginter =(req, res)=>{
    id_=req.params.id

    capaginSchema.find({campaigner:id_})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success all Capagin for this user",
            capagin: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


module.exports = { addCapagin , getAllCapagin , updateCapagin , removeCapagin , getCapaginbyOriginter };