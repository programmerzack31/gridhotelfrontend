import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoutConfirmPopup from './LogoutConfirmPopup'; // ✅ import

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // ✅ state for popup

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setShowLogoutPopup(false);
  };

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <nav className="navbar">
        <Logo />

        <div className="mobile-menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        <div className={`nav-links ${menuOpen ? 'show' : ''}`} onClick={() => setMenuOpen(false)}>
          <Link to="/">Home</Link>
          <Link to="/aboutus" >About Us</Link>
          <Link to="/dashboard">Dashboard</Link>
          {!token ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={() => setShowLogoutPopup(true)}>Logout</button> // ✅ trigger popup
          )}
        </div>
      </nav>

      {showLogoutPopup && (
        <LogoutConfirmPopup
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutPopup(false)}
        />
      )}
    </>
  );
};

export default Navbar;
