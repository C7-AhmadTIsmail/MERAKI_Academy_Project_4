const mongoose = require("mongoose");


const likeSchema = new  mongoose.Schema({
    user:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    campaign :{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"}
})




module.exports=mongoose.model("like",likeSchema)