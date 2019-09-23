// D A T A   A C C E S S I B I L I T Y
import React, { Component } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

const Context = React.createContext();

//make the Data API methods available throughout the app

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null
  };

  //initialise a new instance of data
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    // console.log(authenticatedUser);
    const value = {
      authenticatedUser,
      data: this.data,
      //add action to properties and objects
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

  //GET req on protected /user
  //find on server, return data to client
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: { user }
        };
      });

      const cookieOptions = {
        expires: 1 // 1 day
      };

      Cookies.set(
        "authenticatedUser",
        JSON.stringify({ user }),
        {
          cookieOptions
        } + ""
      );
    }
    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
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
