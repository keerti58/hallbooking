import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartupPage from './StartupPage';
import AdminLogin from './admin/AdminLogin';
import AdminHome from './admin/AdminHome';
import AddHall from './admin/AddHall';
import ViewBooking from './admin/showbooking';
import UserLoginn from './user/userlogin';
import UserRegistration from './user/userregister';
import UserHome from './user/UserHome';
import ShowHall from './user/showhall';
const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<StartupPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin/addhall" element={<AddHall />} />
        <Route path="/admin/showbooking" element={<ViewBooking/>} />
        <Route path="/user/login" element={<UserLoginn />} />
        <Route path="/user/register" element={<UserRegistration />} />
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/showhall" element={<ShowHall />} />
      </Routes>
    </Router>
  );
}

export default App;
