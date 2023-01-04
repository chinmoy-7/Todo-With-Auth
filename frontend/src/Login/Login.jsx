import axios from "axios";
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {useNavigate}  from 'react-router-dom'
import { useAuth } from "../context/Auth";
import "./loginBig.css";
export default function Login() {
    const auth = useAuth()
  return (
    <>
      <div className=" form-container">
        <div className="login-header">
         <h1>TO-DO APPLICATION</h1>
      </div>
      <div className="login-content">
        <form action="" id="login-form">
        <h1>Login Form</h1>
          <div>
            <input type="text" className="form-control" placeholder="Email" onChange={(e)=>{auth.setlogin({...auth.login,email:e.target.value})}}/>
          </div>
          <div>
            <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{auth.setlogin({...auth.login,password:e.target.value})}}/>
          </div>
          {/* <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button> */}
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={auth.handlelogin}>Login</button>
          {auth.loading&&<small>Logging in ...</small>}
          <div>
           <small>Need an account?<Link to="/signup">Signup</Link></small>
          </div>
        </form>
      </div>
      </div>
    </>
  );
}
