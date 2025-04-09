import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReceiveInvoice.css";

const ReceiveInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Use default values in destructuring in case properties are missing
  const {
    cart = [],
    totalAmount = 0,
    taxAmount = 0,
    finalTotal = 0,
    deliveryAddress = "",
    pickup = false,
    userName = "Customer",
    id = "N/A"
  } = location.state || {};

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h1>R.M.S.</h1>
        <h2>Invoice</h2>

        <div className="invoice-details">
          <p>
            <strong>Invoice #{id} - {new Date().toDateString()}</strong>
          </p>
          <p>Customer: {userName}</p>
          <p>Email: Not Provided</p>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.name} - $
                {(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        <div className="payment-summary">
          <h3>Payment Summary</h3>
          <p>Subtotal: ${totalAmount.toFixed(2)}</p>
          <p>Taxes & Fees (13%): ${taxAmount.toFixed(2)}</p>
          <strong>Total Paid: ${finalTotal.toFixed(2)}</strong>
        </div>

        <div className="invoice-address">
          <h3>Addresses</h3>
          <p>
            <strong>Billing Address:</strong> 123 Main, City
          </p>
          <p>
            <strong>Delivery Address:</strong>{" "}
            {pickup ? "Pickup (123 Main St)" : deliveryAddress}
          </p>
        </div>

        <div className="payment-method">
          <p>
            <strong>Payment Method:</strong> Not Provided
          </p>
          <p>
            <strong>Transaction ID:</strong> N/A
          </p>
        </div>

        <div className="invoice-actions">
          <button onClick={() => navigate("/")}>Back to Home</button>
          <button onClick={() => alert("Downloading PDF...")}>Download PDF</button>
          <button onClick={() => window.print()}>Print Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvoice;
