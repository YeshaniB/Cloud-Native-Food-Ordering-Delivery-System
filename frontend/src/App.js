
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import OrderManagement from './pages/Order-Management/OrderDetails';
import OrderFood from './pages/Order-Management/OrderFood';
import RestaurantList from './pages/Order-Management/OrderRestaurant';
import OrderAdminDashboard from './pages/Order-Management/AdminOrderDashboard';
import AdminSalesReports from './pages/Order-Management/AdminOrderSales';

const libraries = ['places'];

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/orderRestaurant" element={<RestaurantList />} />
          <Route path="/orderDetails" element={<OrderManagement />} />
          <Route path="/foodDetails/:restaurantId" element={<OrderFood />} />
          <Route path="/orderAdmin" element={<OrderAdminDashboard />} />
          <Route path="/adminOrderSales" element={<AdminSalesReports />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
