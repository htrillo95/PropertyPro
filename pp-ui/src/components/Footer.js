import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 PropertyPro. All rights reserved.</p>
                <ul className="footer-links">
                    <li><Link to="/privacy">Privacy Policy</Link></li>
                    <li><Link to="/terms">Terms of Service</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;