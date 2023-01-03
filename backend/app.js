const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const connect= require("./connectDB/connect")
const loginAndSignup = require("./Routes/signupAndLogin")
const operations = require("./Routes/operations")


const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();


app.use("/",loginAndSignup)
app.use("/",operations)

app.listen(process.env.PORT,async ()=>{
    await connect();
    console.log(`The server is up at ${process.env.PORT}`)
})