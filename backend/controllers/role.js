const roleSchema=require("../models/roleSchema");


const addRole=(req, res)=>{
    const { role , permissions }=req.body
    const newRole = new roleSchema({ role , permissions})

    newRole.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success role created",
            role: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getAllRole=(req, res)=>{
    roleSchema.find()
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success role get All",
            role: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}


const updateRole =(req, res)=>{
    const id_=req.params.id
    const { role , permissions }=req.body
    
    roleSchema.findByIdAndUpdate(id_,{role , permissions})
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success role update",
            role: result })
    }).catch((err) => {
        res.status(500).json(
            {success: false,
            message:  err })
    });
}



const removeRole =(req, res)=>{
    const id_=req.params.id
    roleSchema.findByIdAndDelete(id_)
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success role remove",
            role: result })
    }).catch((err) => {
            res.status(404).json(
            {success: false,
            message:  err })
    });
}




module.exports = {addRole , getAllRole  , updateRole , removeRole };