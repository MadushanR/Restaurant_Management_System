import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          userName: formData.userName,
          password: formData.password,
        }),
      });

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/login");
      } else if (response.status === 409) {
        alert("Username already exists.");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>R.M.S.</h1>
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className="conditions">
            <input type="checkbox" id="conditions" required />
            <label htmlFor="conditions"> I agree with terms & conditions</label>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
