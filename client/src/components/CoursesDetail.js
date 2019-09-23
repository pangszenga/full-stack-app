import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../config";

export default class CourseDetail extends Component {
  state = {
    id: this.props.match.params.id,
    data: null,
    isLoading: true
  };

  componentDidMount() {
    fetch(`${config.apiBaseUrl}/courses/${this.state.id}`)
      .then(res => res.json())
      .then(res => {
        this.setState(() => {
          if (res) {
            return {
              data: res,
              isLoading: false
            };
          } else {
            console.error(res.errors.errors.message);
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
  delete = () => {
    const id = this.props.match.params.id;
    const { context } = this.props;
    const authUser = context.authenticatedUser.user;

    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    // Axios Delete Request: url, an option:  auth, which is the basic authentication
    axios
      .delete(`/api/courses/${id}`, {
        auth: {
          username: emailAddress,
          password
        }
      })
      .then(() => {
        this.props.history.push(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let rendered;
    let btn;
    let course;
    let user;
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    if (!this.state.isLoading) {
      //check if user logged in
      if (authUser.user.id === this.state.data.course.userId) {
        //courses and users
        course = this.state.data.course;
        user = this.state.data.course.User;

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
      rendered = (
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>Name
              <h3 className="course--title">{course.title}</h3>
              <p>
                By: {user.firstName} {user.lastName}
              </p>
            </div>
            <div className="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  {course.estimatedTime ? (
                    <h3>{course.estimatedTime}</h3>
                  ) : (
                    <h3>Data Unavailable</h3>
                  )}
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  {course.materialsNeeded ? (
                    <ul>
                      {course.materialsNeeded.split("*").map((mat, i) => {
                        if (i !== 0) {
                          return <li key={i}>{mat}</li>;
                        } else {
                          return null;
                        }
                      })}
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
