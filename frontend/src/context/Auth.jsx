import { createContext, useContext } from "react";
import axios from "axios";
import React, { useState } from "react";
import {Link} from 'react-router-dom'
import {useNavigate}  from 'react-router-dom'

const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const navigate=useNavigate()
    const [isLogin,setIsLogin]=useState(false);
    const [loading,setLoading] = useState(false);
    const [login,setlogin]=useState({email:"",password:""})
    const handlelogin=async (e)=>{
        e.preventDefault();
        try{
            //Validation
            if(!login.email.match("^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+$")){
                alert("Enter valid email");
                return;
            }else if(login.password.length<6&&login.password.length>16){
                alert("Password length should be between 6 to 16")
                return;
            }

            //Server Work
            setLoading(true)
            const user = await axios.post("http://localhost:3004/api/login",login)

            if(user.data.status=="success"){
                alert("Login Successfull");
                window.localStorage.setItem("token",user.data.token)
                setIsLogin(true)
                navigate("/todo",{replace:true})

            }else{
                alert("Enter correct credentials");
            }

        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
        }
    }
    return(
            <AuthContext.Provider value={{handlelogin,setIsLogin,login,setLoading,loading,setlogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext)
}
