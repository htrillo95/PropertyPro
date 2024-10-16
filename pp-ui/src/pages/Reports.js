import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Button } from 'react-bootstrap';

function MaintenanceReports() {
    const [requests, setRequests] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch all maintenance requests for admin
        axios
            .get('/api/admin/maintenance-requests', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                withCredentials: true, // Ensure cookies are included
            })
            .then((response) => {
                console.log('Fetched maintenance requests:', response.data); // Debug log
                setRequests(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch maintenance requests:', error);
                setError('Failed to fetch maintenance requests');
            });
    }, []);

    const updateRequestStatus = (requestId, isResolved) => {
        axios
            .put(
                `/api/admin/maintenance-requests/${requestId}`,
                null,
                {
                    params: { isResolved: !isResolved },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true,
                }
            )
            .then(() => {
                // Update state to reflect status change
                setRequests((prevRequests) =>
                    prevRequests.map((request) =>
                        request.id === requestId
                            ? { ...request, isResolved: !isResolved }
                            : request
                    )
                );
            })
            .catch((error) => {
                console.error('Failed to update request status:', error);
                setError('Failed to update request status');
            });
    };

    return (
        <div className="maintenance-reports">
            <h2>Maintenance Requests</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ListGroup variant="flush">
                {requests.map((request) => (
                    <ListGroup.Item key={request.id}>
                        <p><strong>Description:</strong> {request.description}</p>
                        <p><strong>Date:</strong> {request.requestDate}</p>
                        <p><strong>Status:</strong> {request.isResolved ? 'Resolved' : 'Pending'}</p>
                        <Button
                            variant={request.isResolved ? 'danger' : 'success'}
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, request.isResolved)}
                        >
                            {request.isResolved ? 'Mark as Pending' : 'Mark as Resolved'}
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default MaintenanceReports;