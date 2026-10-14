import React from "react";
import { Link } from "react-router";
import heroImg from "../assets/hero.png";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Next Favorite TV Show 📺</h1>
          <p>
            Explore top rated TV shows, browse genres, check ratings,
            and discover complete cast details with ShowTime.
          </p>
          <Link to="/shows" className="browse-btn">
            Browse Shows
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="ShowTime hero banner" />
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>🎬 Top 40 Shows</h3>
          <p>Instantly browse the highest rated shows from TVMaze.</p>
        </div>
        <div className="feature-card">
          <h3>🔍 Instant Search</h3>
          <p>Search any show by name and filter by your favorite genre.</p>
        </div>
        <div className="feature-card">
          <h3>👥 Cast & Details</h3>
          <p>View full summaries, premiere dates, and complete actor cast lists.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
