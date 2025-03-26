import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from '../capstone logo.png';
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaInstagram, FaTwitter, FaStar, FaRegStar, FaTimes } from 'react-icons/fa';
import './AdventureAwareHome.css';
import { getPackages } from '../apiService';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../UserContext';

const AdventureAwareHome = () => {
    const [packages, setPackages] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [selectedItinerary, setSelectedItinerary] = useState(null);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetchPackages();
        if (user) {
            fetchFavorites();
        }
    }, [user]);

    const fetchPackages = async () => {
        try {
            const data = await getPackages();
            setPackages(data);
        } catch (error) {
            console.error('Error fetching packages:', error);
        }
    };

    const fetchFavorites = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/favorites?userId=${user.id}`);
            const data = await response.json();
            setFavorites(data.map(fav => fav.id));
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const toggleFavorite = async (pkgId) => {
        if (!user) {
            alert('Please login to add favorites.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/favorites', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, packageId: pkgId }),
            });

            if (response.ok) {
                const updatedFavorites = await response.json();
                setFavorites(updatedFavorites.map(fav => fav.id));
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const showItinerary = (pkg) => {
        setSelectedItinerary(pkg);
    };

    const closeItinerary = () => {
        setSelectedItinerary(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div>
            <Navbar user={user} />
            <div className="container" style={{ maxWidth: '1200px', padding: 0 }}>
                <header className="text-white text-center py-5" style={{ height: '500px', width: '100%', position: 'relative' }}>
                    <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}>
                        <source src="/capstone1 video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)', position: 'relative', zIndex: 1 }}>
                        <h1 className="display-4 fw-bold" style={{ fontFamily: "'Roboto', sans-serif", fontSize: '3rem' }}>
                            Explore Ontario's Best Travel Destinations
                        </h1>
                        <p className="lead" style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '1.25rem' }}>
                            Your gateway to unforgettable adventures
                        </p>
                    </div>
                </header>
            </div>

            <div className="container mt-5">
                <h2 className="text-center fw-bold">Our Packages</h2>
                <div className="row d-flex justify-content-center">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className="col-md-4 mb-4 d-flex align-items-stretch">
                            <div className="card shadow-sm border-0 w-100" style={{ height: "600px" }}>
                                <img src={`http://localhost:8080/uploads/${pkg.imageUrls[0]}`} className="card-img-top" alt={pkg.name} style={{ height: "250px", objectFit: "cover" }} />
                                <div className="card-body text-center">
                                    <h5 className="card-title fw-bold">{pkg.name}</h5>
                                    <p className="card-text">{pkg.description}</p>
                                    <p><strong>Price:</strong> {pkg.price}</p>
                                    <p><strong>Duration:</strong> {pkg.days}</p>
                                    <p><strong>Date:</strong> {formatDate(pkg.date)}</p>
                                    <button className="btn btn-success btn-sm me-2">Book</button>
                                    <button className="btn btn-info btn-sm me-2" onClick={() => showItinerary(pkg)}>Detail</button>
                                    <button className="btn btn-light btn-sm" onClick={() => toggleFavorite(pkg.id)}>
                                        {favorites.includes(pkg.id) ? <FaStar color="gold" /> : <FaRegStar />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedItinerary && (
                <div className="itinerary-modal">
                    <div className="itinerary-content">
                        <button className="close-btn" onClick={closeItinerary}><FaTimes /></button>
                        <h4 className="fw-bold">{selectedItinerary.name}</h4>
                        <p>{selectedItinerary.itinerary}</p>
                    </div>
                </div>
            )}

            <style>
                {`
                    .itinerary-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                    }
                    .itinerary-content {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        width: 400px;
                        text-align: center;
                        position: relative;
                    }
                    .close-btn {
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background: none;
                        border: none;
                        font-size: 1.5rem;
                        cursor: pointer;
                    }
                `}
            </style>
            <Footer />
        </div>
    );
};

export default AdventureAwareHome;