const jwt = require("jsonwebtoken");

const S_KEY = "vaish";

const userTokenVerification = (req,res,next)=>{
if (req.body.token !== undefined && req.body.token!="") {
    try {
        const decoder = jwt.verify(req.body.token,S_KEY);
        next();
    } catch (error) {
        res.status(404).send({message:"Invalid Token",error:error})
    }    
} else {
    res.status(404).send({message:"Invalid Token ! "})
}
}


const multer = require('multer');

let upload_storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload')
    },
    filename:function(req,file,cb){
        let img = file.originalname.split(".")
        // console.log(img);
        
        cb(null, file.originalname);
    }
})
const upload = multer({storage:upload_storage})

const verifyext = async (req,res,next) => {
 try {
    if (req.file.mimetype==="image/png") {
        next();
    } else {
        res.status(404).send({message:"extension did not match"})
    }
 } catch (error) {
    res.send(error)
 } 
}

module.exports={userTokenVerification,upload,verifyext};