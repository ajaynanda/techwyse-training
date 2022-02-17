const router = require("express").Router()
const bcrypt = require("bcrypt")
const Userdb = require("../model/user")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
router.get("/", (req, res) => {
    res.send("done")
})
router.post("/register", [
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
    Userdb.findOne({ Email: req.body.email }).then(async (user) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() })
        }
        if (user) {
            return res.status(403).json({Error:true,
                Message:"Email already exists"})
        } else {
            const hashpassword = await bcrypt.hash(req.body.password, 10)
            const user = new Userdb({
                Firstname: req.body.fname,
                Lastname: req.body.lname,
                Email: req.body.email,
                Password: hashpassword
            })
            user.save(user).then(() => {
                res.status(201).json({
                    success:true,
                    message: "You are registered",
                    data: user
                })
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
router.post("/login", (req, res) => {
    Userdb.findOne({ Email: req.body.email }).then((user) => {
        if (!user) {
            res.json({Error:true, Message: "no user found" })
        }
        if (user) {
            const password = user.Password
            bcrypt.compare(req.body.password, password).then((users) => {
                if (!users) {
                    res.json({Error:true, Message: "password incorrect" })
                }
                if (users) {
                    const data = {
                        name: user.Firstname,
                        email: user.Email
                    }
                    const token = jwt.sign(data, process.env.key, { expiresIn: '15m' })
                    res.status(200).json({
                        success:true,
                        Message:"You are logged in",
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
const verifytoken = ((req, res, next) => {
    let authHeader = req.headers.authorization;
    if (authHeader == undefined) {
        res.status(401).json({Error:true,Message: "No token Found in header" })
    }
    let token = authHeader.split(" ")[1]
    jwt.verify(token, "secreykey", ((err, result) => {
        if (err) res.status(401).json({Error:true,Message: "Authentication failed" })
        else {
            next()
        }
    }))

})
router.get("/getuser/:id", verifytoken, (req, res) => {
    const id = req.params.id
    Userdb.findById(id).then((user) => {
        res.status(200).json({ success:true,data:user })
    }).catch((err) => {
        res.status(404).json({Error:true,Message:"User not found with the id " + id})
    })
})
module.exports = router