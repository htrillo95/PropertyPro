import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use authentication context
import axios from 'axios'; // Use axios for API requests

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                { username, password },
                { withCredentials: true } // Ensure cookies are sent with the request
            );

            const { role, token } = response.data; // Ensure role and token are returned from backend
            console.log('Login Response:', response.data); // Debugging log

            // Store the token in localStorage
            localStorage.setItem('token', token || '');

            if (role === 'admin') {
                login(response.data); // Set login role for admin
                navigate('/admin'); // Redirect to admin dashboard
            } else if (role === 'TENANT') {
                login(response.data); // Set login role for tenant
                navigate('/tenant-dashboard'); // Redirect to tenant dashboard
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            console.error('Login error:', error); // Debug log
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
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
        </div>
    );
}

export default Login;