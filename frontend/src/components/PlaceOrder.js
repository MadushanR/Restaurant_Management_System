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
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemName) => {
    setCart(cart.filter((cartItem) => cartItem.name !== itemName));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      return;
    }
    navigate("/make-payment");
  };

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
                  {item.name} - ${item.price} x {item.quantity}
                  <button onClick={() => removeFromCart(item.name)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="order-options">
          <label>Select: </label>
          <button onClick={() => setPickup(true)}>Pickup</button>
          <button onClick={() => setPickup(false)}>Delivery</button>
          {!pickup && (
            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          )}
          {pickup && <p>Pickup Location: 123 Main St</p>}
        </div>

        <div className="payment-methods">
          <label>Payment Method:</label>
          <button onClick={() => navigate("/make-payment")}>Proceed to Payment</button>
        </div>

        <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>

        <div className="order-confirmation">
          <button onClick={() => navigate("/receive-invoice")}>Receive Invoice</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
