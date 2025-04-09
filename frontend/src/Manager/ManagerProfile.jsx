import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManagerProfile.css";

const ManagerProfile = () => {
  const navigate = useNavigate();
  
 
  const managerId = localStorage.getItem("userId");
  const currentUserName = localStorage.getItem("userName");
  
  const [form, setForm] = useState({ userName: currentUserName || "", password: "" });
  const [message, setMessage] = useState("");
  
 
  
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.put(`http://localhost:8080/api/manager/profile/${managerId}`, form);
      setMessage("Profile updated successfully!");
  
      localStorage.setItem("userName", response.data.userName);
    } catch (error) {
      console.error("Error updating profile", error);
      setMessage("Error updating profile. Please try again.");
    }
  };

  return (
    
    <div className="manager-profile-container">
      <h1>Manager Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Username:</label>
          <input
            type="text"
            name="userName"
            placeholder="Enter new username"
            value={form.userName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={form.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p className="profile-message">{message}</p>}
    </div>
  );
};

export default ManagerProfile;
