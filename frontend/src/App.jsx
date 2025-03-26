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
import Navbar from './Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Manager/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/" element={<Home />} />   
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/make-payment" element={<MakePayment />} />
        <Route path="/receive-invoice" element={<ReceiveInvoice />} />
      </Routes>
    </Router>
  );
};

export default App;
