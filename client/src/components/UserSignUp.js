// P O S T
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Form from "./Form";

//this class renders props
export default class UserSignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      errors: []
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  //Destructured props and state
  //unpack properties into variables

  //handle input interaction
  change(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  //if user submits
  submit = () => {
    const { context } = this.props;
    const { firstName, lastName, emailAddress, password } = this.state;

    //new user details
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };

    context.data
      .createUser(user)
      .then(errors => {
        if (errors.errors) {
          console.log(errors.errors);
          this.setState({ errors: errors.errors });
        } else {
          //if there are no errors

          //sign user in

          let emailAddress = this.state.emailAddress;
          let password = this.state.password;

          context.actions.signIn(emailAddress, password).then(() => {
            this.props.history.push("/");
          });
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  // if cancel is clicked
  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    const { firstName, lastName, emailAddress, password, errors } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={this.change}
                  placeholder="First Name"
                />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={this.change}
                  placeholder="Last Name"
                />
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={this.change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={this.change}
                  placeholder="Password"
                />
              </React.Fragment>
            )}
          />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to
            sign in!
          </p>
        </div>
      </div>
    );
  }
}
