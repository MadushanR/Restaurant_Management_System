import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./MakePayment.css";

// Helper function to simulate delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const MakePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the order passed via location.state from PlaceOrder page
  const order = location.state;
  
  const saveOrder = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        throw new Error("Failed to save order");
      }
      return true;
    } catch (error) {
      console.error("Error saving order:", error);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (
      paymentMethod === "Credit/Debit Card" &&
      (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)
    ) {
      alert("Please fill in all card details");
      return;
    }
    
    setProcessing(true);
    // Simulate payment processing delay
    await sleep(2000);
    const success = Math.random() > 0.1;
    
    if (success) {
      const saved = await saveOrder();
      if (saved) {
        setProcessing(false);
        setPaymentStatus("success");
        navigate("/receive-invoice", { state: order });
      } else {
        setProcessing(false);
        setPaymentStatus("failed");
        alert("Failed to save order. Try again.");
      }
    } else {
      setProcessing(false);
      setPaymentStatus("failed");
      alert("Payment failed! Please retry or choose another payment method.");
    }
  };

  return (
    <div className="payment-container">
      <h1>R.M.S.</h1>
      <h2>Make Online Payment</h2>
      <button onClick={() => navigate("/place-order")}>Back</button>
      
      <div className="order-summary">
        <p>
          Order Total: ${order && order.finalTotal ? order.finalTotal.toFixed(2) : "0.00"}
        </p>
        <p>
          Delivery Address: {order && !order.pickup ? order.deliveryAddress : "Pickup"}
        </p>
      </div>
      
      <div className="payment-methods">
        <h3>Select Payment Method:</h3>
        <button onClick={() => setPaymentMethod("Credit/Debit Card")}>
          Credit/Debit Card
        </button>
        <button onClick={() => setPaymentMethod("Cash on Delivery")}>
          Cash on Delivery
        </button>
      </div>

      {paymentMethod === "Credit/Debit Card" && (
        <div className="card-details">
          <input
            type="text"
            placeholder="Card Number"
            value={cardDetails.cardNumber}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cardNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Expiry"
            value={cardDetails.expiry}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, expiry: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) =>
              setCardDetails({ ...cardDetails, cvv: e.target.value })
            }
          />
        </div>
      )}

      <button onClick={handlePayment} disabled={processing}>
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
      
      {paymentStatus === "success" && (
        <div className="payment-success">
          <p>Payment Successful! Your order is confirmed.</p>
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="payment-failed">
          <p>Payment Failed! Transaction Declined.</p>
          <button onClick={handlePayment}>Retry Payment</button>
          <button onClick={() => setPaymentMethod("")}>Change Payment Method</button>
          <button onClick={() => alert("Contact support at support@rms.com")}>
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
