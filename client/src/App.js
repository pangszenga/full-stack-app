import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/global.css";

//components
// import Header from "./components/Header.js";
import NotFound from "./components/NotFound.js";

import UserSignUp from "./components/UserSignUp";
// import UserSignIn from "./components/UserSignIn";

import withContext from "./Context";

const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}

export default App;
