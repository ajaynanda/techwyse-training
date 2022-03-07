const mongoose = require("mongoose")

const aggschema = new  mongoose.Schema({
   id:{
       type:Number,
   },
    userId:{
        type:Number
    },
    title:{
        type:String,
    },
    body:{
        type:String
    },
    points:{
        type:Number
    },
    marks:{
        type:Array
    },
    bonus:{
        type:String,Number
    }
},
{timestamps:true})
const aggdb = mongoose.model("aggregation",aggschema)
module.exports = aggdb