const mongoose = require("mongoose");


const contributionSchema = new mongoose.Schema({
    name: { type: String , required: true },
    dateOfContribution: { type: Number, required: true },
    lastDateOfContributionCanRefund: { type: Number, required: true },
    ammount: { type: Number , required: true  },
    park: { type: Number },
    visibility:{ type: Boolean },
    contributor:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    campaign:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"},
});



module.exports=mongoose.model("contribution",contributionSchema)