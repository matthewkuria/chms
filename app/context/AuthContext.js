'use client';
import React, { useState,useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = async () => {
    const token = Cookies.get("access_token");
    setIsAuthenticated(!!token);
    if (token) {
      setUser({ accessToken: token });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

