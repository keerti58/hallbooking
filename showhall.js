import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './UserHomeNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './showhall.css';

const ShowHall = () => {
    const [halls, setHalls] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHall, setSelectedHall] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        hallName: '',
        mobileNumber: '',
        address: '',
        price: '',
        bookingDate: '',
        upiTransId: '',
        upiAmountPaid: ''
    });

    const fetchHalls = (date) => {
        axios.get(`http://localhost:5000/api/hallse?date=${date}`)
            .then(response => setHalls(response.data))
            .catch(error => console.error('Error fetching halls:', error));
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSearch = () => {
        if (selectedDate) {
            fetchHalls(selectedDate);
        } else {
            alert('Please select a date');
        }
    };

    const handleBookNow = (hall) => {
        const halfPrice = (hall.price / 2).toFixed(2);
        setSelectedHall(hall);
        setBookingDetails({
            hallName: hall.hall_name,
            mobileNumber: hall.mobile_number,
            address: hall.address,
            price: hall.price,
            bookingDate: '',
            upiTransId: '',
            upiAmountPaid: halfPrice
        });
    };

    const handleBooking = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const { hallName, mobileNumber, address, price, bookingDate, upiTransId, upiAmountPaid } = bookingDetails;

        try {
            const response = await axios.post('http://localhost:5000/api/bookhall', {
                hall_id: selectedHall.hall_id,
                hallName,
                mobileNumber,
                address,
                price,
                bookingDate,
                upiTransId,
                upiAmountPaid,
                user_id: user.user_id,
                user_name: user.name,
                user_username: user.username,
                user_mobile: user.mobile_number
            });

            if (response.data.success) {
                alert('Your booking is successful');
                setSelectedHall(null);
                fetchHalls(selectedDate); // Reload the halls to refresh their status
            } else {
                alert('There was an error booking the hall');
            }
        } catch (error) {
            console.error('Error booking the hall:', error);
        }
    };

    return (
        <div className="show-hall">
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">Available Halls</h2>
                <div className="form-group">
                    <label>Select Date</label>
                    <input type="date" className="form-control" value={selectedDate} onChange={handleDateChange} min={new Date().toISOString().split('T')[0]} />
                </div>
                <button className="btn btn-primary mt-3" onClick={handleSearch}>Search</button>
                <div className="row mt-4">
                    {halls.map(hall => (
                        <div key={hall.hall_id} className="col-md-4 mb-4">
                            <div className={`card ${hall.isBooked ? 'border-danger' : 'border-primary'} shadow-sm`}>
                                <img src={`http://localhost:5000${hall.image}`} className="card-img-top" alt={hall.hall_name} style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{hall.hall_name}</h5>
                                    <p className="card-text">Price: ₹{hall.price}</p>
                                    <p className="card-text">Address: {hall.address}</p>
                                    <p className="card-text">Contact: {hall.mobile_number}</p>
                                    {hall.isBooked ? (
                                        <span className="badge bg-danger text-white">Booked</span>
                                    ) : (
                                        <button className="btn btn-primary mt-3" onClick={() => handleBookNow(hall)}>Book Now</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedHall && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Booking Details</h5>
                                <button type="button" className="btn-close" onClick={() => setSelectedHall(null)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Hall Name</label>
                                    <input type="text" className="form-control" value={bookingDetails.hallName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input type="text" className="form-control" value={bookingDetails.mobileNumber} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" value={bookingDetails.address} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Price</label>
                                    <input type="text" className="form-control" value={bookingDetails.price} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Booking Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={bookingDetails.bookingDate}
                                        onChange={(e) => setBookingDetails({ ...bookingDetails, bookingDate: e.target.value })}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                {/* Uncomment if needed
                                <div className="form-group">
                                    <label>UPI Transaction ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={bookingDetails.upiTransId}
                                        onChange={(e) => setBookingDetails({ ...bookingDetails, upiTransId: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>UPI Amount Paid</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={bookingDetails.upiAmountPaid}
                                        readOnly
                                    />
                                </div>
                                */}
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setSelectedHall(null)}>Close</button>
                                <button className="btn btn-primary" onClick={handleBooking}>Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    );
};

export default ShowHall;
