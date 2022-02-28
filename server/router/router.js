const router = require("express").Router()
const Controllers = require('../Controllers/userController')
router.post('/register',((req,res)=>{
        Controllers.Register().then((result)=>{
                return res.status(201).json({
                        success: true,
                        message: "You are registered",
                        data:result
        })
 
})
}))
router.post('/login',Controllers.Login,((req,res)=>{
       return res.status(200).json({
                success: true,
                Message: "You are logged in",
                token: req.token,
                user: req.user
            })
}))
router.get('/getuser:id',((req,res)=>{
        const id = req.params.id
        console.log(id);
        Controllers.getuserById().then((result)=>{
                return  res.status(200).send({ 
                        success: true, 
                        data:result})
        })
      
}))
router.get('/getalluser',((req,res)=>{
        Controllers.getAllUser().then((result)=>{
                return res.status(200).json(
                        {success:true,
                        data:result})
        })
        
}))
router.put('/updateuser/:id',Controllers.verifytoken,Controllers.updateUserById,((req,res)=>{
       return res.status(200).json({success:true,
        message:"Updated Sucessfully",
        data:req.users})
}))
router.delete('/deleteuser/:id',Controllers.verifytoken,Controllers.Deleteuser,((req,res)=>{
        return res.status(200).json({
                success:true,
                message:"user deleted sucessfully",
                userDeleted:req.user
                })
}))
router.put('/changepassword/:id',Controllers.verifytoken,Controllers.ChangePassword,((req,res)=>{
        res.status(200).json({
                success:true,
                message:"Password changed succesfully",
                user:req.user
        })
}))
router.get('/logout',Controllers.verifytoken,Controllers.Logout,((req,res)=>{
        res.status(200).json({
                success:true,
                message:'User logged out'
        })
}))
module.exports = router