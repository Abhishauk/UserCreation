import React from 'react';
import './style.css';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome...</h1>
      <div className="images">
        <Link to='/signup'>
        <img src="/signup.png" alt="Sign Up" className="image" />
        </Link>
        <Link to='/signin'>
        <img src="/signin.png" alt="Sign In" className="image" />
        </Link>
        
      </div>
    </div>
  );
};

export default Home;
