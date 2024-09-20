import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './AdminHomeNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './addhall.css';
import { Container, Form, Button, Alert,Card } from 'react-bootstrap';
const AddHall = () => {
    const [hallName, setHallName] = useState('');
    const [price, setPrice] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [halls, setHalls] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [hallId, setHallId] = useState(null);
    const [file, setFile] = useState(null);
    useEffect(() => {
        fetchHalls();
    }, []);

    const fetchHalls = () => {
        axios.get('http://localhost:5000/api/halls')
            .then(response => setHalls(response.data))
            .catch(error => console.error('Error fetching halls:', error));
    };

    const handleAddHall = async () => {
        const hallNamePattern = /^[A-Za-z\s]+$/;
        if (!hallNamePattern.test(hallName)) {
            alert('Hall name should contain alphabets only');
            return;
        }

        const mobileNumberPattern = /^\d{10}$/;
        if (!mobileNumberPattern.test(mobileNumber)) {
            alert('Mobile number should be a 10-digit number');
            return;
        }

        /* try {
            const response = await axios.post('http://localhost:5000/api/addhall', {
                hallName,
                price,
                mobileNumber,
                address,
            });
            if (response.data.success) {
                alert('Hall added successfully');
                fetchHalls();
                clearForm();
            } else {
                alert('Hall already exists');
            }
        } catch (error) {
            console.error('There was an error adding the hall!', error);
        }
    }; */
    const formData = new FormData();
    formData.append('hallName', hallName);
    formData.append('price', price);
    formData.append('mobileNumber', mobileNumber);
    formData.append('address', address);
    if (file) {
        formData.append('image', file);
    }

    try {
        const response = await axios.post('http://localhost:5000/api/addhall', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.data.success) {
            alert('Hall added successfully');
            fetchHalls();
            clearForm();
        } else {
            alert('Hall already exists');
        }
    } catch (error) {
        console.error('There was an error adding the hall!', error);
    }
};
    const handleEditHall = (hall) => {
        setEditMode(true);
        setHallId(hall.hall_id);
        setHallName(hall.hall_name);
        setPrice(hall.price);
        setMobileNumber(hall.mobile_number);
        setAddress(hall.address);
    };

   /*  const handleUpdateHall = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/hall/${hallId}`, {
                hallName,
                price,
                mobileNumber,
                address,
            });
            if (response.data.success) {
                alert('Hall updated successfully');
                fetchHalls();
                clearForm();
            } else {
                alert('Error updating hall');
            }
        } catch (error) {
            console.error('There was an error updating the hall!', error);
        }
    }; */
    const handleUpdateHall = async () => {
        const formData = new FormData();
        formData.append('hallName', hallName);
        formData.append('price', price);
        formData.append('mobileNumber', mobileNumber);
        formData.append('address', address);
        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/hall/${hallId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                alert('Hall updated successfully');
                fetchHalls();
                clearForm();
            } else {
                alert('Error updating hall');
            }
        } catch (error) {
            console.error('There was an error updating the hall!', error);
        }
    };
    const handleDeleteHall = async (hallId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/hall/${hallId}`);
            if (response.data.success) {
                alert('Hall deleted successfully');
                fetchHalls();
            } else {
                alert('Error deleting hall');
            }
        } catch (error) {
            console.error('There was an error deleting the hall!', error);
        }
    };

    const clearForm = () => {
        setEditMode(false);
        setHallName('');
        setPrice('');
        setMobileNumber('');
        setAddress('');
        setHallId(null);
        setFile(null);
    };

    return (
        <div className="add-hall">
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center mb-4">{editMode ? 'Edit Hall' : 'Add Hall'}</h2>
                <form className="mb-4">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Hall Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Hall Name"
                                value={hallName}
                                onChange={(e) => setHallName(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Price</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Mobile Number"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                            />
                            
                        </div>
                        <div className="form-group col-md-6">
                            <label>Address</label>
                            <textarea
                                className="form-control"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        {/* <div className="form-group col-md-6">
                            <label>Image</label>
                            <Form.Control
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
                        </div>
                    </div> */}
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label>Image</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={editMode ? handleUpdateHall : handleAddHall}
                    >
                        {editMode ? 'Update Hall' : 'Add Hall'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={clearForm}
                    >
                        Clear
                    </button>
                </form>
                {/* <h3 className="text-center mt-5">Halls</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Hall Name</th>
                                <th>Price</th>
                                <th>Mobile Number</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {halls.map(hall => (
                                <tr key={hall.hall_id}>
                                    <td>{hall.hall_name}</td>
                                    <td>{hall.price}</td>
                                    <td>{hall.mobile_number}</td>
                                    <td>{hall.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning mr-2"
                                            onClick={() => handleEditHall(hall)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteHall(hall.hall_id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}; */}
 <h2 className="text-center mb-4">Hall List</h2>
                <div className="row">
                    {halls.map((hall) => (
                        <div className="col-md-4 mb-4" key={hall.hall_id}>
                            <Card>
                                <Card.Img variant="top" src={`http://localhost:5000${hall.image}`} />
                                <Card.Body>
                                    <Card.Title>{hall.hall_name}</Card.Title>
                                    <Card.Text>
                                        Price: {hall.price}
                                        <br />
                                        Mobile: {hall.mobile_number}
                                        <br />
                                        Address: {hall.address}
                                    </Card.Text>
                                    <Button variant="warning" onClick={() => handleEditHall(hall)}>
                                        Edit
                                    </Button>{' '}
                                    <Button variant="danger" onClick={() => handleDeleteHall(hall.hall_id)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default AddHall;
