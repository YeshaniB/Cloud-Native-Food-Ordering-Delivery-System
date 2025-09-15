import React, { useState } from 'react';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
//import "primereact/resources/themes/lara-light-cyan/theme.css";


import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { InputText } from 'primereact/inputtext';

const dummyDrivers = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        status: 'Available',
        completed: 342,
        rating: 4.8,
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '(555) 987-6543',
        status: 'Busy',
        completed: 218,
        rating: 4.9,
    }
];

const DriverDashboard = () => {
    const [drivers, setDrivers] = useState(dummyDrivers);

    const handleStatusChange = (id, newStatus) => {
        setDrivers(prevDrivers => prevDrivers.map(driver =>
            driver.id === id ? { ...driver, status: newStatus } : driver
        ));
    };

    return (
        <div className="driver-dashboard">
            <h2>Driver Management</h2>
            <div className="driver-cards">
                {drivers.map(driver => (
                    <div key={driver.id} className="driver-card">
                        <h3>{driver.name}</h3>
                        <p>{driver.email}</p>
                        <p>{driver.phone}</p>
                        <p>Status: <span className={`status ${driver.status.toLowerCase()}`}>{driver.status}</span></p>
                        <p>{driver.completed} deliveries completed</p>
                        <p>⭐ {driver.rating}</p>
                        <select
                            value={driver.status}
                            onChange={e => handleStatusChange(driver.id, e.target.value)}
                        >
                            <option>Available</option>
                            <option>Busy</option>
                            <option>Offline</option>
                        </select>
                        <Button label="Submit" />

                    </div>
                ))}
            </div>
        </div>

    );
};

export default DriverDashboard;