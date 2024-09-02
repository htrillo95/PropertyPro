import React from 'react';
import '../styles/Footer.css';

function ContactUs() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body p-5">
                    <h1 className="mb-4 text-primary">Contact Us</h1>
                    <p className="text-muted">We'd love to hear from you! Please reach out using the methods below:</p>

                    <section className="mb-5">
                        <h2 className="text-secondary">Contact Information</h2>
                        <address>
                            <strong>PropertyPro</strong><br />
                            Philadelphia, PA, 19123<br />
                            <a href="mailto:support@propertypro.com" className="text-primary">support@propertypro.com</a><br />
                            <a href="tel:+6107319486" className="text-primary">(610) 731-9486</a>
                        </address>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Office Hours</h2>
                        <ul className="list-unstyled pl-3">
                            <li className="mb-2"><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM</li>
                            <li className="mb-2"><strong>Saturday:</strong> 10:00 AM - 4:00 PM</li>
                            <li className="mb-2"><strong>Sunday:</strong> Closed</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Follow Us</h2>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="https://facebook.com" className="text-primary" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://twitter.com" className="text-primary" target="_blank" rel="noopener noreferrer">Twitter</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="https://linkedin.com" className="text-primary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-secondary">Send Us a Message</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Your Message</label>
                                <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary mt-4" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}> Send Message</button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;