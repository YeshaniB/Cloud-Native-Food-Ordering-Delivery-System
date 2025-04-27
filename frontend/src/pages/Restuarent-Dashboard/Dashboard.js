import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';


import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Add Menu Item',
      icon: 'pi pi-plus',
      command: () => navigate('/dashboard/add'),
    },
    {
      label: 'Manage Menu Items',
      icon: 'pi pi-list',
      command: () => navigate('/dashboard/manage'),
    },
    {
      label: 'Orders',
      icon: 'pi pi-file-edit',
      command: () => navigate('/dashboard/Orders'),
    },
    {
      label: 'Hotel Profile',
      icon: 'pi pi-warehouse',
      command: () => navigate('/dashboard/HotelProfile'),
    },
  ];

  const start = <h2 style={{ marginLeft: '1rem', marginRight: '3rem' }}>Hotel Owner Dashboard</h2>;
  const end = null; 

  return (
    <div>
      <Menubar model={items} start={start} end={end} style={{ gap: '2rem' }} />
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
