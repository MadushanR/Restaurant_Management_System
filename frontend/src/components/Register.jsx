import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Person added successfully!");
    navigate("/Register");
  };




  return (
    <div className="login-container">
      <div className="login-box">
        <h1>R.M.S.</h1>
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName"placeholder="Full Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Phone Number (Optional)" optional />
          <input type="text" name="userName" placeholder="Username" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="password" name="confirmPassword," placeholder="Confirm Password" onChange={handleChange} required />
          <div className="conditions">
            <input type="checkbox" id="conditions" />
            <label htmlFor="conditions">&nbsp;I agree with terms & conditions</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="register-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 
