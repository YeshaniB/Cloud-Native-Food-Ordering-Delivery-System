import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Tag } from 'primereact/tag';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import AdminLayout from "../components/AdminLayout";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import axios from "axios";

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [showDriverDialog, setShowDriverDialog] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPreparedOrders();
        fetchAvailableDrivers();
    }, []);

    const fetchPreparedOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/deliveries/getPrepared');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            showError('Failed to fetch orders');
        }
    };

    // Update order status (e.g., Start/Complete)
        const updateOrderStatus = async (orderId, status) => {
            try {
                await axios.put(`http://localhost:8083/api/deliveries/updateStatus/${orderId}`, { status });
                // Re-fetch orders to update status
                const updatedOrders = await axios.get('http://localhost:8083/api/deliveries/getPrepared');
                setOrders(updatedOrders.data);
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        };


    const fetchAvailableDrivers = async () => {
        try {
            const response = await axios.get('http://localhost:8083/api/drivers?status=Available');
            setDrivers(response.data);
        } catch (error) {
            console.error('Error fetching drivers:', error);
            showError('Failed to fetch available drivers');
        }
    };

    const showError = (message) => {
        toast.current.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000
        });
    };

    const showSuccess = (message) => {
        toast.current.show({
            severity: 'success',
            summary: 'Success',
            detail: message,
            life: 3000
        });
    };

    const handleAssignClick = (order) => {
        setSelectedOrder(order);
        setSelectedDriver(null);
        setShowDriverDialog(true);
    };

    const confirmAssignment = async () => {
        if (!selectedOrder || !selectedDriver) return;

        setLoading(true);
        try {
            await axios.post(`http://localhost:8083/api/deliveries/assign`, {
                orderId: selectedOrder.orderId,
                driverId: selectedDriver.id
            });

            showSuccess(`Driver ${selectedDriver.name} assigned successfully`);
            fetchPreparedOrders();
            fetchAvailableDrivers();
        } catch (error) {
            console.error('Error assigning driver: malmi', error);
            showError(error.response?.data?.message || 'Failed to assign driver');
        } finally {
            setLoading(false);
            setShowDriverDialog(false);
        }
    };

    const driverAssignmentBodyTemplate = (rowData) => {
        return (
            <div className="flex align-items-center gap-2">
                {rowData.driver?.name || 'Not Assigned'}
                {!rowData.driver && (
                    <Button
                        icon="pi pi-user-plus"
                        className="p-button-rounded p-button-sm p-button-success"
                        tooltip="Assign Driver"
                        tooltipOptions={{ position: 'top' }}
                        onClick={() => handleAssignClick(rowData)}
                    />
                )}
            </div>
        );
    };

    const driverDialogFooter = (
        <div>
            <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() => setShowDriverDialog(false)}
            />
            <Button
                label="Assign"
                icon="pi pi-check"
                className="p-button-success"
                onClick={confirmAssignment}
                disabled={!selectedDriver || loading}
                loading={loading}
            />
        </div>
    );

    return (
        <div className="dashboard-container">
            <Toast ref={toast} />
            <AdminLayout/>

            <div className="dashboard-header">
                <h2>Delivery Dashboard</h2>
                <Button
                    label="View Driver List"
                    icon="pi pi-users"
                    className="p-button-primary"
                    onClick={() => navigate('/admin-delivery-dashboard')}
                />
            </div>

            <div className="dashboard-section">
                <Card title="Recent Orders">
                    <DataTable value={orders} paginator rows={5} loading={loading}>
                        <Column field="orderId" header="Order ID" />
                        <Column field="customerName" header="Customer" />
                        <Column field="deliveryLocation" header="Delivery Address" />
                        <Column
                            field="status"
                            header="Status"
                            body={(rowData) => (
                                <Tag
                                    value={rowData.status}
                                    severity={
                                        rowData.status === 'Pending' ? 'warning' :
                                            rowData.status === 'Started' ? 'info' : 'success'
                                    }
                                />
                            )}
                        />
                        <Column
                            field="assignedDriver"
                            header="Driver"
                            body={driverAssignmentBodyTemplate}
                            style={{ minWidth: '200px' }}
                        />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="action-buttons">
                                    <Button
                                        icon="pi pi-eye"
                                        className="p-button-rounded p-button-info"
                                        onClick={() => navigate(`/admin-tracking/${rowData.orderId}`)}
                                        tooltip="Track Order"
                                    />
                                    <Button
                                        label="Start"
                                        icon="pi pi-play"
                                        className="p-button-rounded p-button-success"
                                        onClick={() => updateOrderStatus(rowData.orderId, 'Started')}
                                        disabled={rowData.status !== 'Pending' || !rowData.driver}
                                        tooltip="Start Delivery"
                                    />
                                    <Button
                                        label="Complete"
                                        icon="pi pi-check"
                                        className="p-button-rounded p-button-help"
                                        onClick={() => updateOrderStatus(rowData.orderId, 'Completed')}
                                        disabled={rowData.status !== 'Started'}
                                        tooltip="Complete Delivery"
                                    />
                                </div>
                            )}
                        />
                    </DataTable>
                </Card>
            </div>

            <Dialog
                visible={showDriverDialog}
                style={{ width: '450px' }}
                header="Assign Driver"
                modal
                footer={driverDialogFooter}
                onHide={() => setShowDriverDialog(false)}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="driver">Select Driver</label>
                        <Dropdown
                            id="driver"
                            value={selectedDriver}
                            options={drivers}
                            optionLabel="name"
                            placeholder="Select a Driver"
                            onChange={(e) => setSelectedDriver(e.value)}
                            filter
                            showClear
                            filterBy="name,vehicleNo"
                        />
                    </div>
                    {selectedDriver && (
                        <div className="p-mt-2">
                            <p><strong>Vehicle:</strong> {selectedDriver.vehicleType} ({selectedDriver.vehicleNo})</p>
                            <p><strong>Current Location:</strong>
                                {selectedDriver.location ?
                                    `${selectedDriver.location.lat.toFixed(4)}, ${selectedDriver.location.lng.toFixed(4)}` :
                                    'Unknown'}
                            </p>
                        </div>
                    )}
                </div>
            </Dialog>

            <Footer/>
        </div>
    );
};

export default DashboardPage;