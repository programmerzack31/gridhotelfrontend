import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookingForm from '../components/BookingForm';

const API = process.env.REACT_APP_API_URL;
const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`${API}/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) return <p className="loading-text">Loading...</p>;

  return (
    <div className="room-details">
      <div className="room-header">
        <h2>{room.name}</h2>
        <p className="room-type">{room.type}</p>
      </div>

      <div className="room-info">
        <img
          src={room.image}
          alt={`${room.type}`}
          className="room-image"
        />

        <div className="room-meta">
          <p className="room-price">
            ${room.price}
            <span className="per-night"> per night</span>
          </p>
          <p><strong>Capacity:</strong> {room.capacity}</p>
          <p><strong>Description:</strong> {room.description}</p>
          <p><strong>Amenities:</strong> {room.amenities.join(', ')}</p>
        </div>
      </div>

      <BookingForm roomId={room._id} />
    </div>
  );
};

export default RoomDetails;
