import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import axios from 'axios';
import '../styles/AdminDeliveryDashboard.css';
import Footer from "../components/Footer";
import AdminLayout from "../components/AdminLayout";

const AdminDeliveryDashboard = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDrivers();
    }, []);

    const fetchDrivers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8083/api/drivers');
            const data = response.data;

            const mappedDrivers = data.map(driver => ({
                id: driver.id,
                name: driver.name,
                status: driver.status,
                vehicle: `${driver.vehicleType || ''} (${driver.vehicleNo || ''})`,
                location: driver.location ?
                    `${driver.location.lat.toFixed(4)}, ${driver.location.lng.toFixed(4)}` :
                    '0, 0',
                lastUpdate: new Date().toLocaleTimeString()
            }));

            setDrivers(mappedDrivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        } finally {
            setLoading(false);
        }
    };

    const statusBodyTemplate = (rowData) => {
        const getSeverity = (status) => {
            switch (status) {
                case 'Available':
                    return 'success';
                case 'Busy':
                    return 'warning';
                case 'Offline':
                    return 'danger';
                default:
                    return 'info';
            }
        };

        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const locationBodyTemplate = (rowData) => {
        return (
            <div>
                {rowData.location}
                <Button
                    icon="pi pi-map-marker"
                    className="p-button-text p-button-plain ml-2"
                    onClick={() => handleViewOnMap(rowData)}
                />
            </div>
        );
    };

    const handleViewOnMap = (driver) => {
        console.log('View driver on map:', driver);
        // Implement map view functionality here
        // Could open a modal with a map centered on driver's location
    };

    const handleViewHistory = (driverId) => {
        console.log('View delivery history for driver:', driverId);
        // Implement navigation to driver history page
    };

    const header = (
        <div className="table-header">
            <h2 className="title">Driver Management</h2>
            <div>
                <Button
                    label="Refresh"
                    icon="pi pi-refresh"
                    className="p-button-primary mr-2"
                    onClick={fetchDrivers}
                    loading={loading}
                />
                <Button
                    label="Add Driver"
                    icon="pi pi-plus"
                    className="p-button-success"
                    // onClick={handleAddDriver}
                />
            </div>
        </div>
    );

    return (
        <div className="admin-dashboard">
            <AdminLayout/>
            <div className="header-controls">
                <Button
                    label="Map View"
                    icon="pi pi-map"
                    className="p-button-secondary mr-2"
                    // onClick={handleMapView}
                />
                <Button
                    label="List View"
                    icon="pi pi-list"
                    className="p-button-info"
                    disabled
                />
            </div>

            <div className="card">
                <DataTable
                    value={drivers}
                    header={header}
                    stripedRows
                    loading={loading}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    emptyMessage="No drivers found"
                >
                    <Column field="id" header="Driver ID" sortable />
                    <Column field="name" header="Name" sortable />
                    <Column field="status" header="Status" body={statusBodyTemplate} sortable />
                    <Column field="vehicle" header="Vehicle" sortable />
                    <Column field="location" header="Location" body={locationBodyTemplate} />
                    <Column field="lastUpdate" header="Last Update" sortable />
                    <Column
                        header="Actions"
                        body={(rowData) => (
                            <div className="action-buttons">
                                <Button
                                    icon="pi pi-map-marker"
                                    className="p-button-rounded p-button-info"
                                    tooltip="View on Map"
                                    tooltipOptions={{ position: 'top' }}
                                    onClick={() => handleViewOnMap(rowData)}
                                />
                                <Button
                                    icon="pi pi-history"
                                    className="p-button-rounded p-button-secondary"
                                    tooltip="View Delivery History"
                                    tooltipOptions={{ position: 'top' }}
                                    onClick={() => handleViewHistory(rowData.id)}
                                />
                                <Button
                                    icon="pi pi-user-edit"
                                    className="p-button-rounded p-button-warning"
                                    tooltip="Edit Driver"
                                    tooltipOptions={{ position: 'top' }}
                                    // onClick={() => handleEditDriver(rowData.id)}
                                />
                            </div>
                        )}
                    />
                </DataTable>
            </div>
            <Footer/>
        </div>
    );
};

export default AdminDeliveryDashboard;
// import React, { useEffect, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Tag } from 'primereact/tag';
// import '../styles/AdminDeliveryDashboard.css';
// import Footer  from "../components/Footer";
// import AdminLayout      from "../components/AdminLayout";
//
// const AdminDeliveryDashboard = () => {
//     const [drivers, setDrivers] = useState([]);
//
//     useEffect(() => {
//         // You can replace this fetch with your API later
//         fetchDrivers();
//     }, []);
//
//     const fetchDrivers = async () => {
//         try {
//             const response = await fetch('http://localhost:8083/api/drivers'); // your backend URL
//             const data = await response.json();
//             console.log('Fetched drivers:', data);
//
//             // Optional: Map data if needed
//             const mappedDrivers = data.map(driver => ({
//                 id: driver.id,
//                 name: driver.name,
//                 status: driver.status,
//                 vehicle: `${driver.vehicleType || ''} (${driver.vehicleNo || ''})`,
//                 location: `${driver.location.lat}, ${driver.location.lng}`,
//             }));
//
//             setDrivers(mappedDrivers);
//         } catch (error) {
//             console.error('Error fetching drivers:', error);
//         }
//     };
//
//     const statusBodyTemplate = (rowData) => {
//         const getSeverity = (status) => {
//             switch (status) {
//                 case 'Available':
//                     return 'success'; // green
//                 case 'Offline':
//                     return 'danger'; // red
//                 default:
//                     return 'info'; // default blue
//             }
//         };
//
//         return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
//     };
//
//
//     const header = (
//         <div className="table-header">
//             <h2 className="title">Available Drivers ({drivers.length})</h2>
//             <div>
//                 <Button label="Refresh Data" icon="pi pi-refresh" className="p-button-primary" onClick={fetchDrivers} />
//             </div>
//         </div>
//     );
//
//     return (
//         <div className="admin-dashboard">
//             <AdminLayout/>
//             <div className="header-controls">
//                 <Button label="Map View" icon="pi pi-map" className="p-button-secondary mr-2" />
//                 <Button label="List View" icon="pi pi-list" className="p-button-info" />
//             </div>
//
//             <div className="card">
//                 <DataTable value={drivers} header={header} stripedRows>
//                     <Column field="id" header="Driver ID" sortable />
//                     <Column field="name" header="Name" sortable />
//                     <Column field="status" header="Status" body={statusBodyTemplate} />
//                     <Column field="vehicle" header="Vehicle" />
//                     <Column field="location" header="Location" />
//                 </DataTable>
//             </div>
//             <Footer/>
//         </div>
//
//     );
// };
//
// export default AdminDeliveryDashboard;
//
