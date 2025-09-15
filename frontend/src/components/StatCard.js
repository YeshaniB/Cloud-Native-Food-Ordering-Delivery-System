// StatCard.js
import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';

const StatCard = ({ title, value, icon, color }) => {
    return (
        <Card className="stat-card">
            <div className="stat-card-content">
                <i className={`pi ${icon} stat-card-icon`} style={{ color }}></i>
                <div>
                    <h4>{title}</h4>
                    <h2>{value}</h2>
                </div>
            </div>
        </Card>
    );
};

export default StatCard;
