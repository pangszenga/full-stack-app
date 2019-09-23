import React, { Component } from "react";
import Form from "./Form";

export default class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: []
  };

  //actions for this form
  //interaction with form
  change = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  //if form is submitted
  submit = () => {
    const { context } = this.props;
    let authUser = context.authenticatedUser.user;
    let emailAddress = authUser.emailAddress;
    let password = authUser.password;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const newCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId: authUser.id
    };

    console.log(newCourse);

    context.data
      .createCourse(emailAddress, password, newCourse)
      .then(errors => {
        if (errors.errors) {
          console.error(errors.errors);
          this.setState({
            errors: errors.errors
          });
        } else {
          //successful creation, see created course on home page
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  //if cancel button is clicked
  cancel = () => {
    this.props.history.push("/");
  };

  render() {
    //state properties
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      onChange={this.change}
                      value={title}
                    />
                  </div>
                  <p>
                    By: {authUser.user.firstName} {authUser.user.lastName}
                  </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      className="description"
                      placeholder="Course description..."
                      onChange={this.change}
                      value={description}
                    />
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          onChange={this.change}
                          value={estimatedTime}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          className="materialsNeeded"
                          placeholder="List materials..."
                          onChange={this.change}
                          value={materialsNeeded}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }
}
