const router = require("express").Router();
const register = require("../Schema/register")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")

//Signup Route
router.post("/api/signup",async (req,res)=>{
    try{
        const checkUser = await register.find({email:req.body.email});
        if(checkUser.length!=0){
            return res.json({
                status:"failed",
                message:"User already Exists"
            })
        } 
        bcrypt.hash(req.body.password,10,async (err,hash)=>{
            if(err){
                return res.json({
                    status:"failed",
                    message:e.message
                })
            }
            const user = await register.create({
                email:req.body.email,
                username:req.body.username,
                password:hash
            })
        })
        
        res.json({
            status:"success",
            message:"succesfully registered"
        })
        

    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

//Login Route
router.post("/api/login",async (req,res)=>{
    try{
        const {email,password}=req.body
        const checkUser = await register.find({email:req.body.email})
        if(checkUser.length==0){
            return res.json({
                status:"failed",
                message:"No user Found"
            })
        }
        let result = bcrypt.compare(password,checkUser[0].password,(err,hash)=>{
            if(hash){
                const token = jwt.sign({_id:checkUser[0]._id},process.env.MY_JWT)
                res.json({
                    status:"success",
                    message:"successfully logged in",
                    token
                })
            }else{
                res.json({
                    status:"failed",
                    message:"Password didn't match"
                })
            }
        })

    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})



module.exports = router;