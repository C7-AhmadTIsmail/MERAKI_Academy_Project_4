const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true ,lowercase: true, },
    password: { type: String, required: true },
    name: { type: String , required: true },
    age: { type: Number , required: true  },
    phoneNumber: { type: Number },
    zipcode:{ type: Number },
    country:{ type: String },
    urlMyPhoto:{ type: String },
    role:{type :mongoose.Schema.Types.ObjectId ,ref:"role"},

});


userSchema.pre('save', async function() {   
    const SALT=process.env.SALT || 7
    this.password = await bcrypt.hash(this.password , parseInt(SALT));
});




module.exports=mongoose.model("user",userSchema)