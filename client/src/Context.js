// D A T A   A C C E S S I B I L I T Y
import React, { Component } from "react";
import Data from "./Data";

//make the Data API methods available throughout the app

export class Context extends Component {
  //initialise a new instance of data
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };

    // HOC - provider
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

//automatically connects the component passed to it to all actions and context changes
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
