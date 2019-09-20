import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="bounds">
        <Link className="button button-secondary" to="/">
          Return home
        </Link>
        <h1>Not Found</h1>
        <p>Sorry! We couldn't find the page you're looking for.</p>
      </div>
    </div>
  );
};

export default NotFound;
