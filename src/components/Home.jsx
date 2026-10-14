import React from "react";
import { Link } from "react-router";
import heroImg from "../assets/hero.png";

function Home() {
  return (
    <div className="container">
      <div className="hero">
        <div className="hero-text">
          <h1>Find Your Next TV Show</h1>
          <p>
            Browse popular TV shows, check ratings, read summaries, and
            discover cast members.
          </p>
          <Link to="/shows" className="browse-btn">
            Browse Shows
          </Link>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Hero banner" />
        </div>
      </div>
    </div>
  );
}

export default Home;
