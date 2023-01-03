const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    email:String,
    username:String,
    password:String
})

const signup = mongoose.model("signup",signupSchema);
module.exports = signup;