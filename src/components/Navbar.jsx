import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          ShowTime
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shows">Shows</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
