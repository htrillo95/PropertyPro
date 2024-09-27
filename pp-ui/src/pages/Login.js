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
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            const { role } = response.data; // Ensure role is returned from backend
 
            if (role === 'admin') {
                login('admin'); // Set login role for admin
                navigate('/admin'); // Redirect to admin dashboard
            } else if (role === 'TENANT') {
                login('tenant'); // Set login role for tenant
                navigate('/tenant-dashboard'); // Redirect to tenant dashboard
            } else {
                setError('Invalid role');
            }
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                {error && <p className="error-message">{error}</p>}
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