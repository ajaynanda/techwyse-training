const router = require("express").Router()
const bcrypt = require("bcrypt")
const Userdb = require("../model/user")
const jwt = require("jsonwebtoken")
require("dotenv").config()
router.get("/", (req, res) => {
    res.send("done")
})
router.post("/register", (req, res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const password = req.body.password
    if (fname == undefined || lname == undefined || email == undefined || password == undefined) {
        return res.send("enter all fields")
    }
    if (password.length < 6) {
        return res.send("password must be atleast 6 characters")
    }
    Userdb.findOne({ Email: req.body.email }).then(async (user) => {
        if (user) {
            return res.send("Email already exists")
        } else {

            const hashpassword = await bcrypt.hash(password, 10)
            const user = new Userdb({
                Firstname: req.body.fname,
                Lastname: req.body.lname,
                Email: req.body.email,
                Password: hashpassword
            })
            user.save(user).then(() => {
                res.send(user + "You are registered")
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
router.post("/login", (req, res) => {
    Userdb.findOne({ Email: req.body.email }).then((user) => {
        if (!user) {
            res.send("no user found")
        }
        if (user) {
            const password = user.Password
            bcrypt.compare(req.body.password, password).then((users) => {
                if (!users) {
                    res.send("password incorrect")
                }
                if (users) {
                    const data = {
                        name: user.Firstname,
                        email: user.Email
                    }
                    const token = jwt.sign(data, process.env.key, { expiresIn: '15m' })
                    res.send("You have logged in")
                    console.log(token);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
router.get("/getuser",(req, res) => {
    Userdb.find().then((user) => {
        res.send(user)
    }).catch((err)=>{
        res.send(err)
    })
})
module.exports = router