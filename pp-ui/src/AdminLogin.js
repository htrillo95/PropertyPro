import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        // Hardcoded admin credentials
        const hardcodedUsername = 'admin';
        const hardcodedPassword = 'adminpassword';

        if (username === hardcodedUsername && password === hardcodedPassword) {
            login('admin');
            navigate('/admin');  // Redirects to Admin Dashboard
        } else {
            setError('Invalid admin credentials');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px', borderRadius: '10px' }}>
                <h2 className="text-center mb-4">Welcome, Admin!</h2>
                <p className="text-center mb-4">Log in to manage your properties and users.</p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your admin username"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your admin password"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Log In to Admin Panel</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;