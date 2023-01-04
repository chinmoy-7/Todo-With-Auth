import { createContext, useContext } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    return(
        <AuthContext.Provider value={""}>
            {children}
        </AuthContext.Provider>
    )
}

export const Auth = ()=>{
    return useContext(AuthContext)
}
