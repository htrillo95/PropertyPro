import React from 'react';
import '../styles/Footer.css';

function PrivacyPolicy() {
    return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-body p-5">
                    <h1 className="mb-4 text-primary">Privacy Policy</h1>
                    <p className="text-muted">Effective Date: September 2, 2024</p>

                    <section className="mb-5">
                        <h2 className="text-secondary">Introduction</h2>
                        <p>
                            At PropertyPro, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Information We Collect</h2>
                        <p>We may collect and process the following data about you:</p>
                        <ul className="list-unstyled pl-3">
                            <li className="mb-2">
                                <strong>Information you give us:</strong> This includes information provided at the time of registering to use our site, subscribing to our services, posting material, or requesting further services. We may also ask you for information when you report a problem with our site.
                            </li>
                            <li className="mb-2">
                                <strong>Information we collect about you:</strong> With regard to each of your visits to our site, we may automatically collect the following information:
                                <ul className="list-unstyled pl-3">
                                    <li className="mb-1">Technical information, including the Internet protocol (IP) address used to connect your computer to the Internet, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.</li>
                                    <li className="mb-1">Information about your visit, including the full Uniform Resource Locators (URL), clickstream to, through, and from our site (including date and time), products you viewed or searched for, page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs), and methods used to browse away from the page.</li>
                                </ul>
                            </li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">How We Use Your Information</h2>
                        <p>We use information held about you in the following ways:</p>
                        <ul className="list-unstyled pl-3">
                            <li className="mb-2">To ensure that content from our site is presented in the most effective manner for you and your device.</li>
                            <li className="mb-2">To provide you with information, products, or services that you request from us or which we feel may interest you, where you have consented to be contacted for such purposes.</li>
                            <li className="mb-2">To carry out our obligations arising from any contracts entered into between you and us.</li>
                            <li className="mb-2">To notify you about changes to our service.</li>
                        </ul>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Data Security</h2>
                        <p>
                            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                        </p>
                    </section>

                    <section className="mb-5">
                        <h2 className="text-secondary">Contact Us</h2>
                        <p>
                            If you have any questions or comments about this Privacy Policy, please contact us:
                        </p>
                        <address>
                            <strong>PropertyPro</strong><br />
                            Philadelphia, PA, 19123<br />
                            <a href="mailto:support@propertypro.com" className="text-primary">support@propertypro.com</a>
                        </address>
                    </section>

                    <section>
                        <p className="text-muted small">
                            Please note that this policy may change from time to time, so please check back periodically.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;