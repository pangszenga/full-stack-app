import React from "react";
import { Link } from "react-router-dom";

//Check if user is authenticated in or not
//Context passed in from Context.js

export default class Header extends React.PureComponent {
  render() {
    const { Context } = this.props;
    const authUser = "Context.authenticatedUser";

    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Full Stack App</h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link className="signup" to="/signup">
                  Sign Up
                </Link>
                <Link className="signin" to="/signin">
                  Sign In
                </Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
}
