import React from 'react';
import CustomerTrackingCard from '../components/CustomerTrackingCard';
import '../styles/CustomerTracking.css';

const CustomerTrackingPage = () => {
    return (
        <div className="tracking-container">
            <h2 className="page-title">Delivery Tracking</h2>
            <CustomerTrackingCard />
        </div>
    );
};

export default CustomerTrackingPage;