import React from "react";
import { Link } from "react-router";

function NotFound() {
  return (
    <div className="container not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="browse-btn">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;
