import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    const [userRole, setUserRole] = useState(() => {
        const storedRole = localStorage.getItem('userRole');
        return storedRole || null;
    });

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('userRole', userRole);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    }, [isAuthenticated, userRole, user]);

    const login = (userData) => {
        console.log('Login userData:', userData); // Debug log
        setIsAuthenticated(true);
        setUserRole(userData.role);
        setUser(userData);
    };

    const logout = () => {
        console.log('User logged out'); // Debug log
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        localStorage.clear(); // Clear all local storage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);