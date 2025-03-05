import React, { useState } from "react";
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

  // Function to add item to cart
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

  // Function to remove an item from cart
  const removeFromCart = (itemName) => {
    setCart(cart.filter((cartItem) => cartItem.name !== itemName));
  };

  return (
    <div className="order-container">
      <div className="order-box">
        <h1>R.M.S.</h1>
        <h2>Place Order</h2>

        {/* Menu Header */}
        <div className="menu-section">
          <button>Logo</button>
          <input type="text" placeholder="Search Menu" />
          <button>Cart Icon</button>
        </div>

        

        {/* Menu Items */}
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

        {/* Cart Summary */}
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

        {/* Order Options */}
        <div className="order-options">
          <label>Select: </label>
          <button>Pickup</button>
          <button>Delivery</button>
          <input type="text" placeholder="Address Input" />
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <label>Payment Method:</label>
          <button>Credit Card</button>
          <button>Cash</button>
        </div>

        {/* Place Order */}
        <button className="place-order">Place Order</button>

        {/* Order Confirmation */}
        <div className="order-confirmation">
          <p>Order Confirmed!!</p>
          <p>Your order is on the way!!</p>
          <button>Modify Order</button>
          <button>Track Order</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
