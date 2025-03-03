import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      Logo
    </a>
  </div>
  <div className="navbar-center">
    <ul className="nav-links">
        <li>
            <Link to="/Manager/managerdashboard">Manager</Link>
        </li>
        <li>
            <Link to="/EmployeeDashboard">Employee</Link>
        </li>
        <li>
            <Link to="/CustomerDashboard">Customer</Link>
        </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;