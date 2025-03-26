import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdventureAwareHome from './pages/AdventureAwareHome';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/SignUpPage'; // Correct import path
import BookingPage from './pages/BookingPage';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import { UserProvider } from './UserContext'; // Import UserProvider

const App = () => {
    return (
        <UserProvider>
            <Router>
               
                <Routes>
                    <Route path="/" element={<AdventureAwareHome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/booking" element={<BookingPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
               
            </Router>
        </UserProvider>
    );
};

export default App;