import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ReceiveInvoice.css";

const ReceiveInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount, taxAmount, finalTotal, deliveryAddress, pickup } =
    location.state || {
      cart: [],
      totalAmount: 0,
      taxAmount: 0,
      finalTotal: 0,
      deliveryAddress: "",
      pickup: false,
    };

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <h1>R.M.S.</h1>
        <h2>Receive Invoice</h2>

        <div className="invoice-details">
          <p>
            <strong>Invoice #5678 - {new Date().toDateString()}</strong>
          </p>
          <p>Customer: John Doe</p>
          <p>Email: johndoe@email.com</p>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.quantity} x {item.name} - ${item.price * item.quantity}
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
          <h3>Invoice</h3>
          <p>
            <strong>Billing Address:</strong> 123 Main, City
          </p>
          <p>
            <strong>Delivery Address:</strong>{" "}
            {pickup ? "Pickup Location: 123 Main St" : deliveryAddress}
          </p>
        </div>

        <div className="payment-method">
          <p>
            <strong>Payment Method:</strong> Visa(**** 1234)
          </p>
          <p>Transaction ID: 9914577139</p>
        </div>

        <div className="invoice-actions">
          <button onClick={() => navigate("/")}>Back to Home</button>
          <button onClick={() => alert("Downloading PDF...")}>
            Download PDF
          </button>
          <button onClick={() => window.print()}>Print Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiveInvoice;
