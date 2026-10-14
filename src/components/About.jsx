import React from "react";
import { Link } from "react-router";

function About() {
  return (
    <div className="container">
      <div className="about-card">
        <h1>About ShowTime 📺</h1>
        <p>
          ShowTime is a TV show finder web application built for browsing,
          discovering, and exploring television shows and cast details.
        </p>

        <div className="about-info">
          <h3>Project Details</h3>
          <ul>
            <li><strong>Assignment:</strong> Assignment-5 (PS6: ShowTime TV Show Finder)</li>
            <li><strong>Frontend:</strong> React 19 + React Router</li>
            <li><strong>Bundler:</strong> Vite</li>
            <li><strong>API:</strong> TVMaze REST API (Free, no API key required)</li>
          </ul>

          <h3>Features</h3>
          <ul>
            <li>Top 40 TV shows with posters, ratings, and genre tags</li>
            <li>Instant search filtering with controlled input</li>
            <li>Genre category dropdown filter & sorting</li>
            <li>Detailed show page with dynamic routing (:id)</li>
            <li>Complete cast and character list</li>
            <li>Responsive design for desktop, tablet, and mobile</li>
          </ul>

          <Link to="/shows" className="browse-btn" style={{ marginTop: "20px" }}>
            Explore Shows
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
