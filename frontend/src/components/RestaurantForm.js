import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Grid
} from '@mui/material';
import API from '../api/api';

const RestaurantForm = ({ onClose }) => {
    const [form, setForm] = useState({
        name: '',
        contact: '',
        email: '',
        password: '',
        restaurantName: '',
        restaurantLocation: '',
        ownerName: '',
        ownerAddress: '',
        ownerNIC: '',
        licenseNumber: '',
        ownerContact: '',
        restaurantContact: '',
        restaurantEmail: '',
        logoUrl: null, // will hold the File object
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, logoUrl: file }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            name: form.name,
            contact: form.contact,
            email: form.email,
            password: form.password,
            userType: "RESTAURANT"
        };

        const restaurantData = {
            restaurantName: form.restaurantName,
            restaurantLocation: form.restaurantLocation,
            ownerName: form.ownerName,
            ownerAddress: form.ownerAddress,
            ownerNIC: form.ownerNIC,
            licenseNumber: form.licenseNumber,
            ownerContact: form.ownerContact,
            restaurantContact: form.restaurantContact,
            restaurantEmail: form.restaurantEmail,
            description: form.description
        };

        const formData = new FormData();
        formData.append("user", new Blob([JSON.stringify(userData)], { type: "application/json" }));
        formData.append("restaurantDetails", new Blob([JSON.stringify(restaurantData)], { type: "application/json" }));
        formData.append("logo", form.logoUrl);

        try {
            await API.post('/register/restaurant', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onClose(); // Close modal and refresh list
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <Box>
            <Typography variant="h6" mb={2}>Add New Restaurant</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}><TextField fullWidth label="Name" name="name" value={form.name} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Contact" name="contact" value={form.contact} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Email" name="email" value={form.email} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Password" type="password" name="password" value={form.password} onChange={handleChange} /></Grid>

                    <Grid item xs={6}><TextField fullWidth label="Restaurant Name" name="restaurantName" value={form.restaurantName} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Location" name="restaurantLocation" value={form.restaurantLocation} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Owner Name" name="ownerName" value={form.ownerName} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Owner Address" name="ownerAddress" value={form.ownerAddress} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Owner NIC" name="ownerNIC" value={form.ownerNIC} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="License Number" name="licenseNumber" value={form.licenseNumber} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Owner Contact" name="ownerContact" value={form.ownerContact} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Restaurant Contact" name="restaurantContact" value={form.restaurantContact} onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Restaurant Email" name="restaurantEmail" value={form.restaurantEmail} onChange={handleChange} /></Grid>

                    <Grid item xs={6}>
                        <Button variant="outlined" component="label" fullWidth>
                            Upload Logo
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {form.logoUrl && (
                            <Typography variant="body2" mt={1}>
                                {form.logoUrl.name}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <TextField fullWidth label="Description" name="description" multiline rows={2} value={form.description} onChange={handleChange} />
                    </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" type="submit">Register</Button>
                    <Button variant="outlined" color="secondary" onClick={onClose}>Cancel</Button>
                </Box>
            </form>
        </Box>
    );
};

export default RestaurantForm;
