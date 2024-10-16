import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import Auth context
import axios from 'axios';

function TenantPortal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login from AuthContext

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8080/api/auth/login',
                { username, password },
                { withCredentials: true } // Ensure cookies are sent
            );

            const userData = response.data;
            console.log('Login Response:', userData); // Debug log

            localStorage.setItem('token', userData.token || ''); // Store token

            login(userData); // Update context with user data
            navigate('/tenant-dashboard'); // Redirect to tenant dashboard
        } catch (error) {
            console.error('Login error:', error); // Debug log
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-6">
                <div className="card shadow-lg p-4">
                    <div className="card-body">
                        <h1 className="display-5 text-center">Welcome, Tenants!</h1>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Log In to Your Portal</button>
                        </form>
                        <p className="mt-3">
                            Don't have an account? <Link to="/register">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TenantPortal;