import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Login.css';
import { UserContext } from '../UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            setUser({ id: data.id, name: data.name, email: email }); // Include id
            navigate('/');
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4">
                    <h2 className="mb-4 text-center">Login</h2>
                    {message && <div className="alert alert-danger">{message}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;