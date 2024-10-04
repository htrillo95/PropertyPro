import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Initialize state based on localStorage data (for persistent sessions)
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    const [userRole, setUserRole] = useState(() => {
        const storedRole = localStorage.getItem('userRole');
        return storedRole ? storedRole : null;
    });

    // New: State for user information (e.g., tenantId, propertyId)
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Whenever `isAuthenticated`, `userRole`, or `user` changes, update localStorage
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('userRole', userRole);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    }, [isAuthenticated, userRole, user]);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUserRole(userData.role);
        setUser(userData); // Set user information from login response
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);