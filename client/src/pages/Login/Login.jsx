import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import auth from "../../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/api/users/login", { email, password });

      auth.login(data.data.token);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <div className="login-card__container">
      <div className="login-card">
        <div className="login-card__header">
          <img className="login-card__logo" src={logo} alt="Logo" />
          <h2 className="login-card__title">Travel Me Login</h2>
        </div>
        <div className="login-card__content">
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
            {error && (
              <p style={{ color: "red" }} className="error">
                {error}
              </p>
            )}

            <button type="submit" className="login-card__button">
              Login
            </button>
          </form>
        </div>
        <div className="login-card__footer">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="login-card__link">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
