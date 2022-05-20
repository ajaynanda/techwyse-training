const bcrypt = require("bcrypt")
const Userdb = require("../model/user")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
exports.Register = ([
    check("fname", "Enter Firtsname")
        .exists(),
    check("lname", "Enter Lastname")
        .exists(),
    check("password", "password must be atleast 6 Characters long")
        .exists().isLength({ min: 6 }),
    check('email', "Email is not valid")
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    Userdb.findOne({ Email: req.body.email }).then(async (user) => {
        const errors = validationResult(req)
        console.log(validationResult);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() })
        }
        if (user) {
            console.log("email already exists");
            return res.status(401).json({
                error: true,
                message: "Email already exists",
                data: user
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
                return res.status(201).json({
                    success: true,
                    message: "You are registered",
                    data: user
                })
            }).catch(() => {
                return res.status(401).json({

                    message: "Email already exists",
                })
            })
        }
    })
})
exports.Login = ((req, res) => {
    Userdb.findOne({ Email: req.body.email }).then((user) => {
        if (!user) {
            res.status(401).json({ Error: true, Message: "no user found" })
        }
        if (user) {
            const password = user.Password
            bcrypt.compare(req.body.password, password).then((users) => {
               
                if (!users) {
                    res.status(401).json({ Error: true, Message: "password incorrect" })
                }
                if (users) {
                    const data = {
                        name: user.Firstname,
                        email: user.Email
                    }
                    const token = jwt.sign(data, process.env.key, { expiresIn: '15m' })
                    res.cookie('access token', token, {
                        maxAge: 1000 * 60 * 15,
                        secure: true,
                        httpOnly: true,
                        sameSite: 'lax'
                    })
                    console.log(req.cookies);
                    res.status(200).json({
                        success: true,
                        Message: "You are logged in",
                        token: token,
                        id: user.id
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
exports.getuserById = ((req, res) => {
    const id = req.params.id
    Userdb.findById(id).then((user) => {
        res.status(200).json({ success: true, data: user })
    }).catch((err) => {
        res.status(404).json({ Error: true, Message: "User not found with the id " + id })
    })
})
exports.getAllUser = ((req, res) => {
    Userdb.find().then((user) => {
        res.send(user)
    }).catch((err) => {
        res.send(err)
    })
})
exports.updateUserById = ((req, res) => {
    const id = req.params.id
    const user = ({
        Firstname: req.body.fname,
        Lastname: req.body.lname,
        Email: req.body.email,
        dateofbirth: req.body.dob,
        Gender: req.body.gender,
        Proffession: req.body.prof
    })
        Userdb.findByIdAndUpdate(id, user).then((users) => {
           return res.status(200).json(users)
        }).catch(err=>{
            res.status(401).json("User not found")
        })
})
exports.Deleteuser=((req,res)=>{
    const id =req.params.id
    Userdb.findByIdAndDelete(id).then((user)=>{
res.status(200).json(`user deleted with name  ${user.Firstname}`)
    }).catch(err=>{
        res.status(401).json("user not found")
    })
})
exports.Logout = ((req,res)=>{
    console.log(req.session); 
     req.session.destroy(function(err){  
        if(err) console.log(err);  
         else  
        {  
            res.status(200).json("User Logged out")
        }  
})
})
exports.ChangePassword =((req,res)=>{
    const id = req.params.id
    Userdb.findById(id).then(async(user)=>{
        if(!user){
            res.status(401).json("Not found the user")
        }else{
           
             const hashpassword = await    bcrypt.hash(req.body.npassword,10)
                    console.log(hashpassword);
                    Userdb.findByIdAndUpdate(id,{Password:npassword}).then((res)=>{
                        return  res.status(401).json("Password changed of user" + res)
                    }).catch(err=>{
                      return  res.status(401).json("Error updating password")
                    })
                }
        }).catch(err=>{
      res.status(401).json("user not found")
    })
}) 
exports.verifytoken = ((req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).json({ Error: true, Message: "You have already loggedout or no token found" })
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.key, ((err, result) => {
        if (err) res.status(401).json({ Error: true, Message: "Authentication failed" })
        else {
            next()
        }
    }))

})