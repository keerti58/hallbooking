import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import './UserLogin.css';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/login', { username, password });
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user details in local storage
      navigate('/user/home');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid credentials');
      } else {
        setError('An error occurred');
      }
    }
  };

  return (
   /*  <Container className="user-login-container"> */
   <div className="admin-login-page">
    <div className="admin-login-container">
      <h2>User Login</h2>
      <Form onSubmit={handleLogin}>
       {/*  <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Col>
        </Row> */}
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
         <button type="submit">Login</button>
         <a href="/user/register">Register as User</a>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      <Link to="/" className="link">Back to Startup Page</Link>
    </div>
  </div>
);
};

export default UserLogin;
