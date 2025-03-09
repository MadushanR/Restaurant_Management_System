import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home"; 
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword"; 
import PlaceOrder from "./components/PlaceOrder";
import ManagerDashboard from './Manager/ManagerDashboard';
import AddItem from "./Manager/AddItem";
import Navbar from './Navbar';
//const Home = () => <h1>Welcome to Restaurant Management System</h1>; // Temporary Home Page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Manager/ManagerDashboard" element={<ManagerDashboard />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="/" element={<Home />} />   {/* ✅ Add this route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/place-order" element={<PlaceOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
