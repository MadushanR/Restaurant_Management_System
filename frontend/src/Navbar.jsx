import React from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo'; // A separate component displaying your logo

const Navbar = () => {
  const navigate = useNavigate();
  // Retrieve role from localStorage; it should be set during login.
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <Logo />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          {role === "manager" ? (
            <>
              <button onClick={() => navigate("/manager-dashboard")}><li>Home</li></button>
              <button onClick={() => navigate("/manager-orders")}><li>Orders</li></button>
              <button onClick={() => navigate("/manager-menu")}><li>Menu</li></button>
              <button onClick={() => navigate("/manager-schedule")}><li>Schedule</li></button>
              <button onClick={() => navigate("/manager-profile")}><li>Profile</li></button>
              <button onClick={handleLogout}><li>Log-out</li></button>
            </>
          ) : role === "customer" ? (
            <>
              <button onClick={handleLogout}><li>Log-out</li></button>
              <button onClick={() => navigate("/place-order")}><li>Place Order</li></button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/")}><li>Home</li></button>
              <button onClick={() => navigate("/login")}><li>Login</li></button>
              <button onClick={() => navigate("/register")}><li>Register</li></button>
              <button onClick={() => navigate("/EmployeeDashboard")}><li>Employee</li></button>
              <button onClick={() => navigate("/manager-login")}><li>Manager</li></button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
