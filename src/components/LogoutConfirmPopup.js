import React from 'react';
import './LogoutConfirmPopup.css';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutConfirmPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-box">
        <FaSignOutAlt className="logout-icon" />
        <h2>Are you sure?</h2>
        <p>You will be logged out from your account.</p>
        <div className="logout-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="confirm-btn" onClick={onConfirm}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmPopup;
