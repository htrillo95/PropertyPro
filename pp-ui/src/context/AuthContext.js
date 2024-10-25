import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [user, setUser] = useState(null);

    // Load session state from localStorage on initial render
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

    // Sync authentication status and user role with localStorage
    useEffect(() => {
        localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
        localStorage.setItem('userRole', userRole);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    }, [isAuthenticated, userRole, user]);

    // Login function that uses the backend's /api/auth/login endpoint
    const login = async (credentials) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', credentials, {
                withCredentials: true,
            });
            const userData = response.data;

            setIsAuthenticated(true);
            setUserRole(userData.role);
            setUser(userData);

            // Optional: Set additional context values if needed for app
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: 'Login failed. Check your credentials.' };
        }
    };

    // Registration function to handle new tenant registrations
    const register = async (registrationData) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', registrationData, {
                withCredentials: true,
            });
            const userData = response.data;

            setIsAuthenticated(true);
            setUserRole(userData.role);
            setUser(userData);

            // Automatically log in after successful registration
            return { success: true };
        } catch (error) {
            console.error('Registration failed:', error);
            return { success: false, message: 'Registration failed. Try again.' };
        }
    };

    // Logout function to clear session and localStorage
    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);