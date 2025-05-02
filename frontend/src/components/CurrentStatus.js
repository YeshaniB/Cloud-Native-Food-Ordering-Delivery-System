import React from 'react';
import { Card } from 'primereact/card';

const CurrentStatus = ({ driver }) => {
    return (
        <div className="current-status">
            <Card className="status-card" title="142 Trips Completed" />
            <Card className="status-card" title={driver.onlineStatus ? "Currently Online" : "Currently Offline"} />
            <Card className="status-card" title={driver.vehicle} />
        </div>
    );
};

export default CurrentStatus;
