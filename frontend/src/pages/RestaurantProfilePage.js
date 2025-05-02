import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Grid,
    Avatar,
    CircularProgress,
    Button,
    Paper,
    Divider
} from '@mui/material';
import html2pdf from 'html2pdf.js';
import API from '../api/api';

const BASE_URL = "http://localhost:8081";

const RestaurantProfilePage = () => {
    const { id } = useParams(); // userId
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const pdfRef = useRef();

    useEffect(() => {
        fetchRestaurant();
    }, []);

    const fetchRestaurant = async () => {
        try {
            const response = await API.get(`/restaurants`);
            const found = response.data.find((res) => res.userId === parseInt(id));
            if (found?.logoUrl) {
                found.logoUrl = `${BASE_URL}${found.logoUrl}`;
            }
            setRestaurant(found || null);
        } catch (error) {
            console.error('Failed to fetch restaurant profile', error);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = () => {
        const element = pdfRef.current;
        html2pdf()
            .set({
                margin: 0.5,
                filename: `Restaurant_${restaurant?.restaurantName || 'Profile'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            })
            .from(element)
            .save();
    };

    if (loading) {
        return (
            <Box textAlign="center" mt={8}>
                <CircularProgress />
            </Box>
        );
    }

    if (!restaurant) {
        return (
            <Box textAlign="center" mt={8}>
                <Typography variant="h6">Restaurant not found.</Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>Go Back</Button>
            </Box>
        );
    }

    return (
        <Container>
            <Box my={4}>
                <Box display="flex" justifyContent="space-between" mb={3} className="no-print">
                    <Button variant="outlined" onClick={() => navigate(-1)}>← Back</Button>
                    <Button variant="contained" onClick={downloadPDF}>📄 Download PDF</Button>
                </Box>

                <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }} ref={pdfRef}>
                    <Box display="flex" alignItems="center" mb={3}>
                        <Avatar
                            src={restaurant.logoUrl || '/default-logo.png'}
                            sx={{ width: 90, height: 90, mr: 3 }}
                        />
                        <Box>
                            <Typography variant="h4" fontWeight={600}>
                                {restaurant.restaurantName}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'inline-block',
                                    mt: 1,
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: '20px',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: 'white',
                                    backgroundColor: restaurant.isActivated ? 'green' : 'gray'
                                }}
                            >
                                {restaurant.isActivated ? 'Active' : 'Inactive'}
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>Restaurant Details</Typography>
                            <Typography><strong>Description:</strong> {restaurant.description || '—'}</Typography>
                            <Typography><strong>Location:</strong> {restaurant.restaurantLocation}</Typography>
                            <Typography><strong>Email:</strong> {restaurant.restaurantEmail}</Typography>
                            <Typography><strong>Contact:</strong> {restaurant.restaurantContact}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>Owner Information</Typography>
                            <Typography><strong>Name:</strong> {restaurant.ownerName}</Typography>
                            <Typography><strong>Contact:</strong> {restaurant.ownerContact}</Typography>
                            <Typography><strong>NIC:</strong> {restaurant.ownerNIC || '—'}</Typography>
                            <Typography><strong>Address:</strong> {restaurant.ownerAddress || '—'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>Legal Info</Typography>
                            <Typography><strong>License Number:</strong> {restaurant.licenseNumber}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h6" gutterBottom>System Metadata</Typography>
                            <Typography><strong>User ID:</strong> {restaurant.userId}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </Container>
    );
};

export default RestaurantProfilePage;
