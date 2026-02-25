import {type ReactNode, useState} from "react";
import { AuthContext } from "./AuthContext";
import {setSessionStorage} from "@/utils/util._common.ts";

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

    const login = (token?: string) => {
        if(!token) return;
        setSessionStorage('accessToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        sessionStorage.removeItem('accessToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};