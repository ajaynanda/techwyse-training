const nodemailer = require('nodemailer')
const hbs = require("nodemailer-express-handlebars")
const path = require("path")
const Emailsend = (async(req,passwordgen)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.workLugeEmail,
          pass:process.env.workLugePassword,
        },
      });
      const hbsoptions = {
        viewEngine:{
            extName:'.handlebars',
            partialsDir:path.resolve('./views'),
            defaultLayout:false,
      },
        viewPath:path.resolve('./views'),
        extName:'.handlebars'
    }
      transporter.use('compile',hbs(hbsoptions))
    const options = {
        from:process.env.workLugeEmail, // sender address
        to: req.body.email, // list of receivers
        subject: "Registration Password", // Subject line
        text: "You are successfully registered", // plain text body
        attachments:[
            {filename:'pic.jpg',path:'./public/pic.jpg'}
        ],
        template:'index',
        context:{
            password:passwordgen
        },
    }
     const mailresponse =   transporter.sendMail(options);
     if(await mailresponse){
         console.log(mailresponse);
     }else{
         console.log("error in sending email");
     }
})

 module.exports = Emailsend