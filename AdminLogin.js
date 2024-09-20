// src/admin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      navigate('/admin-home');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="admin-login-page">
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to="/" className="link">Back to Startup Page</Link>
    </div>
  </div>
);
};

export default AdminLogin;


