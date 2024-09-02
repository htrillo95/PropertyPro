import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

function UserManagement() {
    const users = [
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Doe', email: 'jane@example.com' },
    ];

    return (
        <div className="user-management">
            <h2 className="mb-4">User Management</h2>
            <Card>
                <ListGroup variant="flush">
                    {users.map((user, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{user.name}</strong><br />
                                <small>{user.email}</small>
                            </div>
                            <div>
                                <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Button variant="success" className="mt-4">Add User</Button>
        </div>
    );
}

export default UserManagement;