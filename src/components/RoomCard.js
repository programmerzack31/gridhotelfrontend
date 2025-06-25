import React from 'react';
import { Link } from 'react-router-dom';

const RoomCard = ({ room }) => (
  <div className="room-card">
    <img src={room.image} alt={room.type} />
    <div className="room-info">
      <h3>{room.name}</h3>
      <p className="room-price">
        ${room.price} <span>per night</span>
      </p>
      <Link to={`/room/${room._id}`} className="room-link">
        View Details
      </Link>
    </div>
  </div>
);

export default RoomCard;
