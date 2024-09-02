import React, { useState } from 'react';
import '../styles/PropertyList.css';

function PropertyList() {
    const [properties] = useState([
        {
            id: 1,
            title: 'Loft Apartment',
            description: 'A spacious loft apartment with modern amenities.',
            externalLink: null,
        },
        {
            id: 2,
            title: 'Open Floor Condo',
            description: 'Condo with an open floor plan and great views.',
            externalLink: 'https://www.zillow.com/homedetails/12345678',
        },
        {
            id: 3,
            title: 'Rustic Home',
            description: 'A beautiful rustic home in a quiet neighborhood.',
            externalLink: null,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="property-list">
            <h2>Available Properties</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                />
            </div>
            <div className="properties mt-4">
                {filteredProperties.length ? (
                    filteredProperties.map((property) => (
                        <div key={property.id} className="property-item">
                            <h3>{property.title}</h3>
                            <p>{property.description}</p>
                            {property.externalLink ? (
                                <a href={property.externalLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    View on Zillow
                                </a>
                            ) : (
                                <button className="btn btn-secondary" disabled>
                                    Not Available on Zillow
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
             {/* Why Choose Us Section */}
             <div className="features-section mt-5">
                <h2>Why Choose Us?</h2>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Wide Selection of Properties</li>
                    <li className="list-group-item">Verified Listings</li>
                    <li className="list-group-item">Easy to Use Platform</li>
                    <li className="list-group-item">Expert Support Available</li>
                </ul>
            </div>
        </div>
    );
}

export default PropertyList;