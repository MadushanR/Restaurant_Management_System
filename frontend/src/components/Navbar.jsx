import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.brand}>Restaurant Management</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#333",
    color: "#fff",
  },
  brand: {
    marginLeft: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  },
};

export default Navbar;
