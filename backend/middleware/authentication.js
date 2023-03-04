const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authentication=(req, res , next)=>{
    
    try{
    if(!req.headers.authorization){
        return  res.json("no token are there")
    }
    const token = req.headers.authorization.split(" ").pop()
    const SECRET = process.env.SECRET;
    console.log("token:",token)
    jwt.verify(token,SECRET,function(err, resultVerify) {
        console.log(resultVerify,err) // bar
        if(err){
        return  res.json("no token are expired")
        }
        else{
            req.token=resultVerify
        }
    })
    next()
}
catch(err){
    res.json(err)
}
}


module.exports = {authentication};