import axios from "axios";
import React, { useState } from "react";
import "./signupBig.css";
import { useNavigate } from "react-router-dom";
import "./signup.css";
export default function Signup() {
    const navigate = useNavigate()
    const [signup,setSignup]=useState({username:"",email:"",password:"",confirmPassword:""})
    const [loading,setLoading] = useState(false);
    const handleSignup=async (e)=>{
        e.preventDefault();
        try{
            const p1=signup.password;
            const p2=signup.confirmPassword;
            //Validation
            if(!signup.username.match("^[a-zA-Z0-9.-]+$")&&signup.username.length<6){
                alert("Length should be minimum 6 characters");
            }else if(!signup.email.match("^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$")){
                alert("Enter valid email");
                return;
            }else if(signup.password.length<6&&signup.password.length>16){
                alert("Password length should be between 6 to 16")
                return;
            }else if(p1!=p2){
                alert("Password didn't match");
                return 
            }

            //Server Work
            setLoading(true)
            const newUser = await axios.post("https://todo-a3mc.onrender.com/api/signup",signup)
            if(newUser.data.status=="failed"){
                alert("User already Exists");
                return
            }

            alert("Registered Successfully");
            navigate("/",{replace:true})
            console.log(newUser)
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }
  return (
    <>
      <div className=" form-container">
        <div className="signup-header">
         <h1>TO-DO APPLICATION</h1>
      </div>
      <div className="signup-content">
        <form action="" id="signup-form">
        <h1>Signup Form</h1>
          <div>
            <input type="text" className="form-control" placeholder="Username" onChange={(e)=>{setSignup({...signup,username:e.target.value})}}/>
          </div>
          <div>
            <input type="text" className="form-control" placeholder="Email" onChange={(e)=>{setSignup({...signup,email:e.target.value})}}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{setSignup({...signup,password:e.target.value})}}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="Confirm Password" onChange={(e)=>{setSignup({...signup,confirmPassword:e.target.value})}}/>
          </div>
          {/* <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button> */}
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={handleSignup}>Signup</button>
          {loading&&<small>Registering ...</small>}
        </form>
      </div>
      </div>
    </>
  );
}
