// src/components/ConfirmDialog.jsx
import React from 'react';
import './ConfirmDialog.css'; // create this for styling

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog-backdrop">
      <div className="confirm-dialog">
        <p>{message}</p>
        <div className="confirm-dialog-actions">
          <button onClick={onConfirm} className="confirm-btn">Yes</button>
          <button onClick={onCancel} className="cancel-btn">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
