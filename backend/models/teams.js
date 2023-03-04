const mongoose = require("mongoose");



const teamsSchema = new mongoose.Schema({
    firtsname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true },
    dateofbirth: { type: String , required: true },
    phonenumber: { type: Number , required: true  },
    country:{ type: Number },
    streetaddress:{type: Number},
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    teamsOfAcount:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
});



module.exports=mongoose.model("team",teamsSchema)