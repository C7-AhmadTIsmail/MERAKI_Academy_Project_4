const mongoose = require("mongoose");



const teamsCampaignSchema = new mongoose.Schema({
    campaign:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number , required: true  },
    country:{ type: String  },
    
    
});



module.exports=mongoose.model("teamsCampaign",teamsCampaignSchema)
