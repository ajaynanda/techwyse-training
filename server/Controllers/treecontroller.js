const treedb=require("../model/tree")
const add=((req,res)=>{
    return new Promise((resolve,reject)=>{
        const user =new treedb({
            Name:req.body.name,
            Team:req.body.team,
            Teamid:req.body.teamid,
            Position:req.body.position
        })
        user.save(user).then((result)=>{
            resolve({Success:true,message:"Team Leader Added",data:result})
        }).catch(err=>{
            reject({Error:true,message:"error"})
        })
    })
})
const addchild=((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id=req.params.id
        treedb.findById(id).then((data)=>{
            console.log(data)
            if (data){
                console.log(data.Teamid)
                const childuser={
                    Name:req.body.name,
                    Team:data.Team,
                    Teamid:data.Teamid,
                    Position:req.body.position
                }
                
                console.log(childuser);
                treedb.findByIdAndUpdate(id,{$push:{Childrens:childuser}}).then((result)=>{
                    resolve({Success:true,message:"Team member added",data:result})
                }).catch(err=>{
                    reject({Error:true,message:"Error on adding"})
                })
            }
        }).catch(err=>{
            reject({Error:true,message:"Team id not found"})
        })
      
    })
})
const findteam=((req,res)=>{
    return new Promise((resolve,reject)=>{
        treedb.find().then((result)=>{
            resolve({Success:true,message:"User data",data:result})
        }).catch(err=>{      
                reject({Error:true,message:"Error occured"})          
        })
    })
   
})
const updateteam=((req,res)=>{
    return new Promise((resolve,reject)=>{
const id=req.params.id
        const data={
            Name:req.body.name,
            Position:req.body.position,
            Team:req.body.team,
            Teamid:req.body.teamid
        }
        treedb.findByIdAndUpdate(id,data).then((result)=>{
            resolve({Success:true,message:"Updated the team leader successfully"})
        }).catch(err=>{
            reject({Error:true,message:"Error on updation"})
        })
    })
})
const updatechild=((req,res)=>{
    return new Promise((resolve,reject)=>{
        console.log(req.body);
        treedb.updateOne({'Childrens._id':req.body.childid},{$set:{'Childrens.$.Name':req.body.name,'Childrens.$.Position':req.body.position,'Childrens.$.Team':req.body.team,'Childrens.$.Teamid':req.body.teamid}}).then((result)=>{
            console.log(result);
            resolve({Success:true,message:"updated the Team member",data:result})
        }).catch(err=>{
            console.log(err);
            reject({Error:true,message:"Error on updation"})
        })
    })
})
const deleteteam=((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id =req.params.id
        treedb.findByIdAndDelete(id).then((result)=>{
            resolve({success:true,message:"Team leader deleted successfully"})
        }).catch(err=>{
            reject({Error:true,message:"Error on deletion"})
        })
    })
})
const deletechild=((req,res)=>{
    return new Promise((resolve,reject)=>{
        treedb.updateOne({'_id':req.params.id},{$pull:{'Childrens':{_id:req.params.childid}}}).then((result)=>{
            console.log(result);
            resolve({Success:true,message:"Team member deleted successfully",data:result})
        }).catch(err=>{
            reject({Error:true,message:"Not found"})
        })
    })
})

const arrayremoveitem=((req,res)=>{
    return new Promise((resolve,reject)=>{
        const id=req.params.id
            treedb.findOneAndUpdate({_id:id},{$pull:{'Childrens':{_id:req.params.ids}}}).then(async(result)=>{
                const i=req.params.index
                const results=   result.Childrens[i]
                 console.log(results);
                if(results){
                    const addid = req.params.addid
                    const users= await treedb.findById(addid)
                    const datas={
                        Name:results.Name,
                        Team:users.Team,
                        Teamid:users.Teamid,
                        Position:results.Position
                    }
                    const ia=req.params.ia
                    const addarray = treedb.findOneAndUpdate({'_id':req.params.addid},{$push:{'Childrens':datas}}).then((data)=>{
                        console.log(data.Childrens);
                     
                       return resolve({success:true,message:"done",data:data})
                    }).catch(err=>{
                        console.log(err);
                        reject(err)
                    })
                }else{
                    return  resolve({Success:true,message:"Item Removed"})
                }  
               }).catch(err=>{
                   console.log(err);
                   reject({error:true})
               })     
    })
})

module.exports={add,addchild,findteam,deletechild,deleteteam,updatechild,updateteam,arrayremoveitem}