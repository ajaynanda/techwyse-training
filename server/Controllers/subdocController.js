const Userdb = require("../model/user")
const deletepost  = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id = req.params.id
        Userdb.updateOne({_id:id},{$unset:{"posts":'[]'}}).then((result)=>{
            console.log(result);
          return resolve(result)
        }).catch(err=>{
            return reject(err)
        })
    })
})
const deletemsg  = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id = req.params.id
        Userdb.updateOne({_id:id},{$unset:{"messages":[]}}).then((result)=>{
            console.log(result);
          return resolve(result)
        }).catch(err=>{
            return reject(err)
        })
    })
})
const updatemsg = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id = req.params.id
        Userdb.updateOne({_id:id,"messages.userId":req.body.userid},{$set:{"messages.$.message":req.body.msg}}).then((result)=>{
            console.log(("update"));
            return resolve(result)
        }).catch(err=>{
            return reject(err)
        })
    })
})
const updatepost = ((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id = req.params.id
        Userdb.updateOne({_id:id,'posts.userId':req.body.userid},{$set:{'posts.$.userId':req.body.userId}}).then((result)=>{
            return resolve(result)
        }).catch(err=>{
            return reject(err)
        })
    })
})
module.exports = {deletepost,deletemsg,updatemsg,updatepost}