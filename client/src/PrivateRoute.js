// P R O T E C T E D   R O U T E S

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "./Context";

export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={props =>
            context.authenticatedUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      )}
    </Consumer>
  );
};
