import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import AdminLayout from '../../components/AdminLayout';

const AdminSalesReports = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState({ totalPrice: 0, orderCount: 0, decreasedTotal: 0 });

  useEffect(() => {
    axios.get('http://localhost:8082/getTotalPrice')
      .then(response => {
        setReportData(response.data);
      })
      .catch(error => {
        console.error('Error fetching report data:', error);
      });
  }, []);

  const totalIncome = reportData.totalPrice - reportData.decreasedTotal;
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue Rs.',
        data: [4500, 7000, 6400, 8200, 9200, 11000],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
        tension: 0.4
      }
    ]
  };

  const options = {
    plugins: {
      legend: { display: true, position: 'top', labels: { color: '#334155' } },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#f1f5f9'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#64748b' },
        grid: { color: '#e2e8f0' }
      },
      x: {
        ticks: { color: '#64748b' },
        grid: { color: '#f1f5f9' }
      }
    }
  };

  const insights = [
    { 
      label: 'Orders Count', 
      value: reportData.orderCount,
      labelColor: '#0F172A',  // Label color
      valueColor: '#FF5733'   // Value color
    },
    { 
      label: 'Total Income', 
      value: `Rs. ${reportData.totalPrice.toLocaleString()}`,
      labelColor: '#0F172A',  // Label color
      valueColor: '#2196F3'   // Value color
    },
    { 
      label: 'Restaurant Income', 
      value: `Rs. ${reportData.decreasedTotal.toLocaleString()}`, 
      labelColor: '#0F172A',  // Label color
      valueColor: '#FF9800'   // Value color
    },
    { 
      label: 'Total Income', 
      value: `Rs. ${totalIncome.toLocaleString()}`, 
      labelColor: '#0F172A',  // Label color
      valueColor: '#4CAF50',
      backColor: ''   // Value color
    }
  ];

  return (
    <div style={{ maxWidth: '1248px', width: '100%',marginLeft:'250px', marginTop: '-650px' }}>
      <AdminLayout />
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>📊 Sales Reports</h2>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <InputText placeholder="Search Reports..." style={{ minWidth: '180px', height: '40px' }} />
          <Dropdown options={[{ label: 'Last 7 Days' }, { label: 'Last 30 Days' }, { label: 'Last 6 Months' }]} placeholder="Time Range" style={{ minWidth: '180px' }} />
          <Button label="Download Report" icon="pi pi-file-excel" className="p-button-success p-button-outlined" />
          <Button label="⬅ Back to Orders" icon="pi pi-arrow-left" className="p-button-secondary p-button-outlined" onClick={() => navigate('/orderAdmin')} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
    {insights.map((item, i) => (
      <div key={i} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', textAlign: 'center' }}>
        <p style={{ color: item.labelColor || '#64748b', fontSize: '19px', fontWeight: 'bold' }}>{item.label}</p>
        <p style={{ color: item.valueColor || '#0f172a', fontSize: '22px', fontWeight: 'bold' }}>{item.value}</p>
      </div>
    ))}
  </div>

      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)' }}>
        <h3 style={{ color: '#1e293b', marginBottom: '20px' }}>📈 Monthly Revenue Overview</h3>
        <Chart type="line" data={salesData} options={options} />
      </div>
    </div>
    </div>
  );
};

export default AdminSalesReports;
