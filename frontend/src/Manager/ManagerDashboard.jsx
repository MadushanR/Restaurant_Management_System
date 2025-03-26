import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";
import axios from 'axios';

  const ManagerDashboard = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ name: '', quantity: 0, description: '' });

    useEffect(() => {
      fetchItems();
    }, []);

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/inventory');
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/api/inventory', form);
        setItems([...items, response.data]);
        setForm({ name: '', quantity: 0, description: '' });
      } catch (error) {
        console.error("Error adding item", error);
      }
    };
  return (
    <div>
      <nav className="navbar">
        <ul className="nav-links">
          <button><li>Home</li></button>
          <button><li>Orders</li></button>
          <button><li>Inventory</li></button>
          <button><li>Reports</li></button>
          <button><li>Settings</li></button>
        </ul>
      </nav>
      <h1>Restaurant Inventory</h1>

      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Quantity</th>
            <th>Item Description</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td><input type="text"name="name"placeholder="Item Name"value={form.name}onChange={handleChange}required/></td>
              <td><input type="number"name="quantity"placeholder="Quantity"value={form.quantity}onChange={handleChange}required/></td>
              <td><input type="text"name="description"placeholder="Description"value={form.description}onChange={handleChange}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit}> 
        <button type="submit">Add Item</button>
      </form>
      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Quantity Available</th>
            <th>No. of Items Sold</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.sold}</td>
              <td>${item.buyPrice}</td>
              <td>${item.sellPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManagerDashboard;