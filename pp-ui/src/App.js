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
import AdminLogin from './AdminLogin';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './AuthContext'; 

function App() {
    return (
        <AuthProvider> {/* Wrap your app in AuthProvider */}
            <Router>
                <div className="container mt-4">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/properties" element={<PropertyList />} />
                        <Route path="/tenants" element={<TenantPortal />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
                        <Route path="/admin-login" element={<AdminLogin />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/contact" element={<ContactUs />} />
                        {/* Admin routes */}
                        <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}>
                            <Route path="user-management" element={<UserManagement />} />
                            <Route path="property-management" element={<PropertyManagement />} />
                            <Route path="reports" element={<Reports />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;