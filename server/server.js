const express = require("express")
const app = express()
const cors = require('cors')
const path = require("path")
const connectdb = require("./connection/db")
const morgan = require("morgan")
const router = require("./router/router")
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require("body-parser")
app.use(session({
    secret:"secreykey",
    saveUninitialized:true,
    resave:false
}))

app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'handlebars');
app.use(morgan('tiny'))
app.use(bodyParser.json({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(cors())
app.use("/",router)
app.listen(4000,console.log("server connected"))