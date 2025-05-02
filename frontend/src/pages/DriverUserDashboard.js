import React, { useEffect, useState } from 'react';
import axios from 'axios'; // <-- Import axios
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { TabView, TabPanel } from 'primereact/tabview';
import '../styles/DriverUserDashboard.css';
import Header  from "../components/Header";

const DriverUserDashboard = () => {
    const [status, setStatus] = useState('Offline');
    const [location, setLocation] = useState(null);
    const [deliveries, setDeliveries] = useState([]);
    const driverId = '681109f24dd27e4fbab9e407';


    const statusOptions = ['Offline', 'Available', 'Busy'];

    // Fetch deliveries from backend
    useEffect(() => {
        fetchDeliveries();
    }, []);

    const fetchDeliveries = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/deliveries'); // Adjust URL
            setDeliveries(response.data);
        } catch (error) {
            console.error('Error fetching deliveries:', error);
        }
    };
    // Add this useEffect to periodically check for new deliveries when driver is Available
    useEffect(() => {
        let interval;
        if (status === 'Available') {
            interval = setInterval(fetchDeliveries, 10000); // Check every 10 seconds
        }
        return () => clearInterval(interval);
    }, [status]);
    // Update status and location when status/location changes
    useEffect(() => {
        handleStatusChange();
    }, [status]);

    const handleStatusChange = async () => {
        if (status === 'Offline') {
            // When offline, set location to 0.0
            setLocation({ lat: 0.0, lng: 0.0 });
            await updateStatusAndLocation({ lat: 0.0, lng: 0.0 });

            // Refresh deliveries when going offline
            fetchDeliveries();
        } else {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const newLocation = { lat: latitude, lng: longitude };
                        setLocation(newLocation);
                        await updateStatusAndLocation(newLocation);

                        // If switching to Available, refresh deliveries immediately
                        if (status === 'Available') {
                            fetchDeliveries();
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);

                        if (status === 'Available') {
                            updateStatusAndLocation(location || { lat: 0, lng: 0 });
                        }
                    },
                    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');

                if (status === 'Available') {
                    updateStatusAndLocation(location || { lat: 0, lng: 0 });
                }
            }
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

    // Handle updating status to "Started"
    const startDelivery = async (id) => {
        try {
            await axios.put(`http://localhost:8083/api/deliveries/${id}/start`);
            fetchDeliveries(); // Refresh deliveries
        } catch (error) {
            console.error('Error starting delivery:', error);
        }
    };

    // Handle updating status to "Completed"
    const completeDelivery = async (id) => {
        try {
            await axios.put(`http://localhost:8083/api/deliveries/${id}/complete`);
            fetchDeliveries(); // Refresh deliveries
        } catch (error) {
            console.error('Error completing delivery:', error);
        }
    };

    // Handle geolocation to fetch live location
    useEffect(() => {
        if (status !== 'Offline') {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ lat: latitude, lng: longitude });
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    }, [status]);

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
    // const renderDeliveries = (filterStatus, buttonAction, buttonLabel, buttonIcon) => (
    //     deliveries
    //         .filter(del => del.status === filterStatus)
    //         .map(del => (
    //             <Card title={`Order ID: ${del.id}`} key={del.id} className="delivery-card">
    //                 <p><strong>Customer:</strong> {del.customer}</p>
    //                 <p><strong>Location:</strong> {del.address}</p>
    //                 {buttonAction && (
    //                     <Button
    //                         label={buttonLabel}
    //                         icon={buttonIcon}
    //                         onClick={() => buttonAction(del.id)}
    //                         className="p-button-sm"
    //                     />
    //                 )}
    //             </Card>
    //         ))
    // );



    return (
        <div className="driver-dashboard">
            <Header/>
            <div className="dashboard-header">
                <Dropdown
                    value={status}
                    options={statusOptions}
                    onChange={(e) => setStatus(e.value)}
                    placeholder="Select Status"
                />
                {/*<Tag*/}
                {/*    severity={status === 'Available' ? 'success' : status === 'Busy' ? 'warning' : 'danger'}*/}
                {/*    value={status}*/}
                {/*/>*/}
            </div>

            {location && (
                <div className="location-display">
                    <h4>Live Location</h4>
                    <p>Lat: {location.lat}, Lng: {location.lng}</p>
                </div>
            )}

            <div className="deliveries-tabs">
                <TabView>
                    <TabPanel header="Pending Deliveries">
                        {renderDeliveries('Pending', startDelivery, 'Start Delivery', 'pi pi-play')}
                    </TabPanel>

                    <TabPanel header="Started Deliveries">
                        {renderDeliveries('Started', completeDelivery, 'Complete Delivery', 'pi pi-check')}
                    </TabPanel>

                    <TabPanel header="Completed Deliveries">
                        {renderDeliveries('Completed', null, '', '')}
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};

export default DriverUserDashboard;
