// DashboardPage.js
import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { ProgressBar } from 'primereact/progressbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Box } from '@mui/material';
import StatCard from '../components/StatCard';
import '../styles/Dashboard.css';

const DashboardPage = () => {
    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="dashboard-header">
                <h2>Delivery Dashboard</h2>
                <Button label="Download Reports" icon="pi pi-download" className="p-button-primary" />
            </div>

            {/* Stat Cards */}
            <div className="stat-cards">
                <StatCard title="Total Orders" value="1,250" icon="pi pi-shopping-cart" color="blue" />
                <StatCard title="Assign Deliveries" value="$45,000" icon="pi pi-dollar" color="green" />
                <StatCard title="Completed Deliveries" value="320" icon="pi pi-users" color="orange" />
                <StatCard title="Pending Deliveries" value="85" icon="pi pi-truck" color="red" />
            </div>

            {/* Revenue Chart */}
            {/* <div className="dashboard-section">
                <Card title="Revenue Generated">

                    <Chart type="line" data={} />
                </Card>
            </div>*/}

            {/* Recent Orders */}
            <div className="dashboard-section">
                <Card title="Recent Orders">
                    {/* Replace with actual data table component */}
                    <DataTable value={[]} paginator rows={5}>
                        <Column field="orderId" header="Order ID" />
                        <Column field="customer" header="Customer" />
                        <Column field="created" header="Created" />
                        <Column field="Driver" header="Driver" />
                        <Column field="status" header="Status" />
                        <Column field="action" header="Action" />
                    </DataTable>
                </Card>
            </div>

            {/* Campaign Progress */}
            {/*<div className="dashboard-section">
                <Card title="Campaign Progress">
                    <ProgressBar value={75} />
                    <p>75% of the campaign goal achieved.</p>
                </Card>
            </div>*/}

            {/* Sales Quantity Chart */}
            <div className="dashboard-section">
                <Card title="Sales Quantity">
                    {/* Replace with actual chart component */}
                    <Chart type="bar" data={{ /* chart data */ }} />
                </Card>
            </div>

            {/* Geography-Based Traffic */}
            <div className="dashboard-section">
                <Card title="Geography-Based Traffic">
                    {/* Replace with actual chart component */}
                    <Chart type="pie" data={{ /* chart data */ }} />
                </Card>
            </div>
        </div>
    );
};

export default DashboardPage;
