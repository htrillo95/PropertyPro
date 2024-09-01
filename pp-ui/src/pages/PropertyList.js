import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('/api/properties')
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the properties!", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Properties</h1>
      <div className="row">
        {properties.map(property => (
          <div className="col-md-4" key={property.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{property.address}</h5>
                <p className="card-text">Type: {property.type}</p>
                <p className="card-text">Rent: ${property.rentAmount}</p>
                <p className="card-text">Bedrooms: {property.bedrooms}</p>
                <p className="card-text">Bathrooms: {property.bathrooms}</p>
                <a href="#" className="btn btn-primary">View Details</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;