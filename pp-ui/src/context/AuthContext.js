import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);

    // Ensure localStorage is synced when the authentication status or user role changes
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        const storedRole = localStorage.getItem('userRole');
        const storedUser = localStorage.getItem('user');

        if (storedAuth && storedRole && storedUser) {
            setIsAuthenticated(JSON.parse(storedAuth));
            setUserRole(storedRole);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('userRole', userRole);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    }, [isAuthenticated, userRole, user]);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUserRole(userData.role);  // Ensure the role is set during login
        setUser(userData);
        localStorage.setItem('token', userData.token); // Store token for API requests
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);