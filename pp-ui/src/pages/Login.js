import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simplified login logic, or remove this if no longer needed
        if (email === 'admin@example.com' && password === 'adminpassword') {
            login('admin'); // Login as admin
            navigate('/admin');
        } else if (email === 'tenant@example.com' && password === 'tenantpassword') {
            login('tenant'); // Login as tenant
            navigate('/tenant-dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;