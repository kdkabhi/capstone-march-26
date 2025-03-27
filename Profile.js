import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../UserContext';
import { FaTimes } from 'react-icons/fa';

const Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchFavorites = () => {
                fetch(`http://localhost:8080/api/favorites?userId=${user.id}`)
                    .then(response => response.json())
                    .then(data => setFavorites(data))
                    .catch(error => console.error('Error fetching favorites:', error));
            };

            fetchFavorites();
            fetch(`http://localhost:8080/api/bookings?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setBookings(data))
                .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [user]);

    const handlePackageClick = (packageId) => {
        navigate(`/?packageId=${packageId}`); // Pass packageId as query parameter
    };

    const removeFavorite = async (packageId) => {
        if (!user) {
            console.error('User not logged in');
            return;
        }

        console.log('Removing favorite:', { userId: user.id, packageId });

        try {
            const response = await fetch('http://localhost:8080/api/favorites', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, packageId }),
            });

            if (response.ok) {
                const updatedFavorites = await response.json();
                setFavorites(updatedFavorites);
                console.log('Favorite removed successfully');
            } else {
                const errorText = await response.text();
                console.error('Failed to remove favorite:', response.status, errorText);
            }
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2 className="text-center">Profile</h2>
                {user ? (
                    <div className="mb-4">
                        <h4>User Information</h4>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                ) : (
                    <p className="text-muted">Please log in to view your profile.</p>
                )}
                <div className="row">
                    <div className="col-md-6">
                        <h4>Favorites</h4>
                        {favorites.length > 0 ? (
                            <ul className="list-group">
                                {favorites.map(favorite => (
                                    <li
                                        key={favorite.id}
                                        className="list-group-item d-flex align-items-center position-relative"
                                        onClick={() => handlePackageClick(favorite.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={`http://localhost:8080/uploads/${favorite.imageUrls[0]}`}
                                            alt={favorite.name}
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '15px' }}
                                        />
                                        <span>{favorite.name}</span>
                                        <button
                                            className="btn btn-link position-absolute top-0 end-0"
                                            style={{ padding: '5px' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFavorite(favorite.id);
                                            }}
                                        >
                                            <FaTimes color="red" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No favorites selected.</p>
                        )}
                    </div>
                    <div className="col-md-6">
                        <h4>Bookings</h4>
                        {bookings.length > 0 ? (
                            <ul className="list-group">
                                {bookings.map(booking => (
                                    <li key={booking.id} className="list-group-item">
                                        {booking.name} - {new Date(booking.date).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-muted">No bookings made.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;