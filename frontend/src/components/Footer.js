import React from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../styles/Footer.css'; // custom styling

function Footer() {
    return (
        <footer className="footer">
            <Divider />

            <div className="footer-content">
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <ul>
                        <li><strong>Address:</strong> 123 Delicious Street, Food City, ABC 123</li>
                        <li><strong>Phone:</strong> +1 234 567 890</li>
                        <li><strong>Email:</strong> contact@craveexpress.com</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Button label="Home" link className="p-button-sm" /></li>
                        <li><Button label="Place Order" link className="p-button-sm" /></li>
                        <li><Button label="Sign Up" link className="p-button-sm" /></li>
                        <li><Button label="Login" link className="p-button-sm" /></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebookF className="social-icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="social-icon" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="social-icon" />
                        </a>
                    </div>
                </div>
            </div>

            <Divider />

            <div className="footer-bottom">
                <p>© 2025 Crave Express. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
