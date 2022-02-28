const bcrypt = require("bcrypt")
const Userdb = require("../model/user")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Register = ([
    check("fname", "Enter Firtsname")
        .exists(),
    check("lname", "Enter Lastname")
        .exists(),
    check("password", "password must be atleast 6 Characters long")
        .exists()
        .isLength({ min: 6 }),
    check('email', "Email is not valid")
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    return new Promise((resolve,reject)=>{
        Userdb.findOne({ Email: req.body.email }).then(async (user) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(401).json({ errors: errors.array() })
            }
            if (user) {
                console.log("email already exists");
                return res.status(401).json({
                    error: true,
                    message: "Email already exists",
                })
            } else {
                const hashpassword = await bcrypt.hash(req.body.password, 10)
                const user = new Userdb({
                    Firstname: req.body.fname,
                    Lastname: req.body.lname,
                    Email: req.body.email,
                    Password: hashpassword,
                    dateofbirth: req.body.dob,
                    Gender: req.body.gender,
                    Proffession: req.body.prof
                })
                user.save(user).then(() => {
                    if(user){
                      return resolve(user)
                    }
                }).catch(() => {
                    return res.status(401).json({
                        message: "something went wrong while registering",
                    })
                })
            }
        })
    })
    
})
const Login = ((req, res,next) => {
    return new Promise((resolve,reject)=>{

        Userdb.findOne({ Email: req.body.email }).then((user) => {
            if (!user) {
                return  res.status(401).json({ Error: true, Message: "Email Incorrect" })
            }
            if (user) {
                const password = user.Password
                bcrypt.compare(req.body.password, password).then((users) => {
                    console.log(users);
                    if (!users) {
                        return res.status(401).json({ Error: true, Message: "Password incorrect" })
                    }
                    if (users) {
                        const data = {
                            name: user.Firstname,
                            email: user.Email
                        }
                        const token = jwt.sign(data, process.env.key, { expiresIn: '15m' })
                        res.cookie('access-token', token, {
                            maxAge: 1000 * 60 * 15,
                            secure: true,
                            httpOnly: true,
                            sameSite: 'lax'
                        })
                        console.log(req.cookies);
                    req.token = token 
                    req.user = user
                        next()
                    }
                }).catch((err) => {
                 return  reject(err);
                })
            }
        })
    })
   
})
const getuserById = ((req, res) => {
    
    return new Promise((resolve,reject)=>{
        const id = req.query.id 
        console.log(id);
        Userdb.findById(id).then((user) => {
          return resolve(user)
        }).catch((err) => {
            return reject({Error:true,Message:"User not found with the id " + id })
        })
    })
  
})
const getAllUser = (() => {
    return new Promise((resolve,reject)=>{
        Userdb.find().then((user) => {
           return resolve(user)
       }).catch((err) => {
         return  reject(err)
       })
    })
    
})
const updateUserById = ((req, res,next) => {
    const id = req.params.id
    const user = ({
        Firstname: req.body.fname,
        Lastname: req.body.lname,
        Email: req.body.email,
        dateofbirth: req.body.dob,
        Gender: req.body.gender,
        Proffession: req.body.prof
    })
    if(!req.body){
      return  res.status(500).json({message:"Enter all fields"})
    }
    console.log("update triggeredd in angular");
        Userdb.findByIdAndUpdate(id, user).then((users) => {
            req.name=users.Firstname
            req.users = users
            next()
        }).catch(err=>{
            res.status(401).json({Error:true,
                message:"User not found"})
        })
})
const Deleteuser=((req,res,next)=>{
    const id =req.params.id
    Userdb.findByIdAndDelete(id).then((user)=>{
        req.user = user
        next()
    }).catch(err=>{
        res.status(401).json({Error:true,
            message:"user not found"})
    })
})
const Logout = ((req,res,next)=>{
    console.log(req.session); 
     req.session.destroy(function(err){
         res.status(200).json({message:"You have logged out"})  
        if(err) console.log(err);  
         else  
        {  
        next()
        }  
})
})
const ChangePassword =(async(req,res,next)=>{
    const id = req.params.id
    Userdb.findById(id).then(async(user)=>{
                const comparepassword =await bcrypt.compare(req.body.opassword,user.Password)
                if(!comparepassword){
                  return  res.status(401).json({
                        error:true,
                        message:"Current Password is incorrect"
                    })
                }else{
                    const hashpassword = await  bcrypt.hash(req.body.npassword,10)
                    const password ={
                       Password: hashpassword
                    }
                    Userdb.findByIdAndUpdate(id,password).then((res)=>{
                        req.user = res
                        next()
                    }).catch(err=>{
                      return  res.status(401).json("Error while Changing the password")
                    })
                }
        }).catch(err=>{
            return  res.status(401).json({message:"Not found the user"})
        })
})
const verifytoken = ((req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).json({ Error: true, message: "You have already loggedout or no token found" })
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.key, ((err, result) => {
        if (err) res.status(401).json({ Error: true, message: "Authentication failed" })
        else {
            next()
        }
    }))

})
module.exports={
    Login,
    Logout,
    verifytoken,
    ChangePassword,
    getAllUser,
    getuserById,
    updateUserById,
    Deleteuser,
    Register
}