import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TenantPortal() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            navigate('/tenant-dashboard');
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-md-6">
                <div className="card shadow-lg p-4">
                    <div className="card-body">
                        <div className="tenants-hero-section text-center mb-4">
                            <h1 className="display-5">Welcome, Tenants!</h1>
                            <p className="lead">Log in to access your portal and manage your account.</p>
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <form onSubmit={handleLogin} className="mt-4">
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
                            Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TenantPortal;