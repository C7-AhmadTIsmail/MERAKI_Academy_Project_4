const mongoose = require("mongoose");


const contributionSchema = new mongoose.Schema({
    dateOfContribution: { type: String, required: true, unique: true },
    lastDateOfContributionCanRefund: { type: String, required: true },
    name: { type: String , required: true },
    ammount: { type: Number , required: true  },
    park: { type: Number },
    visibility:{ type: Number },
    campaigner:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    
});



module.exports=mongoose.model("contribution",contributionSchema)