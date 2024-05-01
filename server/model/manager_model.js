const mongoose = require('mongoose');



const manager_schema = mongoose.Schema({
    manager_email:{
        type:String,
        required:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        unique:true
    },
    manager_password:{
        type:String,
        required:true,
        min:5
    },
    premission:{
        type:Number,
        default:1
    },
    token:{type:Object}
},{timestamps:true})



module.exports = mongoose.model("Managers",manager_schema)