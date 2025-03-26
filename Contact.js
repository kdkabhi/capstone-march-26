import React from "react";
import Navbar from "../components/Navbar"; // Import Navbar component
import Footer from "../components/Footer"; // Import Footer component
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Contact.css"; // Import custom CSS file

const Contact = () => {
  return (
    <div>
      <Navbar user={null} /> {/* Add Navbar component */}
      <div className="container mt-5 contact-page">
        {/* Page Title */}
        <h2 className="text-center fw-bold mb-4">Contact Us</h2>

        <div className="row g-3 align-items-stretch"> {/* Add g-3 class to reduce gutter space and align-items-stretch to align containers */}
          {/* Contact Information */}
          <div className="col-lg-6 mb-4 mb-lg-0"> {/* Add mb-lg-0 to remove bottom margin on large screens */}
            <div className="card shadow-sm border-0 p-4 h-100">
              <h4 className="fw-bold mb-3">Get in Touch</h4>
              <p>
                Have questions or need assistance? Contact us through the details below or fill out the form.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong>Address:</strong> 123 Adventure St, Toronto, ON, Canada
                </li>
                <li className="mb-3">
                  <FaPhone className="me-2 text-primary" />
                  <strong>Phone:</strong> +1 234-567-8901
                </li>
                <li className="mb-3">
                  <FaEnvelope className="me-2 text-primary" />
                  <strong>Email:</strong> contact@adventureaware.com
                </li>
              </ul>

              {/* Social Media Links */}
              <div className="mt-4">
                <h5 className="fw-bold">Follow Us</h5>
                <a href="https://www.facebook.com" className="me-3 text-primary" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={30} />
                </a>
                <a href="https://www.instagram.com" className="me-3 text-danger" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={30} />
                </a>
                <a href="https://www.twitter.com" className="me-3 text-info" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={30} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 p-4 h-100">
              <h4 className="fw-bold mb-3">Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="4" placeholder="Enter your message" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
              </form>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mt-5">
          <h4 className="text-center fw-bold mb-3">Find Us on the Map</h4>
          <div className="d-flex justify-content-center">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509789!2d144.95565131531595!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df7f24b6f%3A0xb308fae9a89d29a4!2sFederation%20Square!5e0!3m2!1sen!2s!4v1616731684684!5m2!1sen!2s" 
              width="100%" 
              height="400" 
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy"
              title="Adventure Aware Location">
            </iframe>
          </div>
        </div>
      </div>
      <Footer /> {/* Add Footer component */}
    </div>
  );
};

export default Contact;