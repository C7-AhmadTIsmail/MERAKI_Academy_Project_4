const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    bankAccount: [{ type: Number, required: true, unique: true }],
    campaignTitle: { type: String, required: true },
    campaignCardImage: { type: String },
    pargraphesAboutCampaign : { type: String },
    loaction: [{ type: Number }],
    catgory: [{ type: String ,required: true }],
    campaignDurationDays:{ type: Number ,required: true },
    urlVideoOrImage:{ type: String },
    campaignPerks:[{ type: String }],
    campaignAmounts:{ type: Number },
    darftCampaignLink:{ type: String },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    
});



module.exports=mongoose.model("campaign",campaignSchema)