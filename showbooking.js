import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './AdminHomeNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarDay, FaUser, FaPhone, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './showbooking.css';

const ShowBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/bookings')
            .then(response => {
                const currentDate = new Date();
                currentDate.setDate(currentDate.getDate() + 1); // set to the next day to compare against booking dates

                const filtered = response.data.filter(booking => {
                    const bookingDate = new Date(booking.booking_date);
                    return (
                        bookingDate.getFullYear() === currentDate.getFullYear() &&
                        bookingDate.getMonth() === currentDate.getMonth() &&
                        bookingDate.getDate() === currentDate.getDate()
                    );
                });
                setFilteredBookings(filtered);
                setBookings(response.data);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }, []);

    return (
        <div className="show-booking">
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Booked Halls</h2>
                <div className="row">
                    {filteredBookings.length === 0 ? (
                        <div className="col-12 text-center">
                            <p>No bookings for today.</p>
                        </div>
                    ) : (
                        filteredBookings.map(booking => (
                            <div key={booking.booking_id} className="col-md-6 mb-4">
                                <div className="card border-success shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-3">
                                            <FaCheckCircle className="text-success me-2" size={24} />
                                            <h5 className="card-title mb-0">{booking.hall_name}</h5>
                                        </div>
                                        <p className="card-text"><FaCalendarDay className="me-2" /> Booking Date: {new Date(booking.booking_date).toLocaleDateString('en-GB')}</p>
                                        <p className="card-text"><FaUser className="me-2" /> User Name: {booking.user_name}</p>
                                        <p className="card-text"><FaPhone className="me-2" /> User Mobile: {booking.user_mobile}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShowBooking;
