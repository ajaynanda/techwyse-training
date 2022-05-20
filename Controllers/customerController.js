const customerdb = require("../model/customer")

const addcustomer = ((req,res)=>{
  return  new Promise((resolve,reject)=>{
        try{
            customerdb.insertMany([
                    {
                            firstname:"Ajay",city:"kochi",age:24,dateofbirth:"2-02-1995",userid:1,gender:"male"
            },
            {
                    firstname:"sahal",city:"kollam",age:35,dateofbirth:"20-11-1965",userid:2,gender:"male"
    },
     {
                    firstname:"rooney",city:"Alappuzha",age:35,dateofbirth:"20-11-1965",userid:3,gender:"male"
    },
    {
        firstname:"sumesh",city:"kottayam",age:21,dateofbirth:"20-11-1965",userid:4,gender:"male"
},
{
    firstname:"sasi",city:"dallas",age:35,dateofbirth:"20-11-1965",userid:3,gender:"male"
},
{
    firstname:"ram",city:"kozhikode",age:24,dateofbirth:"20-11-1965",userid:3,gender:"male"
},
{
    firstname:"john",city:"ukraine",age:24,dateofbirth:"20-11-1965",userid:4,gender:"male"
}
    ])
   return resolve({success:true,message:"Customer added"})
            }catch(e){
                    console.log(e);
                return    reject("error")
            }
    })
})
const updatecustomer = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        
        customerdb.updateMany({userid:"3"},{$set:{isverified:"true"}}).then((result)=>{
            return resolve({success:true,message:"updated the document",data:result})
        }).catch(err=>{
            return reject({success:false,message:" cannot update the document",data:result})
        })
       
    })
})
const deletecustomer = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        try{
        customerdb.deleteMany({"isverified":true}).then((result)=>{
            if(result)    return resolve({success:true,message:"deleted the customer"})
        }).catch(err=>{
            return reject({success:false,message:"error  while deleting"})
        })
      
        }catch(e){
            return reject({error:"eror"})
        }
    })
   
})
module.exports = {addcustomer,deletecustomer,updatecustomer}