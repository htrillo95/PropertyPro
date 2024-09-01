import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">PropertyPro</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/properties">Properties</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tenants">Tenants</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin">Admin Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;