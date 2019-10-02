import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";
const ReactMarkdown = require("react-markdown");

export default class CourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    data: null,
    isLoading: true
  };

  async componentDidMount() {
    await fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        //check if page exist
        if (!res.course) {
          //is the response does not contain courses, push notFound
          this.props.history.push("/notfound");
        }

        //if exist, set state
        this.setState(() => {
          if (res) {
            return {
              data: res,
              isLoading: false
            };
          } else {
            console.log(res.errors.errors.message);
            return this.props.history.push("/notfound");
          }
        });
      })
      .catch(err => {
        console.error(err);
        this.props.history.push("/error");
      });
  }

  //actions
  //delete a course
  delete = id => {
    const { context } = this.props;
    let authUser = context.authenticatedUser;
    let emailAddress = authUser.user.emailAddress;
    let password = authUser.user.password;

    //confirm with user if they want to delete this course
    if (window.confirm("Are you sure you want to delete this course?")) {
      context.data
        .delete(emailAddress, password, id)
        .then(errors => {
          if (errors.errors) {
            console.log(errors.errors);
            this.props.history.push("/error");
          } else {
            console.log(errors.errors);
            this.props.history.push("/");
          }
        })
        .catch(err => {
          console.error(err);
          this.props.history.push("/error");
        });
    }
  };

  render() {
    let rendered;
    let btn;
    const { context } = this.props;
    let authUser = context.authenticatedUser;

    if (!this.state.isLoading) {
      //check if course belongs to user
      if (authUser && authUser.user.id === this.state.data.course.userId) {
        //if user is logged in, allow user to update and delete course
        //add buttons if user has access
        btn = (
          <span>
            <Link className="button" to={`/courses/${this.state.id}/update`}>
              Update Course
            </Link>
            <button
              className="button"
              onClick={() => this.delete(this.state.id)}
            >
              Delete Course
            </button>
          </span>
        );
      }
      //else {
      //   this.props.history.push("/signin");
      // }

      rendered = (
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.data.course.title}</h3>
              <p>
                By {this.state.data.course.User.firstName}{" "}
                {this.state.data.course.User.lastName}
              </p>
            </div>

            <div className="course--description">
              <div className="no-top-border">
                <ReactMarkdown source={this.state.data.course.description} />
              </div>
            </div>
          </div>

          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>

                  {this.state.data.course.estimatedTime ? (
                    <h3>{this.state.data.course.estimatedTime}</h3>
                  ) : (
                    <h3>Data Unavailable</h3>
                  )}
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>

                  {this.state.data.course.materialsNeeded ? (
                    <ul>
                      <ReactMarkdown
                        source={this.state.data.course.materialsNeeded}
                      />
                    </ul>
                  ) : (
                    <h3>Data Unavailable</h3>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      rendered = <p>Loading...</p>;
    }
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {btn}
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </div>
          </div>
        </div>
        {rendered}
      </div>
    );
  }
}
