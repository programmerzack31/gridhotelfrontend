// src/components/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHotel} from 'react-icons/fa';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <FaHotel className="logo-icon" />
      <span className="logo-text">The Gridline Hotel</span>
    </Link>
  );
};

export default Logo;
