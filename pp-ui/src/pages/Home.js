import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Home.css';
import bannerImage from '../assets/images/banner3.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faFileContract, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import Place1 from '../assets/images/Place1.webp';
import Place4 from '../assets/images/place4.jpeg';
import Place2 from '../assets/images/Place2.webp';
import Place3 from '../assets/images/place5.jpeg';


function Home() {
    return (
        <div className="home">
            {/* Banner Image Section */}
            <div
                className="banner-image"
                style={{ backgroundImage: `url(${bannerImage})` }}
            ></div>
            
            {/* Hero Section */}
            <div className="hero-section text-center">
                <h1>Welcome to PropertyPro</h1>
                <p>Your one-stop solution for managing properties efficiently.</p>
                <Link to="/properties" className="btn btn-primary">View Properties</Link>
            </div>

            {/* About Section */}
            <div className="about-section mt-5">
                <div className="container text-center">
                    <h2 className="mb-4">Our Mission</h2>
                    <p className="lead mb-4">
                        At PropertyPro, we strive to provide comprehensive, reliable, and easy-to-use property management solutions that empower property owners and tenants alike. Our mission is to simplify property management through innovative tools, seamless communication, and dedicated support.
                    </p>
                    
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <h4>What We Offer</h4>
                            <ul className="list-unstyled">
                                <li><FontAwesomeIcon icon={faCheckCircle} className="text-primary" /> Comprehensive property management services</li>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="text-primary" /> Tenant management and communication tools</li>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="text-primary" /> Maintenance tracking to stay on top of repairs and upkeep</li>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="text-primary" /> Easy-to-use dashboard for managing all aspects of your properties</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <img src={Place1} alt="PropertyPro Services" className="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
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
                            src={Place4}
                            alt="First property"
                        />
                        <Carousel.Caption>
                            <h3>Modern Urban Spaces</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Place2}
                            alt="Second property"
                        />
                        <Carousel.Caption>
                            <h3>Rustic Charm</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={Place3}
                            alt="Third property"
                        />
                        <Carousel.Caption>
                            <h3>Cozy Retreats</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>

            {/* Call to Action Section */}
            <div className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Let us manage your properties effortlessly. Existing tenants visit the portal for any related concerns.</p>
                <Link to="/tenants" className="btn btn-primary">Log In</Link>
            </div>
        </div>
    );
}

export default Home;