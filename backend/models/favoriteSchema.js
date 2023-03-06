const mongoose = require("mongoose");


const favoriteSchema = new  mongoose.Schema({
    user:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    favoriteCapagin:[{type :mongoose.Schema.Types.ObjectId ,ref:"capagin"}],
})




module.exports=mongoose.model("favorite",favoriteSchema)