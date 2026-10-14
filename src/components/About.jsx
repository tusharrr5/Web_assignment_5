import React from "react";
import { Link } from "react-router";

function About() {
  return (
    <div className="container">
      <div className="about-box">
        <h1>About ShowTime</h1>
        <p>
          ShowTime is a simple TV show finder application built using React and
          the free TVMaze API.
        </p>
        <p>
          It allows you to browse popular TV shows, search by show title,
          filter shows by genre, and click into any show to see its full summary
          and cast list.
        </p>

        <Link to="/shows" className="browse-btn">
          Browse Shows
        </Link>
      </div>
    </div>
  );
}

export default About;
