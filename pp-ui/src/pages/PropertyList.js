import React, { useState } from 'react';
import '../styles/PropertyList.css'; // You can style this as needed

function PropertyList() {
    const [properties, setProperties] = useState([
        {
            id: 1,
            title: 'Loft Apartment',
            description: 'A spacious loft apartment with modern amenities.',
            image: 'https://via.placeholder.com/400', // Replace this with actual image URLs later
            externalLink: null,
        },
        {
            id: 2,
            title: 'Open Floor Condo',
            description: 'Condo with an open floor plan and great views.',
            image: 'https://via.placeholder.com/400',
            externalLink: 'https://www.zillow.com/',
        },
        {
            id: 3,
            title: 'Rustic Home',
            description: 'A beautiful rustic home in a quiet neighborhood.',
            image: 'https://via.placeholder.com/400',
            externalLink: null,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="property-list-page">
            {/* Properties Page Header */}
            <div className="property-header text-center py-5 bg-light">
                <h1 className="display-4">Find Your Next Home</h1>
                <p className="lead">Browse through our selection of properties available for rent or purchase.</p>
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

            {/* Properties Grid Layout */}
            <div className="container">
                <div className="row">
                    {filteredProperties.length ? (
                        filteredProperties.map((property) => (
                            <div key={property.id} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <img
                                        src={property.image || 'default-image.jpg'} // Default image if no property image is available
                                        className="card-img-top"
                                        alt={property.title}
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
                At PropertyPro, we provide a curated selection of properties, ensuring every listing is verified for accuracy and trust. Our intuitive platform makes property management simple for both tenants and owners, backed by expert support whenever you need it.
                </p>
                <ul className="list-unstyled">
                <li className="mb-3"><strong>Comprehensive Property Selection:</strong> A broad range of high-quality listings tailored to meet your needs.</li>
                <li className="mb-3"><strong>Verified Listings:</strong> Each property is thoroughly vetted, giving you peace of mind in your search.</li>
                <li className="mb-3"><strong>User-Friendly Platform:</strong> Manage and search for properties effortlessly with our easy-to-navigate dashboard.</li>
                <li className="mb-3"><strong>Dedicated Support:</strong> Our team of professionals is here to assist you every step of the way.</li>
                </ul>
            </div>
        </div>
    </div>
    );
}

export default PropertyList;