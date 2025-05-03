import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../styles/Header.css';
import Bakerylogo from '../images/logo.jpeg';
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
                            <li onClick={() => navigate('/orderRestaurant')}>
                                <a className="dropbtn">Place Order</a>
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
