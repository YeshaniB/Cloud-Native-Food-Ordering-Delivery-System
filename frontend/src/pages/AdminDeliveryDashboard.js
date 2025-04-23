
import React, { useEffect, useState } from 'react';
import { fetchAllDeliveries } from '../services/deliveryService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

const AdminDeliveryDashboard = () => {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        fetchAllDeliveries().then((res) => setDeliveries(res.data)).catch((err) => console.error(err));
    }, []);

    const statusBodyTemplate = (rowData) => {
        const statusColors = {
            pending: 'warning',
            delivering: 'info',
            completed: 'success',
        };

        return <Tag value={rowData.status} severity={statusColors[rowData.status]} />;
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-3">Admin Delivery Dashboard</h2>
            <DataTable value={deliveries} paginator rows={5} stripedRows responsiveLayout="scroll">
                <Column field="orderId" header="Order ID"></Column>
                <Column field="customerName" header="Customer"></Column>
                <Column field="status" header="Status" body={statusBodyTemplate}></Column>
                <Column field="driver" header="Driver"></Column>
                <Column field="estimatedTime" header="ETA"></Column>
            </DataTable>
        </div>
    );
};

export default AdminDeliveryDashboard;
