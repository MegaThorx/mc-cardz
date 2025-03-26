import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";

const AuthContext = createContext({token: '', setToken: (_token: string) => {}});

const AuthProvider = ({children}: PropsWithChildren) => {
    const [token, setToken] = useState(localStorage.getItem('token') ?? '');
    
    useEffect(() => {
        if (token !== '') {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token')
        }
    }, [token]);
    
    return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext)
};

export default AuthProvider;