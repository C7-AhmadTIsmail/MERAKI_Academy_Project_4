const mongoose = require("mongoose");



const teamsSchema = new mongoose.Schema({
    firtsName: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String , required: true },
    phoneNumber: { type: Number , required: true  },
    country:{ type: Number },
    streetAddress:{type: Number},
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"},
    teamsOfAcount:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
});



module.exports=mongoose.model("team",teamsSchema)