
const roleSchema=require("../models/roleSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const addRole=(req, res)=>{
    console.log(req.body,"yu")
    const { role , permissions }=req.body
    const newRole = new roleSchema({email,name,age,password,phoneNumber})

    newRole.save().then((result) => {
        console.log("her3")
        res.json("true")
    }).catch((err) => {
        console.log("her4")
        console.log(err)
        res.json("false")
    });
}



const removeRole=(req, res)=>{
    console.log(req.body,"yu")
    const { role , permissions }=req.body
    const newRole = new roleSchema({email,name,age,password,phoneNumber})

    newRole.save().then((result) => {
        console.log("her3")
        res.json("true")
    }).catch((err) => {
        console.log("her4")
        console.log(err)
        res.json("false")
    });
}

module.exports = {addRole , removeRole , editeRole ,gitRole };