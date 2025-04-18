import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";
import axios from "axios";

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    description: "",
    buying: 0,
    selling: 0,
  });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/inventory");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingItemId !== null) {
      await handleChange(e, editingItemId);
      setEditingItemId(null);
    } else {
      try {
        const response = await axios.post("http://localhost:8080/api/inventory", form);
        setItems([...items, response.data]);
        setForm({ name: "", quantity: 0, description: "", buying: 0, selling: 0 });
      } catch (error) {
        console.error("Error adding item", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/inventory/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleChange = async (e, id) => {
    e.preventDefault();
    try {
      const updatedItem = { ...form };
      const response = await axios.put(`http://localhost:8080/api/inventory/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item));
      setForm({ name: "", quantity: 0, description: "", buying: 0, selling: 0 });
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setForm({
      name: item.name,
      quantity: item.quantity,
      description: item.description,
      buying: item.buying,
      selling: item.selling
    });
  };

  return (
    <div>
      <h1>Restaurant Inventory</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Buying Price</th>
              <th>Selling Price</th>
              <th>{editingItemId ? "Update Item" : "Add Item"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={form.quantity}
                  onChange={handleInputChange}
                  required
                />
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="buying"
                  placeholder="Buying Price"
                  value={form.buying}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="number"
                  name="selling"
                  placeholder="Selling Price"
                  value={form.selling}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <button type="submit">{editingItemId ? "Update" : "Add"}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h2>Inventory List</h2>
      <table>
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Quantity Available</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.buying}</td>
              <td>${item.selling}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleEditClick(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
