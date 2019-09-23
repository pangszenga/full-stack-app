import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="bounds">
      <h1>Forbidden</h1>
      <p>
        Oh oh! You can't access this page. <br />
        <Link to="/">Click Here</Link> to return to the home page.
      </p>
    </div>
  );
};
