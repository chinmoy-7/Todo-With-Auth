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

//Get all Task
router.get("/api/tasks",Auth,async(req,res)=>{
    try{
        const allTasks = await task.find({userId:res.user_id})
        res.json(allTasks)
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

//Delete Task
router.delete("/api/delete/:id",Auth,async (req,res)=>{
    try{
            const {id}=req.params
        await task.deleteOne({_id:id})
        res.json({
            status:"success"
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

//Edit a Task
router.put("/api/edit",Auth,async(req,res)=>{
    try{

        const {description,id}=req.body.editTask
        await task.updateOne({_id:id},{
            _id:id,
            description:description
        })

        res.json({
            status:"success"
        })
    }catch(e){
        res.json({
            status:"failed",
            message:e.message
        })
    }
})

module.exports = router;