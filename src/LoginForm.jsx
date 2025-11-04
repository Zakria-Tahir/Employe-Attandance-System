import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "./features/authSlice.jsx";
import { useNavigate } from "react-router-dom";
import "./Components/LoginForm.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
  if (user) {
    // Navigate once, only if user just logged in
    if (user.isAdmin) {
      navigate("/admin", { replace: true });
    } else {
      navigate("/employee", { replace: true });
    }
  }
}, [user, navigate]);

  useEffect(() => () => dispatch(clearError()), [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: email.trim(), password, isAdmin: isAdminMode }));
  };

  const toggleMode = () => {
    setIsAdminMode(!isAdminMode);
    setEmail("");
    setPassword("");
    dispatch(clearError());
  };

  const handleForgotPassword = () => alert("Forgot password functionality will be implemented soon!");

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="mode-switch">
            <button
              className={`mode-btn ${!isAdminMode ? 'active' : ''}`}
              onClick={() => !isAdminMode || toggleMode()}
            >
              Employee
            </button>
            <button
              className={`mode-btn ${isAdminMode ? 'active' : ''}`}
              onClick={() => isAdminMode || toggleMode()}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <h2 className="login-title">{isAdminMode ? 'Admin Login' : 'Employee Login'}</h2>

            <div className="input-group">
              <label className="label">
                <span className="label-text">Email</span>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAdminMode ? "admin@company.com" : "employee@company.com"}
                  className="input"
                />
              </label>
            </div>

            <div className="input-group">
              <label className="label">
                <span className="label-text">Password</span>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input"
                />
              </label>
            </div>

            {error && <div className="error">{error}</div>}

            {!isAdminMode && (
              <button className="forgot-password" type="button" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            )}

            <button className="submit-btn" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
