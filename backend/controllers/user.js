
const userSchema=require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp =(req, res)=>{
    const { email , password , name , age , phoneNumber, zipcode , city , role }=req.body
    const newUser = new userSchema({ email , password , name , age , phoneNumber, zipcode , city , role })
    newUser.save().then((result) => {
        res.status(201).json(
            {success: true,
            message: "Success role created",
            user: result })
    })
    .catch((err) => {
        res.status(400).json(
            {success: false,
            message:  err })
    });
}

const logIn=(req, res)=>{
    const {email,password}=req.body
    userSchema.findOne({email}).populate("role").exec()
    .then( (result) => {
    bcrypt.compare(password, result.password ,(errPassword, resultCompare) => {
            console.log("*****************result:",typeof(result.role))
        if(errPassword){
            res.status(404).json(
            {success: false,
            message:  errPassword })
        }else if(!resultCompare){
            res.status(404).json(
            {success: false,
            message:  "the Password is erorr" })
        }else{
            const SECRET = process.env.SECRET;
            const TOKEN_EXP_Time = process.env.TOKEN_EXP_Time || "60m" ;
            const payload =result.toObject();
        
                const options = {
                        expiresIn: TOKEN_EXP_Time ,
                    };
        token =jwt.sign(payload, SECRET, options);
        res.status(201).json(
            {success: true,
            message: "Success to LogIn",
            usrer: result ,
            token: token })
    }
    });
    })
    .catch((err) => {
    res.send(err);
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
    const {email , password , name , age , phoneNumber, zipcode , city , role }=req.body
    userSchema.findByIdAndUpdate(id_ ,{ email , password , name , age , phoneNumber, zipcode , city , role }).populate("role").exec()
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
    const {email , newEmail , password , name , age , phoneNumber, zipcode , city , role }=req.body
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

module.exports = { signUp , logIn , getAll , deleteUser , updateUserById , updateUserByEmail };