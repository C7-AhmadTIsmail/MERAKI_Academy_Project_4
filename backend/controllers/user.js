
const userSchema=require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp=(req, res)=>{
    console.log(req.body,"yu")
    const {email,name,age,password,phoneNumber}=req.body
    const newUser = new userSchema({email,name,age,password,phoneNumber})

    newUser.save().then((result) => {
        console.log("her3")
        res.json("true")
    }).catch((err) => {
        console.log("her4")
        console.log(err)
        res.json("false")
    });



}

const registration=(req, res)=>{
    const {email,password}=req.body
    userSchema.findOne({email}).exec()
    .then( (result) => {
    console.log(password, result.password)
    bcrypt.compare(password, result.password ,(errPassword, resultCompare) => {
    console.log(errPassword, resultCompare)
    if(errPassword){
    res.status(404).json(errPassword)
    }else if(!resultCompare){
        console.log(2)
        res.status(404).json("the password false")
        return
    }else{
        console.log(3)
        const SECRET = process.env.SECRET;
        const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time;
        const payload = {
        id: 1,
        permissions: ["read", "write"],
        type: "user",
        };
        
        const options = {
            expiresIn: TOKEN_EXP_Time,
        };
        console.log("token:",options,payload,SECRET,TOKEN_EXP_Time)

        token =jwt.sign(payload, SECRET, options);
        res.status(202).json(token);
    
    }

    });
    })
    .catch((err) => {
    res.send(err);
    });
}

deleteUser=(req, res)=>{
    const {email,password}=req.body
        console.log("end level")
        res.send("result");

    // userSchema.findOneAndDelete({email}).exec()
    // .then( (result) => {
    // res.send(result);
    // })
    // .catch((err) => {
    // res.send(err);
    // });
}

module.exports = {signUp,registration,deleteUser};