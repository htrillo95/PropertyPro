import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login('admin');
        navigate('/admin');
    };

    return (
        <div>
            <h2>Admin Login</h2>
            <button onClick={handleLogin}>Login as Admin</button>
        </div>
    );
};

export default AdminLogin;