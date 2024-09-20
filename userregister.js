import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert,Col,Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserRegister.css';

const UserRegister = () => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{1,8}$/;
        return regex.test(password);
      };
      if (!validatePassword(password)) {
        setError('Password must contain at least one uppercase letter, one special character, one digit, and be no more than 8 characters long.');
        return;
      }
    try {
         // Check for username availability
      const usernameCheck = await axios.get(`http://localhost:5000/api/check-username/${username}`);
      if (usernameCheck.data.exists) {
        setError('Username already exists.Please choose another username.');
        return;
      }
// Register user
      await axios.post('http://localhost:5000/api/user/register', { name, mobileNumber, address, username, password });
      setSuccess('Registration successful!');
      setTimeout(() => {
        navigate('/user/login');
      }, 2000);
    } catch (err) {
        if (err.response && err.response.status === 409) {
          setError('Username already exists. Please choose another username.');
        } else {
          setError('Error registering user. Please try again.');
        }
      }
    };
 
  return (
    <Container className="user-register-container mt-5">
         <Row className="justify-content-center">
         <Col xs={12} md={8} lg={6}>
      <h2 className="text-center">Register as User</h2>
      <Form onSubmit={handleRegister}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
             pattern="[A-Za-z\s]+"
            required
          />
        </Form.Group>
        <Form.Group controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            pattern="\d{10}"
            required
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
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
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  );
};

export default UserRegister;
