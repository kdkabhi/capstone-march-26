import React from "react";
import { Link } from "react-router-dom";
import logo from '../capstone logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="fw-bold">Adventure Aware</h5>
            <p>Discover the beauty of Ontario with curated travel experiences.</p>
            <img src={logo} alt="Adventure Aware Logo" width="100" height="100" />
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#destinations" className="text-white">Destinations</a></li>
              <li><a href="#contact" className="text-white">Contact</a></li>
              <li><Link to="/login" className="text-white">Login</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold">Follow Us</h5>
            <div>
              <a href="#" className="text-white me-3"><FaFacebook size={30} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={30} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={30} /></a>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <p>&copy; 2025 Adventure Aware. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;