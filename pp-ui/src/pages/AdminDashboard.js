import React, { useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import PropertyManagement from './PropertyManagement';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Settings from './Settings';
import LeaseManagement from '../components/LeaseManagement';

function AdminDashboard() {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || userRole !== 'admin') {
            navigate('/admin-login');
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleLogout = () => {
        logout(); 
        navigate('/admin-login');
    };

    return (
        isAuthenticated && userRole === 'admin' ? (
            <div className="admin-dashboard container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/admin">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/properties">
                                        Property Management
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/users">
                                        User Management
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/reports">
                                        Reports
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin/settings">
                                        Settings
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-link nav-link">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Routes>
                            <Route path="/admin/properties" element={<PropertyManagement />} />
                            <Route path="/admin/users" element={<UserManagement />} />
                            <Route path="/admin/reports" element={<Reports />} />
                            <Route path="/admin/settings" element={<Settings />} />
                            <Route path="/admin/leases" element={<LeaseManagement />} />
                        </Routes>
                    </main>
                </div>
            </div>
        ) : null
    );
}

export default AdminDashboard;