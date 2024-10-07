import React, { useState, useEffect } from 'react';
import { Button, Card, ListGroup, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function PropertyManagement() {
    // State to hold properties
    const [properties, setProperties] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentPropertyId, setCurrentPropertyId] = useState(null);
    const [newProperty, setNewProperty] = useState({
        title: '',
        description: '',
        address: '',
        listingUrl: '',
        imageUrl: '',
        rent_amount: '', // Ensure the correct field name is used
        bedrooms: '', // Ensure the correct field name is used
        bathrooms: '', // Ensure the correct field name is used
        type: '' // Ensure the correct field name is used
    });

    // Fetch properties from the backend when component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/api/properties')
            .then(response => {
                setProperties(response.data);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty({
            ...newProperty,
            [name]: (name === 'rent_amount' || name === 'bedrooms' || name === 'bathrooms') ? parseFloat(value) : value
        });
    };

    // Handle form submission for adding or updating a property
    const handleAddOrEditProperty = () => {
        if (editing) {
            // Update property
            axios.put(`http://localhost:8080/api/properties/${currentPropertyId}`, newProperty)
                .then(response => {
                    setProperties(properties.map(prop => prop.id === currentPropertyId ? response.data : prop));
                    setShowModal(false);
                    setEditing(false);
                    setCurrentPropertyId(null);
                    resetNewProperty();
                })
                .catch(error => {
                    console.error('Error updating property:', error);
                });
        } else {
            // Add property
            axios.post('http://localhost:8080/api/properties', newProperty)
                .then(response => {
                    setProperties([...properties, response.data]);
                    setShowModal(false);
                    resetNewProperty();
                })
                .catch(error => {
                    console.error('Error adding property:', error);
                });
        }
    };

    // Handle property deletion with confirmation
    const handleDeleteProperty = (id) => {
        // Show confirmation dialog before deletion
        const confirmDelete = window.confirm('Are you sure you want to delete this property?');
        if (confirmDelete) {
            axios.delete(`http://localhost:8080/api/properties/${id}`)
                .then(() => {
                    setProperties(properties.filter(prop => prop.id !== id));
                })
                .catch(error => {
                    console.error('Error deleting property:', error);
                });
        }
    };

    // Handle property editing
    const handleEditProperty = (property) => {
        setNewProperty(property);
        setEditing(true);
        setCurrentPropertyId(property.id);
        setShowModal(true);
    };

    // Reset new property state
    const resetNewProperty = () => {
        setNewProperty({
            title: '',
            description: '',
            address: '',
            listingUrl: '',
            imageUrl: '',
            rent_amount: '',
            bedrooms: '',
            bathrooms: '',
            type: ''
        });
    };

    return (
        <div className="property-management">
            <h2 className="mb-4">Property Management</h2>

            <Card>
                <ListGroup variant="flush">
                    {properties.map((property, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{property.title}</strong><br />
                                <small>{property.description}</small><br />
                                <a href={property.listingUrl} target="_blank" rel="noopener noreferrer">
                                    View Listing
                                </a>
                            </div>
                            <div>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-2" 
                                    onClick={() => handleEditProperty(property)}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="outline-danger" 
                                    size="sm" 
                                    onClick={() => handleDeleteProperty(property.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>

            <Button variant="success" className="mt-4" onClick={() => {
                setShowModal(true);
                setEditing(false);
                resetNewProperty();
            }}>
                Add Property
            </Button>

            {/* Modal for Adding or Editing a Property */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Edit Property' : 'Add New Property'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newProperty.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={newProperty.description}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newProperty.address}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Rent Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="rent_amount"
                                value={newProperty.rent_amount}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bedrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bedrooms"
                                value={newProperty.bedrooms}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bathrooms</Form.Label>
                            <Form.Control
                                type="number"
                                name="bathrooms"
                                value={newProperty.bathrooms}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="type"
                                value={newProperty.type}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Listing URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="listingUrl"
                                value={newProperty.listingUrl}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="imageUrl"
                                value={newProperty.imageUrl}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleAddOrEditProperty}>
                        {editing ? 'Save Changes' : 'Add Property'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PropertyManagement;