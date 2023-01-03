const mongoose = require("mongoose")

const taskSchema = mongoose.Schema({
    userId:String,
    description:String
})

const task = mongoose.model("Task",taskSchema);
module.exports = task