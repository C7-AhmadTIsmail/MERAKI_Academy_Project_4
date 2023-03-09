
authorization=(string)=>{

    return (req,res,next)=>{
    console.log(req.token)
    if(req.token){
    return res.json(req.token)
    }
    next()
    }
}


module.exports = {authorization};