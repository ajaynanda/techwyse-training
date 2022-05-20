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
       
    }
},{timestamps:true})
const qualiSchema = new mongoose.Schema({
    coursename:{
        type:String
    },
    Institute:{
        type:String
    },
    percentage:{
        type:Number
    }
},{timestamps:true})

const Userschema = new  mongoose.Schema({
    Firstname:{
        type:String,
        lowercase:true,
       
    },
    Lastname:{
        type:String,
      
    },
    Email:{
        type:String,
        
    },
    Password:{
        type:String,
    },
    dateofbirth:{
        type:String,    
    },
    Proffession:{
        type:String,
    },
    profileimage:{
        cropimg:String ,
        profile:String,
        imageUrl:String,
    },
     Gender:{
        type:String,       
    },
    messages:[
        messageSchema
    ],
    posts:[
        postschema
    ],
    Qualification:[qualiSchema]
},
{timestamps:true})
Userschema.plugin(mongoosePaginate)
const Userdb = mongoose.model("user",Userschema)
module.exports = Userdb