import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie, faUser, faMapMarkerAlt, faUsers, faConciergeBell, faCalendarCheck, faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import './StartupPage.css';

const StartupPage = () => {
  return (
    <div className="startup-page">
      <header className="header">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img src="/images/logo1.png" alt="Logo" className="logo" id="logo" />
            <h1 className="website-name">Book<span className="highlight">My</span>Hall</h1>
          </div>
        </Container>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <img src="/images/hall.jpg" alt="Beautiful Function Hall" className="hero-image" />
          <div className="hero-text">
            <h2>Find the Perfect Function Hall for Your Special Event</h2>
            <p>Book your dream venue with ease and make your event unforgettable.</p>
            <a href="#" className="btn btn-primary">Search Venues</a>
          </div>
        </section>

        {/* Login and Admin Cards */}
        <section className="login-cards">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={4} className="mb-3">
                <Card className="text-center transparent-card">
                  <Card.Body>
                    <FontAwesomeIcon icon={faUserTie} size="4x" />
                    <Card.Title>Admin</Card.Title>
                    <Card.Link href="/admin/login"><strong>Welcome Admin</strong></Card.Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={12} md={4} className="mb-3">
                <Card className="text-center transparent-card">
                  <Card.Body>
                    <FontAwesomeIcon icon={faUser} size="4x" />
                    <Card.Title>User</Card.Title>
                    <Card.Link href="/user/login"><strong>Welcome User</strong></Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Features Section */}
        <section className="features">
          <Container>
            <h3 className="section-title">Why Choose Us</h3>
            <Row>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" />
                <h4>Search by Location</h4>
                <p>Find halls in your desired location with ease.</p>
              </Col>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faUsers} size="2x" />
                <h4>Filter by Capacity</h4>
                <p>Choose halls based on your event's capacity requirements.</p>
              </Col>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faConciergeBell} size="2x" />
                <h4>Check Amenities</h4>
                <p>View the amenities available at each hall.</p>
              </Col>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faCalendarCheck} size="2x" />
                <h4>Check Availability</h4>
                <p>See if the halls are available on your desired dates.</p>
              </Col>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faStar} size="2x" />
                <h4>Top-Rated Venues</h4>
                <p>Choose from the highest-rated halls in your area.</p>
              </Col>
              <Col md={4} className="feature">
                <FontAwesomeIcon icon={faDollarSign} size="2x" />
                <h4>Compare Prices</h4>
                <p>Find the best prices for the venues you like.</p>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default StartupPage;






