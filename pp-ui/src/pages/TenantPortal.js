import React from 'react';

const Tenants = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">John Doe</h5>
            <p className="card-text">Email: john.doe@example.com</p>
            <p className="card-text">Phone: (555) 123-4567</p>
            <a href="#" className="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Jane Smith</h5>
            <p className="card-text">Email: jane.smith@example.com</p>
            <p className="card-text">Phone: (555) 987-6543</p>
            <a href="#" className="btn btn-primary">View Details</a>
          </div>
        </div>
      </div>
      {/* Add more cards as needed */}
    </div>
  );
}

export default Tenants;