import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserContext } from '../UserContext';

const Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:8080/api/favorites?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setFavorites(data))
                .catch(error => console.error('Error fetching favorites:', error));

            fetch(`http://localhost:8080/api/bookings?userId=${user.id}`)
                .then(response => response.json())
                .then(data => setBookings(data))
                .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [user]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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
                                    <li key={favorite.id} className="list-group-item">
                                        <strong>{favorite.name}</strong> - {favorite.description} <br />
                                        Price: {favorite.price} | Duration: {favorite.days} days | Date: {formatDate(favorite.date)}
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