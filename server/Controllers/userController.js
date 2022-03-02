const bcrypt = require("bcrypt")
const Userdb = require("../model/user")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Register = ([
    check("fname")
        .exists().withMessage("Enter Firtsname"),
    check("lname")
        .exists().withMessage("Enter Lastname"),
    check("password")
        .exists()
        .isLength({ min: 6 }).withMessage("password must be atleast 6 Characters long"),
    check('email')
        .isEmail().withMessage( "Email is not valid")
        .normalizeEmail()
], (req, res) => {
    return new Promise((resolve, reject) => {
        Userdb.findOne({ Email: req.body.email }).then(async (user) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return reject({ errors: errors.array() })
            }
            if (user) {
                console.log("email already exists");
                return reject({ Error: true, Message: "Email already exists " })
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
                    if (user) {
                        return resolve(user)
                    }
                }).catch(() => {
                    return reject({ Error: true, Message: "Enter all fields" })
                })
            }
        })
    })
})
const Login = ((req, res) => {
    return new Promise((resolve, reject) => {

        Userdb.findOne({ Email: req.body.email }).then((user) => {
            if (!user) {
                return reject({ Error: true, Message: "Email incorrect" })
            }
            if (user) {
                const password = user.Password
                bcrypt.compare(req.body.password, password).then((users) => {
                    console.log(users);
                    if (!users) {
                        return reject({ Error: true, Message: "Password Incorrect " })
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
                        return resolve(user)
                    }
                }).catch((err) => {
                    return reject(err);
                })
            }
        })
    })
})
const getuserById = ((req, res) => {

    return new Promise((resolve, reject) => {
        const id = req.params.id
        console.log(id);
        Userdb.findById(id).then((user) => {
            return resolve(user)
        }).catch((err) => {
            return reject({ Error: true, Message: "User not found with the id " + id })
        })
    })
})
const Pagination = ((req, res) => {
    return new Promise((resolve, reject) => {

        Userdb.paginate({}, { page: req.query.page || 1, limit: req.query.limit || 5 })
            .then((response) => {
                resolve({ response })
            }).catch(err => {
                reject({ Error: true, message: "Pagination doesn't works" })
            })
    })
})
const search = ((req, res) => {
    return new Promise(async (resolve, reject) => {
        await Userdb.find(
            {
                '$or': [
                    { 'Firstname': { $regex: req.params.key, $options: 'i' } }
                ]
            }
        ).then((data) => {
            resolve(data)
        }).catch(err => {
            reject({ message: "No results Found with keyword " + req.params.key })
        })
    })
})
const getAllUser = ((req, res) => {
    return new Promise((resolve, reject) => {
        Userdb.find({}).sort({ Firstname: 1 }).then((user) => {
            return resolve(user)
        }).catch((err) => {
            return reject(err)
        })
    })
})
const updateUserById = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        const user = ({
            Firstname: req.body.fname,
            Lastname: req.body.lname,
            Email: req.body.email,
            dateofbirth: req.body.dob,
            Gender: req.body.gender,
            Proffession: req.body.prof
        })
        console.log("update triggeredd in angular");
        Userdb.findByIdAndUpdate(id, user).then((users) => {
            req.name = users.Firstname
            return resolve(users)

        }).catch(err => {
            return reject({ Error: true, Message: "User not found with the id " + id })
        })
    })
})
const Deleteuser = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        Userdb.findByIdAndDelete(id).then((user) => {
            return resolve(user)
        }).catch(err => {
            return reject({ Error: true, Message: "User not found with the id " + id })
        })
    })
})
const Logout = ((req, res, next) => {
    return new Promise((resolve, reject) => {
        console.log(req.session);
        req.session.destroy(function (err) {
            if (err) reject('You are unable to logout now')
            else {
                return resolve('You have Logged out')
            }
        })
    })
})
const ChangePassword = (async (req, res, next) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        Userdb.findById(id).then(async (user) => {
            const comparepassword = await bcrypt.compare(req.body.opassword, user.Password)
            if (!comparepassword) {
                return reject({
                    error: true,
                    message: "Current Password is incorrect"
                })
            } else {
                const hashpassword = await bcrypt.hash(req.body.npassword, 10)
                const password = {
                    Password: hashpassword
                }
                Userdb.findByIdAndUpdate(id, password).then((res) => {
                    return resolve(res)
                }).catch(err => {
                    return reject("Error while Changing the password")
                })
            }
        }).catch(err => {
            return reject({ Error: true, message: "Not found the user" })
        })
    })
})
const verifytoken = ((req, res) => {
    return new Promise((resolve, reject) => {
        let authHeader = req.headers.authorization;
        if (authHeader == undefined) {
            return reject({ Error: true, message: "You have already loggedout or no token found" })
        }
        let token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.key, ((err, result) => {
            if (err) return reject({ Error: true, message: "Authentication failed" })
            else {
                resolve(token)
            }
        }))
    })
})
module.exports = {
    Login,
    Logout,
    verifytoken,
    ChangePassword,
    getAllUser,
    getuserById,
    updateUserById,
    Deleteuser,
    Register,
    Pagination,
    search
}