// src/admin/AdminHome.js
import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin/login');
  };

  return (
    <div className="admin-home">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Admin Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigate('/admin/addhall')}>Add Hall</Nav.Link>
          {/* <Nav.Link>Add Location</Nav.Link> */}
         {/*  <Nav.Link onClick={() => navigate('/admin/addlocation')}>Add Location</Nav.Link> */}
          {/* <Nav.Link>View Providers</Nav.Link> */}
          <Nav.Link onClick={() => navigate('/admin/showbooking')}>View Bookings</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <h2>Welcome Admin</h2>
      </Container>
    </div>
  );
};

export default AdminHome;
