import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to R.M.S.</h1>
        <p>Your Reputable Restaurant Experience</p>
      </header>
      
      <section className="home-about">
        <h2>About R.M.S.</h2>
        <p>
          R.M.S. is renowned for its exceptional culinary experience and outstanding service.
          Our commitment to quality, creativity, and customer satisfaction has earned us a reputation as one of the best dining destinations.
        </p>
        <p>
          Our world-class chefs use only the finest ingredients, serving a diverse menu to suit all tastes.
          Whether you are here for a casual lunch, a family dinner, or a special celebration, our inviting ambiance and attentive service ensure a memorable visit.
        </p>
      </section>
      
      <section className="home-services">
        <h2>Our Services</h2>
        <ul>
          <li>Exquisite Dining Experience</li>
          <li>Delivery & Pickup Options</li>
          <li>Online Reservations</li>
          <li>Private Events & Catering</li>
        </ul>
      </section>
      
      <section className="home-contact">
        <h2>Contact Us</h2>
        <p><strong>Address:</strong> 123 Culinary Road, Food City, FC 12345</p>
        <p><strong>Phone:</strong> (123) 456-7890</p>
        <p><strong>Email:</strong> info@rmsrestaurant.com</p>
      </section>
      
      <footer className="home-footer">
        <p>&copy; {new Date().getFullYear()} R.M.S. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
