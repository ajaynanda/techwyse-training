
const multer = require("multer")
const Storage= multer.diskStorage({
    destination:'../AngularTest/src/assets',
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }  
})
const upload = multer({
    storage:Storage,
    limits : {fileSize : 20000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          cb(null, false);
        return cb({error:true,message:'Only .png, .jpg and .jpeg format allowed!'})
        }
      }
}).fields([{name:'images'},{name:'cropimg'}])


module.exports =upload