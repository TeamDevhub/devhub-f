import {createContext, useContext} from "react";

interface AuthContextType {
    isLoggedIn?: boolean;
    login?:(token?:string)=>void;
    logout?:()=>void;
}

export const AuthContext = createContext<AuthContextType>({});
export const useAuth = () => useContext(AuthContext);