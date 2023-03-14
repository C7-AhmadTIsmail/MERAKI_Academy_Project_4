
const userSchema=require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp =(req, res)=>{
    const { email , password , name , age , phoneNumber, zipcode , country , urlMyPhoto , role  }=req.body
    const newUser = new userSchema({ email , password , name , age , phoneNumber,
        zipcode , country , urlMyPhoto , role })
    newUser.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success role created",
            user: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            err: err.message, })
    });
}

const logIn=(req, res)=>{
    const {email,password}=req.body
    userSchema.findOne({email}).populate("role").exec()
    .then( (result) => {
        if (!result) {
        return res.status(403).json({
        success: false,
        message: `The email or password is incorrect`,
        });
    }
    bcrypt.compare(password, result.password ,(errPassword, resultCompare) => {
        if(errPassword){
            res.status(404).json(
            {success: false,
            message:  errPassword })
        }else if(!resultCompare){
            res.status(404).json(
            {success: false,
            message: `The email or password is incorrect`})
        }else{
            const SECRET = process.env.SECRET ||"ahmad" ;
            const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time || "60m" ;
            const payload =result.toObject();
        
                const options = {
                        expiresIn: TOKEN_EXP_Time ,
                    };
        const token =jwt.sign(payload, SECRET, options);
            res.status(201).json(
            {success: true,
            message: "Success to LogIn",
            user: result ,
            token: token })
    }
    });
    })
    .catch((err) => {
    res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
    });
    });
}

const getAll =(req, res)=>{
    userSchema.find().populate("role").exec().then((result) => {
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





deleteUser=(req, res)=>{
    const id_=req.params.id
    userSchema.findByIdAndDelete(id_)
    .then((result) => {
        res.status(200).json(
            {success: true,
            message: "Success user remove",
            user: result })
    }).catch((err) => {
            res.status(404).json(
            {success: false,
            message:  err })
    });
}


const updateUserById =(req, res)=>{
    console.log("update id")
    const id_=req.params.id
    const {email , password , name , age , phoneNumber, zipcode , country , urlMyPhoto , role }=req.body
    userSchema.findByIdAndUpdate(id_ ,{ email , password , name , age , phoneNumber, zipcode 
        , country , urlMyPhoto , role }).populate("role").exec()
    .then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success update  done",
            userOldData : result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const updateUserByEmail =(req, res)=>{
    console.log("upadte email")
    const {email , newEmail , password , name , age , phoneNumber, zipcode , country , urlMyPhoto , role }=req.body
    userSchema.findOneAndUpdate({email} ,{ email : newEmail, name , age  }).exec()
    .then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success update  done",
            userOldData : result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}


const getUserDataById =(req, res)=>{
    console.log("get user data")
    const  _id=req.token._id
    userSchema.find({ _id }).select({password: 0 ,_id: 0 ,role: 0 }).exec()
    .then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success find  done",
            result : result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}

module.exports = { signUp , logIn , getAll , deleteUser , updateUserById , updateUserByEmail ,getUserDataById };