import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>ShopHub</h4>
                        <p>Your premium shopping destination for quality products at great prices.</p>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="/help">Help Center</a></li>
                            <li><a href="/returns">Returns</a></li>
                            <li><a href="/shipping">Shipping Info</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            <a href="#" className="social-link">Facebook</a>
                            <a href="#" className="social-link">Twitter</a>
                            <a href="#" className="social-link">Instagram</a>
                            <a href="#" className="social-link">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 ShopHub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
