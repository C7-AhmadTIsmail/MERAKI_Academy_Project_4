const mongoose = require("mongoose");


const commentSchema = new  mongoose.Schema({
    comment:{type :String , required :true },
    commenter:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
})




module.exports=mongoose.model("comment",commentSchema)