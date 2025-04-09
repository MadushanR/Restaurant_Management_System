import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PlaceOrder.css";

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [pickup, setPickup] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("userName");
  const userName = storedUser || "Customer";

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu", error);
    }
  };

  // Group menu items by category (or "Other")
  const groupedMenu = menuItems.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

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
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.name !== itemName)
    );
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxAmount = totalAmount * 0.13;
  const finalTotal = totalAmount + taxAmount;

  // Build order object to pass to MakePayment page.
  const order = {
    userName,
    deliveryAddress,
    pickup,
    totalAmount,
    taxAmount,
    finalTotal,
    items: cart.map((item) => `${item.quantity} x ${item.name}`)
  };

  const handleProceedToPayment = () => {
    // Navigate to MakePayment page and pass the order in state.
    navigate("/make-payment", { state: order });
  };

  return (
    <div className="order-container">
      <div className="order-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Welcome, {userName} 👋</h1>
          <button onClick={() => navigate("/order-history")}>View Order History</button>
        </div>

        <h2>Place Order</h2>

        <div className="menu-section">
          <button onClick={() => setShowMenu(!showMenu)}>Search Menu</button>
        </div>

        {showMenu && (
          <div className="food-items">
            {Object.entries(groupedMenu).map(([category, items]) => (
              <div key={category}>
                <h3>{category}</h3>
                {items.map((item) => (
                  <div key={item.id}>
                    <span>
                      {item.name} - ${item.price}
                    </span>
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
                  {item.quantity} x {item.name} - $
                  {(item.price * item.quantity).toFixed(2)}
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
          <button onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
