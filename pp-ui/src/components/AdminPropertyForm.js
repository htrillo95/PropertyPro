import React, { useState } from 'react';
import axios from 'axios';

const AdminPropertyForm = () => {
    const [property, setProperty] = useState({
        title: '',
        description: '',
        imageUrl: '',
        externalLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/properties', property);
            alert('Property added successfully');
            setProperty({
                title: '',
                description: '',
                imageUrl: '',
                externalLink: '',
            });
        } catch (error) {
            alert('Error adding property');
        }
    };

    return (
        <div className="container">
            <h2>Add New Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={property.title}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={property.imageUrl}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>External Link (e.g., Zillow)</label>
                    <input
                        type="text"
                        name="externalLink"
                        value={property.externalLink}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Property</button>
            </form>
        </div>
    );
};

export default AdminPropertyForm;