const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const campaignSchema = new mongoose.Schema({
    bankAcount: { type: String, required: true, unique: true },
    capaginTagLine: { type: String, required: true },
    capaginCardimage: { type: String },
    pargraphes: { type: String },
    loaction: [{ type: Number , required: true  }],
    catgory: { type: Number },
    capagindurationdays:{ type: Number },
    UrlVideoOrimage:{ type: String },
    campaignPerks:{ type: String },
    campaignamounts:{ type: String },
    darftcampaignlink:{ type: String },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    
});



module.exports=mongoose.model("campaign",campaignSchema)