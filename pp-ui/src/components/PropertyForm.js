import React, { useState } from 'react';
import axios from 'axios';

function PropertyForm() {
  const [property, setProperty] = useState({
    address: '',
    type: '',
    rentAmount: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/properties', property)
      .then(response => {
        console.log('Property added successfully:', response.data);
        // You might want to redirect the user or clear the form here
      })
      .catch(error => {
        console.error('There was an error adding the property:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            value={property.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={property.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="rentAmount" className="form-label">Rent Amount</label>
          <input
            type="number"
            className="form-control"
            id="rentAmount"
            name="rentAmount"
            value={property.rentAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
          <input
            type="number"
            className="form-control"
            id="bedrooms"
            name="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
          <input
            type="number"
            className="form-control"
            id="bathrooms"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Property</button>
      </form>
    </div>
  );
}

export default PropertyForm;