import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddItem.css";

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    buyPrice: "",
    sellPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Item added successfully!");
    navigate("/Manager/ManagerDashboard");
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Item Name" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="number" name="buyPrice" placeholder="Buying Price" onChange={handleChange} required />
        <input type="number" name="sellPrice" placeholder="Selling Price" onChange={handleChange} required />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => navigate("/Manager/ManagerDashboard")}>Cancel</button>
      </form>
    </div>
  );
};

export default AddItem;
