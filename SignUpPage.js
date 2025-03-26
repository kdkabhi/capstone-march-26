import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Import Navbar component
import Footer from "../components/Footer"; // Import Footer component
import './Login.css'; // Assuming you have a CSS file for additional styles

const Signup = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password, name })
        });
        const data = await response.json();
        if (response.ok) {
            setUser(data.name);
            setSuccess(true);
            setMessage('Sign up successful! Redirecting to home page...');
            setTimeout(() => {
                navigate('/'); // Redirect to AdventureAwareHome page after 3 seconds
            }, 3000);
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div>
            <Navbar user={null} /> {/* Add Navbar component */}
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h2 className="mb-4 text-center">Sign Up</h2>
                    {message && <div className={`alert ${success ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                    <p className="mt-3 text-center">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
            <Footer /> {/* Add Footer component */}
        </div>
    );
};

export default Signup;