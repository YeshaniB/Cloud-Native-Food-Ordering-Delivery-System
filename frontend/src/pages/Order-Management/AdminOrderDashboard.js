// AdminDashboard.jsx
import React from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const OrderAdminDashboard = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const orderData = {
    labels: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Orders',
        data: [20, 15, 40, 5],
        backgroundColor: [
          'rgba(250, 204, 21, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(250, 204, 21, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2,
        hoverBorderColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        barThickness: 40
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1e293b',
          font: {
            size: 14,
            family: 'Segoe UI, sans-serif'
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#e2e8f0',
        borderWidth: 1,
        borderColor: '#cbd5e1'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#475569',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#e2e8f0'
        }
      },
      x: {
        ticks: {
          color: '#475569',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#f1f5f9'
        }
      }
    }
  };

  const summaryCards = [
    { color: '#fff9db', title: 'Pending Orders', value: '20' },
    { color: '#dbeafe', title: 'Processing', value: '15' },
    { color: '#dcfce7', title: 'Delivered', value: '40' },
    { color: '#fee2e2', title: 'Cancelled', value: '5' },
    { color: '#e0f2fe', title: 'Total Orders', value: '80' },
    { color: '#fce7f3', title: 'Total Revenue', value: '$12,000' },
    // { color: '#ede9fe', title: 'Most Ordered Product', value: 'Chocolate Cake' }
  ];

  // Function to navigate to Sales Reports page
  const navigateToSalesReports = () => {
    navigate('/adminSalesReports');  // Update with the correct route
  };

  return (
<div style={{ padding: '30px', backgroundColor: '#f4f6f8' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ margin: 0, color: '#1e293b' }}>📊 Admin Order Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <InputText placeholder="Search Orders..." style={{ minWidth: '180px', height: '40px', padding: '10px' }} />
          <Dropdown options={[{ label: 'Today' }, { label: 'This Week' }, { label: 'This Month' }]} placeholder="Filter by Time" style={{ minWidth: '180px' }} />
          <Button 
            label="Sales Details" 
            icon="pi pi-chart-line" 
            className="p-button-outlined p-button-warning" 
            style={{ height: '40px' }} 
            onClick={() => navigate('/adminOrderSales')} 
          />
          <Button label="Export Report" icon="pi pi-download" className="p-button-outlined p-button-success" style={{ height: '40px' }} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {summaryCards.map((card, index) => (
          <div key={index} style={{
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            textAlign: 'center',
            backgroundColor: card.color,
            transition: 'transform 0.3s ease'
          }}>
            <p style={{ fontSize: '16px', fontWeight: '500', color: '#475569', marginBottom: '10px' }}>{card.title}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b' }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{
        background: '#ffffff',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.08)'
      }}>
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#334155', marginBottom: '15px' }}>📈 Order Summary Chart</p>
        <Chart type="bar" data={orderData} options={options} style={{width: '50%', marginLeft: '300px'}} />
      </div>

      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 3px 12px rgba(0, 0, 0, 0.07)'
      }}>
        <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#1e293b' }}>🧾 Recent Orders</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Order ID</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Customer</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Status</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Total</th>
              <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600', color: '#475569' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: '#1001', customer: 'Jane Doe', status: 'Pending', date: '2025-04-22', total: '$120.00', color: '#fef3c7', textColor: '#92400e' },
              { id: '#1002', customer: 'John Smith', status: 'Delivered', date: '2025-04-21', total: '$300.00', color: '#d1fae5', textColor: '#065f46' }
            ].map((order, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px' }}>{order.id}</td>
                <td style={{ padding: '12px' }}>{order.customer}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    backgroundColor: order.color,
                    color: order.textColor
                  }}>{order.status}</span>
                </td>
                <td style={{ padding: '12px' }}>{order.date}</td>
                <td style={{ padding: '12px' }}>{order.total}</td>
                <td style={{ padding: '12px' }}><Button label="View" className="p-button-sm p-button-info p-button-outlined" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Details Button */}
      <Button label="Sales Details" icon="pi pi-chart-line" className="p-button-lg p-button-info" onClick={navigateToSalesReports} />
    </div>
  );
};

export default OrderAdminDashboard;
