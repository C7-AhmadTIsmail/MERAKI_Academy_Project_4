const mongoose = require("mongoose");



const teamsCampaignSchema = new mongoose.Schema({
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"},

    teamsMember:[{firtsName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String , required: true },
    phoneNumber: { type: Number , required: true  },
    country:{ type: Number },
    streetAddress:{type: Number},}],
    
});



module.exports=mongoose.model("teamsCampaign",teamsCampaignSchema)
