// import React, { useState } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { Button } from 'primereact/button';
// import {PanelMenu} from "primereact/panelmenu";
// //import './AddDriverForm.css';
//
// const AddDriverForm = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         status: 'Available'
//     });
//
//     const statusOptions = [
//         { label: 'Available', value: 'Available' },
//         { label: 'Busy', value: 'Busy' },
//         { label: 'Offline', value: 'Offline' }
//     ];
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleDropdownChange = (e) => {
//         setFormData({ ...formData, status: e.value });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Driver submitted:', formData);
//         // Add API call here
//     };
//
//     return (
//         <div className="add-driver-form p-4">
//             <h2>Add New Driver</h2>
//             <form onSubmit={handleSubmit} className="p-fluid">
//                 <div className="field">
//                     <label htmlFor="name">Name</label>
//                     <InputText id="name" name="name" value={formData.name} onChange={handleChange} required />
//                 </div>
//
//                 <div className="field">
//                     <label htmlFor="email">Email</label>
//                     <InputText id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
//                 </div>
//
//                 <div className="field">
//                     <label htmlFor="phone">Phone</label>
//                     <InputText id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
//                 </div>
//
//                 <div className="field">
//                     <label htmlFor="status">Status</label>
//                     <Dropdown id="status" name="status" value={formData.status} options={statusOptions} onChange={handleDropdownChange} placeholder="Select Status" />
//                 </div>
//
//                 <Button type="submit" label="Add Driver" icon="pi pi-check" className="mt-2" />
//
//             </form>
//         </div>
//     );
// };
//
// export default AddDriverForm;
//
//
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { PanelMenu } from 'primereact/panelmenu';
import { Menubar } from 'primereact/menubar';
import { Divider } from 'primereact/divider';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import AdminLayout from "../layout/AdminLayout";
import Header   from "../components/Header";
import Footer from "../components/Footer";

import 'primereact/resources/themes/lara-light-blue/theme.css'; // Or your preferred theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


const AddDriverForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'Available'
    });

    const statusOptions = [
        { label: 'Available', value: 'Available' },
        { label: 'Busy', value: 'Busy' },
        { label: 'Offline', value: 'Offline' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDropdownChange = (e) => {
        setFormData({ ...formData, status: e.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const driverData = {
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            vehicleType: formData.vehicleType,
            vehicleNo: formData.vehicleNo,
            status: formData.status,
            location: { lat: 0, lng: 0 }
        };

        try {
            const response = await fetch('http://localhost:8083/api/drivers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(driverData)
            });

            if (!response.ok) throw new Error("Failed to add driver");

            const result = await response.json();
            console.log("Driver added:", result);
            alert("Driver registered successfully!");
        } catch (error) {
            console.error("Error adding driver:", error);
            alert("Failed to add driver.");
        }
    };


    const sidebarItems = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
        },
        {
            label: 'Drivers',
            icon: 'pi pi-users',
            items: [
                { label: 'Add Driver' },
                { label: 'View Drivers' }
            ]
        },
        {
            label: 'Settings',
            icon: 'pi pi-cog',
        }
    ];

    const navbarItems = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home'
        },
        {
            label: 'About',
            icon: 'pi pi-fw pi-info-circle'
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-envelope'
        }
    ];

    const logo = (
        <Image src="https://via.placeholder.com/100x40?text=Logo" alt="Company Logo" width="100" />
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <AdminLayout />
            {/* Top Navbar */}
            <div>
                <Menubar model={navbarItems} start={logo} />
            </div>

            {/* Main Content */}
            <div style={{ display: 'flex', flex: 1 }}>
                {/* Sidebar */}
                <div style={{ width: '250px', background: '#f4f4f4', padding: '1rem' }}>
                    <PanelMenu model={sidebarItems} />
                </div>

                {/* Centered Form */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Card title="Add New Driver" style={{ width: '100%', maxWidth: '500px' }}>
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <InputText id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>

                            <div className="field">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <InputText id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>

                            <div className="field">
                                <label htmlFor="vehicleType">Vehicle Type</label>
                                <InputText id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} required />
                            </div>

                            <div className="field">
                                <label htmlFor="vehicleNo">Vehicle Number</label>
                                <InputText id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} required />
                            </div>

                            {/*<div className="field">*/}
                            {/*    <label htmlFor="status">Status</label>*/}
                            {/*    <Dropdown id="status" name="status" value={formData.status} options={statusOptions} onChange={handleDropdownChange} placeholder="Select Status" />*/}
                            {/*</div>*/}


                            <Button type="submit" label="Add Driver" icon="pi pi-check" className="mt-3" />
                        </form>
                    </Card>
                </div>
            </div>

            {/* Footer */}
            <Divider />
            <Footer/>
        </div>
    );
};

export default AddDriverForm;
