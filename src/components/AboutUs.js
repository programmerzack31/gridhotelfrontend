import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About <span>The Gridline Hotel</span></h1>
        <p>
          Welcome to <strong>The Gridline Hotel</strong>, where comfort meets elegance. Nestled in the heart of the city,
          our hotel offers a perfect blend of modern design and warm hospitality. Whether you're traveling for business
          or leisure, we provide an exceptional experience tailored to your needs.
        </p>

        <p>
          Our rooms are thoughtfully designed to provide maximum comfort, and our services are focused on ensuring
          your stay is seamless and memorable. From our 24/7 customer support to easy online booking, we make your
          travel experience effortless.
        </p>

        <p>
          Join us and discover why guests return time and again. At The Gridline Hotel, we don’t just offer rooms —
          we offer experiences.
        </p>

        <div className="about-features">
          <div>
            <h3>✓ Luxurious Rooms</h3>
            <p>Spacious and modern interiors with premium amenities.</p>
          </div>
          <div>
            <h3>✓ 24/7 Support</h3>
            <p>Always available to make your stay stress-free.</p>
          </div>
          <div>
            <h3>✓ Easy Booking</h3>
            <p>Book in seconds through our user-friendly platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
