import React from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css"; 

const ForgotPassword = () => {
  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h1>R.M.S.</h1>
        <h2>Recover Your Password</h2>
        <form>
          <input type="email" placeholder="Enter your E-mail" required />
          <p>A message will be sent to your E-mail address with further instructions</p>
          <button type="submit">Recover Password</button>
        </form>
        <p>
          <Link to="/login" className="back-link">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
