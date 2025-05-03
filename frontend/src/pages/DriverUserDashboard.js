import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProgressSpinner } from 'primereact/progressspinner';
import '../styles/DriverUserDashboard.css';
import Header from "../components/Header";

const DriverUserDashboard = () => {
    const [status, setStatus] = useState('Offline');
    const [location, setLocation] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    const [availableDeliveries, setAvailableDeliveries] = useState([]);
    const [nearbyOrders, setNearbyOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const driverId = '681109f24dd27e4fbab9e407';
    const radiusKm = 5;

    const statusOptions = ['Offline', 'Available', 'Busy'];

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get(`http://localhost:8083/api/deliveries?driverId=${driverId}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        }
    };

    const fetchNearbyOrders = async () => {
        if (!location || status !== 'Available') return;

        setLoadingOrders(true);
        try {
            const response = await axios.get(
                `http://localhost:8083/api/drivers/${driverId}/nearbyOrders`,
                {
                    params: {
                        radiusKm: radiusKm,
                        lat: location.lat,
                        lng: location.lng
                    }
                }
            );
            setNearbyOrders(response.data);
        } catch (error) {
            console.error('Error fetching nearby orders:', error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const updateStatusAndLocation = async (loc) => {
        try {
            await axios.put(`http://localhost:8083/api/drivers/updateStatusAndLocation/${driverId}`, {
                status,
                location: loc
            });
        } catch (error) {
            console.error('Error updating status and location:', error);
        }
    };

    const handleStatusChange = async () => {
        if (status === 'Offline') {
            const offlineLocation = { lat: 0.0, lng: 0.0 };
            setLocation(offlineLocation);
            await updateStatusAndLocation(offlineLocation);
            fetchDeliveries();
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const newLocation = { lat: latitude, lng: longitude };
                        setLocation(newLocation);
                        await updateStatusAndLocation(newLocation);
                        if (status === 'Available') {
                            fetchNearbyOrders();
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        updateStatusAndLocation(location || { lat: 0, lng: 0 });
                    },
                    { enableHighAccuracy: true, timeout: 5000 }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    };

    useEffect(() => {
        fetchDeliveries();
    }, []);

    useEffect(() => {
        handleStatusChange();
    }, [status]);

    useEffect(() => {
        let interval;
        if (status === 'Available') {
            fetchNearbyOrders();
            interval = setInterval(fetchNearbyOrders, 10000); // Refresh every 10 seconds
        } else {
            setNearbyOrders([]);
        }
        return () => clearInterval(interval);
    }, [status, location]);

    const startDelivery = async (id) => {
        try {
            await axios.put(`http://localhost:8083/api/deliveries/${id}/start`);
            fetchDeliveries();
        } catch (error) {
            console.error('Error starting delivery:', error);
        }
    };

    const completeDelivery = async (id) => {
        try {
            await axios.put(`http://localhost:8083/api/deliveries/${id}/complete`);
            fetchDeliveries();
        } catch (error) {
            console.error('Error completing delivery:', error);
        }
    };

    const acceptOrder = async (orderId) => {
        try {
            // First create a delivery from the order
            const response = await axios.post(`http://localhost:8083/api/deliveries`, {
                orderId,
                driverId
            });

            // Update driver status to busy
            setStatus('Busy');
            await updateStatusAndLocation(location);

            // Refresh lists
            fetchDeliveries();
            fetchNearbyOrders();

            return response.data;
        } catch (error) {
            console.error('Error accepting order:', error);
            throw error;
        }
    };

    const renderDeliveries = (filterStatus, buttonAction, buttonLabel, buttonIcon) => (
        deliveries
            .filter(del => del.status === filterStatus &&
                (filterStatus !== 'Pending' || (del.driver && del.driver.id === driverId)))
            .map(del => (
                <Card title={`Order ID: ${del.orderId || del.id}`} key={del.id} className="delivery-card">
                    <p><strong>Customer:</strong> {del.customer}</p>
                    <p><strong>Address:</strong> {del.deliveryLocation || del.address}</p>
                    <p><strong>Status:</strong> <Tag value={del.status}
                                                     severity={del.status === 'Pending' ? 'warning' :
                                                         del.status === 'Started' ? 'info' : 'success'} /></p>
                    {buttonAction && (
                        <Button
                            label={buttonLabel}
                            icon={buttonIcon}
                            onClick={() => buttonAction(del.id)}
                            className="p-button-sm"
                            disabled={status === 'Offline'}
                        />
                    )}
                </Card>
            ))
    );

    const renderAvailableDeliveries = () => {
        if (loadingOrders) {
            return <ProgressSpinner />;
        }

        if (nearbyOrders.length === 0) {
            return <p>No nearby orders available within {radiusKm} km</p>;
        }

        return nearbyOrders.map(order => (
            <Card
                title={`Order #${order.orderId}`}
                key={order.orderId}
                className="delivery-card available-delivery"
            >
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Address:</strong> {order.customerAddress}</p>
                <p><strong>Items:</strong> {order.orderName.join(', ')}</p>
                <p><strong>Total:</strong> ${order.totalPrice}</p>
                <p>
                    <strong>Distance:</strong>
                    {order.distance ? `${order.distance.toFixed(2)} km` : 'Calculating...'}
                </p>
                <Button
                    label="Accept Order"
                    icon="pi pi-check"
                    onClick={() => acceptOrder(order.orderId)}
                    className="p-button-sm"
                    disabled={status !== 'Available'}
                />
            </Card>
        ));
    };

    return (
        <div className="driver-dashboard">
            <Header />
            <div className="dashboard-header">
                <Dropdown
                    value={status}
                    options={statusOptions}
                    onChange={(e) => setStatus(e.value)}
                    placeholder="Select Status"
                />
            </div>

            {location && (
                <div className="location-display">
                    <h4>Live Location</h4>
                    <p>Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}</p>
                    <p>Search radius: {radiusKm} km</p>
                </div>
            )}

            <div className="deliveries-tabs">
                <TabView>
                    <TabPanel header="Available Orders">
                        {status === 'Available' ? renderAvailableDeliveries() :
                            <p>Switch to "Available" status to see nearby orders</p>}
                    </TabPanel>
                    <TabPanel header="My Deliveries">
                        {renderDeliveries('Pending', startDelivery, 'Start Delivery', 'pi pi-play')}
                        {renderDeliveries('Started', completeDelivery, 'Complete Delivery', 'pi pi-check')}
                        {renderDeliveries('Completed', null, '', '')}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DriverUserDashboard;