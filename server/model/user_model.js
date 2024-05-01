const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique:true
    },
    user_password:{
        type:String,
        required:true,
        min:5
    },
    tokens:[{type:Object}]
},{timestamps:true})

module.exports = mongoose.model("Users",user_schema)