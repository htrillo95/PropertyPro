import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { useAuth } from './context/AuthContext';

const AdminLogin = () => {
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
                { withCredentials: true }  // Ensuring session is created on the backend
            );

            if (response.status === 200 && response.data.role === 'admin') {
                login(response.data); // Set authenticated state with role
                navigate('/admin');  // Redirect to Admin Dashboard
            } else {
                setError('Invalid admin credentials');
            }
        } catch (err) {
            setError('Failed to login. Please check your credentials and try again.');
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