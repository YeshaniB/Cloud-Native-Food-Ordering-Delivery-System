import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Steps } from 'primereact/steps';
import { Panel } from 'primereact/panel';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import Burger from './Images/Burger.jpg';
import Pizza from './Images/Pizza.jpg';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

const getStatusIndex = (status) => {
  const stages = ['Order Pending', 'Preparing', 'prepared', 'On the way', 'Delivered'];
  return stages.findIndex(s => s.toLowerCase() === status.toLowerCase());
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false); // View Details Dialog
  const [showEditDialog, setShowEditDialog] = useState(false); // Edit Details Dialog
  const [statusFilter, setStatusFilter] = useState('Order Pending');
  const [updatedCustomerName, setUpdatedCustomerName] = useState(''); // State for the updated customer name

  const orderStages = [
    { label: 'Pending' },
    { label: 'Preparing' },
    { label: 'prepared' },
    { label: 'On the way' },
    { label: 'Delivered' },
  ];

  useEffect(() => {
    axios.get('http://localhost:8082/getOrderDetails')
      .then((response) => {
        const data = Array.isArray(response.data) ? response.data : [];
  
        const processedOrders = data.map((order) => ({
          id: order.orderId,
          date: order.orderDate,
          items: order.orderName,
          quantities: Array.isArray(order.orderQuantity) ? order.orderQuantity : [],
          total: parseFloat(order.totalPrice || 0), // prevent NaN
          status: order.status,
          customerName: order.customerName,
          contactNo: order.contactNo,
          address: order.customerAddress,
          image: order.orderName?.includes("Pizza") ? Pizza : Burger,
        }));
  
        setOrders(processedOrders);
      })
      .catch((error) => {
        console.error("Failed to fetch orders", error);
        setOrders([]); // fallback to empty array on error
      });
  }, []);
  

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8082/orderDelete/${orderId}`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete the order. Please try again.");
    }
  };

  const BodyCell = ({ value }) => (
    <td>{value ? Number(value).toFixed(2) : '0.00'}</td>
  );

  const handleUpdateCustomerName = async () => {
    try {
      const updatedOrder = {
        customerName: updatedCustomerName,
        // customerAddress: updatedCustomerAddress, // Add any other fields you need to update
      };
  
      // Send the updated order details as a JSON body
      const response = await axios.patch(
        `http://localhost:8082/updateDetails/${selectedOrder.id}`,
        updatedOrder
      );
      
  
      // Update the frontend state with the updated order data
      setOrders(prev => prev.map(order => order.id === selectedOrder.id ? response.data : order));
      setShowEditDialog(false); // Close the edit dialog after the update
      alert("Customer name updated successfully!");

      window.location.reload();
  
    } catch (error) {
      console.error("Failed to update customer name:", error);
      alert("Failed to update customer name. Please try again.");
    }
  };
  

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowViewDialog(true); // Show View Details Dialog
  };

  const showEditOrderDetails = (order) => {
    setSelectedOrder(order);
    setUpdatedCustomerName(order.customerName); // Set customer name for editing
    setShowEditDialog(true); // Show Edit Details Dialog
  };

  const cancelOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
  };

  const statusBody = (rowData) => (
    <Tag severity={getStatusSeverity(rowData.status)} value={rowData.status} />
  );

  const actionBody = (rowData) => (
    <div className="flex gap-2">
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-outlined p-button-info"
        style={{ borderWidth: '2px' }}
        onClick={() => showOrderDetails(rowData)} // View details
        tooltip="View Details"                                                                             
      />
      {rowData.status === 'Pending' && (
        
        <Button
          icon="pi pi-times"
          className="p-button-rounded p-button-danger"
          onClick={() => cancelOrder(rowData.id)}
          tooltip="Cancel Order"
        /> 
      )}
      {rowData.status.toLowerCase() === 'order pending' && (
        <>
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-outlined p-button-danger"
          style={{ borderWidth: '2px' }}
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Order"
        />
        <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-outlined p-button-warning"
        style={{ borderWidth: '2px' }}
        onClick={() => showEditOrderDetails(rowData)} // Edit details
        tooltip="Edit Details"
      />

      </>
      )}
    </div>
  );

  const getStatusSeverity = (status) => {
    switch (status.toLowerCase()) {
      case 'order pending': return 'warning';
      case 'preparing': return 'info';
      case 'prepared': return 'secondary';
      case 'on the way': return 'secondary';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return null;
    }
  };

  const dialogFooter = (
    <Button label="Close" icon="pi pi-times" onClick={() => setShowViewDialog(false)} className="p-button-text" />
  );

  const editDialogFooter = (
    <Button label="Close" icon="pi pi-times" onClick={() => setShowEditDialog(false)} className="p-button-text" />
  );

  return (
    <div className="">
      <Header /><br/><br/><br/><br/><br/>
      {/* Status Filter Navbar */}
      <div className="flex gap-2 mb-4">
        {["Order Pending", "Preparing", "prepared", "On the way", "Delivered", "All"].map((status) => (
          <Button
            key={status}
            label={status}
            className={statusFilter === status ? 'p-button-outlined p-button-info' : 'p-button-text'}
            onClick={() => setStatusFilter(status)}
          />
        ))}
      </div>

      <Card title="My Orders" className="shadow-4">
        <DataTable value={filteredOrders} responsiveLayout="scroll"  className="p-datatable-striped" style={{ width: '100%' }}>
          <Column header="Image" body={(rowData) => (
            <Image src={rowData.image} alt="food" width="60" preview />
          )} />
          <Column field="id" header="Order ID" />
          <Column field="date" header="Date" />
          <Column
      field="total"
      header="Total (Rs.)"
      body={(rowData) =>
        typeof rowData.total === 'number'
          ? rowData.total.toFixed(2)
          : 'N/A'
      }
    />
          <Column header="Status" body={statusBody} />
          <Column header="Actions" body={actionBody} style={{ textAlign: 'center', width: '150px' }} />
        </DataTable>
      </Card>

      {/* View Details Dialog */}
      <Dialog
        header="Order Details"
        visible={showViewDialog}
        style={{ width: '50vw' }}
        modal
        footer={dialogFooter}
        onHide={() => setShowViewDialog(false)}
      >
        {selectedOrder && (
          <>
            <div className="mb-2">
              <Steps model={orderStages} activeIndex={getStatusIndex(selectedOrder.status)} readOnly />
            </div>

            <div className="mb-4">
              <Panel header="Your Details" style={{ marginBottom: '1rem', paddingBottom: "5px" }}>
                <strong>Customer:</strong> {selectedOrder.customerName}<br />
                <strong>Address:</strong> {selectedOrder.address}<br />
                <strong>Contact Number:</strong> {selectedOrder.contactNo}<br />
                <strong>Date:</strong> {selectedOrder.date}<br />
                <strong>Total:</strong> Rs. {typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : 'N/A'}
              </Panel>
            </div>

            <Panel header="Ordered Items" style={{ marginBottom: '1rem' }}>
              <ul>
                {selectedOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item} - Rs. {((selectedOrder.total / selectedOrder.items.length).toFixed(2))}
                  </li>
                ))}
              </ul>
            </Panel>
          </>
        )}
      </Dialog>

      {/* Edit Details Dialog */}
      <Dialog
        header="Edit Customer Name"
        visible={showEditDialog}
        style={{ width: '50vw' }}
        modal
        footer={editDialogFooter}
        onHide={() => setShowEditDialog(false)}
      >
        {selectedOrder && (
          <>
            <div className="mb-2">
              <strong>Customer:</strong>
              <InputText
                value={updatedCustomerName}
                onChange={(e) => setUpdatedCustomerName(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            <Button
              label="Update Customer Name"
              icon="pi pi-check"
              className="p-button-success"
              onClick={handleUpdateCustomerName}
            />
          </>
        )}
      </Dialog><br/><br/><br/><br/>
      <Footer />
    </div>
  );
};

export default OrderManagement;




