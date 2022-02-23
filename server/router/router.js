const router = require("express").Router()
const { Register } = require("../Controller/Usercontroller")
const Controllers = require('../Controllers/userController')
router.post('/register',Controllers.Register,((req,res)=>{
   return res.status(201).json({
            success: true,
            message: "You are registered",
            data:req.data
})
}))
router.post('/login',Controllers.Login,((req,res)=>{
       return res.status(200).json({
                success: true,
                Message: "You are logged in",
                token: req.token,
                id: req.userid
            })
}))
router.get('/getuser/:id',Controllers.getuserById,((req,res)=>{
      return  res.status(200).json({ 
              success: true, 
              data:req.user })
}))
router.get('/getalluser',Controllers.getAllUser,((req,res)=>{
        return res.status(200).json(
                {success:true,
                data:req.users})
}))
router.put('/updateuser/:id',Controllers.updateUserById,((req,res)=>{
       return res.status(200).json({success:true,
        message:"Updated the document of " +req.name,
        data:req.users})
}))
router.delete('/deleteuser/:id',Controllers.Deleteuser,((req,res)=>{
        return res.status(200).json({
                success:true,
                message:"user deleted sucessfully",
                userDeleted:req.user
                })
}))
router.get('/changepassword/:id',Controllers.ChangePassword,((req,res)=>{
        res.status(200).json({
                success:true,
                message:"Password changed succesfully",
                user:req.user
        })
}))
router.get('/logout',Controllers.Logout,((req,res)=>{
        res.status(200).json({
                success:true,
                message:'User logged out'
        })
}))
module.exports = router