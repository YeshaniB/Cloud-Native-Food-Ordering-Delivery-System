import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// PrimeReact theme
import 'primereact/resources/themes/lara-light-blue/theme.css';  // you can choose other themes too

// Core PrimeReact CSS
import 'primereact/resources/primereact.min.css';

// PrimeIcons (for icons used in components)
import 'primeicons/primeicons.css';

import DriverDashboard from "./pages/DriverDashboard";
import AddDriverForm from "./pages/AddDriverForm";
import AdminDeliveryDashboard from "./pages/AdminDeliveryDashboard";
import UserDeliveryTracker  from "./pages/UserDeliveryTracker";
import CustomerTrackingPage from "./pages/CustomerTrackingPage";
import AdminTrackingPage  from "./pages/AdminTrackingPage";
import Dashboard from "./pages/DashboardPage";
import DriverUserDashboard  from "./pages/DriverUserDashboard";
import Home from './pages/Home';
//import DriverDashNew from "./pages/DriverDashNew";

function App() {
  return (
      <BrowserRouter>
      <Routes>
              <Route path="/drivers" element={<DriverDashboard />} />
              <Route path="/add-driver" element={<AddDriverForm />} />
              <Route path="*" element={<Navigate to="/drivers" />} />
              <Route path="/admin-delivery-dashboard" element={<AdminDeliveryDashboard />} />

                <Route path="/customer-tracking" element={<CustomerTrackingPage />} />
              <Route path="/user-delivery-tracker" element={<UserDeliveryTracker />} />
               <Route path="/admin-tracking" element={<AdminTrackingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/driver-user-dashboard" element={<DriverUserDashboard />} />
          <Route  path="/Home" element={<Home />} />
          {/*<Route path="/driverDashNew" element={<DriverDashNew />} />*/}
      </Routes>
      </BrowserRouter>
  );
}

export default App;
