import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bounds">
      <div className="grid-66">
        <h1>Unhandled Error</h1>
        <p>
          Sorry! We just encountered an unexpected error. <br />
          Click below to return home <br />
        </p>
        <Link className="button button-secondary" to="/">
          Return home
        </Link>
      </div>
    </div>
  );
};
