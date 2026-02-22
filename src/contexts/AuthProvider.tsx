import {type ReactNode, useState} from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));

    const login = (token?: string) => {
        if(!token) return;
        sessionStorage.setItem('accessToken', token);
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