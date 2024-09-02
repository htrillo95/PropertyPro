import React from 'react';
import '../styles/Footer.css';

function TermsOfService() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body p-5">
                    <h1 className="mb-4 text-primary">Terms of Service</h1>
                    <p className="text-muted">Effective Date: September 2, 2024</p>

                    <section className="mb-5">
                        <h2 className="text-secondary">Introduction</h2>
                        <p>
                            Welcome to PropertyPro. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, you accept these terms and conditions in full.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">User Obligations</h2>
                        <ul className="list-unstyled pl-3">
                            <li className="mb-2">
                                <strong>Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                            </li>
                            <li className="mb-2">
                                <strong>Prohibited Uses:</strong> You may not use the site in any way that causes, or may cause, damage to the site or impairment of the availability or accessibility of the site; or in any way which is unlawful, illegal, fraudulent, or harmful.
                            </li>
                            <li className="mb-2">
                                <strong>Termination:</strong> We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.
                            </li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Intellectual Property</h2>
                        <p>
                            Unless otherwise stated, PropertyPro and/or its licensors own the intellectual property rights for all material on the website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Limitation of Liability</h2>
                        <p>
                            In no event shall PropertyPro, nor any of its officers, directors, and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort, or otherwise, and PropertyPro, including its officers, directors, and employees shall not be liable for any indirect, consequential, or special liability arising out of or in any way related to your use of this website.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Governing Law</h2>
                        <p>
                            These terms will be governed by and construed in accordance with the laws of the State of Pennsylvania, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Pennsylvania for the resolution of any disputes.
                        </p>
                    </section>

                    <section>
                        <p className="text-muted small">
                            Please note that these terms may change from time to time, so please check back periodically.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;