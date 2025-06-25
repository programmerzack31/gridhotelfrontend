// src/components/Footer.js
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>The Gridline Hotel</h3>
        <p>Experience elegance, comfort, and luxury in every stay.</p>

        <div className="socials">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
        </div>

        <p className="copyright">
          &copy; {new Date().getFullYear()} The Gridline Hotel. All rights reserved.
        </p>
        <p>Designed & Developed By Muhammad Zeeshan sheikh</p>
      </div>
    </footer>
  );
};

export default Footer;
