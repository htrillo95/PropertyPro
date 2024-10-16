import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PropertyList.css';

function PropertyList() {
    const [properties, setProperties] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    // Fetch properties when the component mounts
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/properties', {
                withCredentials: true, // Ensure cookies are sent along with the request
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => setProperties(response.data))
            .catch((error) => {
                console.error('Error fetching properties:', error);
                setError('Failed to fetch properties.');
            });
    }, []);

    // Filter properties based on search term
    const filteredProperties = properties.filter((property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="property-list-page">
            {/* Page Header */}
            <div className="property-header text-center py-5 bg-light">
                <h1 className="display-4">Find Your Next Home</h1>
                <p className="lead">Browse our selection of properties available for rent or purchase.</p>
            </div>

            {/* Search Bar */}
            <div className="container mt-4 mb-5">
                <input
                    type="text"
                    placeholder="Search properties..."
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Properties Grid */}
            <div className="container">
                <div className="row">
                    {filteredProperties.length ? (
                        filteredProperties.map((property) => (
                            <div key={property.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img
                                        src={property.imageUrl || 'https://via.placeholder.com/400'}
                                        className="card-img-top"
                                        alt={property.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/400';
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{property.title}</h5>
                                        <p className="card-text">{property.description}</p>
                                    </div>
                                    <div className="card-footer">
                                        {property.externalLink ? (
                                            <a
                                                href={property.externalLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary btn-block"
                                            >
                                                View on Zillow
                                            </a>
                                        ) : (
                                            <button className="btn btn-secondary btn-block" disabled>
                                                Not Available on Zillow
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col text-center">
                            <p>No properties found at the moment.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="features-section py-5 bg-light">
                <div className="container text-center">
                    <h2>Why Choose Us?</h2>
                    <p className="lead">
                        At PropertyPro, we offer verified listings and an intuitive platform to make your search simple.
                    </p>
                    <ul className="list-unstyled">
                        <li className="mb-3">
                            <strong>Comprehensive Property Selection:</strong> Find listings tailored to your needs.
                        </li>
                        <li className="mb-3">
                            <strong>Verified Listings:</strong> Every property is vetted for accuracy and trust.
                        </li>
                        <li className="mb-3">
                            <strong>User-Friendly Platform:</strong> Manage properties effortlessly with our dashboard.
                        </li>
                        <li className="mb-3">
                            <strong>Dedicated Support:</strong> Our experts are available to assist you at every step.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PropertyList;