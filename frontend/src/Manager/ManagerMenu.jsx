import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";
import axios from "axios";

const ManagerMenu = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  
  // Updated form state to include category
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    category: ""
  });
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menu");
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
        const response = await axios.post("http://localhost:8080/api/menu", form);
        setItems([...items, response.data]);
        setForm({ name: "", price: 0, description: "", category: "" });
      } catch (error) {
        console.error("Error adding item", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menu/${id}`);
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const handleChange = async (e, id) => {
    e.preventDefault();
    try {
      const updatedItem = { ...form };
      const response = await axios.put(`http://localhost:8080/api/menu/${id}`, updatedItem);
      setItems(items.map(item => item.id === id ? response.data : item));
      setForm({ name: "", price: 0, description: "", category: "" });
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setForm({
      name: item.name,
      price: item.price,
      description: item.description,
      category: item.category
    });
  };

  return (
    <div>
      <h1>Restaurant Menu</h1>

      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
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
                <select
                  name="category"
                  value={form.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Appetizers">Appetizers</option>
                  <option value="Mains">Mains</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Others">Others</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={form.price}
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
                <button type="submit">{editingItemId ? "Update" : "Add"}</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <h2>Menu List</h2>
      <table>
        <thead>
          <tr>
            <th>Item No</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.description}</td>
              <td>${item.price}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
              <td><button onClick={() => handleEditClick(item)}>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerMenu;
