import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Restuarent-Dashboard/Dashboard';
import AddMenuItem from './pages/Restuarent-Dashboard/AddMenuItem';
import ManageMenuItems from './pages/Restuarent-Dashboard/ManageMenuItems';
import Orders from './pages/Restuarent-Dashboard/Orders';
import HotelProfile from './pages/Restuarent-Dashboard/HotelProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/add" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add" element={<AddMenuItem />} />
          <Route path="manage" element={<ManageMenuItems />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="HotelProfile" element={<HotelProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
