import React from 'react';
import { Link } from 'react-router-dom';
//import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Delivery Manager</h2>
            <nav>
                <ul>
                    <li><Link to="/drivers">Drivers</Link></li>
                    <li><Link to="/add-driver">Add Driver</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;