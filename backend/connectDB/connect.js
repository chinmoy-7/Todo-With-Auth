const mongoose = require("mongoose");

const connectDB=()=>{
    mongoose.set("strictQuery",false)
    return mongoose.connect(process.env.URI).then((res)=>{
        console.log("Connected to DB")
    })
}
module.exports = connectDB