// AdminTrackingCard.js
import React from 'react';
import { Steps } from 'primereact/steps';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

const AdminTrackingCard = () => {
    const steps = [
        { label: 'Order Received' },
        { label: 'Driver Assigned' },
        { label: 'Out for Delivery' },
        { label: 'Delivered' }
    ];

    return (
        <Card className="admin-tracking-card">
            <div className="tracking-header">
                <h3>Order #ORD-1239</h3>
                <div className="status-badge">
                    <Tag value="Pending" severity="warning" />
                    <span className="est-delivery">Est. Delivery: 09:00 PM</span>
                </div>
            </div>

            <Steps model={steps} activeIndex={1} readOnly />

            <Divider />

            <div className="details-grid">
                <div>
                    <h4>Delivery Address</h4>
                    <p>📍 303 Cedar Ct. Newcity, ST 12350</p>
                </div>

                <div>
                    <h4>Contact</h4>
                    <p>📞 Customer: (555) 123-4567</p>
                </div>

                <div>
                    <h4>Driver Info</h4>
                    <p>🧑 Driver: Alex Brown</p>
                    <p>📱 Contact: (555) 987-6543</p>
                </div>
            </div>

            <Divider />

            <div className="details-grid">
                <div>
                    <h4>Items</h4>
                    <ul>
                        <li>🍕 Supreme Pizza</li>
                        <li>🍗 Chicken Wings</li>
                        <li>🍰 Chocolate Cake</li>
                    </ul>
                </div>

                <div className="map-placeholder">
                    <h4>Map</h4>
                    <div className="map-box">Live map preview (Google Maps/API)</div>
                </div>
            </div>

            <Divider />

            <div className="admin-actions">
                <Button label="Assign New Driver" icon="pi pi-user-edit" className="p-button-outlined" />
                <Button label="Mark as Delivered" icon="pi pi-check" className="p-button-success" />
            </div>
        </Card>
    );
};

export default AdminTrackingCard;
