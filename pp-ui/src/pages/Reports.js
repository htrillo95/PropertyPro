import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ListGroup } from 'react-bootstrap';

function MaintenanceReports() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        // Fetch all maintenance requests for admin
        axios.get('/api/admin/maintenance-requests', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Include auth token
            }
        })
        .then(response => setRequests(response.data))
        .catch(error => console.error('Failed to fetch maintenance requests:', error));
    }, []);

    const updateRequestStatus = (requestId, isResolved) => {
        // Toggle the status of a maintenance request
        axios.put(`/api/admin/maintenance-requests/${requestId}`, null, {
            params: { isResolved: !isResolved },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Include auth token
            }
        })
        .then(() => {
            // Update state to reflect status change
            setRequests(requests.map(request =>
                request.id === requestId ? { ...request, isResolved: !isResolved } : request
            ));
        })
        .catch(error => console.error('Failed to update request status:', error));
    };

    return (
        <div className="maintenance-reports">
            <h2>Maintenance Requests</h2>
            <ListGroup variant="flush">
                {requests.map(request => (
                    <ListGroup.Item key={request.id}>
                        <p><strong>Description:</strong> {request.description}</p>
                        <p><strong>Date:</strong> {request.requestDate}</p>
                        <p><strong>Status:</strong> {request.isResolved ? 'Resolved' : 'Pending'}</p>
                        <Button
                            variant={request.isResolved ? "danger" : "success"}
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