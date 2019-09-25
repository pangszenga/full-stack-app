import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="bounds ">
        <div className="grid-66">
          <h1>Not Found</h1>
          <p>
            Sorry! We couldn't find the page you're looking for. <br />
            Click below to return home <br />
          </p>
          <Link className="button button-secondary" to="/">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
