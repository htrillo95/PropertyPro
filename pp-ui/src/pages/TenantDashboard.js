import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Correct import

function TenantDashboard() {
    const { user } = useAuth(); // Get the logged-in user from context
    const [leaseInfo, setLeaseInfo] = useState(null);
    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    const [maintenanceIssue, setMaintenanceIssue] = useState('');
    const [error, setError] = useState('');

    // Add Debug Logs
    useEffect(() => {
        console.log("User context:", user); // Log user context to debug
        const token = localStorage.getItem('token');
        console.log("Token:", token); // Log token to debug

        if (user && user.id) {
            console.log("User authenticated with ID:", user.id); // Verify user ID

            // Fetch lease info for the tenant
            axios.get(`/api/user/lease/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Lease info:", response.data); // Debug lease data
                setLeaseInfo(response.data);
            })
            .catch((err) => {
                console.error('Failed to fetch lease information:', err);
                setError('Failed to fetch lease information');
            });

            // Fetch maintenance requests for the tenant
            axios.get(`/api/user/${user.id}/maintenance-requests`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                console.log("Maintenance requests:", response.data); // Debug request data
                setMaintenanceRequests(response.data);
            })
            .catch((err) => {
                console.error('Failed to fetch maintenance requests:', err);
                setError('Failed to fetch maintenance requests');
            });
        } else {
            console.warn("User not authenticated or missing user ID"); // Log warning
            setError('User not authenticated or missing user ID');
        }
    }, [user]);

    const handleMaintenanceRequest = async (event) => {
        event.preventDefault();
    
        if (!user || !user.id) {
            alert('User not authenticated or missing user ID.');
            return;
        }
    
        try {
            const response = await axios.post('/api/maintenance/submit', {
                description: maintenanceIssue,
                tenant: { id: user.id },  // Ensure tenant ID is correctly nested
                property: { id: leaseInfo?.property?.id }  // Ensure property ID is present
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            alert('Maintenance request submitted successfully');
            setMaintenanceRequests([...maintenanceRequests, response.data]);
            setMaintenanceIssue('');
        } catch (error) {
            console.error('Error submitting request:', error);
            alert('Failed to submit maintenance request');
        }
    };

    return (
        <div className="container tenant-dashboard-page mt-5">
            <h2 className="text-center">Tenant Dashboard</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
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

            <div className="payment-info-section my-5 text-center">
                <h3>Rent Payment</h3>
                <p>You can pay your rent online through our secure payment portal.</p>
                <a href="/payment-portal" className="btn btn-secondary mt-3">Pay Rent Online</a>
            </div>
        </div>
    );
}

export default TenantDashboard;