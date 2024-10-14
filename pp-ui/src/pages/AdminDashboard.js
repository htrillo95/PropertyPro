import React, { useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  
import PropertyManagement from './PropertyManagement';
import UserManagement from './UserManagement';
import Reports from './Reports';
import Settings from './Settings';
import LeaseManagement from '../components/LeaseManagement'; // Import the new LeaseManagement component

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

    return isAuthenticated && userRole === 'admin' ? (
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
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin/lease-management">
                                    Lease Management
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Routes>
                        <Route path="/" element={<div className="welcome-message">
                            <h2 className="display-4">Welcome back, Admin!</h2>
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>} />
                        <Route path="/property-management" element={<PropertyManagement />} />
                        <Route path="/user-management" element={<UserManagement />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/lease-management" element={<LeaseManagement />} /> {/* Add this route */}
                    </Routes>
                </main>
            </div>
        </div>
    ) : null;
}

export default AdminDashboard;