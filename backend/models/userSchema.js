const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String , required: true },
    age: { type: Number , required: true  },
    phoneNumber: { type: Number },
    zipcode:{ type: Number },
    city:{ type: String },
    campaign :[{type :mongoose.Schema.Types.ObjectId ,ref:"user"}],
    campaign :[{type :mongoose.Schema.Types.ObjectId ,ref:"user"}],
    role:{type :mongoose.Schema.Types.ObjectId ,ref:"role"},
});



userSchema.pre('save', async function() {
    this.email =this.email.toLocaleLowerCase()    
    console.log(this.password ,this.email )
    const salt=process.env.SALT 
    console.log(salt)
    this.password = await bcrypt.hash(this.password , 5 );
    
});




module.exports=mongoose.model("user",userSchema)