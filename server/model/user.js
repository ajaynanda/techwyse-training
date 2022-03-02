const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const Userschema = new  mongoose.Schema({
    Firstname:{
        type:String,
        lowercase:true,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    dateofbirth:{
        type:String,
        required:true
    },
    Proffession:{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    }
},{timestamps:true})
Userschema.plugin(mongoosePaginate)
const Userdb = mongoose.model("user",Userschema)
module.exports = Userdb