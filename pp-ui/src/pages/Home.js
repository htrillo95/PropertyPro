import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import bannerImage from '../assets/images/banner.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Place1 from '../assets/images/Place1.webp';
import Place2 from '../assets/images/Place2.webp';
import Place3 from '../assets/images/Place3.webp';



function Home() {
    return (
      <div className="home">
        <div
          className="banner-image"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        <div className="hero-section text-center">
          <h1>Welcome to PropertyPro</h1>
          <p>Your one-stop solution for managing properties efficiently.</p>
          <Link to="/properties" className="btn btn-primary">View Properties</Link>
        </div>
        {/* About Section */}
        <div className="about-section">
          <h2>About PropertyPro</h2>
          <ul className="about-list">
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="icon" />
              Comprehensive property management services.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="icon" />
              Tenant management and communication tools.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="icon" />
              Maintenance tracking to stay on top of repairs and upkeep.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="icon" />
              Easy-to-use dashboard for managing all aspects of your properties.
            </li>
          </ul>
        </div>
        {/* Services Section */}
        <div className="services-section">
          <h2>Our Services</h2>
          <div className="services-list">
            <div className="service-item">
              <FontAwesomeIcon icon={faBuilding} className="icon" />
              <h3>Property Management</h3>
              <p>From listing properties to handling maintenance requests, we manage all aspects of your rental property.</p>
            </div>
            <div className="service-item">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <h3>Tenant Management</h3>
              <p>We help you manage tenants efficiently with easy communication and tracking tools.</p>
            </div>
            <div className="service-item">
              <FontAwesomeIcon icon={faFileContract} className="icon" />
              <h3>Lease Management</h3>
              <p>Track leases, payments, and stay on top of renewals and other important dates.</p>
            </div>
          </div>
        </div>
        {/* Testimonials Section */}
      <div className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <p>"PropertyPro made managing my rental properties so easy. The tenant communication tools are fantastic!"</p>
            <h5>- John D.</h5>
          </div>
          <div className="testimonial-item">
            <p>"I highly recommend PropertyPro for anyone looking for efficient property management solutions."</p>
            <h5>- Sarah W.</h5>
          </div>
          <div className="testimonial-item">
            <p>"The dashboard is intuitive and helps me stay on top of everything. Great service!"</p>
            <h5>- Mike L.</h5>
          </div>
        </div>
      </div>
        {/* Featured Properties Section */}
        <div className="featured-properties-section">
          <h2>Featured Properties</h2>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Place1}
                alt="First property"
              />
              <Carousel.Caption>
                <h3>Loft Apartment</h3>
                <p>Spacious loft with modern amenities.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Place2}
                alt="Second property"
              />
              <Carousel.Caption>
                <h3>Open Floor Condo</h3>
                <p>Condo with an open floor plan and great views.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={Place3}
                alt="Third property"
              />
              <Carousel.Caption>
                <h3>Rustic Home</h3>
                <p>A beautiful rustic home in a quiet neighborhood.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
        {/* CTA Section */}
      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Let us manage your properties effortlessly. Exisiting tenants visit the portal for any related concerns. </p>
        <Link to="/signup" className="btn btn-primary">Log In</Link>
      </div>

      {/* Footer */}
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
    </div>
    );
  }
  
  export default Home;