
import React, { useState } from 'react';
//import { fetchDeliveryByOrderId } from '../services/deliveryService';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const UserDeliveryTracker = () => {
    const [orderId, setOrderId] = useState('');
    const [delivery, setDelivery] = useState(null);
    const [error, setError] = useState('');

    const handleTrack = async () => {
        // setError('');
        // try {
        //     const response = await fetchDeliveryByOrderId(orderId);
        //     setDelivery(response.data);
        // } catch (err) {
        //     setDelivery(null);
        //     setError('Delivery not found. Please check the Order ID.');
        // }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-3">Track Your Delivery</h2>
            <span className="p-input-icon-left mb-3">
        <i className="pi pi-search" />
        <InputText
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="mr-2"
        />
      </span>
            <Button label="Track" icon="pi pi-arrow-right" onClick={handleTrack} />

            {error && <p className="text-red-500 mt-3">{error}</p>}

            {delivery && (
                <Card title={`Order ID: ${delivery.orderId}`} className="mt-4">
                    <p><strong>Status:</strong> <Tag value={delivery.status} /></p>
                    <p><strong>Driver:</strong> {delivery.driver || 'Not Assigned'}</p>
                    <p><strong>Estimated Time:</strong> {delivery.estimatedTime || 'Pending'}</p>
                </Card>
            )}
        </div>
    );
};

export default UserDeliveryTracker;
