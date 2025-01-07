import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const login = (jwt) => {
        setToken(jwt);
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
