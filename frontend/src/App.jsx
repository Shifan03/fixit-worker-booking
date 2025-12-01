import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import Workers from './pages/Workers'; // Replaces Doctors page
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import BookWorker from './pages/BookWorker'; // Replaces Appointment.jsx
import MyBookings from './pages/MyBookings'; // Replaces MyAppointments
import MyProfile from './pages/MyProfile';
import Verify from './pages/Verify';

const App = () => {
    return (
        <div className='mx-4 sm:mx-[10%]'>
            <ToastContainer />
            <Navbar />

            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Home />} />
                <Route path='/workers' element={<Workers />} />
                <Route path='/workers/:category' element={<Workers />} />
                <Route path='/login' element={<Login />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />

                {/* Booking & Profile */}
                <Route path='/book-worker/:workerId' element={<BookWorker />} />
                <Route path='/my-bookings' element={<MyBookings />} />
                <Route path='/my-profile' element={<MyProfile />} />
                <Route path='/verify' element={<Verify />} />
            </Routes>

            <Footer />
        </div>
    );
};

export default App;

