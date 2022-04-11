const mongoose=require("mongoose")
const treeSchema=new mongoose.Schema({
    Name:{
        type:String
    },
    Team:{
        type:String
    },
    Position:{
        type:String
    },
    Teamid:{
        type:String
    },
    Childrens:[{
        Name:{
            type:String
        },
        Team:{
            type:String
        },
        Position:{
            type:String
        },
        Teamid:{
            type:String
        },
    }]

})
const treedb =mongoose.model('tree',treeSchema)
module.exports=treedb