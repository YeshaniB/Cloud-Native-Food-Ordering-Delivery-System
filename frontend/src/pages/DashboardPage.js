import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Paper,
    Chip,
    Grid,
    Card,
    CardContent,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import API from '../api/api';
import GroupIcon from '@mui/icons-material/Group';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import PersonIcon from '@mui/icons-material/Person';
import { CSVLink } from 'react-csv';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom'; // ✅ Added for navigation

const DashboardPage = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [counts, setCounts] = useState({ total: 0, customers: 0, restaurants: 0, drivers: 0 });
    const [loadingCounts, setLoadingCounts] = useState(false);
    const [errorCounts, setErrorCounts] = useState(false);
    const [activeSearch, setActiveSearch] = useState('');
    const [inactiveSearch, setInactiveSearch] = useState('');

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedEnabled, setSelectedEnabled] = useState(null);

    const navigate = useNavigate(); // ✅ Initialize navigate

    const fetchUsers = async () => {
        try {
            const res = await API.get('/users');
            const mappedUsers = res.data.map(user => ({
                ...user,
                phoneNumber: user.contact,
                enabled: user.activated,
            }));
            setUsers(mappedUsers);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch users.');
        }
    };

    const fetchCounts = async () => {
        setLoadingCounts(true);
        setErrorCounts(false);
        try {
            const customers = await API.get('/users/type/customer');
            const restaurants = await API.get('/users/type/restaurant');
            const drivers = await API.get('/users/type/driver');
            const total = await API.get('/users');
            setCounts({
                total: total.data.length,
                customers: customers.data.length,
                restaurants: restaurants.data.length,
                drivers: drivers.data.length,
            });
        } catch (error) {
            console.error(error);
            setErrorCounts(true);
        } finally {
            setLoadingCounts(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchCounts();
    }, []);

    const handleActivateDeactivate = async () => {
        try {
            if (selectedEnabled) {
                await API.put(`/users/${selectedUserId}/deactivate`);
            } else {
                await API.put(`/users/${selectedUserId}/activate`);
            }
            fetchUsers();
            fetchCounts();
            setConfirmOpen(false);
            setSelectedUserId(null);
            setSelectedEnabled(null);
        } catch (error) {
            console.error(error);
            alert('Failed to update user status.');
        }
    };

    const activeUsers = users.filter(
        (user) =>
            user.enabled &&
            (user.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
                user.email.toLowerCase().includes(activeSearch.toLowerCase()))
    );

    const inactiveUsers = users.filter(
        (user) =>
            !user.enabled &&
            (user.name.toLowerCase().includes(inactiveSearch.toLowerCase()) ||
                user.email.toLowerCase().includes(inactiveSearch.toLowerCase()))
    );

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'name', headerName: 'Name', minWidth: 160, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
        { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 160, flex: 1 },
        {
            field: 'userType',
            headerName: 'Role',
            width: 130,
            renderCell: (params) => (
                <Chip
                    label={params.value?.toUpperCase() || 'UNKNOWN'}
                    color={params.value === 'admin' ? 'primary' : params.value === 'restaurant' ? 'warning' : params.value === 'driver' ? 'default' : 'info'}
                    size="small"
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 160,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Button
                    size="small"
                    variant="contained"
                    color={params.row.enabled ? "warning" : "success"}
                    onClick={() => {
                        setSelectedUserId(params.row.id);
                        setSelectedEnabled(params.row.enabled);
                        setConfirmOpen(true);
                    }}
                >
                    {params.row.enabled ? 'DEACTIVATE' : 'ACTIVATE'}
                </Button>
            ),
        },
    ];

    const csvHeaders = [
        { label: 'ID', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone Number', key: 'phoneNumber' },
        { label: 'Role', key: 'userType' },
    ];

    const stats = [
        {
            label: 'Total Users',
            value: counts.total,
            icon: <GroupIcon sx={{ fontSize: 40 }} />,
            gradient: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
            onClick: null,
        },
        {
            label: 'Customers',
            value: counts.customers,
            icon: <PersonIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            gradient: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
            onClick: null,
        },
        {
            label: 'Restaurants',
            value: counts.restaurants,
            icon: <RestaurantIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
            gradient: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
            onClick: () => navigate('/admin/restaurants'), // ✅ Navigate to restaurant list
        },
        {
            label: 'Drivers',
            value: counts.drivers,
            icon: <DeliveryDiningIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
            gradient: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
            onClick: null,
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            {errorCounts && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    Failed to fetch user counts. Please try again later.
                </Alert>
            )}

            <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            onClick={stat.onClick}
                            sx={{
                                p: 2,
                                height: '100%',
                                textAlign: 'center',
                                background: stat.gradient,
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: 6,
                                    cursor: stat.onClick ? 'pointer' : 'default',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <CardContent>
                                <Box sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.2)' } }}>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h6" sx={{ mt: 1 }}>{stat.label}</Typography>
                                <Typography variant="h5" fontWeight="bold">
                                    <CountUp end={stat.value} duration={1.5} />
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mb: 4, backgroundColor: '#ffe5e5' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Inactive Users</Typography>
                    <CSVLink
                        data={inactiveUsers}
                        headers={csvHeaders}
                        filename="inactive_users.csv"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained" color="primary">Export CSV</Button>
                    </CSVLink>
                </Box>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Search Inactive Users"
                    value={inactiveSearch}
                    onChange={(e) => setInactiveSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <DataGrid
                    autoHeight
                    rows={inactiveUsers}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    sx={{ border: '1px solid #ddd', borderRadius: 2 }}
                />
            </Paper>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Active Users</Typography>
                    <CSVLink
                        data={activeUsers}
                        headers={csvHeaders}
                        filename="active_users.csv"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained" color="primary">Export CSV</Button>
                    </CSVLink>
                </Box>
                <TextField
                    variant="outlined"
                    size="small"
                    label="Search Active Users"
                    value={activeSearch}
                    onChange={(e) => setActiveSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <DataGrid
                    autoHeight
                    rows={activeUsers}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    sx={{ border: '1px solid #ddd', borderRadius: 2 }}
                />
            </Paper>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Action</DialogTitle>
                <DialogContent>
                    Are you sure you want to {selectedEnabled ? 'deactivate' : 'activate'} this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="inherit">Cancel</Button>
                    <Button onClick={handleActivateDeactivate} variant="contained" color={selectedEnabled ? "warning" : "success"}>
                        {selectedEnabled ? 'Deactivate' : 'Activate'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default DashboardPage;
