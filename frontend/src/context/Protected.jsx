import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './Auth'
export default function Protected({children }) {
    const auth = useAuth();
    if(auth.isLogin){
        <Navigate to="/"/>
    }
  return children
}
