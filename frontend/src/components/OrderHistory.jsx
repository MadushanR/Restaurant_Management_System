import React, { useEffect, useState } from "react";
import "./OrderHistory.css"; 

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    if (userName) {
      fetch(`http://localhost:8080/api/orders/${userName}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.error("Error loading orders:", err));
    }
  }, [userName]);

  return (
    <div className="history-container">
      <h1>Order History for {userName}</h1>
      {orders.length === 0 ? (
        <p>No past orders found.</p>
      ) : (
        <table className="order-history-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Items</th>
              <th>Total</th>
              <th>Delivery Address</th>
              <th>Pickup</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id || idx}>
                <td>{idx + 1}</td>
                <td>{order.items.join(", ")}</td>
                <td>${order.finalTotal.toFixed(2)}</td>
                <td>{order.pickup ? "N/A" : order.deliveryAddress}</td>
                <td>{order.pickup ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
