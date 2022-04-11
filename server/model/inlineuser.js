const mongoose = require("mongoose")
const inlineSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Email:{
        type:String,
    },
    Phone:{
        type:Number
    },
    City:{
        type:String
    }

})
const inlinedb = mongoose.model('inlineuser',inlineSchema)
module.exports=inlinedb