import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

const menuItems = {
  Appetizers: [
    { name: "Fries", price: 8 },
    { name: "Onion Rings", price: 9 },
    { name: "Chicken Wings", price: 12 },
  ],
  Mains: [
    { name: "Chicken Breast", price: 25 },
    { name: "Salmon Platter", price: 32 },
    { name: "Main Steak", price: 35 },
  ],
  Drinks: [
    { name: "Beer", price: 7 },
    { name: "Pop", price: 3 },
    { name: "Orange Juice", price: 5 },
  ],
};

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [pickup, setPickup] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.name !== itemName));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxAmount = totalAmount * 0.13;
  const finalTotal = totalAmount + taxAmount;

  return (
    <div className="order-container">
      <div className="order-box">
        <h1>R.M.S.</h1>
        <h2>Place Order</h2>

        <div className="menu-section">
          <button onClick={() => setShowMenu(!showMenu)}>Search Menu</button>
        </div>

        {showMenu && (
          <div className="food-items">
            {Object.entries(menuItems).map(([category, items]) => (
              <div key={category}>
                <h3>{category}</h3>
                {items.map((item) => (
                  <div key={item.name}>
                    <span>{item.name} - ${item.price}</span>
                    <button onClick={() => addToCart(item)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="cart-summary">
          <h3>Cart Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item) => (
                <li key={item.name}>
                  {item.quantity} x {item.name} - ${item.price * item.quantity}
                  <button onClick={() => removeFromCart(item.name)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
          <h4>Subtotal: ${totalAmount.toFixed(2)}</h4>
          <h4>Tax (13%): ${taxAmount.toFixed(2)}</h4>
          <h3>Total: ${finalTotal.toFixed(2)}</h3>
        </div>

        <div className="order-options">
          <label>Select: </label>
          <button onClick={() => setPickup(true)}>Pickup</button>
          <button onClick={() => setPickup(false)}>Delivery</button>

          {!pickup ? (
            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          ) : (
            <p>Pickup Location: 123 Main St</p>
          )}
        </div>

        <div className="payment-methods">
          <label>Payment Method:</label>
          <button onClick={() => navigate("/make-payment")}>Proceed to Payment</button>
        </div>

        <div className="order-confirmation">
          <button
            onClick={() =>
              navigate("/receive-invoice", {
                state: { cart, totalAmount, taxAmount, finalTotal, deliveryAddress, pickup },
              })
            }
          >
            View Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
