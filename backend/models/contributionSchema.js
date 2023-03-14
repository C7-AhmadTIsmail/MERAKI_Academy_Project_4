const mongoose = require("mongoose");


const contributionSchema = new mongoose.Schema({
    name: { type: String , required: true },
    dateOfContribution: { type: Date  ,min: '2020-01-01'},
    lastDateOfContributionCanRefund: { type: Date  ,min: '2020-01-01'},
    ammount: { type: Number , required: true  },
    visibility:{ type: Boolean },
    contributor:{type :mongoose.Schema.Types.ObjectId ,ref:"user"},
    campaign:{type :mongoose.Schema.Types.ObjectId ,ref:"campaign"},
});



module.exports=mongoose.model("contribution",contributionSchema)