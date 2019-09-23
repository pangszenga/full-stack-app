import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>
        Sorry! We just encountered an unexpected error. <br />
        <Link to="/">Click Here</Link> to return to the home page.
      </p>
    </div>
  );
};
