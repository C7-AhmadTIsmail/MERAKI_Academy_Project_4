const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    bankAccount: { type: Number, required: true, unique: true },
    campaignTitle: { type: String, required: true },
    campaignCardImage: { type: String },
    pargraphesAboutCampaign : { type: String },
    loaction: [{ type: Number }],
    catgory: [{ type: String ,required: true }],
    campaignDurationDays:{ type: Date },
    urlVideoOrImage:{ type: String },
    campaignPerks:{ type: String },
    campaignAmounts:{ type: Number },
    darftCampaignLink:{ type: String },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    favorite:{type :mongoose.Schema.Types.ObjectId ,ref:"favorite" },
});



module.exports=mongoose.model("campaign",campaignSchema)