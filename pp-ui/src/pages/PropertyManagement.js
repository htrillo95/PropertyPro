import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

function PropertyManagement() {
    const properties = [
        { title: 'Loft Apartment', description: 'A spacious loft apartment with modern amenities.' },
        { title: 'Open Floor Condo', description: 'Condo with an open floor plan and great views.' },
    ];

    return (
        <div className="property-management">
            <h2 className="mb-4">Property Management</h2>
            <Card>
                <ListGroup variant="flush">
                    {properties.map((property, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{property.title}</strong><br />
                                <small>{property.description}</small>
                            </div>
                            <div>
                                <Button variant="outline-primary" size="sm" className="me-2">Edit</Button>
                                <Button variant="outline-danger" size="sm">Delete</Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Button variant="success" className="mt-4">Add Property</Button>
        </div>
    );
}

export default PropertyManagement;