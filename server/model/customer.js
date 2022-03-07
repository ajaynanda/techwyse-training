const mongoose = require("mongoose")

const customerschema = new  mongoose.Schema({
    firstname:{
        type:String,
        lowercase:true,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    userid:{
        type:Number
    },
    age:{
        type:Number,
        required:true
    },
    isverified:{
        type:Boolean
    }
},
{timestamps:true})
const customerdb = mongoose.model("customer",customerschema)
module.exports = customerdb