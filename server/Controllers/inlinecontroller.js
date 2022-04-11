const inlinedb = require("../model/inlineuser")
const adduser = ((req, res) => {
    return new Promise((resolve, reject) => {
        if (!req.body) {
            reject({ Error: true, message: "No data found" })
        } else {
            const user = new inlinedb({
                Name: req.body.name,
                Email: req.body.email,
                City: req.body.city,
                Phone: req.body.phone
            })
            user.save(user).then((result) => {
                resolve({ Success: true, message: "User added succesfully", data: result })
            }).catch(err => {
                reject({ Error: true, message: "Error on adding" })
            })
        }

    })
})
const updateuser = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        console.log(id);
        const data = ({
            Email: req.body.email,
            Phone: req.body.phone,
            City: req.body.city,
            Name: req.body.name
        })

        inlinedb.findByIdAndUpdate(id, data).then((result) => {
            resolve({ Success: true, message: "user data updated successfully", data: result })
        }).catch(err => {
            reject({ Error: true, message: "error on updating" })
        })
    })
})
const deleteuser = ((req, res) => {
    return new Promise((resolve, reject) => {
        const id = req.params.id
        inlinedb.findByIdAndDelete(id).then((result) => {
            resolve({ Success: true, message: "User deleted successfully", data: result })
        }).catch(err => {
            reject({ error: true, message: "Error on deleting the data" })
        })
    })
})
const inlineusers = ((req, res) => {
    return new Promise((resolve, reject) => {
        inlinedb.find().then((result) => {
            resolve({ Success: true, message: "all users ", data: result })
        }).catch(err => {
            reject(err)
        })
    })
})
module.exports = { adduser, updateuser, deleteuser, inlineusers }