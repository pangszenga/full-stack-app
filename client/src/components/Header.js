// import React from "react";
// import { Link } from "react-router-dom";

// //Check if user is authenticated in or not
// //Context passed in from Context.js

// export default class Header extends React.PureComponent {
//   render() {
//     const { context } = this.props;
//     const authUser = context.authenticatedUser;
//     return (
//       <div className="header">
//         <div className="bounds">
//           <h1 className="header--logo">
//             <Link to="/">Courses</Link>
//           </h1>
//           <nav>
//             {authUser ? (
//               <React.Fragment>
//                 <span>Welcome, {authUser.user.firstName}!</span>
//                 <Link to="/signout">Sign Out</Link>
//               </React.Fragment>
//             ) : (
//               <React.Fragment>
//                 <Link className="signup" to="/signup">
//                   Sign Up
//                 </Link>
//                 <Link className="signin" to="/signin">
//                   Sign In
//                 </Link>
//               </React.Fragment>
//             )}
//           </nav>
//         </div>
//       </div>
//     );
//   }
// }

import React from "react";
import { NavLink } from "react-router-dom";

const Header = props => {
  // context from props
  const { context } = props;
  // authenticated user from context
  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <h1
          onClick={() => (window.location.href = "/")}
          className="header--logo"
        >
          Courses
        </h1>
        {authUser ? (
          <nav>
            <span>Welcome, {authUser.user.firstName}!</span>
            <NavLink className="signout" to="/signout">
              Sign Out
            </NavLink>
          </nav>
        ) : (
          <nav>
            <NavLink
              className="signup"
              to={{
                pathname: "/signup",
                state: { from: props.location }
              }}
            >
              Sign Up
            </NavLink>

            <NavLink
              className="signin"
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            >
              Sign In
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Header;
