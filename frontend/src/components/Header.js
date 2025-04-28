import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../styles/Header.css';
import Bakerylogo from '../images/logo.jpg';
import { FaUserCircle } from 'react-icons/fa';

function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <div className="nav-bar">
                {/* LOGO */}
                <div className="logo-container" onClick={() => navigate('/')}>
                    <img src={Bakerylogo} alt="Crave Express Logo" className="logo-image" />
                    <h2 className="logo-text">Crave Express</h2>
                </div>

                {/* NAVIGATION */}
                <div className="nav-item">
                    <div className="nav-items">
                        <ul>
                            <li onClick={() => navigate('/')}>
                                <a>Home</a>
                            </li>
                            <li>
                                <a className="dropbtn">Place Order</a>
                                <ul className="dropdown">
                                    <li onClick={() => navigate('/commercial')}>
                                        <a>Wholesale Ordering</a>
                                    </li>
                                    <li onClick={() => navigate('/Online')}>
                                        <a>Online Ordering</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a>Sign Up</a>
                            </li>
                            <li>
                                <a>Login</a>
                            </li>
                            <li onClick={() => navigate('/profile')}>
                                <FaUserCircle className="profile-icon" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
