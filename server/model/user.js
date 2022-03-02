const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const postschema = new mongoose.Schema({
    userId:{
        type:String,
    },
    image:{
        type:String,
        
    },
    description:{
        type:String,
        
    }
})
const messageSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})
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
    },
    messages:[
        messageSchema
    ],
    posts:[
        postschema
    ],
},
{timestamps:true})
Userschema.plugin(mongoosePaginate)
const Userdb = mongoose.model("user",Userschema)
module.exports = Userdb