
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const OrderAdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Array of orders
  const [statusCounts, setStatusCounts] = useState({}); // Object with counts for each status

  useEffect(() => {
    axios.get('http://localhost:8082/orders') // orders array endpoint
      .then(response => {
        setOrders(response.data || []);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setOrders([]);
      });

    axios.get('http://localhost:8082/status-count') // separate endpoint for counts
      .then(response => {
        setStatusCounts(response.data || {});
      })
      .catch(error => {
        console.error('Error fetching status counts:', error);
        setStatusCounts({});
      });
  }, []);

  const orderData = {
    labels: ['Order Pending', 'Preparing', 'Prepared', 'On the way', 'Delivered', 'Cancelled'],
    datasets: [{
      label: 'Orders',
      data: [
        statusCounts["Order Pending"] || 0,
        statusCounts.Preparing || 0,
        statusCounts.Prepared || 0,
        statusCounts["On the way"] || 0,
        statusCounts.Delivered || 0,
        statusCounts.Cancelled || 0
      ],
      backgroundColor: ['#facc15cc', '#3b82f6cc', '#38bdf8cc', '#f97316cc', '#22c55ecc', '#ef4444cc'],
      borderColor: ['#facc15', '#3b82f6', '#38bdf8', '#f97316', '#22c55e', '#ef4444'],
      borderWidth: 2,
      hoverBorderColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 8,
      barThickness: 40
    }]
  };

  const summaryCards = [
    { color: '#fff9db', title: 'Order Pending', value: statusCounts["Order Pending"] || 0 },
    { color: '#dbeafe', title: 'Preparing', value: statusCounts.Preparing || 0 },
    { color: '#fee2e2', title: 'Prepared', value: statusCounts.Prepared || 0 },
    { color: '#fef9c3', title: 'On the Way', value: statusCounts["On the way"] || 0 },
    { color: '#dcfce7', title: 'Delivered', value: statusCounts.Delivered || 0 },
  ];


  const totalCards = [
    { color: '#F1EFEC', title: 'Total Orders', value: (
        (statusCounts["Order Pending"] || 0) +
        (statusCounts.Preparing || 0) +
        (statusCounts.Prepared || 0) +
        (statusCounts["On the way"] || 0) +
        (statusCounts.Delivered || 0) +
        (statusCounts.Cancelled || 0)
      ) },
  ];


  const statusColors = {
    "Order Pending": { background: '#fef3c7', color: '#92400e' },
    Preparing: { background: '#dbeafe', color: '#1e40af' },
    Prepared: { background: '#e0f2fe', color: '#0369a1' },
    "On the way": { background: '#fcd34d', color: '#78350f' },
    Delivered: { background: '#d1fae5', color: '#065f46' },
    Cancelled: { background: '#fee2e2', color: '#991b1b' }
  };

  const navigateToSalesReports = () => navigate('/adminSalesReports');

  return (

    <div style={{ maxWidth: '1248px', width: '100%',marginLeft:'250px', marginTop: '-650px' }}>
      <AdminLayout />
    <div style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e293b' }}>📊 Admin Order Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <InputText placeholder="Search Orders..." />
          <Dropdown options={[{ label: 'Today' }, { label: 'This Week' }, { label: 'This Month' }]} placeholder="Filter by Time" />
          <Button label="Sales Details" icon="pi pi-chart-line" className="p-button-warning" onClick={() => navigate('/adminOrderSales')} />
          <Button label="Export Report" icon="pi pi-download" className="p-button-success" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {totalCards.map((card, i) => (
          <div key={i} style={{
            padding: '0px',
            width: '50%',
            marginLeft:' 300px',
            fontSize: '40px',
            color: '#000000',
            fontWeight: 'bold',
            borderRadius: '12px',
            backgroundColor: card.color,
            textAlign: 'center',
            boxShadow: '0 4px 8px rgb(106, 47, 38)'
          }}>
            <div style={{}}>
            <p style={{ fontWeight: '600', color: '#475569' }}>{card.title} : 
            <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#1e293b',}}>{card.value}</p></p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {summaryCards.map((card, i) => (
          <div key={i} style={{
            padding: '20px',
            borderRadius: '12px',
            backgroundColor: card.color,
            textAlign: 'center',
            boxShadow: '0 4px 12px rgb(146, 121, 121)'
          }}>
            <p style={{ fontWeight: '500', color: '#475569' }}>{card.title}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', marginBottom: '30px' }}>
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '15px' }}>📈 Order Summary Chart</p>
        <Chart type="bar" data={orderData} style={{ width: '50%', marginLeft: '300px' }} />
      </div>

      {/* <div style={{ background: '#fff', padding: '30px', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>🧾 Recent Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Total</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              const style = statusColors[order.status] || {};
              return (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '12px' }}>{order.id}</td>
                  <td style={{ padding: '12px' }}>{order.customer}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600,
                      backgroundColor: style.background,
                      color: style.color
                    }}>{order.status}</span>
                  </td>
                  <td style={{ padding: '12px' }}>{order.date}</td>
                  <td style={{ padding: '12px' }}>{order.total}</td>
                  <td style={{ padding: '12px' }}>
                    <Button label="View" className="p-button-sm p-button-info p-button-outlined" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}

      {/* <Button label="Sales Details" icon="pi pi-chart-line" className="p-button-lg p-button-info" onClick={navigateToSalesReports} style={{ marginTop: '20px' }} /> */}
    </div>
    </div>
  );
};

export default OrderAdminDashboard;


