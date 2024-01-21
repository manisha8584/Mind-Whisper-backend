const mongoose = require("mongoose")
const form = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    intrest:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    },
},{timestamp:true})
module.exports = mongoose.model("Forms", form);