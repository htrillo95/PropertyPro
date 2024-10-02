import React, { useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Corrected import
import PropertyManagement from './PropertyManagement';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Settings from './Settings';

function AdminDashboard() {
    const { isAuthenticated, userRole, logout } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated or not admin role
    useEffect(() => {
        if (!isAuthenticated || userRole !== 'admin') {
            navigate('/admin-login'); // Redirect to the admin login page
        }
    }, [isAuthenticated, userRole, navigate]);

    const handleLogout = () => {
        logout(); // Clear authentication state
        navigate('/admin-login'); // Redirect to admin login page after logout
    };

    // Render Admin Dashboard
    return isAuthenticated && userRole === 'admin' ? (
        <div className="admin-dashboard container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/admin">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/property-management">
                                    Property Management
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/user-management">
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
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path="/" element={
                            <div className="welcome-message">
                                <h2 className="display-4">Welcome back, Admin!</h2>
                                <p className="lead">Manage your properties, users, and reports effectively using the tools on the left. Let's make today productive!</p>
                                <button className="btn btn-danger" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        } />
                        <Route path="/property-management" element={<PropertyManagement />} />
                        <Route path="/user-management" element={<UserManagement />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </main>
            </div>
        </div>
    ) : null; // Render nothing if not authenticated or not admin
}

export default AdminDashboard;