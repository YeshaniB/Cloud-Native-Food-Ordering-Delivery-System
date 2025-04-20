
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OrderManagement from './pages/Order-Management/OrderDetails';
import OrderPlacingForm from './pages/Order-Management/OrderFood';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OrderManagement />} />
        <Route path="/orderDetails" element={<OrderPlacingForm />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
