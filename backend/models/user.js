const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String },
    age: { type: Number },
    password: { type: String, required: true },
    phoneNumber: { type: Number },
});



userSchema.pre('save', async function() {
    this.email =this.email.toLocaleLowerCase()    
    console.log(this.password ,this.email )
    const salt=process.env.SALT 
    console.log(salt)
    this.password = await bcrypt.hash(this.password , 5 );
    
});




module.exports=mongoose.model("user",userSchema)