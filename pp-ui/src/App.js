import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PropertyList from './pages/PropertyList';
import AdminDashboard from './pages/AdminDashboard';
import TenantPortal from './pages/TenantPortal';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/properties" element={<PropertyList />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/tenant" element={<TenantPortal />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;