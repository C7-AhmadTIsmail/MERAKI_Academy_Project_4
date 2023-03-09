const mongoose = require("mongoose");


const favoriteSchema = new  mongoose.Schema({
    user:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    favoriteCampaign:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign" },
})




module.exports=mongoose.model("favorite",favoriteSchema)