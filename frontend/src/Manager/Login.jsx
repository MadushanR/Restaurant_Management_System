import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerLogin.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the entered credentials to the backend endpoint.
      const response = await fetch("http://localhost:8080/api/manager/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: username, password: password })
      });
      
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("userId", user.id);
        localStorage.setItem("role", "manager");
        navigate("/manager-dashboard");
      } else if (response.status === 401) {
        // Credentials do not match.
        setError("Invalid credentials. Please try again.");
      } else {
        // Some other error occurred.
        setError("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Login error: ", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="manager-login-container">
      <div className="manager-login-box">
        <h1>Manager Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
