import { useEffect, useState, createContext, useContext, useCallback } from 'react';

import axios from 'axios';

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: '',
    })
    //default axios

    
    axios.defaults.headers.common["Authorization"] = auth?.token;

    const updateAuthFromLocalStorage = useCallback(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth(prevAuth => ({
                ...prevAuth,
                user: parseData.user,
                token: parseData.token
            }));
        }
    }, []);

    useEffect(() => {
        updateAuthFromLocalStorage();
    }, [updateAuthFromLocalStorage]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );

};


//Custom Hook
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };