const router = require("express").Router();
const register = require("../Schema/register")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")
const Auth = require("../Middlewear/Auth")
const task = require("../Schema/task")

//Add Task
router.post("/api/add",Auth,async (req,res)=>{
    try{
        const token = req.headers.authorization
        if(token){
            
            const newTask = await task.create({
                userId:res.user_id,
                description:req.body.description
            })
            res.json({
                status:"success",
                newTask
            })
        }
        
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports = router;