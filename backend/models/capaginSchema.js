const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const capaginSchema = new mongoose.Schema({
    bankAccount: [{ type: Number, required: true, unique: true }],
    capaginTitle: { type: String, required: true },
    capaginCardimage: { type: String },
    pargraphesAboutCapagin: { type: String },
    loaction: [{ type: Number }],
    catgory: [{ type: String ,required: true }],
    capagindurationdays:{ type: Number ,required: true },
    UrlVideoOrimage:{ type: String },
    campaignPerks:[{ type: String }],
    campaignamounts:{ type: Number },
    darftcampaignlink:{ type: String },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    
});



module.exports=mongoose.model("capagin",capaginSchema)