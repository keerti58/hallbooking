import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar'; // Make sure to install react-calendar

import 'react-calendar/dist/Calendar.css'; // Import CSS for the calendar

const UserHome = () => {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update time every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true); // Show the confirmation modal
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/user/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  const handleCheckAvailability = () => {
    navigate('/user/showhall');
  };

  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const dayOptions = { weekday: 'long', month: 'short', day: 'numeric' };

  return (
    <div className="user-home" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '2rem' }}>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand>Book My Hall</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link onClick={handleCheckAvailability}>Book Hall</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container>
        <Row>
          <Col md={8} className="mb-4">
            <h2 className="text-center mb-4" style={{ color: '#343a40' }}>Welcome to Your Booking Dashboard</h2>
            <Card className="text-center" style={{ backgroundColor: '#ffffff', border: '1px solid #dee2e6' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.5rem', color: '#007bff' }}>Manage Your Hall Bookings</Card.Title>
                <Card.Text style={{ color: '#495057', marginBottom: '1.5rem' }}>
                  Use this dashboard to view available halls, book your preferred time slots, and manage your bookings efficiently. Stay updated with the latest availability and make changes to your reservations as needed.
                </Card.Text>
                <Button variant="primary" onClick={handleCheckAvailability} style={{ padding: '0.5rem 2rem' }}>
                  Check Availability
                </Button>
              </Card.Body>
            </Card>
            {/* Time and Date Display */}
            <div className="time-display text-center mt-4" style={{ fontSize: '1rem', color: '#6c757d' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#495057' }}>
                {currentTime.toLocaleTimeString([], timeOptions)}
              </div>
              <div>
                {currentTime.toLocaleDateString('en-US', dayOptions)}
              </div>
            </div>
          </Col>
          <Col md={4} className="d-flex flex-column align-items-center">
            <h3 className="text-center mb-3" style={{ color: '#343a40' }}>Calendar</h3>
            <Calendar
              value={date}
              onChange={setDate}
              className="mx-auto"
              style={{ maxWidth: '300px', border: '1px solid #dee2e6', borderRadius: '8px' }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <Card style={{ border: 'none', backgroundColor: '#f8f9fa' }}>
              <Card.Body>
                <Card.Title style={{ fontSize: '1.25rem', color: '#007bff' }}>How to Book a Hall</Card.Title>
                <Card.Text style={{ color: '#495057' }}>
                  Follow these simple steps to book a hall:
                  <ol className="text-left" style={{ margin: '0 auto', maxWidth: '500px' }}>
                    <li>Navigate to the "Book Hall" section.</li>
                    <li>Select your preferred date and time slot from the calendar.</li>
                    <li>Choose a hall that suits your needs and click "Check Availability".</li>
                    <li>Fill in your details and confirm your booking.</li>
                    <li>Manage or modify your bookings from the dashboard.</li>
                  </ol>
                </Card.Text>
                <Button variant="outline-primary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutModal} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserHome;
