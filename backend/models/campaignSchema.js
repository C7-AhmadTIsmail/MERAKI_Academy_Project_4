const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const capaginSchema = new mongoose.Schema({
    bankAcount: [{ type: String, required: true, unique: true }],
    capaginTitle: { type: String, required: true },
    capaginCardimage: { type: String },
    pargraphesAboutCampaign: { type: String },
    loaction: [{ type: Number }],
    catgory: { type: String },
    capagindurationdays:{ type: Number },
    UrlVideoOrimage:{ type: String },
    campaignPerks:{ type: String },
    campaignamounts:{ type: String },
    darftcampaignlink:{ type: String },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    
});



module.exports=mongoose.model("campaign",capaginSchema)