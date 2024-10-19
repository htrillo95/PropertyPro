import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ element, requiredRole }) => {
    const { isAuthenticated, userRole } = useAuth();

    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If authenticated but does not have the required role, redirect to "not authorized" page
    if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/not-authorized" />;
    }

    // If authenticated and has the required role, render the component
    return element;
};

export default ProtectedRoute;