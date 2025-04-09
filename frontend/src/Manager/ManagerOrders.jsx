import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ManagerOrders.css";

const ManagerOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  return (
    <div>
      <h1>Restaurant Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Delivery Address</th>
            <th>Final Total</th>
            <th>Pickup</th>
            <th>Tax Amount</th>
            <th>Total Amount</th>
            <th>User Name</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.finalTotal}</td>
              <td>{order.pickup ? "Yes" : "No"}</td>
              <td>{order.taxAmount}</td>
              <td>{order.totalAmount}</td>
              <td>{order.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerOrders;
