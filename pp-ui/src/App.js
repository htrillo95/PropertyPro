import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyList from './pages/PropertyList';
import AdminDashboard from './pages/AdminDashboard';
import TenantPortal from './pages/TenantPortal';
import Login from './pages/Login';
import Register from './pages/Register';
import TenantDashboard from './pages/TenantDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ContactUs from './pages/ContactUs';
import Footer from './components/Footer';
import UserManagement from './pages/UserManagement';
import PropertyManagement from './pages/PropertyManagement';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import AdminLogin from './AdminLogin';  // Use the updated, shorter AdminLogin
import ProtectedRoute from './ProtectedRoute';  // For route protection
import { AuthProvider } from './context/AuthContext';  // For handling user authentication
import LeaseManagement from './components/LeaseManagement';

function App() {
    return (
        <AuthProvider> {/* Wrap the app in AuthProvider for authentication */}
            <Router>
                <div className="container mt-4">
                    <Navbar />
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/properties" element={<PropertyList />} />
                        <Route path="/tenants" element={<TenantPortal />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/contact" element={<ContactUs />} />
                        
                        {/* Protected routes for admin */}
                        <Route
                            path="/admin"
                            element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}
                        >
                            <Route path="user-management" element={<UserManagement />} />
                            <Route path="property-management" element={<PropertyManagement />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="lease-management" element={<LeaseManagement />} />
                        </Route>
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;