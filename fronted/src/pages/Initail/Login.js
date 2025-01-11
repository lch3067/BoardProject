import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
      
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ id, password });
    if (success) {
      navigate("/main");
    } else {
      navigate("/forbidden");
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <form className="login-form text-white p-4" onSubmit={handleSubmit}>
        <h1 className="text-center mb-4">Login</h1>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Id
          </label>
          <input
            type="text"
            id="id"
            className="form-control bg-dark text-white border-0"
            placeholder="Enter id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control bg-dark text-white border-0"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-light w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;