
const commentSchema =require("../models/commentSchema");



const addcomment=(req, res)=>{
    
    const  campaign =req.params.idcampaign;
    const  commenter =req.params.idcommenter;
    const {  comment }=req.body
    
        const newCapagin = new commentSchema({ comment , commenter , campaign })

        newCapagin.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success comment created",
            role: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getAllcomment =(req, res)=>{
    commentSchema.find({}).populate(["commenter", "campaign" ])
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success All comment update",
            capagin: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const updatecomment =(req, res)=>{
    id_=req.params.id
    const {  bankAccount , capaginTitle , capaginCardimage , 
        pargraphesAboutCapagin , loaction , catgory , capagindurationdays , 
        UrlVideoOrimage , campaignPerks , campaignamounts,darftcampaignlink  }=req.body

    commentSchema.findByIdAndUpdate(id_,{ bankAccount , capaginTitle , capaginCardimage , 
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


const removecomment =(req, res)=>{
    id_=req.params.id

    commentSchema.findByIdAndDelete(id_)
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


const getcommentbyOriginter =(req, res)=>{
    id_=req.params.id

    commentSchema.find({campaigner:id_})
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


module.exports = { addcomment , getAllcomment , updatecomment , removecomment , getcommentbyOriginter };