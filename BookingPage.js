import React, { useState } from "react";
import { Container, Nav, Tab, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar"; // Navbar component
import Footer from "../components/Footer"; // Footer component

const BookingPage = () => {
    const [city, setCity] = useState("");
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to fetch hotels based on city name
    const handleHotelSearch = async () => {
        if (!city) {
            alert("Please enter a city name!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const apiKey = "ITxonxMoGMz8Y2tKB2ISrvZ3Kryjuh2P";
            const apiSecret = "gUEk5nj1IEGpuDfN";
            
            // Step 1: Get OAuth Token
            const authResponse = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
            });

            if (!authResponse.ok) throw new Error("Failed to authenticate");

            const authData = await authResponse.json();
            const accessToken = authData.access_token;

            // Step 2: Fetch Hotels Data
            const hotelResponse = await fetch(
                `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${city}&radius=5&radiusUnit=KM`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            if (!hotelResponse.ok) throw new Error("Failed to fetch hotels");

            const hotelData = await hotelResponse.json();
            setHotels(hotelData.data || []);
        } catch (error) {
            console.error("Error fetching hotels:", error);
            setError("Failed to fetch hotel data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar user={null} /> {/* Navbar component */}
            <Container className="mt-5">
                <Tab.Container defaultActiveKey="hotels">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="hotels">Hotels</Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content>
                        <Tab.Pane eventKey="hotels">
                            <Form className="shadow-sm p-3 bg-white rounded">
                                <Row className="g-2">
                                    <Col md={8}>
                                        <Form.Group>
                                            <Form.Label>Enter City Code</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="E.g., PAR (Paris), NYC (New York)"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value.toUpperCase())}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={4} className="d-flex align-items-end">
                                        <Button variant="primary" className="w-100" onClick={handleHotelSearch}>
                                            Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>

                            {loading && <p className="mt-3">Loading hotels...</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}

                            {/* Hotel List */}
                            {!loading && hotels.length > 0 && (
                                <ul className="list-group mt-3">
                                    {hotels.map((hotel) => (
                                        <li key={hotel.hotelId} className="list-group-item">
                                            <h5>{hotel.name}</h5>
                                            <p>Distance: {hotel.distance?.value ?? "N/A"} {hotel.distance?.unit ?? ""}</p>
                                            <p>Location: {hotel.iataCode}, {hotel.address?.countryCode ?? "N/A"}</p>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {!loading && hotels.length === 0 && !error && (
                                <p className="mt-3">No hotels found for this city.</p>
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Container>
            <Footer /> {/* Footer component */}
        </div>
    );
};

export default BookingPage;
