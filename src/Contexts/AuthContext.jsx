import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {

const [usertoken,setusertoken]=useState(localStorage.getItem("token")??"")




  return <AuthContext.Provider value={{usertoken,setusertoken}}>
    {children}
    </AuthContext.Provider>;
}
