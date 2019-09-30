import React, { Component } from "react";
import config from "../config";
import Form from "./Form";
import { Redirect } from "react-router-dom";

export default class UpdateCourse extends Component {
  //state of props that will be updated in the form for updating the course
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    isLoading: true,
    errors: []
  };

  componentDidMount() {
    fetch(`${config.apiBaseUrl}/courses/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(res =>
        this.setState(() => {
          //return details of course that is to be updated
          if (res.course) {
            return {
              title: res.course.title,
              description: res.course.description,
              estimatedTime: res.course.estimatedTime,
              materialsNeeded: res.course.materialsNeeded,
              id: res.course.userId,
              isLoading: false
            };
          } else {
            //if trying to update course that doesnt exist, push notFound
            return this.props.history.push("/notfound");
          }
        })
      );
  }

  //actions
  //user interaction with form
  change = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  //if submit is clicked
  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.user.emailAddress;
    const password = authUser.user.password;
    const courseId = this.props.match.params.id;

    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    };

    context.data
      .updateCourse(emailAddress, password, updatedCourse, courseId)
      .then(errors => {
        if (errors.errors) {
          //validation errors
          console.log(errors.errors);
          this.setState({
            errors: errors.errors
          });
        } else {
          this.props.history.push(`/courses/${courseId}`);
        }
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/error");
      });
  };

  //if cancel is clicked
  cancel = () => {
    const courseId = this.props.match.params.id;

    this.props.history.push(`/courses/${courseId}`);
  };

  render() {
    let rendered;

    //deconstructed state
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    //if the state is not loading (data is fetched)
    if (!this.state.isLoading) {
      rendered = (
        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
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
                          className="descriptionq"
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
                              className=""
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
        </div>
      );

      //check if user is authenticated in
      if (authUser.user.id === this.state.id) {
        return <div>{rendered}</div>;
      } else {
        return <Redirect to="/forbidden" />;
      }
    } else {
      rendered = <p>Loading...</p>;

      return <div>{rendered}</div>;
    }
  }
}
