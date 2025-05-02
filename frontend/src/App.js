import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import OrderManagement from './pages/Order-Management/OrderDetails';
import OrderFood from './pages/Order-Management/OrderFood';
import RestaurantList from './pages/Order-Management/OrderRestaurant';
import OrderAdminDashboard from './pages/Order-Management/AdminOrderDashboard';
import AdminSalesReports from './pages/Order-Management/AdminOrderSales';

import CheckoutPage from './pages/CheckoutPage';
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/DashboardPage";
import RestaurantListPage from "./pages/RestaurantListPage";
import RestaurantProfilePage from './pages/RestaurantProfilePage';

const libraries = ['places'];

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Main Routes */}
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orderRestaurant" element={<RestaurantList />} />
                <Route path="/orderDetails" element={<OrderManagement />} />
                <Route path="/foodDetails/:restaurantId" element={<OrderFood />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="user-management" element={<DashboardPage />} />
                    <Route path="restaurants" element={<RestaurantListPage />} />
                    <Route path="restaurants/:id" element={<RestaurantProfilePage />} />
                    <Route path="orderAdmin" element={<OrderAdminDashboard />} />
                    <Route path="adminOrderSales" element={<AdminSalesReports />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
