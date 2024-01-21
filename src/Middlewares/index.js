const {check,validationResult}=require("express-validator")

const jwt = require("jsonwebtoken")


exports.verifyToken=(req,res,next)=>{
    try{
        const token=req.headers.authorization
        console.log(token);
        if(token){
            const data=jwt.verify(token,"MyAPPSECRET")
            const{id}=data;
            console.log(id);
            req.id=id;
            next();

        }else{
            return res.status(401).json({message:"token is missing"})
        }

    }catch(err){
        return res.status(401).json({err})
    }
}

exports.validateForm=[
    check("name").notEmpty().withMessage("please enter name"),
    check("phonenumber").isMobilePhone().withMessage("please enter valid phone number"),
    check("email").isEmail().withMessage("please enter valid email id"),
    check("intrest").notEmpty().withMessage("please enter your intrest"),
    check("message").isLength({max:100,min:1}).withMessage("please enter within 100 character message")
]
exports.isvalidated=(req,res,next)=>{
   const error=validationResult(req)
  if(error.array().length>0){
    return  res.status(400).json({message:error.array()[0]})

   }
   next()
}
