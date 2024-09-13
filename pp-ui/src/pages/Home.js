import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../assets/images/banner3.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faUsers, faFileContract, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-bootstrap';
import Place1 from '../assets/images/Place1.webp';
import Place4 from '../assets/images/place4.jpeg';
import Place6 from '../assets/images/place6.webp';
import Place3 from '../assets/images/place5.jpeg';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home">
            {/* Full-Width Banner Section */}
            <div
                className="banner-image position-relative text-white"
                style={{ 
                    backgroundImage: `url(${bannerImage})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center', 
                    height: '500px', 
                    width: '100%' 
                }}
            >
                {/* Overlay for better text readability */}
                <div className="banner-overlay position-absolute w-100 h-100" style={{ background: 'rgba(0, 0, 0, 0.4)' }}></div>
                
                {/* Banner Text */}
                <div className="banner-text position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
                    <h1 className="display-4" style={{ color: 'white' }}>Welcome to PropertyPro</h1>
                    <p className="lead" style={{ color: 'white' }}>Your one-stop solution for managing properties efficiently.</p>
                    <Link to="/properties" className="btn btn-light btn-sm mt-3">View Properties</Link>
                </div>
            </div>

            {/* About Section */}
            <div className="about-section py-5 mt-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-4">Our Mission</h2>
                    <p className="lead mb-4">
                        At PropertyPro, we strive to provide comprehensive, reliable, and easy-to-use property management solutions that empower property owners and tenants alike.
                    </p>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <ul className="list-unstyled">
                                <li className="mb-3"><i className="fas fa-check-circle text-primary"></i> Comprehensive property management services</li>
                                <li className="mb-3"><i className="fas fa-check-circle text-primary"></i> Tenant management and communication tools</li>
                                <li className="mb-3"><i className="fas fa-check-circle text-primary"></i> Maintenance tracking for repairs and upkeep</li>
                                <li className="mb-3"><i className="fas fa-check-circle text-primary"></i> Easy-to-use dashboard for managing properties</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <img src={Place1} alt="PropertyPro Services" className="img-fluid rounded shadow" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div className="services-section py-5 mt-5">
                <div className="container text-center">
                    <h2 className="mb-5">Our Services</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card p-3 text-center">
                                <FontAwesomeIcon icon={faBuilding} className="icon-lg text-primary mb-3" />
                                <h4>Property Management</h4>
                                <p>From listing properties to handling maintenance requests, we manage all aspects of your rental property.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-3 text-center">
                                <FontAwesomeIcon icon={faUsers} className="icon-lg text-primary mb-3" />
                                <h4>Tenant Management</h4>
                                <p>We help you manage tenants efficiently with easy communication and tracking tools.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-3 text-center">
                                <FontAwesomeIcon icon={faFileContract} className="icon-lg text-primary mb-3" />
                                <h4>Lease Management</h4>
                                <p>Track leases, payments, and stay on top of renewals and other important dates.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section py-5 mt-5 bg-light">
                <div className="container text-center">
                    <h2 className="mb-5">What Our Clients Say</h2>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card p-3">
                                <p>"PropertyPro made managing my rental properties so easy. The tenant communication tools are fantastic!"</p>
                                <h5>- John D.</h5>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-3">
                                <p>"I highly recommend PropertyPro for anyone looking for efficient property management solutions."</p>
                                <h5>- Sarah W.</h5>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="card p-3">
                                <p>"The dashboard is intuitive and helps me stay on top of everything. Great service!"</p>
                                <h5>- Mike L.</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Properties Section */}
            <div className="featured-properties-section py-5 mt-5">
                <div className="container text-center">
                    <h2 className="mb-5">Featured Properties</h2>
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
                                src={Place6}
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
            </div>

            {/* Call to Action Section */}
            <div className="cta-section py-5 mt-5 text-center  text-black">
                <div className="container">
                    <h2 className="mb-4">Ready to Get Started?</h2>
                    <p>Let us manage your properties effortlessly. Existing tenants can visit the portal for any related concerns.</p>
                    <Link to="/tenants" className="btn btn-light mt-3">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default Home;