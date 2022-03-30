const router = require("express").Router()
const Controllers = require('../Controllers/userController')
const Controller = require('../Controllers/customerController')
const aggregation = require("../Controllers/aggController")
const subdoc = require("../Controllers/subdocController")
const upload = require("../imageupload/upload")
router.get('/add',((req,res)=>{
        aggregation.add(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get('/update',(req,res)=>{
        aggregation.update(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
})
router.get('/unwind',(req,res)=>{
        aggregation.unwind(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
})
router.get('/group',(req,res)=>{
        aggregation.group(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
})
router.get('/project',(req,res)=>{
        aggregation.project(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
})
router.get('/lookup',(req,res)=>{
        aggregation.lookup(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
})
router.get('/match',((req,res)=>{
        aggregation.match(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get('/findagg',((req,res)=>{
        aggregation.find(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get("/addcustomer",((req,res)=>{
      Controller.addcustomer(req,res).then((result)=>{
            return   res.status(200).json(result)
      }).catch(err=>{
       return res.status(400).json(err)
      })
}))
router.get('/updatecustomer',((req,res)=>{
        Controller.updatecustomer(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get("/deletecustomer",((req,res)=>{
        Controller.deletecustomer(req,res).then((result)=>{
              return   res.status(200).json(result)
        }).catch(err=>{
         return res.status(400).json(err)
        })
  }))
router.post('/register', ((req, res) => {
        Controllers.Register(req, res).then((result) => {
                return res.status(201).json({
                        success: true,
                        message: "You are registered",
                        data: result
                })

        }).catch(err => {
                return res.status(401).json(err)
        })
}))
router.post('/login', ((req, res) => {
        Controllers.Login(req, res).then((result) => {
                return res.status(200).json({
                        success: true,
                        Message: "You are logged in",
                        token: req.token,
                        user: result
                })
        }).catch(err => {
                res.status(401).json(err)
        })
}))
router.get('/getuser/:id', ((req, res) => {
      
                Controllers.getuserById(req, res).then((result) => {
                        return res.status(200).send({
                                success: true,
                                data: result
                        })
                }).catch(err => {
                        return res.status(401).json({
                                err
                        })
                })
      
}))
router.get("/search/:name",((req,res)=>{
        Controllers.search(req,res).then((result)=>{
                res.status(200).json(result)
        }).catch(err=>{
                res.status(401).json(err)
        })
}))
router.get('/pages',((req,res)=>{
        Controllers.Pagination(req,res).then((result)=>{
                        res.status(200).json(result)
        }).catch(err=>{
                res.status(401).json(err)
        })
}))
router.get('/getalluser', ((req, res) => {
        Controllers.getAllUser().then((result) => {
                return res.status(200).json(
                        {
                                success: true,
                                data: result
                        })
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.put('/updateuser/:id', ((req, res) => {
        Controllers.verifytoken(req, res).then((results) => {
                console.log(results);
                Controllers.updateUserById(req, res).then((result) => {
                        return res.status(200).json({
                                success: true,
                                message: "Updated Sucessfully",
                                data: result
                        })
                }).catch(err => {
                        return res.status(401).json({ err })
                })
        }).catch(err => {
                return res.status(401).json(err)
        })
}))
router.delete('/deleteuser/:id', ((req, res) => {
        Controllers.verifytoken(req, res).then((results) => {
                Controllers.Deleteuser(req, res).then((result) => {
                        return res.status(200).json({
                                success: true,
                                message: "user deleted sucessfully",
                                userDeleted: result
                        })
                }).catch(err => {
                        return res.status(401).json({ err })
                })
        }).catch(err => {
                return res.status(401).json(err)
        })
}))
router.put('/changepassword/:id', ((req, res) => {
        Controllers.verifytoken(req, res).then((results) => {
                Controllers.ChangePassword(req, res).then((result) => {
                        res.status(200).json({
                                success: true,
                                message: "Password changed succesfully",
                                user: result
                        })
                }).catch(err => {
                        return res.status(401).json({ err })
                })
        }).catch(err => {
                return res.status(401).json(err)
        })
}))
router.get('/logout', ((req, res, next) => {
                Controllers.Logout(req, res).then((result) => {
                        res.status(200).json({
                                success: true,
                                message: result
                        })
                }).catch(err => {
                        return res.status(401).json(err)
                })
}))
router.get("/deletepost/:id",((req,res)=>{
        subdoc.deletepost(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get("/deletemsg/:id",((req,res)=>{
        subdoc.deletemsg(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get("/updatemsg/:id",((req,res)=>{
        subdoc.updatemsg(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.get("/updatepost/:id",((req,res)=>{
        subdoc.updatepost(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(401).json(err)
        })
}))
router.put('/updatecourse/:id',((req,res)=>{
        Controllers.updatecourse(req,res).then((result)=>{
                res.status(200).json({result})
        }).catch(err=>{
                res.status(500).json({err})
        })
}))
router.post('/addcourse/:id',((req,res)=>{
        Controllers.addcourse(req,res).then((result)=>{
                res.status(200).json({result})
        }).catch(err=>{
                res.status(500).json({err})
        })
}))
router.get('/deletecourse/:id/:editid',((req,res)=>{
        Controllers.deletecourse(req,res).then((result)=>{
                return res.status(200).json(result)
        }).catch(err=>{
                return res.status(500).json(err)
        })
}))
router.post('/public/:id',((req,res)=>{
   
        Controllers.imageUpload(req,res).then((result)=>{
               
                res.status(200).json(result)
        }).catch(err=>{
                console.log(err);
                res.status(500).json(err)
        })
      
}))
router.get('/public/:id/:profile/:crop',((req,res)=>{
        Controllers.deleteimage(req,res).then((result)=>{
                res.status(200).json(result)
        }).catch(err=>{
                res.status(500).json(err)
        })
}))
module.exports = router