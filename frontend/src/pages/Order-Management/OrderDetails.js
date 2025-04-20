import React, { useState } from 'react';
import Burger from './Images/Burger.jpg'
import Pizza from './Images/Pizza.jpg'
import {PrimeReactProvider} from 'primereact/api';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  IconButton,
  Collapse,
  Box,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const dummyOrders = [
  {
    id: 'ORD123',
    date: '2025-04-09',
    items: ['Burger', 'Fries', 'Coke'],
    total: 12.99,
    status: 'Delivered',
    customerName: 'Pasan',
    address: '123 Main Street, City',
    image: Burger,
  },
  {
    id: 'ORD124',
    date: '2025-04-10',
    items: ['Pizza', 'Salad'],
    total: 18.75,
    status: 'Preparing',
    customerName: 'Pasan',
    address: '456 Oak Avenue, City',
    image: Pizza,
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Preparing':
      return 'warning';
    case 'Cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const OrderManagement = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [openRow, setOpenRow] = useState(null); // Track which row is open

  const handleCancel = (id) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: 'Cancelled' } : order
    );
    setOrders(updatedOrders);
  };

  const handleToggle = (id) => {
    setOpenRow((prevId) => (prevId === id ? null : id));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell></TableCell>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total ($)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <TableRow>
                  <TableCell>
                    <IconButton
                      onClick={() => handleToggle(order.id)}
                      size="small"
                    >
                      {openRow === order.id ? (
                        <KeyboardArrowUp />
                      ) : (
                        <KeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                    <TableCell>    
                        <img
                        src={order.image}
                        alt="Food"
                        style={{ width: 80, height: 60, borderRadius: 8 }}
                        />
                    </TableCell>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip label={order.status} color={getStatusColor(order.status)} />
                  </TableCell>
                  <TableCell align="center">
                    {order.status === 'Preparing' ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancel(order.id)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        N/A
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>

                {/* COLLAPSE ROW */}
                <TableRow>
                  <TableCell colSpan={6} sx={{ paddingBottom: 0, paddingTop: 0}}>
                    <Collapse in={openRow === order.id} timeout="auto" unmountOnExit>
                      <Box margin={2} sx={{ paddingBottom: 0, paddingTop: 0, marginLeft:10}} >
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                          Order Details
                        </Typography>
                        <Typography variant="body2">
                          <strong>Customer Name:</strong> {order.customerName}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Delivery Address:</strong> {order.address}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Ordered Items:</strong> {order.items.join(', ')}
                        </Typography>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderManagement;

