// AdminTrackingPage.js
import React from 'react';
import AdminTrackingCard from '../components/AdminTrackingCard';
import '../styles/AdminTracking.css';

const AdminTrackingPage = () => {
    return (
        <div className="admin-tracking-container">
            <h2 className="page-title">Admin Dashboard - Delivery Tracking</h2>
            <AdminTrackingCard />
        </div>
    );
};

export default AdminTrackingPage;
