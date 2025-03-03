import React from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerDashboard.css";

const ManagerDashboard = () => {
  const navigate = useNavigate();

  const items  = [
    { id: 1, name: "Burger", quantity: 50, sold: 30, buyPrice: "$2", sellPrice: "$5" },
    { id: 2, name: "Pizza", quantity: 20, sold: 15, buyPrice: "$4", sellPrice: "$8" },
    { id: 3, name: "Pasta", quantity: 35, sold: 20, buyPrice: "$3", sellPrice: "$6" },
    { id: 4, name: "Salad", quantity: 25, sold: 10, buyPrice: "$2.5", sellPrice: "$5.5" },
    { id: 5, name: "Soda", quantity: 60, sold: 40, buyPrice: "$1", sellPrice: "$2" },
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Restaurant Logo</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Orders</li>
          <li>Inventory</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
        <button onClick={() => navigate("/additem")}>Add Item</button>
      </nav>

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
