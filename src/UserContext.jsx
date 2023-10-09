import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    //Modelo usuario
    const storedUser = localStorage.getItem('user');
    const [user, setUser] = useState(storedUser ? (JSON.parse(storedUser)) : (null));

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.clear();
    };

    const ip = '172.27.98.6'

    return (
        <UserContext.Provider value={{ user, login, logout, ip, setUser }}>
            {children}
        </UserContext.Provider>
    );
};