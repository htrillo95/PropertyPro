import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LeaseManagement() {
    const [lease, setLease] = useState({
        startDate: '',
        endDate: '',
        rentAmount: '',
        userId: '',  // Changed from tenantId to userId
        propertyId: ''
    });

    const [users, setUsers] = useState([]);  // Changed from tenants to users
    const [properties, setProperties] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all users (acting as tenants)
        axios.get('http://localhost:8080/api/admin/users')
            .then(response => setUsers(response.data))  // Fetch users (previously tenants)
            .catch(err => setError('Failed to fetch users'));

        // Fetch all properties
        axios.get('http://localhost:8080/api/admin/properties')
            .then(response => setProperties(response.data))
            .catch(err => setError('Failed to fetch properties'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLease({ ...lease, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const leaseData = {
            startDate: lease.startDate,
            endDate: lease.endDate,
            rentAmount: lease.rentAmount,
            tenant: { id: lease.userId },  // Correct structure to match backend
            property: { id: lease.propertyId }
        };

        axios.post('http://localhost:8080/api/admin/leases', leaseData)
            .then(response => setMessage('Lease added successfully!'))
            .catch(err => setError('Failed to add lease'));
    };

    return (
        <div className="container">
            <h2>Add or Update Lease</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        name="startDate"
                        className="form-control"
                        value={lease.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        name="endDate"
                        className="form-control"
                        value={lease.endDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="rentAmount">Rent Amount:</label>
                    <input
                        type="number"
                        name="rentAmount"
                        className="form-control"
                        value={lease.rentAmount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="userId">Tenant (User):</label>
                    <select
                        name="userId"  // Changed from tenantId to userId
                        className="form-control"
                        value={lease.userId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a tenant</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.username} {/* or user.name if applicable */}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="propertyId">Property:</label>
                    <select
                        name="propertyId"
                        className="form-control"
                        value={lease.propertyId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a property</option>
                        {properties.map(property => (
                            <option key={property.id} value={property.id}>
                                {property.address}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit Lease</button>
            </form>
        </div>
    );
}

export default LeaseManagement;