import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TenantDashboard() {
    const [leaseInfo, setLeaseInfo] = useState(null);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [maintenanceIssue, setMaintenanceIssue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/api/user/lease')
            .then(response => setLeaseInfo(response.data))
            .catch(error => setError('Failed to fetch lease information'));

        axios.get('/api/user/maintenance-requests')
            .then(response => setMaintenanceRequests(response.data))
            .catch(error => setError('Failed to fetch maintenance requests'));
    }, []);

    const handleMaintenanceRequest = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/user/maintenance-requests', {
                description: maintenanceIssue,
                token: localStorage.getItem('token')
            });
            alert('Maintenance request submitted successfully');
        } catch (error) {
            alert('Failed to submit maintenance request');
        }
    };

    return (
        <div className="container tenant-dashboard-page mt-5">
            <h2 className="text-center">Tenant Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {/* Lease Information Section */}
            <div className="lease-info-section my-5">
                <h3>Your Lease Information</h3>
                {leaseInfo ? (
                    <div>
                        <p><strong>Property Address:</strong> {leaseInfo.property.address}</p>
                        <p><strong>Start Date:</strong> {leaseInfo.startDate}</p>
                        <p><strong>End Date:</strong> {leaseInfo.endDate}</p>
                        <p><strong>Rent Amount:</strong> ${leaseInfo.rentAmount}</p>
                    </div>
                ) : (
                    <p>No lease information available.</p>
                )}
            </div>

            {/* Maintenance Requests Section */}
            <div className="maintenance-requests-section my-5">
                <h3>Your Maintenance Requests</h3>
                {maintenanceRequests.length > 0 ? (
                    <ul>
                        {maintenanceRequests.map(request => (
                            <li key={request.id}>
                                <p><strong>Description:</strong> {request.description}</p>
                                <p><strong>Date:</strong> {request.requestDate}</p>
                                <p><strong>Status:</strong> {request.isResolved ? 'Resolved' : 'Pending'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No maintenance requests submitted.</p>
                )}
            </div>

            {/* Maintenance Request Form */}
            <div className="maintenance-request-form my-5">
                <h3>Submit a Maintenance Request</h3>
                <form onSubmit={handleMaintenanceRequest}>
                    <div className="mb-3">
                        <label htmlFor="issue" className="form-label">Issue:</label>
                        <textarea
                            id="issue"
                            name="issue"
                            className="form-control"
                            rows="4"
                            value={maintenanceIssue}
                            onChange={(e) => setMaintenanceIssue(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Request</button>
                </form>
            </div>

            {/* Payment Information Section */}
            <div className="payment-info-section my-5 text-center">
                <h3>Rent Payment</h3>
                <p>You can pay your rent online through our secure payment portal.</p>
                <a href="/payment-portal" className="btn btn-secondary mt-3">Pay Rent Online</a>
            </div>
        </div>
    );
}

export default TenantDashboard;