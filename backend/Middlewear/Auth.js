const jwt = require("jsonwebtoken");

const Auth = (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,process.env.MY_JWT,(err,decoded)=>{
            if(err){
                res.json({
                    status:"failed",
                    message:e.message
                })
            }
            res.user_id=decoded._id
            next()
        })
    }else{
        res.json({
            status:"failed",
            message:"Access Forbidden"
        })
    }
}

module.exports=Auth