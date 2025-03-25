import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MakePayment.css";

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

  const handlePayment = () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    if (paymentMethod === "Credit/Debit Card" && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("Please fill in all card details");
      return;
    }
    
    setProcessing(true);
    setTimeout(() => {
      const success = Math.random() > 0.3; 
      setProcessing(false);
      setPaymentStatus(success ? "success" : "failed");
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h1>R.M.S.</h1>
      <h2>Make Online Payment</h2>
      <button onClick={() => navigate("/place-order")}>Back</button>
      
      <div className="order-summary">
        <p>Order: #1234 - Placed - Total: $25.99</p>
        <p>Delivery Address: 123 Main St, City</p>
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
            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Expiry"
            value={cardDetails.expiry}
            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
          />
        </div>
      )}
      
      <button onClick={handlePayment} disabled={processing}>
        {processing ? "Processing..." : "Confirm Payment"}
      </button>
      
      {paymentStatus === "success" && (
        <div className="payment-success">
          <p>Payment Successful! Your order is confirmed and will be processed shortly.</p>
          <button onClick={() => navigate("/receive-invoice")}>
            Receive Invoice
          </button>
        </div>
      )}
      {paymentStatus === "failed" && (
        <div className="payment-failed">
          <p>Payment Failed! Transaction Declined.</p>
          <button onClick={handlePayment}>Retry Payment</button>
          <button onClick={() => setPaymentMethod("")}>Change Payment Method</button>
          <button onClick={() => alert("Contact support at support@rms.com")}>Contact Support</button>
        </div>
      )}
    </div>
  );
};

export default MakePayment;
