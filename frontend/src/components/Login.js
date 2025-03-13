import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if(username === "admin" && password === "1234"){
      navigate("/place-order");
    } else{
      setError("Invalid Username or Password!!");
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>R.M.S.</h1>
        <h2>Login Credentials</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}required />
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember"> Remember me</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>
          <Link to="/forgot-password" className="forgot-link">Forgot Password?</Link>
        </p>
        <p>
          Don't have an account? <Link to="/Register" className="register-link">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
