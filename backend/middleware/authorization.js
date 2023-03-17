
authorization=(string)=>{

    return (req,res,next)=>{
    if(req.token){
    return res.json(req.token)
    }
    next()
    }
}


module.exports = {authorization};