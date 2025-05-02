import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Paper,
    IconButton,
    Modal,
    Grid
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import VisibilityIcon from '@mui/icons-material/Visibility';
import API from '../api/api';
import RestaurantForm from '../components/RestaurantForm';

const BASE_URL = "http://localhost:8081"; // Use env var in prod

const RestaurantListPage = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [expandedRow, setExpandedRow] = useState(null);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await API.get('/restaurants');
            setRestaurants(response.data);
        } catch (error) {
            console.error('Failed to fetch restaurants', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            try {
                await API.delete(`/users/${userId}`);
                fetchRestaurants();
            } catch (error) {
                console.error('Failed to delete restaurant', error);
            }
        }
    };

    const handleEdit = (userId) => {
        window.location.href = `/edit-restaurant/${userId}`;
    };

    const handleViewProfile = (userId) => {
        window.location.href = `/admin/restaurants/${userId}`;
    };

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleToggleExpand = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const columns = [
        { field: 'id', headerName: 'User ID', width: 90 },
        {
            field: 'logoUrl',
            headerName: 'Logo',
            width: 90,
            renderCell: (params) => (
                <img
                    src={params.value || '/default-logo.png'}
                    alt="Logo"
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    }}
                />
            ),
        },
        {
            field: 'restaurantName',
            headerName: 'Restaurant Name',
            width: 200,
            renderCell: (params) => (
                <Button
                    variant="text"
                    onClick={() => handleViewProfile(params.row.id)}
                    sx={{ textTransform: 'none', color: '#4a4aff', fontWeight: 500 }}
                >
                    {params.value}
                </Button>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            renderCell: (params) => (
                <Box
                    sx={{
                        px: 1.5,
                        py: 0.4,
                        borderRadius: 2,
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'white',
                        bgcolor: params.value === 'Active' ? 'green' : 'gray',
                        textAlign: 'center',
                        minWidth: 70,
                    }}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Date Added',
            width: 140,
        },
        {
            field: 'expand',
            headerName: 'Expand',
            width: 80,
            sortable: false,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <IconButton onClick={() => handleToggleExpand(params.row.id)} size="small">
                    {expandedRow === params.row.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box display="flex" gap={1}>
                    <IconButton onClick={() => handleViewProfile(params.row.id)} color="info" size="small">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(params.row.id)} color="primary" size="small">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row.id)} color="error" size="small">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const filteredRestaurants = restaurants.filter((restaurant) =>
        restaurant.restaurantName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const rows = filteredRestaurants.map((restaurant) => ({
        id: restaurant.userId || null,
        logoUrl: restaurant.logoUrl ? `${BASE_URL}${restaurant.logoUrl}` : null,
        restaurantName: restaurant.restaurantName,
        description: restaurant.description,
        restaurantLocation: restaurant.restaurantLocation,
        ownerName: restaurant.ownerName,
        ownerContact: restaurant.ownerContact,
        restaurantContact: restaurant.restaurantContact,
        restaurantEmail: restaurant.restaurantEmail,
        status: restaurant.activated ? 'Active' : 'Inactive',
        createdAt: restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : 'N/A'
    }));

    const selectedRow = rows.find((r) => r.id === expandedRow);

    return (
        <Container>
            <Box my={4} display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">Restaurants</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
                    Add Restaurant
                </Button>
            </Box>

            <Box mb={2}>
                <TextField
                    label="Search Restaurant"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>

            <Paper elevation={3} sx={{ borderRadius: 3, p: 2, backgroundColor: '#ffffff' }}>
                <div style={{ width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                        rowsPerPageOptions={[10]}
                        density="comfortable"
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 2,
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5', fontWeight: 'bold' },
                            '& .MuiDataGrid-row:hover': { backgroundColor: '#fafafa' }
                        }}
                        getRowId={(row) => row.id}
                    />
                </div>

                {expandedRow && selectedRow && (
                    <Box mt={2} p={2} border="1px solid #ddd" borderRadius={2} bgcolor="#fcfcfc">
                        <Typography variant="h6" gutterBottom fontWeight={600}>Restaurant Details</Typography>
                        <Grid container spacing={2}>
                            {['restaurantName', 'description', 'restaurantLocation', 'ownerName', 'ownerContact', 'restaurantContact', 'restaurantEmail'].map((field, i) => (
                                <Grid item xs={6} key={i}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                        {field.replace(/([A-Z])/g, ' $1')}:
                                    </Typography>
                                    <Typography variant="body2">
                                        {selectedRow[field] || '-'}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )}
            </Paper>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        borderRadius: 2,
                        p: 4,
                    }}
                >
                    <RestaurantForm onClose={() => { setOpenModal(false); fetchRestaurants(); }} />
                </Box>
            </Modal>
        </Container>
    );
};

export default RestaurantListPage;
