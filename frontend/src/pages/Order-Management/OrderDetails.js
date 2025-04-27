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
import axios from 'axios';
import Burger from './Images/Burger.jpg';
import Pizza from './Images/Pizza.jpg';

const getStatusIndex = (status) => {
  const stages = ['Pending', 'Preparing', 'On the way', 'Delivered', 'Cancelled'];
  return stages.findIndex(s => s.toLowerCase() === status.toLowerCase());
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('Order Pending');

  const orderStages = [
    { label: 'Pending' },
    { label: 'Preparing' },
    { label: 'Prepared'},
    { label: 'On the way' },
    { label: 'Delivered' },
    { label: 'Cancelled' }
  ];

  useEffect(() => {
    axios.get('http://localhost:8081/getOrderDetails')
      .then((response) => {
        const processedOrders = response.data.map((order) => ({
          id: order.orderId,
          date: order.orderDate,
          items: order.orderName,
          quantities: Array.isArray(order.orderQuantity) ? order.orderQuantity : [],
          total: parseFloat(order.totalPrice),
          status:order.status,
          customerName: order.customerName,
          address: order.customerAddress,
          image: order.orderName.includes("Pizza") ? Pizza : Burger,
        }));
        setOrders(processedOrders);
      })
      .catch((error) => console.error("Failed to fetch orders", error));
  }, []);


  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/orderDelete/${orderId}`);
      setOrders(prev => prev.filter(order => order.id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Failed to delete order:", error);
      alert("Failed to delete the order. Please try again.");
    }
  };
  

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === statusFilter.toLowerCase());

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowDialog(true);
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
      onClick={() => showOrderDetails(rowData)}
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
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-outlined p-button-danger"
          style={{ borderWidth: '2px' }}
          onClick={() => handleDelete(rowData.id)}
          tooltip="Delete Order"
        />
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
    <Button label="Close" icon="pi pi-times" onClick={() => setShowDialog(false)} className="p-button-text" />
  );

  return (
    <div className="p-5">
      {/* Status Filter Navbar */}
      <div className="flex gap-2 mb-4">
        {[ "Order Pending", "Preparing","Prepared", "On the way", "Delivered", "Cancelled", "All"].map((status) => (
          <Button
            key={status}
            label={status}
            className={statusFilter === status ? 'p-button-outlined p-button-info' : 'p-button-text'}
            onClick={() => setStatusFilter(status)}
          />
        ))}
      </div>

      <Card title="My Orders" className="shadow-4">
        <DataTable value={filteredOrders} responsiveLayout="scroll">
          <Column header="Image" body={(rowData) => (
            <Image src={rowData.image} alt="food" width="60" preview />
          )} />
          <Column field="id" header="Order ID" />
          <Column field="date" header="Date" />
          <Column field="total" header="Total (Rs.)" body={(rowData) => rowData.total.toFixed(2)} />
          <Column header="Status" body={statusBody} />
          <Column header="Actions" body={actionBody} style={{ textAlign: 'center', width: '150px' }} />
        </DataTable>
      </Card>

      <Dialog
        header="Order Details"
        visible={showDialog}
        style={{ width: '50vw' }}
        modal
        footer={dialogFooter}
        onHide={() => setShowDialog(false)}
      >
        {selectedOrder && (
          <>
            <div className="mb-2">
              <Steps model={orderStages} activeIndex={getStatusIndex(selectedOrder.status)} readOnly />
            </div>
            <div className="mb-4">
              <Panel header="Your Details" style={{ marginBottom: '1rem', paddingBottom: "5px"}}>
              <strong>Customer:</strong> {selectedOrder.customerName}<br />
              <strong style={{ marginTop: "25px"}}>Address:</strong> {selectedOrder.address}<br />
              <strong>Date:</strong> {selectedOrder.date}<br />
              <strong>Total:</strong> Rs. {selectedOrder.total.toFixed(2)}
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
    </div>
  );
};

export default OrderManagement;

