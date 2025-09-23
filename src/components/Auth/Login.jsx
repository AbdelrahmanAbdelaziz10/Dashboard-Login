import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "../../Style/login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms of use");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
const apiUrl = `/maximo/maxrest/oslc/os/PORTALLOGIN?lean=1&oslc.select=*&oslc.where=userid="${userName}"&_lid=${userName}&_lpwd=${password}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();

      console.log("Login Response:", data);

      // ✅ If login is successful, navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="login-links">
          <Link to="/login" className="active">Sign In</Link>
        </div>
        <div className="brand-title">
          <h1>Sign In</h1>
        </div> 
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label>Username</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="your username"
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
          <div className="input-field">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div> 

        <div className="robot-check">
          <Link to="/password-recovery" className="forgot-password">
            Forgot password?
          </Link>
        </div> 

        <div className="terms-check">
          <input
            type="checkbox"
            id="termsCheck"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
            required
          />
          <label htmlFor="termsCheck">I agree to Ultimate Trade Terms of use</label>
        </div> 

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {error && <p className="error-message">❌ {error}</p>}

      <div className="welcome-message">
        <p>Welcome to the Universal Trading digital wallet</p>
      </div>
    </div>
  );
};

export default Login;
