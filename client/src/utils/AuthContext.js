import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (jwt) => {
    setToken(jwt);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, currentUser, setCurrentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
