import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import PlaceOrder from "./components/PlaceOrder";
import MakePayment from "./components/MakePayment";
import ReceiveInvoice from "./components/ReceiveInvoice";
import ManagerDashboard from './Manager/ManagerDashboard';
import OrderHistory from "./components/OrderHistory";
import ManagerOrders from "./Manager/ManagerOrders"
import ManagerProfile from "./Manager/ManagerProfile";
import ManagerMenu from "./Manager/ManagerMenu";
import ManagerSchedule from "./Manager/ManagerSchedule";
import EmployeeManagement from "./Manager/EmployeeManagement";
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';
import ManagerLogin from "./Manager/Login";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/receive-invoice" element={<ReceiveInvoice />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/manager-orders" element={<ProtectedRoute><ManagerOrders /></ProtectedRoute>} />
        <Route path="/manager-menu" element={<ProtectedRoute><ManagerMenu /></ProtectedRoute>} />
        <Route path="/manager-profile" element={<ProtectedRoute><ManagerProfile /></ProtectedRoute>} />
        <Route path="/manager-schedule" element={<ProtectedRoute><ManagerSchedule /></ProtectedRoute>} />
        <Route path="/employee-management" element={<ProtectedRoute><EmployeeManagement /></ProtectedRoute>} />
        <Route path="/manager-login" element={<ProtectedRoute><ManagerLogin /></ProtectedRoute>} />
        <Route path="/manager-dashboard" element={<ProtectedRoute><ManagerDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
